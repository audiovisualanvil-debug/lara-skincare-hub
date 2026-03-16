import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import SEOHead from "@/components/seo/SEOHead";

const PoliticaTrocas = () => (
  <>
    <SEOHead
      title="Política de Trocas e Devoluções | Multti Med Porto Alegre"
      description="Conheça a política de trocas e devoluções da Multti Med Dermocosméticos. Prazo de 7 dias para arrependimento conforme CDC."
      canonical="/politica-de-trocas"
    />
    <MainHeader />
    <main className="pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl prose prose-sm prose-neutral">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8">Política de Trocas e Devoluções</h1>
        <p className="text-muted-foreground text-sm mb-4">Última atualização: março de 2026</p>

        <h2>1. Direito de Arrependimento</h2>
        <p>Conforme o Código de Defesa do Consumidor (Art. 49), você pode desistir da compra realizada pela internet no prazo de <strong>7 (sete) dias corridos</strong> a partir do recebimento do produto, sem necessidade de justificativa.</p>

        <h2>2. Condições para Troca ou Devolução</h2>
        <ul>
          <li>O produto deve estar lacrado, sem sinais de uso, na embalagem original e com todos os acessórios;</li>
          <li>A nota fiscal deve acompanhar o produto;</li>
          <li>Cosméticos abertos ou com lacre violado <strong>não</strong> serão aceitos para troca por arrependimento, exceto em caso de defeito;</li>
        </ul>

        <h2>3. Produtos com Defeito</h2>
        <p>Caso receba um produto com defeito de fabricação, entre em contato conosco em até <strong>30 dias</strong> após o recebimento. Envie fotos do produto e do defeito. Faremos a análise e, se confirmado, providenciaremos:</p>
        <ul>
          <li>Substituição por produto idêntico;</li>
          <li>Reembolso integral (incluindo frete); ou</li>
          <li>Crédito em loja.</li>
        </ul>

        <h2>4. Como Solicitar</h2>
        <ol>
          <li>Entre em contato via WhatsApp <strong>(51) 95157-2050</strong> ou e-mail <strong>contato@multtimed.com.br</strong>;</li>
          <li>Informe o número do pedido e o motivo da solicitação;</li>
          <li>Aguarde as instruções para envio do produto.</li>
        </ol>

        <h2>5. Frete de Devolução</h2>
        <ul>
          <li><strong>Arrependimento:</strong> o frete de devolução é por conta do cliente;</li>
          <li><strong>Produto com defeito:</strong> o frete de devolução é por nossa conta (enviaremos código de postagem reversa).</li>
        </ul>

        <h2>6. Prazo de Reembolso</h2>
        <p>O reembolso será processado em até <strong>10 dias úteis</strong> após o recebimento e verificação do produto devolvido:</p>
        <ul>
          <li><strong>Cartão de crédito:</strong> estorno na fatura seguinte (prazo pode variar conforme a operadora);</li>
          <li><strong>PIX:</strong> reembolso na conta de origem em até 5 dias úteis.</li>
        </ul>

        <h2>7. Produtos Não Elegíveis</h2>
        <p>Não aceitamos troca/devolução de:</p>
        <ul>
          <li>Produtos personalizados ou sob encomenda;</li>
          <li>Produtos com lacre violado (exceto defeito);</li>
          <li>Amostras e brindes.</li>
        </ul>

        <h2>8. Contato</h2>
        <p>WhatsApp: (51) 95157-2050 | E-mail: contato@multtimed.com.br</p>
      </div>
    </main>
    <MainFooter />
  </>
);

export default PoliticaTrocas;
