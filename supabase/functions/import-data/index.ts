import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Read SQL files embedded as strings
const products_part1 = `-- Products part 1 (90 rows)
${await Deno.readTextFile(new URL("./products_part1.sql", import.meta.url).pathname.replace("/var/", "/"))}`;

const products_part2 = `${await Deno.readTextFile(new URL("./products_part2.sql", import.meta.url).pathname.replace("/var/", "/"))}`;

const products_part3 = `${await Deno.readTextFile(new URL("./products_part3.sql", import.meta.url).pathname.replace("/var/", "/"))}`;

const outros_dados = `${await Deno.readTextFile(new URL("./outros_dados.sql", import.meta.url).pathname.replace("/var/", "/"))}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const dbUrl = Deno.env.get("SUPABASE_DB_URL");
    if (!dbUrl) throw new Error("SUPABASE_DB_URL not set");

    // Use postgres connection directly
    const { default: postgres } = await import("https://deno.land/x/postgresjs@v3.4.4/mod.js");
    const sql = postgres(dbUrl);

    const results: string[] = [];

    // Execute products part 1
    await sql.unsafe(products_part1);
    results.push("Products part 1 imported");

    // Execute products part 2
    await sql.unsafe(products_part2);
    results.push("Products part 2 imported");

    // Execute products part 3
    await sql.unsafe(products_part3);
    results.push("Products part 3 imported");

    // Execute other data (orders, order_items, professional_requests)
    // Split by statement and execute individually
    const statements = outros_dados.split(';').filter(s => s.trim().length > 0);
    for (const stmt of statements) {
      try {
        await sql.unsafe(stmt);
      } catch (e) {
        results.push(`Warning: ${e.message}`);
      }
    }
    results.push("Other data imported");

    await sql.end();

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
