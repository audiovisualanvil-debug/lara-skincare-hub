import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const formatCurrency = (value: number): string =>
  `R$ ${value.toFixed(2).replace(".", ",")}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { orderId, sessionId } = await req.json();

    if (!orderId && !sessionId) {
      return new Response(
        JSON.stringify({ error: "orderId or sessionId required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch order with items
    let query = supabase
      .from("orders")
      .select("*, order_items(*)");

    if (orderId) {
      query = query.eq("id", orderId);
    } else {
      query = query.eq("payment_id", sessionId);
    }

    const { data: order, error: orderError } = await query.single();

    if (orderError || !order) {
      console.error("Order not found:", orderError);
      return new Response(
        JSON.stringify({ error: "Pedido não encontrado" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build email HTML
    const itemsHtml = (order.order_items || [])
      .map(
        (item: any) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
            <strong>${item.product_name}</strong><br/>
            <span style="color: #888; font-size: 13px;">Qtd: ${item.quantity} × ${formatCurrency(item.unit_price)}</span>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: right; font-weight: 600;">
            ${formatCurrency(item.total_price)}
          </td>
        </tr>`
      )
      .join("");

    const shippingAddr = order.shipping_address as any;
    const addressText = shippingAddr
      ? `${shippingAddr.address}, ${shippingAddr.number}${shippingAddr.complement ? ` - ${shippingAddr.complement}` : ""}<br/>${shippingAddr.neighborhood} - ${shippingAddr.city}/${shippingAddr.state}<br/>CEP: ${shippingAddr.cep}`
      : "Não informado";

    const siteUrl = "https://lara-skincare-hub.lovable.app";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f7f5f3;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">
    <!-- Header -->
    <div style="background:#1a1a1a;padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:24px;letter-spacing:2px;font-weight:300;">LARA COSMÉTICOS</h1>
    </div>

    <!-- Content -->
    <div style="padding:40px 32px;">
      <h2 style="color:#1a1a1a;font-size:20px;margin:0 0 8px;font-weight:500;">Pedido Confirmado! ✨</h2>
      <p style="color:#666;font-size:15px;margin:0 0 24px;line-height:1.5;">
        Olá, <strong>${order.customer_name}</strong>! Seu pedido foi recebido com sucesso.
      </p>

      <!-- Order number -->
      <div style="background:#f7f5f3;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
        <span style="color:#888;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Número do Pedido</span><br/>
        <strong style="color:#1a1a1a;font-size:22px;letter-spacing:1px;">${order.order_number}</strong>
      </div>

      <!-- Items -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <thead>
          <tr>
            <th style="text-align:left;padding-bottom:8px;border-bottom:2px solid #1a1a1a;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#888;">Produto</th>
            <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #1a1a1a;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#888;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="border-top:2px solid #1a1a1a;padding-top:16px;">
        <table style="width:100%;">
          <tr>
            <td style="padding:4px 0;color:#666;font-size:14px;">Subtotal</td>
            <td style="padding:4px 0;text-align:right;font-size:14px;">${formatCurrency(order.subtotal)}</td>
          </tr>
          ${order.discount_amount > 0 ? `
          <tr>
            <td style="padding:4px 0;color:#27ae60;font-size:14px;">Desconto${order.coupon_code ? ` (${order.coupon_code})` : ""}</td>
            <td style="padding:4px 0;text-align:right;color:#27ae60;font-size:14px;">-${formatCurrency(order.discount_amount)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:4px 0;color:#666;font-size:14px;">Frete</td>
            <td style="padding:4px 0;text-align:right;font-size:14px;">${order.shipping_amount > 0 ? formatCurrency(order.shipping_amount) : "Grátis"}</td>
          </tr>
          <tr>
            <td style="padding:8px 0 0;font-size:18px;font-weight:700;color:#1a1a1a;">Total</td>
            <td style="padding:8px 0 0;text-align:right;font-size:18px;font-weight:700;color:#1a1a1a;">${formatCurrency(order.total)}</td>
          </tr>
        </table>
      </div>

      <!-- Shipping address -->
      <div style="margin-top:24px;padding:16px;background:#f7f5f3;border-radius:8px;">
        <strong style="font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#888;">Endereço de Entrega</strong>
        <p style="margin:8px 0 0;color:#333;font-size:14px;line-height:1.6;">${addressText}</p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-top:32px;">
        <a href="${siteUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;padding:14px 32px;text-decoration:none;border-radius:4px;font-size:14px;letter-spacing:1px;text-transform:uppercase;">
          Acompanhar Pedido
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f7f5f3;padding:24px 32px;text-align:center;">
      <p style="color:#999;font-size:12px;margin:0;">
        Dúvidas? Fale conosco pelo WhatsApp: (51) 95157-2050<br/>
        © ${new Date().getFullYear()} Lara Cosméticos. Todos os direitos reservados.
      </p>
    </div>
  </div>
</body>
</html>`;

    // Send email via Lovable API
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      console.error("LOVABLE_API_KEY not configured - email not sent");
      return new Response(
        JSON.stringify({ success: false, error: "Email service not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-email-internal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        to: order.customer_email,
        subject: `Pedido ${order.order_number} confirmado! ✨`,
        html: emailHtml,
      }),
    });

    // If Lovable email infra is not set up, log but don't fail
    if (!emailResponse.ok) {
      const errText = await emailResponse.text();
      console.error("Email send failed:", emailResponse.status, errText);
      // Don't return error - order confirmation should still work
      return new Response(
        JSON.stringify({ success: true, emailSent: false, reason: "Email service unavailable" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`✅ Order confirmation email sent to ${order.customer_email}`);

    return new Response(
      JSON.stringify({ success: true, emailSent: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending order email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
