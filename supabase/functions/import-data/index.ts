import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Embed SQL files at build time
import part1 from "./products_part1.sql" with { type: "text" };
import part2 from "./products_part2.sql" with { type: "text" };
import part3 from "./products_part3.sql" with { type: "text" };
import outros from "./outros_dados.sql" with { type: "text" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const dbUrl = Deno.env.get("SUPABASE_DB_URL");
    if (!dbUrl) throw new Error("SUPABASE_DB_URL not set");

    const { default: postgres } = await import("https://deno.land/x/postgresjs@v3.4.4/mod.js");
    const db = postgres(dbUrl);

    const results: string[] = [];

    // Delete existing products first
    await db.unsafe("DELETE FROM order_items; DELETE FROM orders; DELETE FROM products;");
    results.push("Cleaned tables");

    // Import products
    await db.unsafe(part1);
    results.push("Part 1 done");

    await db.unsafe(part2);
    results.push("Part 2 done");

    await db.unsafe(part3);
    results.push("Part 3 done");

    // Import other data (orders have FK issues with users, skip if error)
    const stmts = outros.split(';').filter((s: string) => s.trim().length > 5);
    for (const stmt of stmts) {
      try {
        await db.unsafe(stmt);
      } catch (e) {
        results.push(`Skip: ${e.message?.substring(0, 80)}`);
      }
    }
    results.push("Other data attempted");

    const count = await db`SELECT COUNT(*) as total FROM products`;
    results.push(`Total products: ${count[0].total}`);

    await db.end();

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
