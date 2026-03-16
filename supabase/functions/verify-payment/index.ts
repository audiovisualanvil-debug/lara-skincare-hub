import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { session_id } = await req.json();
    if (!session_id) throw new Error("session_id is required");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) throw new Error("Session not found");

    const paymentStatus = session.payment_status; // "paid", "unpaid", "no_payment_required"
    const orderStatus = paymentStatus === "paid" ? "paid" : "pending";

    // Update order in database
    const { data: order, error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        payment_status: paymentStatus,
        status: orderStatus,
      })
      .eq("payment_id", session_id)
      .select("*, order_items(*)")
      .single();

    if (updateError) {
      console.error("Error updating order:", updateError);
    }

    // Send order confirmation email if payment was successful
    if (orderStatus === "paid" && order) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
        const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-order-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${serviceKey}`,
          },
          body: JSON.stringify({ orderId: order.id }),
        });
        const emailResult = await emailResponse.json();
        console.log("Order email result:", emailResult);
      } catch (emailErr) {
        console.error("Failed to send order email:", emailErr);
        // Don't fail the payment verification if email fails
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        payment_status: paymentStatus,
        order_status: orderStatus,
        order: order,
        customer_email: session.customer_details?.email || session.customer_email,
        customer_name: session.metadata?.customer_name || session.customer_details?.name,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error verifying payment:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
