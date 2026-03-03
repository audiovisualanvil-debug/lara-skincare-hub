import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image?: string;
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
  discount?: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Check for authenticated user (optional - supports guest checkout)
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
    }

    const body: CheckoutRequest = await req.json();
    const { items, shippingData, shippingCost, shippingMethod, couponCode, discount } = body;

    if (!items || items.length === 0) {
      throw new Error("Carrinho vazio");
    }

    // Build line items from cart
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      // Only include images if they are valid absolute URLs
      const images: string[] = [];
      if (item.image && (item.image.startsWith("http://") || item.image.startsWith("https://"))) {
        images.push(item.image);
      }

      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: item.name,
            description: item.brand,
            ...(images.length > 0 ? { images } : {}),
          },
          unit_amount: Math.round(item.price * 100),
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

    // Build discounts if coupon applied
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (discount && discount > 0) {
      // Create an inline coupon for the discount
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

    const origin = req.headers.get("origin") || "https://glow-quest-site.lovable.app";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: lineItems,
      ...(discounts.length > 0 ? { discounts } : {}),
      mode: "payment",
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
      payment_method_types: ["card", "boleto", "pix"],
      locale: "pt-BR",
    });

    // Create order in database
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user?.id || null,
        customer_email: customerEmail,
        customer_name: shippingData.name,
        customer_phone: shippingData.phone,
        order_number: "TEMP", // Will be replaced by trigger
        subtotal,
        discount_amount: discount || 0,
        shipping_amount: shippingCost,
        total: subtotal - (discount || 0) + shippingCost,
        coupon_code: couponCode || null,
        coupon_discount: discount || 0,
        payment_method: "stripe",
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
      console.error("Error creating order:", orderError);
    }

    // Insert order items
    if (order) {
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        product_image: item.image || null,
      }));

      const { error: itemsError } = await supabaseAdmin
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Error creating order items:", itemsError);
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
