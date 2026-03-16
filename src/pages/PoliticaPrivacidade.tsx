import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import SEOHead from "@/components/seo/SEOHead";

const PoliticaPrivacidade = () => (
  <>
    <SEOHead
      title="Política de Privacidade | Multti Med Porto Alegre"
      description="Política de privacidade da Multti Med Dermocosméticos. Saiba como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD."
      canonical="/politica-de-privacidade"
    />
    <MainHeader />
    <main className="pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl prose prose-sm prose-neutral">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8">Política de Privacidade</h1>
        <p className="text-muted-foreground text-sm mb-4">Última atualização: março de 2026</p>

        <h2>1. Introdução</h2>
        <p>A <strong>Multti Med Dermocosméticos</strong> ("nós", "nosso") se compromete a proteger a privacidade dos seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e compartilhamos suas informações quando você utiliza nosso site e serviços, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).</p>

        <h2>2. Dados que Coletamos</h2>
        <ul>
          <li><strong>Dados de cadastro:</strong> nome, e-mail, telefone, CPF/CNPJ, endereço de entrega.</li>
          <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas acessadas, tempo de permanência, cookies.</li>
          <li><strong>Dados de compra:</strong> histórico de pedidos, forma de pagamento utilizada (não armazenamos dados de cartão de crédito).</li>
          <li><strong>Dados de comunicação:</strong> mensagens enviadas via formulário de contato, e-mail ou WhatsApp.</li>
        </ul>

        <h2>3. Finalidade do Tratamento</h2>
        <p>Utilizamos seus dados para:</p>
        <ul>
          <li>Processar e entregar seus pedidos;</li>
          <li>Enviar comunicações sobre promoções e novidades (com seu consentimento);</li>
          <li>Melhorar nosso site e experiência de compra;</li>
          <li>Cumprir obrigações legais e regulatórias;</li>
          <li>Prevenir fraudes e garantir a segurança das transações.</li>
        </ul>

        <h2>4. Cookies</h2>
        <p>Utilizamos cookies essenciais para o funcionamento do site, cookies de análise (Google Analytics) e cookies de marketing (Facebook Pixel). Você pode gerenciar suas preferências de cookies ao acessar o site pela primeira vez.</p>

        <h2>5. Compartilhamento de Dados</h2>
        <p>Seus dados podem ser compartilhados com:</p>
        <ul>
          <li>Processadores de pagamento (Stripe) para conclusão de transações;</li>
          <li>Transportadoras (Correios, transportadoras privadas) para entrega de produtos;</li>
          <li>Ferramentas de análise (Google Analytics, Facebook) para métricas do site;</li>
        </ul>
        <p>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing sem seu consentimento.</p>

        <h2>6. Seus Direitos (LGPD)</h2>
        <p>Conforme a LGPD, você tem direito a:</p>
        <ul>
          <li>Confirmar a existência de tratamento de dados;</li>
          <li>Acessar seus dados pessoais;</li>
          <li>Corrigir dados incompletos ou desatualizados;</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados;</li>
          <li>Revogar o consentimento a qualquer momento;</li>
          <li>Solicitar a portabilidade dos dados.</li>
        </ul>

        <h2>7. Segurança</h2>
        <p>Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, uso indevido, alteração ou destruição, incluindo criptografia SSL/TLS e controle de acesso.</p>

        <h2>8. Retenção de Dados</h2>
        <p>Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas ou conforme exigido por lei. Dados de compra são mantidos pelo prazo legal de 5 anos para fins fiscais.</p>

        <h2>9. Contato</h2>
        <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:</p>
        <ul>
          <li>E-mail: contato@multtimed.com.br</li>
          <li>WhatsApp: (51) 95157-2050</li>
        </ul>
      </div>
    </main>
    <MainFooter />
  </>
);

export default PoliticaPrivacidade;
