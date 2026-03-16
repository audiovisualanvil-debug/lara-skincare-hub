import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ImageTask {
  productId: string;
  slug: string;
  sourceUrl: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify user is admin
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: claims, error: claimsError } = await userClient.auth.getClaims(
      authHeader.replace("Bearer ", "")
    );
    if (claimsError || !claims?.claims?.sub) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use service role for storage and DB operations
    const supabase = createClient(supabaseUrl, serviceKey);

    // Check admin role
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: claims.claims.sub,
      _role: "admin",
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { tasks } = (await req.json()) as { tasks: ImageTask[] };

    if (!tasks || tasks.length === 0) {
      return new Response(
        JSON.stringify({ error: "No tasks provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: Array<{
      productId: string;
      slug: string;
      success: boolean;
      publicUrl?: string;
      error?: string;
    }> = [];

    for (const task of tasks) {
      try {
        console.log(`Processing: ${task.slug} from ${task.sourceUrl}`);

        // Fetch the image
        const imgResponse = await fetch(task.sourceUrl);
        if (!imgResponse.ok) {
          throw new Error(`Failed to fetch image: ${imgResponse.status}`);
        }

        const contentType = imgResponse.headers.get("content-type") || "image/jpeg";
        const imageBuffer = await imgResponse.arrayBuffer();

        // Determine extension
        let ext = "jpg";
        if (contentType.includes("png")) ext = "png";
        else if (contentType.includes("webp")) ext = "webp";

        const storagePath = `processed/${task.slug}.${ext}`;

        // Upload to storage (upsert)
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(storagePath, imageBuffer, {
            contentType,
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(storagePath);

        // Update product image_url
        const { error: updateError } = await supabase
          .from("products")
          .update({ image_url: publicUrl })
          .eq("id", task.productId);

        if (updateError) throw updateError;

        results.push({
          productId: task.productId,
          slug: task.slug,
          success: true,
          publicUrl,
        });

        console.log(`✅ ${task.slug} → ${publicUrl}`);
      } catch (err: any) {
        console.error(`❌ ${task.slug}: ${err.message}`);
        results.push({
          productId: task.productId,
          slug: task.slug,
          success: false,
          error: err.message,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;

    return new Response(
      JSON.stringify({
        message: `Processed ${successCount}/${tasks.length} images`,
        results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
