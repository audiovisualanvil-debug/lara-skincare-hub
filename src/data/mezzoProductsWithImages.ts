// Imagens dos produtos Mezzo extraídas do catálogo oficial
import mellanWhiteXsome from "@/assets/products/mezzo/mellan-white-xsome.jpg";
import skinFillXsome from "@/assets/products/mezzo/skin-fill-xsome.jpg";
import maskXsomePdrn from "@/assets/products/mezzo/mask-xsome-pdrn.jpg";
import eyesXsome from "@/assets/products/mezzo/eyes-xsome.jpg";
import acneXsome from "@/assets/products/mezzo/acne-xsome.jpg";
import trichologyXsome from "@/assets/products/mezzo/trichology-xsome.jpg";
import lipoXsome from "@/assets/products/mezzo/lipo-xsome.jpg";
import skinCoverFps50 from "@/assets/products/mezzo/skin-cover-fps50.jpg";
import skinCoverColorFps50 from "@/assets/products/mezzo/skin-cover-color-fps50.jpg";
import fluidControlFps55 from "@/assets/products/mezzo/fluid-control-fps55.jpg";
import fluidAntiacneFps70 from "@/assets/products/mezzo/fluid-antiacne-fps70.jpg";
import maximaProtecaoFps99 from "@/assets/products/mezzo/maxima-protecao-fps99.jpg";
import whiteningFps80 from "@/assets/products/mezzo/whitening-fps80.jpg";
import creanSecFps40 from "@/assets/products/mezzo/crean-sec-fps40.jpg";
import shieldC12Fps80 from "@/assets/products/mezzo/shield-c12-fps80.jpg";
import bubblesGlassFps55 from "@/assets/products/mezzo/bubbles-glass-fps55.jpg";
import lipPreenchedor from "@/assets/products/mezzo/lip-preenchedor.jpg";
import lipGlow from "@/assets/products/mezzo/lip-glow.jpg";
import bLike from "@/assets/products/mezzo/b-like.jpg";
import preShampoo from "@/assets/products/mezzo/pre-shampoo.jpg";
import shampooAnticaspa from "@/assets/products/mezzo/shampoo-anticaspa.jpg";
import tonicoAntiquedas from "@/assets/products/mezzo/tonico-antiquedas.jpg";
import peelingCapilar from "@/assets/products/mezzo/peeling-capilar.jpg";
import hyaluronicSerumH9 from "@/assets/products/mezzo/hyaluronic-serum-h9.jpg";
import cicatrirepairPlus from "@/assets/products/mezzo/cicatrirepair-plus.jpg";
import mellanCorrector from "@/assets/products/mezzo/mellan-corrector.jpg";
import mellanRepair from "@/assets/products/mezzo/mellan-repair.jpg";
import locaoAntisseptica from "@/assets/products/mezzo/locao-antisseptica.jpg";
import acquaDefense from "@/assets/products/mezzo/acqua-defense.jpg";
import locaoEmoliente from "@/assets/products/mezzo/locao-emoliente.jpg";
import fluidoEmoliente from "@/assets/products/mezzo/fluido-emoliente.jpg";
import gelLimpezaAhas from "@/assets/products/mezzo/gel-limpeza-ahas.jpg";
import gelLimpezaFacial from "@/assets/products/mezzo/gel-limpeza-facial.jpg";
import pigmentControl from "@/assets/products/mezzo/pigment-control.jpg";
import foamInfusion from "@/assets/products/mezzo/foam-infusion.jpg";
import microdermoabrasaoScrubC from "@/assets/products/mezzo/microdermoabrasao-scrub-c.jpg";
import peelingOrganico from "@/assets/products/mezzo/peeling-organico.jpg";
import peelingEnzimatico from "@/assets/products/mezzo/peeling-enzimatico.jpg";
import peelingDetox from "@/assets/products/mezzo/peeling-detox.jpg";
import mascaraArgilaBranca from "@/assets/products/mezzo/mascara-argila-branca.jpg";
import maskCalmAntiStress from "@/assets/products/mezzo/mask-calm-anti-stress.jpg";
import hidraK from "@/assets/products/mezzo/hidra-k.jpg";
import glicolicoHyaluCa from "@/assets/products/mezzo/glicolico-hyalu-ca.jpg";
import tranexamicoC10 from "@/assets/products/mezzo/tranexamico-c10.jpg";
import salicilicoB3 from "@/assets/products/mezzo/salicilico-b3.jpg";
import peelingPha from "@/assets/products/mezzo/peeling-pha.jpg";
import mellanWhite from "@/assets/products/mezzo/mellan-white.jpg";
import gelLimpezaProfunda from "@/assets/products/mezzo/gel-limpeza-profunda.jpg";
import saboneteAntiAcne from "@/assets/products/mezzo/sabonete-anti-acne.jpg";
import locaoSecativa from "@/assets/products/mezzo/locao-secativa.jpg";
import acnediolNoite from "@/assets/products/mezzo/acnediol-noite.jpg";
import cremeDeslizanteDetox from "@/assets/products/mezzo/creme-deslizante-detox.jpg";
import mousseTermogenico from "@/assets/products/mezzo/mousse-termogenico.jpg";
import celluIntense from "@/assets/products/mezzo/cellu-intense.jpg";
import maternity from "@/assets/products/mezzo/maternity.jpg";
import lipoIntense from "@/assets/products/mezzo/lipo-intense.jpg";
import gelTermogenico from "@/assets/products/mezzo/gel-termogenico.jpg";
import omega3 from "@/assets/products/mezzo/omega-3.jpg";
import supercha from "@/assets/products/mezzo/supercha.jpg";
import collagenPro from "@/assets/products/mezzo/collagen-pro.jpg";
import gummieHair from "@/assets/products/mezzo/gummie-hair.jpg";
import caffeinePower from "@/assets/products/mezzo/caffeine-power.jpg";
import moroEvolution from "@/assets/products/mezzo/moro-evolution.jpg";
import exossomasSerum from "@/assets/products/mezzo/exossomas-serum.jpg";

export interface MezzoProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  description?: string;
  price: string;
  image: string;
  isProfessional?: boolean;
}

// ============================================
// LINHA EXOSSOMAS
// ============================================
export const mezzoExossomasWithImages: MezzoProduct[] = [
  {
    id: 1401,
    name: "Mella White Xsome | Sérum Multicorretivo Clareador",
    brand: "Mezzo",
    category: "exossomas",
    description: "Atua diretamente no clareamento da pele com tecnologia de Exossomas e PDRN. Uniformiza os diferentes tipos de manchas.",
    price: "R$ 399,00",
    image: mellanWhiteXsome,
    isProfessional: true,
  },
  {
    id: 1402,
    name: "Skin Fill Xsome | Concentrado Preenchedor",
    brand: "Mezzo",
    category: "exossomas",
    description: "Tecnologia Exossoma para modular produção de colágeno, otimizar hidratação e evitar manchas.",
    price: "R$ 323,00",
    image: skinFillXsome,
    isProfessional: true,
  },
  {
    id: 1404,
    name: "Mask Xsome PDRN | Tratamento Multi Regenerativo",
    brand: "Mezzo",
    category: "exossomas",
    description: "Tecnologia Exossoma + PDRN. Ação Detox purificante, hidratação 12h, correção multi-intensiva anti-envelhecimento.",
    price: "R$ 199,00",
    image: maskXsomePdrn,
    isProfessional: true,
  },
  {
    id: 1405,
    name: "Eyes Xsome | Concentrado Biomodulador PRO",
    brand: "Mezzo",
    category: "exossomas",
    description: "Lifting de pálpebras, rugas e olheiras. Trata olheiras e rugas periorbitais. Elevação da pálpebra caída.",
    price: "R$ 329,00",
    image: eyesXsome,
    isProfessional: true,
  },
  {
    id: 1407,
    name: "Acne Xsome | Therapy Anti Acne Sérum ON/OFF",
    brand: "Mezzo",
    category: "exossomas",
    description: "Eficácia comprovada no tratamento da acne e regeneração da pele. Tratamento 3 em 1: Antiacne, Microbiota e Regeneração.",
    price: "R$ 414,00",
    image: acneXsome,
    isProfessional: false,
  },
  {
    id: 1408,
    name: "Exossomas Sérum | Dermocosméticos",
    brand: "Mezzo",
    category: "exossomas",
    description: "Sérum com tecnologia de exossomas adaptativa. Bio-hackeia o processo natural de reparação do tecido.",
    price: "R$ 112,00",
    image: exossomasSerum,
    isProfessional: false,
  },
  {
    id: 1409,
    name: "Exosome Bioestimulador Concentrado | PRO",
    brand: "Mezzo",
    category: "exossomas",
    description: "Bioestimulador concentrado com tecnologia de exossomas para tratamentos profissionais intensivos.",
    price: "R$ 350,00",
    image: exossomasSerum,
    isProfessional: true,
  },
  {
    id: 1410,
    name: "Exosome Serum Regenerativo PRO",
    brand: "Mezzo",
    category: "exossomas",
    description: "Sérum regenerativo profissional com alta concentração de exossomas para reparação tecidual.",
    price: "R$ 280,00",
    image: exossomasSerum,
    isProfessional: true,
  },
  {
    id: 1411,
    name: "Skin Fill Xsome | Bioestimulador Fluido",
    brand: "Mezzo",
    category: "exossomas",
    description: "Tecnologia Exossoma + PDRN. Bioestimulador fluido que atua na modulação do colágeno e hidratação da pele.",
    price: "R$ 226,00",
    image: skinFillXsome,
    isProfessional: false,
  },
  {
    id: 1412,
    name: "Eyes Xsome | Fluido Biomodulador + PDRN",
    brand: "Mezzo",
    category: "exossomas",
    description: "Fluido para lifting de pálpebras, redução de bolsas e olheiras com tecnologia Exossomas.",
    price: "R$ 195,00",
    image: eyesXsome,
    isProfessional: false,
  },
  {
    id: 1413,
    name: "Acne Xsome | Sérum ON/OFF Oxidizing",
    brand: "Mezzo",
    category: "exossomas",
    description: "Ação pré e pós limpeza, regula sebáceas, controla inflamação e oleosidade com ação antimicrobiana.",
    price: "R$ 157,00",
    image: acneXsome,
    isProfessional: false,
  },
];

// ============================================
// LINHA TRICHOLOGY (CAPILAR)
// ============================================
export const mezzoCapilarWithImages: MezzoProduct[] = [
  {
    id: 1301,
    name: "Trichology Xsome | Concentrado Sensi Scalp Pro",
    brand: "Mezzo",
    category: "capilar",
    description: "Ação Age Revert, aumenta espessura dos fios, estimula crescimento, reequilibra microbiota do couro cabeludo.",
    price: "R$ 229,00",
    image: trichologyXsome,
    isProfessional: true,
  },
  {
    id: 1305,
    name: "Pré-Shampoo Antiquedas | Trichology",
    brand: "Mezzo",
    category: "capilar",
    description: "Atua diretamente na raiz do cabelo, permitindo maior nutrição e estímulo para o crescimento.",
    price: "R$ 125,00",
    image: preShampoo,
    isProfessional: false,
  },
  {
    id: 1307,
    name: "Shampoo Anticaspa | Trichology",
    brand: "Mezzo",
    category: "capilar",
    description: "Regula produção de sebo, equilibra resposta imuno-inflamatória, favorece eliminação da caspa.",
    price: "R$ 109,00",
    image: shampooAnticaspa,
    isProfessional: false,
  },
  {
    id: 1306,
    name: "Tônico Antiquedas | Trichology",
    brand: "Mezzo",
    category: "capilar",
    description: "Estimula células tronco do folículo piloso, estimula matriz celular, aumenta fixação de melanina.",
    price: "R$ 206,00",
    image: tonicoAntiquedas,
    isProfessional: false,
  },
  {
    id: 1304,
    name: "Peeling Capilar Prebiótico | Trichology",
    brand: "Mezzo",
    category: "capilar",
    description: "Previne e trata ao mesmo tempo, com ativos multifuncionais e prebióticos que reequilibram o couro cabeludo.",
    price: "R$ 116,00",
    image: peelingCapilar,
    isProfessional: true,
  },
  {
    id: 1308,
    name: "Shampoo Sensi Scalp Force | Trichology",
    brand: "Mezzo",
    category: "capilar",
    description: "Shampoo para couro cabeludo sensível, fortalece os fios e equilibra o microbioma capilar.",
    price: "R$ 129,00",
    image: shampooAnticaspa,
    isProfessional: false,
  },
  {
    id: 1309,
    name: "Trichology Xsome | Shampoo Antiqueda Forças",
    brand: "Mezzo",
    category: "capilar",
    description: "Shampoo para queda capilar, fortalecimento dos fios e modulação do couro cabeludo.",
    price: "R$ 129,00",
    image: trichologyXsome,
    isProfessional: false,
  },
  {
    id: 1310,
    name: "Trichology Xsome | Loção Antiqueda",
    brand: "Mezzo",
    category: "capilar",
    description: "Fortalece o aspecto e espessura dos fios, melhora a queda, reduz danos celulares do couro cabeludo.",
    price: "R$ 137,00",
    image: tonicoAntiquedas,
    isProfessional: false,
  },
];

// ============================================
// LINHA CORPORAL (LIPO)
// ============================================
export const mezzoCorpoWithImages: MezzoProduct[] = [
  {
    id: 1211,
    name: "Lipo Xsome | Concentrado Bioenergético",
    brand: "Mezzo",
    category: "corpo",
    description: "Tecnologia Exossoma para reduzir gordura e celulite, combate gordura localizada, melhora circulação.",
    price: "R$ 296,00",
    image: lipoXsome,
    isProfessional: true,
  },
  {
    id: 1204,
    name: "Cellu Intense | Creme Anticelulite",
    brand: "Mezzo",
    category: "corpo",
    description: "Creme anticelulite para redução de irregularidades e firmeza da pele.",
    price: "R$ 208,00",
    image: celluIntense,
    isProfessional: false,
  },
  {
    id: 1205,
    name: "Lipo Intense | Fluido Anticelulite",
    brand: "Mezzo",
    category: "corpo",
    description: "Estimula a quebra de gordura, combate formação de novas gorduras, ativa circulação.",
    price: "R$ 173,00",
    image: lipoIntense,
    isProfessional: false,
  },
  {
    id: 1207,
    name: "Gel Termogênico | Definição Corporal",
    brand: "Mezzo",
    category: "corpo",
    description: "Reduz medidas, promove hiperemia local, ação lipolítica, oxigenação do tecido.",
    price: "R$ 290,00",
    image: gelTermogenico,
    isProfessional: true,
  },
  {
    id: 1208,
    name: "Maternity | Creme de Massagem Gestante",
    brand: "Mezzo",
    category: "corpo",
    description: "Hidratação intensa para pré e pós gestação, previne estrias com ação firmante.",
    price: "R$ 171,00",
    image: maternity,
    isProfessional: false,
  },
  {
    id: 1210,
    name: "Creme Ultra Deslizante Detox | Massagem",
    brand: "Mezzo",
    category: "corpo",
    description: "Aumenta metabolismo celular, ação Detox, combate celulite, modela silhueta.",
    price: "R$ 182,00",
    image: cremeDeslizanteDetox,
    isProfessional: true,
  },
  {
    id: 1212,
    name: "Mousse de Massagem Termogênico",
    brand: "Mezzo",
    category: "corpo",
    description: "Redução de gordura localizada, redução de medidas e celulite.",
    price: "R$ 179,00",
    image: mousseTermogenico,
    isProfessional: true,
  },
  {
    id: 1213,
    name: "Redensify Body | Biomodulador Corporal",
    brand: "Mezzo",
    category: "corpo",
    description: "Biomodulador corporal para redensificação da pele, melhora da flacidez e contorno corporal.",
    price: "R$ 152,00",
    image: celluIntense,
    isProfessional: false,
  },
  {
    id: 1214,
    name: "Espuma Bioestimuladora de Glúteos",
    brand: "Mezzo",
    category: "corpo",
    description: "Espuma bioestimuladora para lifting e firmeza dos glúteos com efeito volumizador.",
    price: "R$ 133,00",
    image: mousseTermogenico,
    isProfessional: false,
  },
  {
    id: 1215,
    name: "Lipo Xsome | Fluido Redutor de Medidas",
    brand: "Mezzo",
    category: "corpo",
    description: "Tecnologia Exossoma para reduzir gordura e celulite, combate acúmulo de gordura com ação lipolítica.",
    price: "R$ 129,00",
    image: lipoXsome,
    isProfessional: false,
  },
];

// ============================================
// LINHA FOTOPROTETOR FOTOACTIVE
// ============================================
export const mezzoFotoprotetorWithImages: MezzoProduct[] = [
  {
    id: 1501,
    name: "Skin Cover FPS 50 | Alta Proteção",
    brand: "Mezzo",
    category: "fotoprotetor",
    description: "Sem absorção percutânea, indicado para pós-procedimentos imediato. Para todos os tipos de pele.",
    price: "R$ 168,00",
    image: skinCoverFps50,
    isProfessional: false,
  },
  {
    id: 1502,
    name: "Skin Cover Color FPS 50 | Tonalizante",
    brand: "Mezzo",
    category: "fotoprotetor",
    description: "Protetor com cor sem absorção cutânea, ideal para uso imediato pós procedimentos estéticos.",
    price: "R$ 142,00",
    image: skinCoverColorFps50,
    isProfessional: false,
  },
  {
    id: 1503,
    name: "Fluid Control FPS 55 | Anti Oleosidade",
    brand: "Mezzo",
    category: "fotoprotetor",
    description: "Eficácia no controle da oleosidade e dos poros dilatados. Resistente à água.",
    price: "R$ 140,00",
    image: fluidControlFps55,
    isProfessional: false,
  },
  {
    id: 1504,
    name: "Fluid Antiacne FPS 70 | Protetor Antiacne",
    brand: "Mezzo",
    category: "fotoprotetor",
    description: "Foto Protetor Anti-acne Fotoactive. De fácil aplicação e resistente à água.",
    price: "R$ 134,00",
    image: fluidAntiacneFps70,
    isProfessional: false,
  },
  {
    id: 1505,
    name: "Máxima Proteção FPS 99+ | Protetor Solar",
    brand: "Mezzo",
    category: "fotoprotetor",
    description: "Indicado para pele extremamente sensível a queimadura solar. Máxima proteção.",
    price: "R$ 141,00",
    image: maximaProtecaoFps99,
    isProfessional: false,
  },
  {
    id: 1506,
    name: "Whitening FPS 80 | Clareador Facial",
    brand: "Mezzo",
    category: "fotoprotetor",
    description: "Com ação clareadora, uniformiza o tom da pele e promove efeito matte.",
    price: "R$ 127,00",
    image: whiteningFps80,
    isProfessional: false,
  },
  {
    id: 1507,
    name: "Crean Sec FPS 40 | Proteção Solar",
    brand: "Mezzo",
    category: "fotoprotetor",
    description: "Ideal para prática de esportes, não escorre, possui toque seco e não deixa resíduos brancos.",
    price: "R$ 125,00",
    image: creanSecFps40,
    isProfessional: false,
  },
  {
    id: 1508,
    name: "Shield C12 FPS 80 | Antioxidante Protetor",
    brand: "Mezzo",
    category: "fotoprotetor",
    description: "Antioxidante protetor sem cor com Vitamina C. Testado dermatologicamente.",
    price: "R$ 125,00",
    image: shieldC12Fps80,
    isProfessional: false,
  },
  {
    id: 1509,
    name: "Bubbles Glass FPS 55 | Pó Compacto",
    brand: "Mezzo",
    category: "fotoprotetor",
    description: "Pó compacto Fotoactive. Hipoalergênico, oil free, sem perfume.",
    price: "Consultar",
    image: bubblesGlassFps55,
    isProfessional: false,
  },
];

// ============================================
// LINHA HOME CARE
// ============================================
export const mezzoHomeCareWithImages: MezzoProduct[] = [
  {
    id: 1601,
    name: "Lip Preenchedor | Efeito Plumping",
    brand: "Mezzo",
    category: "homecare",
    description: "Sérum facial preenchimento. Atua nas rugas periorbitais, nasolabiais, periorais e rugas do sorriso.",
    price: "R$ 133,00",
    image: lipPreenchedor,
    isProfessional: false,
  },
  {
    id: 1602,
    name: "Lip Glow | Hidratante Labial",
    brand: "Mezzo",
    category: "homecare",
    description: "Hidratante labial com efeito glow para lábios macios e brilhantes.",
    price: "R$ 70,00",
    image: lipGlow,
    isProfessional: false,
  },
  {
    id: 1603,
    name: "B.Like | Recarga de Longevidade",
    brand: "Mezzo",
    category: "homecare",
    description: "Recarga de longevidade para rejuvenescimento facial.",
    price: "R$ 197,00",
    image: bLike,
    isProfessional: false,
  },
  {
    id: 1604,
    name: "Hyaluronic Sérum Preenchedor H9",
    brand: "Mezzo",
    category: "homecare",
    description: "Sérum preenchedor com ácido hialurônico para hidratação profunda.",
    price: "R$ 172,00",
    image: hyaluronicSerumH9,
    isProfessional: false,
  },
  {
    id: 1605,
    name: "Cicatrirepair Plus | Multirreparador",
    brand: "Mezzo",
    category: "homecare",
    description: "Alto poder de regeneração e hidratação da pele com EGF, IGF e TGP-2.",
    price: "R$ 70,00",
    image: cicatrirepairPlus,
    isProfessional: false,
  },
  {
    id: 1606,
    name: "Mellan Corrector | Tripla Tecnologia Clareadora",
    brand: "Mezzo",
    category: "homecare",
    description: "Ácido Tranexâmico, Butilresorcinol e tecnologia clareadora para tratamento de manchas.",
    price: "R$ 210,00",
    image: mellanCorrector,
    isProfessional: false,
  },
  {
    id: 1607,
    name: "Mellan Repair | Regeneração Barreira Cutânea",
    brand: "Mezzo",
    category: "homecare",
    description: "Promove a regeneração da barreira cutânea estressada.",
    price: "R$ 163,00",
    image: mellanRepair,
    isProfessional: false,
  },
  {
    id: 1608,
    name: "Sérum Osmorregulador Lipossomado",
    brand: "Mezzo",
    category: "homecare",
    description: "Sérum com tecnologia lipossomada para regulação osmótica e hidratação profunda da pele.",
    price: "R$ 112,00",
    image: hyaluronicSerumH9,
    isProfessional: false,
  },
  {
    id: 1609,
    name: "Glyconol A | Máscara Iluminadora",
    brand: "Mezzo",
    category: "homecare",
    description: "Máscara com ácido glicólico para renovação celular e iluminação da pele.",
    price: "R$ 193,00",
    image: maskCalmAntiStress,
    isProfessional: false,
  },
];

// ============================================
// LINHA LIMPEZA DE PELE (CLEANSER)
// ============================================
export const mezzoLimpezaWithImages: MezzoProduct[] = [
  {
    id: 1701,
    name: "Loção Antisséptica | Facial, Corporal e Capilar",
    brand: "Mezzo",
    category: "limpeza",
    description: "Bactericida, bacteriostática, adstringente e ativa a microcirculação.",
    price: "R$ 129,00",
    image: locaoAntisseptica,
    isProfessional: true,
  },
  {
    id: 1702,
    name: "Acqua Defense | Água Antisséptica Dermatológica",
    brand: "Mezzo",
    category: "limpeza",
    description: "Fórmula inovadora com Clorexidina, Cobre e Prata Metálica.",
    price: "R$ 102,00",
    image: acquaDefense,
    isProfessional: true,
  },
  {
    id: 1703,
    name: "Loção Emoliente | Limpeza Profunda",
    brand: "Mezzo",
    category: "limpeza",
    description: "Potencializa o processo de extração durante a limpeza de pele.",
    price: "R$ 99,00",
    image: locaoEmoliente,
    isProfessional: true,
  },
  {
    id: 1704,
    name: "Fluido Emoliente | Emoliência Facial",
    brand: "Mezzo",
    category: "limpeza",
    description: "Produto multifuncional que proporciona emoliência sem causar danos à pele.",
    price: "R$ 98,00",
    image: fluidoEmoliente,
    isProfessional: true,
  },
  {
    id: 1705,
    name: "Gel de Limpeza AHA's | Facial",
    brand: "Mezzo",
    category: "limpeza",
    description: "Ácido glicólico, Ácido Lactobiônico, Glucolactona para limpeza profunda.",
    price: "R$ 125,00",
    image: gelLimpezaAhas,
    isProfessional: true,
  },
  {
    id: 1706,
    name: "Gel de Limpeza Facial | Antioxidante",
    brand: "Mezzo",
    category: "limpeza",
    description: "Ação antioxidante com Vitamina E para limpeza suave.",
    price: "R$ 153,00",
    image: gelLimpezaFacial,
    isProfessional: false,
  },
];

// ============================================
// LINHA INVERSE C (VITAMINA C)
// ============================================
export const mezzoVitaminaCWithImages: MezzoProduct[] = [
  {
    id: 1801,
    name: "Pigment Control | Sérum Iluminador Inverse C",
    brand: "Mezzo",
    category: "vitaminac",
    description: "Inibe a ação da tirosinase, previne hiperpigmentação pós-inflamatória e reduz manchas.",
    price: "R$ 199,00",
    image: pigmentControl,
    isProfessional: false,
  },
  {
    id: 1802,
    name: "Foam Infusion | Sabonete Facial Inverse C",
    brand: "Mezzo",
    category: "vitaminac",
    description: "Vitamina C 100% Glicoestável para limpeza e luminosidade.",
    price: "R$ 150,00",
    image: foamInfusion,
    isProfessional: false,
  },
  {
    id: 1803,
    name: "Microdermoabrasão Scrub C | Esfoliante",
    brand: "Mezzo",
    category: "vitaminac",
    description: "Esfoliante com vitamina C para renovação celular e luminosidade.",
    price: "R$ 174,00",
    image: microdermoabrasaoScrubC,
    isProfessional: false,
  },
  {
    id: 1804,
    name: "Vitamina C Pura 20% | Sérum Antioxidante",
    brand: "Mezzo",
    category: "vitaminac",
    description: "Sérum com 20% de vitamina C pura para máxima ação antioxidante e clareadora.",
    price: "R$ 185,00",
    image: pigmentControl,
    isProfessional: false,
  },
];

// ============================================
// LINHA ESFOLIAÇÃO
// ============================================
export const mezzoEsfoliacaoWithImages: MezzoProduct[] = [
  {
    id: 1901,
    name: "Peeling Orgânico Powder | Biotecnologia Enzimática",
    brand: "Mezzo",
    category: "esfoliacao",
    description: "Renovação celular enzimática, luminosidade imediata, efeito mate, hidratação.",
    price: "R$ 288,00",
    image: peelingOrganico,
    isProfessional: true,
  },
  {
    id: 1902,
    name: "Peeling Enzimático | Máscara Esfoliante",
    brand: "Mezzo",
    category: "esfoliacao",
    description: "Complexo enzimático com propriedades antioxidantes e emolientes.",
    price: "R$ 68,00",
    image: peelingEnzimatico,
    isProfessional: true,
  },
  {
    id: 1903,
    name: "Peeling Detox | Esfoliante Facial Antipoluição",
    brand: "Mezzo",
    category: "esfoliacao",
    description: "Com microgrânulos tecnológicos para esfoliação detox.",
    price: "Consultar",
    image: peelingDetox,
    isProfessional: true,
  },
];

// ============================================
// LINHA MÁSCARAS
// ============================================
export const mezzoMascarasWithImages: MezzoProduct[] = [
  {
    id: 2001,
    name: "Máscara de Argila Branca | Iluminadora",
    brand: "Mezzo",
    category: "mascaras",
    description: "Ação clareadora e revitalizante. Formulada com 5 minerais que retém umidade na pele.",
    price: "R$ 171,00",
    image: mascaraArgilaBranca,
    isProfessional: true,
  },
  {
    id: 2002,
    name: "Mask Calm Anti Stress | Calmante",
    brand: "Mezzo",
    category: "mascaras",
    description: "Acalma e suaviza a vermelhidão. Indicada para todos os tipos de pele.",
    price: "R$ 108,00",
    image: maskCalmAntiStress,
    isProfessional: true,
  },
  {
    id: 2003,
    name: "Mask Infusion | Tratamento Intensivo PRO",
    brand: "Mezzo",
    category: "mascaras",
    description: "Máscara de tratamento intensivo profissional para hidratação e regeneração da pele.",
    price: "R$ 165,00",
    image: maskXsomePdrn,
    isProfessional: true,
  },
];

// ============================================
// LINHA HIDRATAÇÃO
// ============================================
export const mezzoHidratacaoWithImages: MezzoProduct[] = [
  {
    id: 2101,
    name: "Hidra K | Fluido Hidratante Osmorregulador",
    brand: "Mezzo",
    category: "hidratacao",
    description: "Regula o fluxo de água dentro e fora das células. Hidratação intensa 24h.",
    price: "R$ 99,00",
    image: hidraK,
    isProfessional: false,
  },
];

// ============================================
// LINHA PEELING ÁCIDOS
// ============================================
export const mezzoPeelingWithImages: MezzoProduct[] = [
  {
    id: 2201,
    name: "Glicólico Hyalu+ CA | Peeling Rejuvenescedor",
    brand: "Mezzo",
    category: "peeling",
    description: "Combinação de ácido glicólico, ácido hialurônico de baixo peso molecular e cálcio.",
    price: "R$ 157,00",
    image: glicolicoHyaluCa,
    isProfessional: true,
  },
  {
    id: 2202,
    name: "Tranexâmico C 10 | Peeling Clareador",
    brand: "Mezzo",
    category: "peeling",
    description: "Peeling clareador e iluminador com ácido tranexâmico.",
    price: "R$ 157,00",
    image: tranexamicoC10,
    isProfessional: true,
  },
  {
    id: 2203,
    name: "Salicílico B3 | Peeling Anti-Acne",
    brand: "Mezzo",
    category: "peeling",
    description: "Peeling renovador anti-acne com ácido salicílico.",
    price: "R$ 157,00",
    image: salicilicoB3,
    isProfessional: true,
  },
  {
    id: 2204,
    name: "Peeling PHA | Esfoliante Químico B-Ocean",
    brand: "Mezzo",
    category: "peeling",
    description: "Gluconolactona com alfa-hidroxiácido mandélico para esfoliação química suave.",
    price: "R$ 132,00",
    image: peelingPha,
    isProfessional: true,
  },
  {
    id: 2205,
    name: "Mellan White | Sérum Multicorretivo",
    brand: "Mezzo",
    category: "peeling",
    description: "Reduz manchas, perfeito para tratar melasma. Resultado em 4 semanas.",
    price: "R$ 399,00",
    image: mellanWhite,
    isProfessional: false,
  },
];

// ============================================
// LINHA ACNEDIOL (TRATAMENTO ACNE)
// ============================================
export const mezzoAcnediolWithImages: MezzoProduct[] = [
  {
    id: 2301,
    name: "Gel de Limpeza Profunda Concentrado | Acnediol",
    brand: "Mezzo",
    category: "acnediol",
    description: "Contém ácido salicílico, glicólico e niacinamida para peles oleosas e acneicas.",
    price: "R$ 146,00",
    image: gelLimpezaProfunda,
    isProfessional: false,
  },
  {
    id: 2302,
    name: "Sabonete Anti-Acne | Acnediol",
    brand: "Mezzo",
    category: "acnediol",
    description: "Gel de limpeza pós-biótico, controla oleosidade, previne acne, auxilia nos poros dilatados.",
    price: "R$ 125,00",
    image: saboneteAntiAcne,
    isProfessional: false,
  },
  {
    id: 2303,
    name: "Loção Secativa Tonalizante FPS 40 | Acnediol",
    brand: "Mezzo",
    category: "acnediol",
    description: "Sabonete vegetal com ação anti-acne e proteção solar.",
    price: "R$ 39,00",
    image: locaoSecativa,
    isProfessional: false,
  },
  {
    id: 2304,
    name: "Acnediol Noite | Sérum Anti-imperfeições",
    brand: "Mezzo",
    category: "acnediol",
    description: "Auxilia na melhora das imperfeições e relevo cutâneo irregular.",
    price: "R$ 159,00",
    image: acnediolNoite,
    isProfessional: false,
  },
  {
    id: 2305,
    name: "Acnediol Dia FPS 30 | Proteção Antiacne",
    brand: "Mezzo",
    category: "acnediol",
    description: "Proteção solar com ação antiacne, controla oleosidade durante o dia.",
    price: "R$ 145,00",
    image: fluidAntiacneFps70,
    isProfessional: false,
  },
];

// ============================================
// LINHA NUTRACÊUTICOS (BIOHACKING)
// ============================================
export const mezzoNutraceuticosWithImages: MezzoProduct[] = [
  {
    id: 2401,
    name: "Ômega 3 | Anti-inflamatório Natural",
    brand: "Mezzo",
    category: "nutraceuticos",
    description: "Um dos mais potentes anti-inflamatórios. 1000mg de EPA e DHA por cápsula com selo MEG-3®.",
    price: "R$ 117,00",
    image: omega3,
    isProfessional: false,
  },
  {
    id: 2402,
    name: "Superchá | Detox e Metabolismo",
    brand: "Mezzo",
    category: "nutraceuticos",
    description: "Detoxificação, imunidade e aumento metabólico. Alto potencial antioxidante e drenante.",
    price: "R$ 103,00",
    image: supercha,
    isProfessional: false,
  },
  {
    id: 2403,
    name: "Collagen Pro | Construtor de Colágeno",
    brand: "Mezzo",
    category: "nutraceuticos",
    description: "Fórmula construtora de colágeno com ativos que favorecem o organismo.",
    price: "R$ 165,00",
    image: collagenPro,
    isProfessional: false,
  },
  {
    id: 2404,
    name: "Gummie Hair | Fortalecimento Capilar",
    brand: "Mezzo",
    category: "nutraceuticos",
    description: "Blend de vitaminas e minerais para tratamento de queda e fortalecimento capilar.",
    price: "R$ 99,00",
    image: gummieHair,
    isProfessional: false,
  },
  {
    id: 2405,
    name: "Caffeine Power | Time Release",
    brand: "Mezzo",
    category: "nutraceuticos",
    description: "Cafeína natural com Taurina, Vitamina B3 e Cromo. Liberação lenta por até 6 horas.",
    price: "R$ 109,00",
    image: caffeinePower,
    isProfessional: false,
  },
  {
    id: 2406,
    name: "Moro Evolution | Redução de Gordura",
    brand: "Mezzo",
    category: "nutraceuticos",
    description: "Gerenciamento de peso com Morosil, Picnogenol e Carnitina para redução de gordura abdominal.",
    price: "R$ 94,00",
    image: moroEvolution,
    isProfessional: false,
  },
  {
    id: 2407,
    name: "Aminoprotein | Aminoácidos Essenciais",
    brand: "Mezzo",
    category: "nutraceuticos",
    description: "Blend de aminoácidos essenciais para recuperação muscular, fortalecimento e regeneração tecidual.",
    price: "R$ 210,00",
    image: collagenPro,
    isProfessional: false,
  },
];

// ============================================
// LINHA LANÇAMENTOS / ÁGUA DERMATOLÓGICA
// ============================================
export const mezzoLancamentosWithImages: MezzoProduct[] = [
  {
    id: 2501,
    name: "Água Dermatológica Bio Inteligente",
    brand: "Mezzo",
    category: "lancamentos",
    description: "Skincare do futuro com 1,5 bilhões de exossomas. Biotecnologia adaptativa que bio-hackeia a reparação do tecido. Hidratação 4D em 4 níveis.",
    price: "R$ 112,00",
    image: exossomasSerum,
    isProfessional: false,
  },
];

// ============================================
// TODOS OS PRODUTOS MEZZO COM IMAGENS
// ============================================
export const allMezzoWithImages: MezzoProduct[] = [
  ...mezzoExossomasWithImages,
  ...mezzoCapilarWithImages,
  ...mezzoCorpoWithImages,
  ...mezzoFotoprotetorWithImages,
  ...mezzoHomeCareWithImages,
  ...mezzoLimpezaWithImages,
  ...mezzoVitaminaCWithImages,
  ...mezzoEsfoliacaoWithImages,
  ...mezzoMascarasWithImages,
  ...mezzoHidratacaoWithImages,
  ...mezzoPeelingWithImages,
  ...mezzoAcnediolWithImages,
  ...mezzoNutraceuticosWithImages,
  ...mezzoLancamentosWithImages,
];
