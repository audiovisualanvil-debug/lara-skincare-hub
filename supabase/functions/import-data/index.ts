const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    // Read SQL files as text
    const basePath = new URL(".", import.meta.url).pathname;
    const part1 = await Deno.readTextFile(basePath + "products_part1.sql");
    const part2 = await Deno.readTextFile(basePath + "products_part2.sql");
    const part3 = await Deno.readTextFile(basePath + "products_part3.sql");
    const outros = await Deno.readTextFile(basePath + "outros_dados.sql");

    // Delete existing data first
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
