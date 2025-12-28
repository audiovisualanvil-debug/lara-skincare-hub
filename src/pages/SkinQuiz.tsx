import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";

interface QuizOption {
  id: string;
  text: string;
  points: {
    oleosa: number;
    seca: number;
    mista: number;
    normal: number;
    sensivel: number;
  };
}

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Ao acordar, como sua pele geralmente está?",
    options: [
      { 
        id: "1a", 
        text: "Muito oleosa, principalmente na zona T (testa, nariz e queixo)", 
        points: { oleosa: 3, seca: 0, mista: 1, normal: 0, sensivel: 0 } 
      },
      { 
        id: "1b", 
        text: "Seca, repuxando e às vezes descamando", 
        points: { oleosa: 0, seca: 3, mista: 0, normal: 0, sensivel: 1 } 
      },
      { 
        id: "1c", 
        text: "Oleosa na zona T, mas normal nas bochechas", 
        points: { oleosa: 1, seca: 0, mista: 3, normal: 0, sensivel: 0 } 
      },
      { 
        id: "1d", 
        text: "Equilibrada, sem excesso de oleosidade ou ressecamento", 
        points: { oleosa: 0, seca: 0, mista: 0, normal: 3, sensivel: 0 } 
      },
    ],
  },
  {
    id: 2,
    question: "Como sua pele reage a novos produtos?",
    options: [
      { 
        id: "2a", 
        text: "Fica mais oleosa e pode aparecer acne", 
        points: { oleosa: 3, seca: 0, mista: 1, normal: 0, sensivel: 0 } 
      },
      { 
        id: "2b", 
        text: "Fica irritada, vermelha ou coça", 
        points: { oleosa: 0, seca: 1, mista: 0, normal: 0, sensivel: 3 } 
      },
      { 
        id: "2c", 
        text: "Depende do produto, algumas áreas reagem diferente", 
        points: { oleosa: 0, seca: 0, mista: 3, normal: 0, sensivel: 1 } 
      },
      { 
        id: "2d", 
        text: "Geralmente aceita bem, sem reações", 
        points: { oleosa: 0, seca: 0, mista: 0, normal: 3, sensivel: 0 } 
      },
    ],
  },
  {
    id: 3,
    question: "Como estão seus poros?",
    options: [
      { 
        id: "3a", 
        text: "Bem visíveis e dilatados, especialmente no nariz", 
        points: { oleosa: 3, seca: 0, mista: 2, normal: 0, sensivel: 0 } 
      },
      { 
        id: "3b", 
        text: "Praticamente invisíveis, pele lisa", 
        points: { oleosa: 0, seca: 3, mista: 0, normal: 1, sensivel: 1 } 
      },
      { 
        id: "3c", 
        text: "Visíveis na zona T, menores nas bochechas", 
        points: { oleosa: 1, seca: 0, mista: 3, normal: 0, sensivel: 0 } 
      },
      { 
        id: "3d", 
        text: "Pequenos e uniformes por todo o rosto", 
        points: { oleosa: 0, seca: 0, mista: 0, normal: 3, sensivel: 0 } 
      },
    ],
  },
  {
    id: 4,
    question: "Você costuma ter acne ou cravos?",
    options: [
      { 
        id: "4a", 
        text: "Sim, frequentemente tenho espinhas e cravos", 
        points: { oleosa: 3, seca: 0, mista: 1, normal: 0, sensivel: 0 } 
      },
      { 
        id: "4b", 
        text: "Raramente, minha pele é mais seca", 
        points: { oleosa: 0, seca: 3, mista: 0, normal: 1, sensivel: 0 } 
      },
      { 
        id: "4c", 
        text: "Às vezes na zona T, principalmente", 
        points: { oleosa: 1, seca: 0, mista: 3, normal: 0, sensivel: 0 } 
      },
      { 
        id: "4d", 
        text: "Ocasionalmente, sem padrão específico", 
        points: { oleosa: 0, seca: 0, mista: 1, normal: 2, sensivel: 1 } 
      },
    ],
  },
  {
    id: 5,
    question: "Como sua pele fica ao longo do dia?",
    options: [
      { 
        id: "5a", 
        text: "Muito brilhante depois de poucas horas", 
        points: { oleosa: 3, seca: 0, mista: 1, normal: 0, sensivel: 0 } 
      },
      { 
        id: "5b", 
        text: "Fica cada vez mais seca e desconfortável", 
        points: { oleosa: 0, seca: 3, mista: 0, normal: 0, sensivel: 1 } 
      },
      { 
        id: "5c", 
        text: "A zona T fica brilhante, resto fica ok", 
        points: { oleosa: 1, seca: 0, mista: 3, normal: 0, sensivel: 0 } 
      },
      { 
        id: "5d", 
        text: "Mantém-se confortável e equilibrada", 
        points: { oleosa: 0, seca: 0, mista: 0, normal: 3, sensivel: 0 } 
      },
    ],
  },
  {
    id: 6,
    question: "Sua pele apresenta vermelhidão com frequência?",
    options: [
      { 
        id: "6a", 
        text: "Não, mas tem áreas de brilho excessivo", 
        points: { oleosa: 2, seca: 0, mista: 1, normal: 0, sensivel: 0 } 
      },
      { 
        id: "6b", 
        text: "Sim, é comum ter áreas avermelhadas e irritadas", 
        points: { oleosa: 0, seca: 1, mista: 0, normal: 0, sensivel: 3 } 
      },
      { 
        id: "6c", 
        text: "Às vezes, dependendo do clima ou produtos", 
        points: { oleosa: 0, seca: 0, mista: 1, normal: 1, sensivel: 2 } 
      },
      { 
        id: "6d", 
        text: "Raramente, minha pele é tranquila", 
        points: { oleosa: 0, seca: 0, mista: 0, normal: 3, sensivel: 0 } 
      },
    ],
  },
  {
    id: 7,
    question: "Como sua pele reage ao sol?",
    options: [
      { 
        id: "7a", 
        text: "Fica ainda mais oleosa e brilhante", 
        points: { oleosa: 3, seca: 0, mista: 1, normal: 0, sensivel: 0 } 
      },
      { 
        id: "7b", 
        text: "Resseca muito e pode descascar", 
        points: { oleosa: 0, seca: 3, mista: 0, normal: 0, sensivel: 1 } 
      },
      { 
        id: "7c", 
        text: "Fica vermelha e queima facilmente", 
        points: { oleosa: 0, seca: 1, mista: 0, normal: 0, sensivel: 3 } 
      },
      { 
        id: "7d", 
        text: "Bronze bem, sem grandes problemas", 
        points: { oleosa: 0, seca: 0, mista: 1, normal: 3, sensivel: 0 } 
      },
    ],
  },
];

interface SkinTypeResult {
  type: string;
  slug: string;
  title: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
  categories: string[];
}

const skinTypeResults: Record<string, SkinTypeResult> = {
  oleosa: {
    type: "oleosa",
    slug: "oleosa",
    title: "Pele Oleosa",
    description: "Sua pele produz sebo em excesso, resultando em brilho excessivo e poros dilatados. É comum ter cravos e espinhas com frequência.",
    characteristics: [
      "Brilho excessivo, especialmente na zona T",
      "Poros dilatados e visíveis",
      "Tendência a acne e cravos",
      "Maquiagem tende a 'derreter' durante o dia",
    ],
    recommendations: [
      "Use sabonetes gel ou espuma de limpeza",
      "Escolha hidratantes oil-free ou em gel",
      "Aplique tônicos adstringentes",
      "Use protetor solar com toque seco",
    ],
    categories: ["acne-oleosidade", "antioleosidade"],
  },
  seca: {
    type: "seca",
    slug: "seca",
    title: "Pele Seca",
    description: "Sua pele tem baixa produção de sebo, causando sensação de repuxamento e descamação. Precisa de hidratação intensiva.",
    characteristics: [
      "Sensação de repuxamento constante",
      "Descamação em algumas áreas",
      "Poros quase invisíveis",
      "Linhas finas mais aparentes",
    ],
    recommendations: [
      "Use sabonetes cremosos e suaves",
      "Invista em hidratantes ricos e nutritivos",
      "Aplique séruns com ácido hialurônico",
      "Use protetor solar com fórmula hidratante",
    ],
    categories: ["hidratacao-reparacao", "hidratacao"],
  },
  mista: {
    type: "mista",
    slug: "mista",
    title: "Pele Mista",
    description: "Sua pele combina características de pele oleosa na zona T (testa, nariz e queixo) com áreas normais ou secas nas bochechas.",
    characteristics: [
      "Zona T oleosa e brilhante",
      "Bochechas normais ou secas",
      "Poros dilatados apenas na zona T",
      "Pode ter cravos no nariz e testa",
    ],
    recommendations: [
      "Use produtos específicos para pele mista",
      "Aplique hidratante mais leve na zona T",
      "Use máscara de argila na zona T semanalmente",
      "Escolha protetor solar com acabamento matte",
    ],
    categories: ["acne-oleosidade", "hidratacao"],
  },
  normal: {
    type: "normal",
    slug: "normal",
    title: "Pele Normal",
    description: "Parabéns! Sua pele é equilibrada, com boa hidratação natural e poucos problemas. O foco deve ser manter esse equilíbrio.",
    characteristics: [
      "Textura uniforme e suave",
      "Poros pequenos e pouco visíveis",
      "Boa elasticidade",
      "Sem excesso de oleosidade ou ressecamento",
    ],
    recommendations: [
      "Mantenha uma rotina de cuidados básica",
      "Use hidratante leve diariamente",
      "Não esqueça do protetor solar",
      "Invista em anti-idade preventivo",
    ],
    categories: ["hidratacao", "anti-idade"],
  },
  sensivel: {
    type: "sensivel",
    slug: "sensivel",
    title: "Pele Sensível",
    description: "Sua pele é reativa e se irrita facilmente com produtos, clima ou toque. Precisa de cuidados especiais com fórmulas suaves.",
    characteristics: [
      "Fica vermelha com facilidade",
      "Reage a muitos produtos",
      "Sensação de ardor ou coceira",
      "Pode ter rosácea ou dermatite",
    ],
    recommendations: [
      "Escolha produtos hipoalergênicos",
      "Evite fragrâncias e corantes",
      "Use água termal para acalmar",
      "Teste produtos novos no pulso primeiro",
    ],
    categories: ["peles-sensiveis", "hidratacao-reparacao"],
  },
};

const SkinQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<SkinTypeResult | null>(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const calculateResult = () => {
    const scores = { oleosa: 0, seca: 0, mista: 0, normal: 0, sensivel: 0 };

    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = quizQuestions.find(q => q.id === parseInt(questionId));
      const option = question?.options.find(o => o.id === answerId);
      if (option) {
        scores.oleosa += option.points.oleosa;
        scores.seca += option.points.seca;
        scores.mista += option.points.mista;
        scores.normal += option.points.normal;
        scores.sensivel += option.points.sensivel;
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const skinType = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || "normal";
    
    return skinTypeResults[skinType];
  };

  const handleAnswer = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [quizQuestions[currentQuestion].id]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const skinResult = calculateResult();
      setResult(skinResult);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const handleViewProducts = () => {
    if (result) {
      navigate(`/loja?tipo-pele=${result.slug}`);
    }
  };

  const currentAnswer = answers[quizQuestions[currentQuestion]?.id];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      
      <main className="flex-1 pt-32 md:pt-40 pb-24">
        <div className="container max-w-2xl">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="text-center space-y-4">
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                    Quiz: Descubra seu Tipo de Pele
                  </h1>
                  <p className="text-muted-foreground">
                    Responda {quizQuestions.length} perguntas rápidas e receba recomendações personalizadas
                  </p>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Question */}
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                    {quizQuestions[currentQuestion].question}
                  </h2>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(option.id)}
                        className={`
                          w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                          ${currentAnswer === option.id 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                          }
                        `}
                      >
                        <span className="font-medium text-foreground">{option.text}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!currentAnswer}
                    className="gap-2"
                  >
                    {currentQuestion === quizQuestions.length - 1 ? 'Ver Resultado' : 'Próxima'}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Result Header */}
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                    {result?.title}
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                    {result?.description}
                  </p>
                </div>

                {/* Characteristics */}
                <div className="bg-secondary/50 rounded-2xl p-6 space-y-4">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Características da sua pele:
                  </h3>
                  <ul className="space-y-2">
                    {result?.characteristics.map((char, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-foreground">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="bg-primary/5 rounded-2xl p-6 space-y-4 border border-primary/20">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Nossas recomendações:
                  </h3>
                  <ul className="space-y-2">
                    {result?.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onClick={handleViewProducts}
                    className="flex-1 h-12 gap-2"
                    size="lg"
                  >
                    Ver Produtos Recomendados
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRestart}
                    className="gap-2"
                    size="lg"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Refazer Quiz
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default SkinQuiz;
