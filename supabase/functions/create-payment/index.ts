import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CartItem {
  id: string;
  quantity: number;
}

interface CheckoutRequest {
  items: CartItem[];
  shippingData: {
    name: string;
    email: string;
    phone: string;
    cep: string;
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  shippingCost: number;
  shippingMethod: string;
  couponCode?: string;
  paymentMethod?: "card" | "pix";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    // Log key type for debugging (never log the full key)
    console.log("Stripe key info:", {
      prefix: stripeKey.substring(0, 7),
      length: stripeKey.length,
    });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check for authenticated user (optional - supports guest checkout)
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? ""
      );
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
    }

    const body: CheckoutRequest = await req.json();
    const { items, shippingData, shippingCost, shippingMethod, couponCode, paymentMethod } = body;

    console.log("Checkout request:", {
      itemCount: items?.length,
      itemIds: items?.map(i => i.id),
      paymentMethod,
      shippingMethod,
    });

    if (!items || items.length === 0) {
      throw new Error("Carrinho vazio");
    }

    // Validate items
    if (items.length > 50) throw new Error("Muitos itens no carrinho");
    for (const item of items) {
      if (!item.id || typeof item.quantity !== "number" || item.quantity < 1 || item.quantity > 100) {
        throw new Error(`Item inválido no carrinho: ${JSON.stringify(item)}`);
      }
    }

    // Validate shipping cost range
    if (typeof shippingCost !== "number" || shippingCost < 0 || shippingCost > 500) {
      throw new Error("Custo de frete inválido");
    }

    // SERVER-SIDE: Fetch real product prices from database
    const productIds = items.map((item) => item.id);

    // Try fetching by UUID first
    const { data: dbProducts, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id, name, brand, price, image_url, is_active, stock")
      .in("id", productIds);

    if (productsError) {
      console.error("DB query error:", JSON.stringify(productsError));
      throw new Error(`Erro ao buscar produtos: ${productsError.message}`);
    }

    if (!dbProducts || dbProducts.length === 0) {
      console.error("No products found for IDs:", productIds);
      throw new Error("Produtos não encontrados no banco de dados");
    }

    console.log(`Found ${dbProducts.length} of ${productIds.length} products`);

    // Verify all requested products exist and are active
    const productMap = new Map(dbProducts.map((p) => [p.id, p]));
    for (const item of items) {
      const product = productMap.get(item.id);
      if (!product) throw new Error(`Produto não encontrado: ${item.id}`);
      if (!product.is_active) throw new Error(`Produto indisponível: ${product.name}`);
      if (product.stock < item.quantity) throw new Error(`Estoque insuficiente: ${product.name}`);
    }

    // SERVER-SIDE: Validate coupon
    let discount = 0;
    const subtotal = items.reduce((sum, item) => {
      const product = productMap.get(item.id)!;
      return sum + product.price * item.quantity;
    }, 0);

    if (couponCode) {
      const { data: couponResult, error: couponError } = await supabaseAdmin
        .rpc("validate_coupon", { p_code: couponCode, p_order_value: subtotal });

      if (couponError) {
        console.error("Coupon validation error:", couponError);
      } else if (couponResult && couponResult.length > 0 && couponResult[0].is_valid) {
        const couponData = couponResult[0];
        if (couponData.discount_type === "percentage") {
          discount = Math.round((subtotal * couponData.discount_value) / 100 * 100) / 100;
        } else {
          discount = couponData.discount_value;
        }
      } else if (couponResult?.[0]?.error_message) {
        throw new Error(couponResult[0].error_message);
      }
    }

    // Build line items from SERVER-SIDE verified prices
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const product = productMap.get(item.id)!;
      const images: string[] = [];
      if (product.image_url && (product.image_url.startsWith("http://") || product.image_url.startsWith("https://"))) {
        images.push(product.image_url);
      }

      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            description: product.brand,
            ...(images.length > 0 ? { images } : {}),
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // Add shipping as a line item
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "brl",
          product_data: {
            name: `Frete ${shippingMethod}`,
            description: "Custo de envio",
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Build discounts if coupon validated server-side
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (discount > 0) {
      const stripeCoupon = await stripe.coupons.create({
        amount_off: Math.round(discount * 100),
        currency: "brl",
        duration: "once",
        name: couponCode || "Desconto",
      });
      discounts.push({ coupon: stripeCoupon.id });
    }

    // Check if Stripe customer exists
    let customerId: string | undefined;
    const customerEmail = user?.email || shippingData.email;

    if (customerEmail) {
      const customers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
    }

    const origin = req.headers.get("origin") || "https://lara-skincare-hub.lovable.app";

    // Determine payment methods based on user selection
    const paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = [];
    if (paymentMethod === "pix") {
      paymentMethodTypes.push("pix");
    } else if (paymentMethod === "boleto") {
      paymentMethodTypes.push("boleto");
    } else {
      // Default: card + pix
      paymentMethodTypes.push("card", "pix");
    }

    const sessionParams = {
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: lineItems,
      ...(discounts.length > 0 ? { discounts } : {}),
      mode: "payment" as const,
      success_url: `${origin}/confirmacao-pedido?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        user_id: user?.id || "guest",
        customer_name: shippingData.name,
        customer_phone: shippingData.phone,
        shipping_method: shippingMethod,
        coupon_code: couponCode || "",
        shipping_address: JSON.stringify({
          cep: shippingData.cep,
          address: shippingData.address,
          number: shippingData.number,
          complement: shippingData.complement || "",
          neighborhood: shippingData.neighborhood,
          city: shippingData.city,
          state: shippingData.state,
        }),
      },
      payment_method_types: paymentMethodTypes,
      locale: "pt-BR" as const,
    };

    console.log("Creating Stripe session with params:", JSON.stringify({
      payment_method_types: sessionParams.payment_method_types,
      mode: sessionParams.mode,
      line_items_count: sessionParams.line_items.length,
      has_customer: !!sessionParams.customer,
      customer_email: sessionParams.customer_email,
      has_discounts: discounts.length > 0,
      success_url: sessionParams.success_url,
    }));

    let session;
    try {
      session = await stripe.checkout.sessions.create(sessionParams);
    } catch (stripeError: any) {
      console.error("Stripe API error:", JSON.stringify({
        type: stripeError?.type,
        code: stripeError?.code,
        message: stripeError?.message,
        statusCode: stripeError?.statusCode,
        raw: stripeError?.raw?.message,
        param: stripeError?.param,
        decline_code: stripeError?.decline_code,
      }));
      throw new Error(`Stripe: ${stripeError?.message || stripeError}`);
    }

    console.log("Stripe session created:", session.id, "url:", session.url?.substring(0, 60));

    // Create order in database with server-verified amounts
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user?.id || null,
        customer_email: customerEmail,
        customer_name: shippingData.name,
        customer_phone: shippingData.phone,
        order_number: "TEMP",
        subtotal,
        discount_amount: discount,
        shipping_amount: shippingCost,
        total: subtotal - discount + shippingCost,
        coupon_code: couponCode || null,
        coupon_discount: discount,
        payment_method: paymentMethod || "card",
        payment_id: session.id,
        payment_status: "pending",
        status: "pending",
        shipping_address: {
          cep: shippingData.cep,
          address: shippingData.address,
          number: shippingData.number,
          complement: shippingData.complement || "",
          neighborhood: shippingData.neighborhood,
          city: shippingData.city,
          state: shippingData.state,
        },
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", JSON.stringify(orderError));
    }

    // Insert order items with server-verified prices
    if (order) {
      const orderItems = items.map((item) => {
        const product = productMap.get(item.id)!;
        return {
          order_id: order.id,
          product_id: product.id,
          product_name: product.name,
          quantity: item.quantity,
          unit_price: product.price,
          total_price: product.price * item.quantity,
          product_image: product.image_url || null,
        };
      });

      const { error: itemsError } = await supabaseAdmin
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Error creating order items:", JSON.stringify(itemsError));
      }
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating payment:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
