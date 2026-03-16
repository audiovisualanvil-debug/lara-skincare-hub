const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ShippingRequest {
  cepDestino: string;
  peso?: number; // kg - default 0.5
  comprimento?: number; // cm
  altura?: number; // cm
  largura?: number; // cm
}

interface ShippingOption {
  service: string;
  name: string;
  price: number;
  deadline: number; // business days
  error?: string;
}

// CEP de origem configurável (depósito/loja)
const CEP_ORIGEM = "90040191"; // Porto Alegre/RS - TODO: configurar via env

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cepDestino, peso = 0.5, comprimento = 20, altura = 10, largura = 15 }: ShippingRequest = await req.json();

    if (!cepDestino) {
      return new Response(
        JSON.stringify({ error: "CEP de destino é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cleanCEP = cepDestino.replace(/\D/g, "");
    if (cleanCEP.length !== 8) {
      return new Response(
        JSON.stringify({ error: "CEP inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Correios service codes
    const services = [
      { code: "04510", name: "PAC" },
      { code: "04014", name: "SEDEX" },
    ];

    const results: ShippingOption[] = [];

    for (const service of services) {
      try {
        const params = new URLSearchParams({
          nCdEmpresa: "",
          sDsSenha: "",
          nCdServico: service.code,
          sCepOrigem: CEP_ORIGEM,
          sCepDestino: cleanCEP,
          nVlPeso: String(peso),
          nCdFormato: "1", // box/package
          nVlComprimento: String(comprimento),
          nVlAltura: String(altura),
          nVlLargura: String(largura),
          nVlDiametro: "0",
          sCdMaoPropria: "N",
          nVlValorDeclarado: "0",
          sCdAvisoRecebimento: "N",
          StrRetorno: "xml",
        });

        const url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?${params.toString()}`;
        const response = await fetch(url);
        const xml = await response.text();

        // Parse XML response
        const valorMatch = xml.match(/<Valor>([\d.,]+)<\/Valor>/);
        const prazoMatch = xml.match(/<PrazoEntrega>(\d+)<\/PrazoEntrega>/);
        const erroMatch = xml.match(/<Erro>(\d+)<\/Erro>/);
        const msgErroMatch = xml.match(/<MsgErro><!\[CDATA\[(.*?)\]\]><\/MsgErro>|<MsgErro>(.*?)<\/MsgErro>/);

        const errorCode = erroMatch?.[1] || "0";
        const errorMsg = msgErroMatch?.[1] || msgErroMatch?.[2] || "";

        if (errorCode !== "0" && errorCode !== "010") {
          // Error code 010 = prazo might differ, but price is valid
          console.error(`Correios error for ${service.name}: ${errorCode} - ${errorMsg}`);
          results.push({
            service: service.code,
            name: service.name,
            price: 0,
            deadline: 0,
            error: errorMsg || `Erro ${errorCode}`,
          });
          continue;
        }

        const valor = valorMatch?.[1]?.replace(".", "").replace(",", ".") || "0";
        const prazo = prazoMatch?.[1] || "0";

        results.push({
          service: service.code,
          name: service.name,
          price: parseFloat(valor),
          deadline: parseInt(prazo),
        });
      } catch (err: any) {
        console.error(`Error calculating ${service.name}:`, err.message);
        results.push({
          service: service.code,
          name: service.name,
          price: 0,
          deadline: 0,
          error: err.message,
        });
      }
    }

    // Filter out errored results and sort by price
    const validResults = results.filter(r => !r.error && r.price > 0);
    const errorResults = results.filter(r => r.error || r.price === 0);

    // If both fail, return fallback prices
    if (validResults.length === 0) {
      console.warn("All Correios calculations failed, using fallback prices");
      return new Response(
        JSON.stringify({
          options: [
            { service: "04510", name: "PAC", price: 19.90, deadline: 12, fallback: true },
            { service: "04014", name: "SEDEX", price: 34.90, deadline: 5, fallback: true },
          ],
          errors: errorResults,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        options: validResults,
        errors: errorResults.length > 0 ? errorResults : undefined,
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
