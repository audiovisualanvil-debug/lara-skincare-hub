import SEOHead from "@/components/seo/SEOHead";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Search, 
  Truck, 
  CreditCard, 
  Package, 
  RefreshCcw, 
  Shield, 
  HeadphonesIcon,
  HelpCircle,
  MessageCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  questions: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "shipping",
    name: "Envio e Entrega",
    icon: Truck,
    color: "from-blue-500 to-blue-600",
    questions: [
      {
        question: "Qual o prazo de entrega?",
        answer: "O prazo de entrega varia de acordo com a sua região e o método de envio escolhido. Para PAC, o prazo é de 8 a 12 dias úteis. Para SEDEX, de 3 a 5 dias úteis. O prazo começa a contar após a confirmação do pagamento."
      },
      {
        question: "Como rastrear meu pedido?",
        answer: "Após o envio do seu pedido, você receberá um e-mail com o código de rastreamento. Você pode acompanhar a entrega pelo site dos Correios ou pela nossa página 'Meus Pedidos' na sua conta."
      },
      {
        question: "Vocês entregam para todo o Brasil?",
        answer: "Sim! Entregamos para todos os estados brasileiros. Para algumas regiões mais remotas, o prazo de entrega pode ser um pouco maior."
      },
      {
        question: "O frete é grátis?",
        answer: "Oferecemos frete grátis para compras acima de R$ 199,00 para todo o Brasil. Para compras abaixo desse valor, o frete é calculado de acordo com o CEP de destino."
      }
    ]
  },
  {
    id: "payment",
    name: "Pagamento",
    icon: CreditCard,
    color: "from-green-500 to-green-600",
    questions: [
      {
        question: "Quais formas de pagamento vocês aceitam?",
        answer: "Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), PIX e carteiras digitais. No cartão, você pode parcelar em até 12x sem juros."
      },
      {
        question: "O pagamento é seguro?",
        answer: "Sim! Utilizamos criptografia SSL de 256 bits e nosso site possui certificado de segurança. Seus dados são protegidos e não armazenamos informações de cartão de crédito."
      },
      {
        question: "Posso parcelar minha compra?",
        answer: "Sim! Oferecemos parcelamento em até 12x sem juros no cartão de crédito para compras acima de R$ 100,00. O valor mínimo por parcela é de R$ 20,00."
      },
      {
        question: "Como funciona o pagamento por PIX?",
        answer: "Ao escolher PIX, você receberá um QR Code e um código de pagamento. O pagamento é confirmado instantaneamente e seu pedido é processado imediatamente. Além disso, você ganha 5% de desconto!"
      }
    ]
  },
  {
    id: "products",
    name: "Produtos",
    icon: Package,
    color: "from-purple-500 to-purple-600",
    questions: [
      {
        question: "Os produtos são originais?",
        answer: "Sim! Trabalhamos apenas com produtos 100% originais, adquiridos diretamente dos fabricantes ou distribuidores autorizados. Garantimos a autenticidade de todos os nossos produtos."
      },
      {
        question: "Como escolher o produto certo para minha pele?",
        answer: "Oferecemos um Quiz de Pele personalizado que analisa seu tipo de pele e necessidades. Também disponibilizamos consultoria gratuita com especialistas para ajudá-lo a encontrar os produtos ideais."
      },
      {
        question: "Os produtos têm validade longa?",
        answer: "Todos os produtos enviados têm validade mínima de 6 meses. Trabalhamos com estoque rotativo para garantir que você sempre receba produtos frescos."
      },
      {
        question: "Como armazenar os produtos corretamente?",
        answer: "Recomendamos armazenar os produtos em local fresco e seco, longe da luz solar direta. Alguns produtos específicos podem precisar de refrigeração - essa informação estará na embalagem."
      }
    ]
  },
  {
    id: "returns",
    name: "Trocas e Devoluções",
    icon: RefreshCcw,
    color: "from-orange-500 to-orange-600",
    questions: [
      {
        question: "Qual a política de trocas?",
        answer: "Você tem até 30 dias após o recebimento para solicitar troca ou devolução. O produto deve estar lacrado e na embalagem original. Para produtos com defeito, cobrimos os custos de envio."
      },
      {
        question: "Como solicitar uma troca ou devolução?",
        answer: "Entre em contato com nosso SAC pelo WhatsApp ou e-mail, informando o número do pedido e o motivo da troca/devolução. Nossa equipe irá orientá-lo sobre o processo."
      },
      {
        question: "Quanto tempo leva para receber o reembolso?",
        answer: "Após recebermos o produto de volta e confirmarmos as condições, o reembolso é processado em até 5 dias úteis. Para cartão de crédito, pode levar até 2 faturas para aparecer o estorno."
      },
      {
        question: "Posso trocar por outro produto de valor diferente?",
        answer: "Sim! Se o novo produto for de maior valor, você paga a diferença. Se for de menor valor, devolvemos a diferença como crédito na loja ou estorno."
      }
    ]
  },
  {
    id: "account",
    name: "Minha Conta",
    icon: Shield,
    color: "from-pink-500 to-pink-600",
    questions: [
      {
        question: "Como criar uma conta?",
        answer: "Você pode criar uma conta clicando em 'Entrar' no topo da página e depois em 'Criar Conta'. Também é possível criar durante o processo de compra ou usando sua conta Google."
      },
      {
        question: "Esqueci minha senha, o que fazer?",
        answer: "Clique em 'Entrar' e depois em 'Esqueci minha senha'. Você receberá um e-mail com instruções para redefinir sua senha. O link é válido por 24 horas."
      },
      {
        question: "Como alterar meus dados cadastrais?",
        answer: "Acesse 'Minha Conta' e clique em 'Dados Pessoais'. Lá você pode atualizar nome, e-mail, telefone e endereço. Algumas alterações podem exigir confirmação por e-mail."
      },
      {
        question: "Meus dados estão seguros?",
        answer: "Sim! Seguimos a LGPD (Lei Geral de Proteção de Dados) e utilizamos as melhores práticas de segurança. Seus dados nunca são compartilhados com terceiros sem sua autorização."
      }
    ]
  },
  {
    id: "support",
    name: "Atendimento",
    icon: HeadphonesIcon,
    color: "from-teal-500 to-teal-600",
    questions: [
      {
        question: "Qual o horário de atendimento?",
        answer: "Nosso atendimento funciona de segunda a sexta, das 9h às 18h, e aos sábados das 9h às 13h. Fora desses horários, você pode nos enviar uma mensagem que responderemos assim que possível."
      },
      {
        question: "Como entrar em contato?",
        answer: "Você pode nos contatar pelo WhatsApp (11) 99999-9999, e-mail contato@beautyessence.com.br, ou através do chat em nosso site. O tempo médio de resposta é de até 2 horas."
      },
      {
        question: "Vocês têm loja física?",
        answer: "Somos uma loja 100% online, o que nos permite oferecer preços mais competitivos. Mas não se preocupe, nossa equipe está sempre disponível para ajudá-lo remotamente!"
      },
      {
        question: "Posso agendar uma consultoria de beleza?",
        answer: "Sim! Oferecemos consultoria gratuita com especialistas em skincare. Você pode agendar pelo nosso site na página 'Consultoria' ou pelo WhatsApp."
      }
    ]
  }
];

const FAQAccordion = ({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) => (
  <motion.div
    initial={false}
    className="border-b border-border/50 last:border-0"
  >
    <button
      onClick={onToggle}
      className="w-full py-5 flex items-center justify-between text-left group"
    >
      <span className="font-medium text-foreground group-hover:text-primary transition-colors pr-4">
        {item.question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </motion.div>
    </button>
    
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-muted-foreground leading-relaxed">
            {item.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("shipping");
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter questions based on search
  const filteredCategories = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => 
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  const activeTab = filteredCategories.find(c => c.id === activeCategory) || filteredCategories[0];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Perguntas Frequentes (FAQ) | Multti Med Porto Alegre"
        description="Tire suas dúvidas sobre frete, pagamento, trocas e devoluções na Multti Med. Respostas rápidas para suas perguntas."
        canonical="/faq"
      />
      <MainHeader />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Central de Ajuda
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">
              Como podemos ajudar?
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Encontre respostas para as perguntas mais frequentes sobre nossos produtos, 
              entregas, pagamentos e muito mais.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por pergunta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg rounded-full border-2 border-primary/20 focus:border-primary shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-6xl mx-auto px-4">
          {searchQuery ? (
            // Search Results View
            <div className="space-y-8">
              <p className="text-muted-foreground">
                {filteredCategories.reduce((acc, c) => acc + c.questions.length, 0)} resultados encontrados para "{searchQuery}"
              </p>
              
              {filteredCategories.map(category => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl border border-border/50 overflow-hidden"
                >
                  <div className={`p-4 bg-gradient-to-r ${category.color} flex items-center gap-3`}>
                    <category.icon className="w-5 h-5 text-white" />
                    <h3 className="font-semibold text-white">{category.name}</h3>
                  </div>
                  <div className="p-6">
                    {category.questions.map((item, idx) => (
                      <FAQAccordion
                        key={idx}
                        item={item}
                        isOpen={openQuestions[`${category.id}-${idx}`] || false}
                        onToggle={() => toggleQuestion(`${category.id}-${idx}`)}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Category View
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Category Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-2">
                  <h3 className="font-semibold text-foreground mb-4 px-2">Categorias</h3>
                  {faqCategories.map((category) => {
                    const Icon = category.icon;
                    const isActive = category.id === activeCategory;
                    
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                          isActive 
                            ? 'bg-primary text-primary-foreground shadow-lg' 
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-muted'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm">{category.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Questions Panel */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {activeTab && (
                    <motion.div
                      key={activeTab.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm"
                    >
                      <div className={`p-6 bg-gradient-to-r ${activeTab.color} flex items-center gap-4`}>
                        <div className="p-3 bg-white/20 rounded-xl">
                          <activeTab.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-white">{activeTab.name}</h2>
                          <p className="text-white/80 text-sm">{activeTab.questions.length} perguntas</p>
                        </div>
                      </div>
                      
                      <div className="p-6 sm:p-8">
                        {activeTab.questions.map((item, idx) => (
                          <FAQAccordion
                            key={idx}
                            item={item}
                            isOpen={openQuestions[`${activeTab.id}-${idx}`] || false}
                            onToggle={() => toggleQuestion(`${activeTab.id}-${idx}`)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
                Ainda precisa de ajuda?
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Nossa equipe de especialistas está pronta para te ajudar. 
                Entre em contato pelo WhatsApp ou agende uma consultoria gratuita.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link to="/contato">
                    Enviar Mensagem
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
};

export default FAQ;
