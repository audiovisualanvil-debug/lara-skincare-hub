import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import SEOHead from "@/components/seo/SEOHead";

const TermosDeUso = () => (
  <>
    <SEOHead
      title="Termos de Uso | Multti Med Porto Alegre"
      description="Termos e condições de uso do site Multti Med Dermocosméticos. Regras de compra, devolução e cancelamento."
      canonical="/termos-de-uso"
    />
    <MainHeader />
    <main className="pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl prose prose-sm prose-neutral">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8">Termos de Uso</h1>
        <p className="text-muted-foreground text-sm mb-4">Última atualização: março de 2026</p>

        <h2>1. Aceitação dos Termos</h2>
        <p>Ao acessar e utilizar o site da <strong>Multti Med Dermocosméticos</strong>, você concorda integralmente com estes Termos de Uso. Caso não concorde, por favor, não utilize nosso site.</p>

        <h2>2. Cadastro</h2>
        <p>Para realizar compras, é necessário criar uma conta com informações verídicas e atualizadas. Você é responsável por manter a confidencialidade da sua senha e por todas as atividades realizadas em sua conta.</p>

        <h2>3. Produtos e Preços</h2>
        <ul>
          <li>Os preços são exibidos em Reais (BRL) e incluem impostos quando aplicável;</li>
          <li>Fotos dos produtos são meramente ilustrativas. Cores podem variar conforme o monitor;</li>
          <li>Nos reservamos o direito de alterar preços e disponibilidade sem aviso prévio;</li>
          <li>Promoções têm prazo de validade e condições específicas.</li>
        </ul>

        <h2>4. Processo de Compra</h2>
        <p>A confirmação do pedido ocorre após a aprovação do pagamento. Enviaremos um e-mail de confirmação com os dados do pedido e prazo estimado de entrega.</p>

        <h2>5. Pagamento</h2>
        <p>Aceitamos as seguintes formas de pagamento:</p>
        <ul>
          <li>Cartão de crédito (Visa, Mastercard, Elo) em até 12x sem juros;</li>
          <li>PIX com desconto.</li>
        </ul>

        <h2>6. Entrega</h2>
        <p>Os prazos de entrega são contados a partir da confirmação do pagamento e variam conforme a localidade e modalidade de frete (PAC ou SEDEX). Frete grátis para compras acima de R$ 299,00.</p>

        <h2>7. Cancelamento</h2>
        <p>O cancelamento pode ser solicitado antes do envio do pedido, entrando em contato via WhatsApp ou e-mail. Após o envio, aplica-se a política de trocas e devoluções.</p>

        <h2>8. Propriedade Intelectual</h2>
        <p>Todo o conteúdo do site (textos, imagens, logotipos, layout) é de propriedade da Multti Med ou de seus licenciadores. É proibida a reprodução sem autorização prévia.</p>

        <h2>9. Limitação de Responsabilidade</h2>
        <p>Não nos responsabilizamos por danos decorrentes do uso inadequado dos produtos. Siga sempre as instruções de uso e consulte um profissional qualificado.</p>

        <h2>10. Legislação Aplicável</h2>
        <p>Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de Porto Alegre/RS para dirimir quaisquer controvérsias.</p>

        <h2>11. Contato</h2>
        <p>E-mail: contato@multtimed.com.br | WhatsApp: (51) 95157-2050</p>
      </div>
    </main>
    <MainFooter />
  </>
);

export default TermosDeUso;
