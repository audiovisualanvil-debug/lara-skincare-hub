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

    const { sql, urls } = await req.json();
    const results: string[] = [];

    if (urls && Array.isArray(urls)) {
      for (const url of urls) {
        const resp = await fetch(url);
        if (!resp.ok) {
          results.push(`Failed to fetch: ${url} (${resp.status})`);
          continue;
        }
        const sqlContent = await resp.text();
        await db.unsafe(sqlContent);
        results.push(`Executed: ${url.split('/').pop()}`);
      }
    } else if (sql) {
      await db.unsafe(sql);
      results.push("SQL executed");
    }

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
