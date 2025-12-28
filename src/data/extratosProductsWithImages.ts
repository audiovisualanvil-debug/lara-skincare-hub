import { Product } from "@/components/shop/ProductCard";

// ============================================
// IMAGENS DOS PRODUTOS EXTRATOS DA TERRA
// Extraídas dos catálogos oficiais 2025
// ============================================

// Importações das imagens
import hydraVitCSabonete from "@/assets/products/extratos/hydra-vit-c-sabonete.jpg";
import hydraVitCHidratante from "@/assets/products/extratos/hydra-vit-c-hidratante.jpg";
import serumVitC from "@/assets/products/extratos/serum-vit-c.jpg";
import saboneteNiacinamida from "@/assets/products/extratos/sabonete-niacinamida.jpg";
import serumNiacinamida from "@/assets/products/extratos/serum-niacinamida.jpg";
import exoIntenseSerum from "@/assets/products/extratos/exo-intense-serum.jpg";
import aguaMicelar from "@/assets/products/extratos/agua-micelar.jpg";
import saboneteDermopurificante from "@/assets/products/extratos/sabonete-dermopurificante.jpg";
import reverseAH10 from "@/assets/products/extratos/reverse-ah10.jpg";
import preenchedorPontualAH from "@/assets/products/extratos/preenchedor-pontual-ah.jpg";
import espumaGlycoacid from "@/assets/products/extratos/espuma-glycoacid.jpg";
import glucoSabonete from "@/assets/products/extratos/gluco-sabonete.jpg";
import saboneteDetoxificante from "@/assets/products/extratos/sabonete-detoxificante.jpg";
import emulsaoAquaface from "@/assets/products/extratos/emulsao-aquaface.jpg";
import saboneteAquaface from "@/assets/products/extratos/sabonete-aquaface.jpg";
import peelingFitomineral from "@/assets/products/extratos/peeling-fitomineral.jpg";
import esfolianteAquaface from "@/assets/products/extratos/esfoliante-aquaface.jpg";
import lipPreenchedorAH from "@/assets/products/extratos/lip-preenchedor-ah.jpg";
import hydraFace from "@/assets/products/extratos/hydra-face.jpg";
import sabonetePelesSensiveis from "@/assets/products/extratos/sabonete-peles-sensiveis.jpg";
import hidratantePelesSensiveis from "@/assets/products/extratos/hidratante-peles-sensiveis.jpg";
import espumaClareadora from "@/assets/products/extratos/espuma-clareadora.jpg";
import mSolution from "@/assets/products/extratos/m-solution.jpg";
import nanospotClareador from "@/assets/products/extratos/nanospot-clareador.jpg";
import tonalizanteNiacinamida from "@/assets/products/extratos/tonalizante-niacinamida.jpg";
import saboneteRefrescante from "@/assets/products/extratos/sabonete-refrescante.jpg";
import gelCremeAntioleosidade from "@/assets/products/extratos/gel-creme-antioleosidade.jpg";
import poMultiprotetor from "@/assets/products/extratos/po-multiprotetor.jpg";
import kitAntioleosidade from "@/assets/products/extratos/kit-antioleosidade.jpg";
import espumaDetox from "@/assets/products/extratos/espuma-detox.jpg";
import serumMultisolucao from "@/assets/products/extratos/serum-multisolucao.jpg";
import serumSecativo from "@/assets/products/extratos/serum-secativo.jpg";
import fotoprotetorFps20 from "@/assets/products/extratos/fotoprotetor-fps20.jpg";
import fotoprotetorFps30 from "@/assets/products/extratos/fotoprotetor-fps30.jpg";
import fotoprotetorFps50 from "@/assets/products/extratos/fotoprotetor-fps50.jpg";
import tonicoEqualizador from "@/assets/products/extratos/tonico-equalizador.jpg";
import mascaraAntioleosidade from "@/assets/products/extratos/mascara-antioleosidade.jpg";
import serumEquilibrioTotal from "@/assets/products/extratos/serum-equilibrio-total.jpg";
import tranexPeel from "@/assets/products/extratos/tranex-peel.jpg";
import melanTBlock from "@/assets/products/extratos/melan-t-block.jpg";
import mascaraBioiluminadora from "@/assets/products/extratos/mascara-bioiluminadora.jpg";

// ============================================
// PRODUTOS EXTRATOS DA TERRA - VITAMINA C
// ============================================

export const extratosVitaminaC: Product[] = [
  {
    id: 4001,
    name: "Hydra Vit C Sabonete",
    brand: "Extratos da Terra",
    category: "vitamina-c",
    isProfessional: false,
    description: "2 em 1: sabonete e tônico. Limpa sem ressecar e ilumina a pele com ação antioxidante",
    price: "R$ 62,00",
    image: hydraVitCSabonete,
  },
  {
    id: 4002,
    name: "Hydra Vit C Hidratante Facial",
    brand: "Extratos da Terra",
    category: "vitamina-c",
    isProfessional: false,
    description: "Hidratação de 72h com vitamina C. Ilumina e mantém a elasticidade da pele",
    price: "R$ 79,00",
    image: hydraVitCHidratante,
  },
  {
    id: 4003,
    name: "Sérum Vit C",
    brand: "Extratos da Terra",
    category: "vitamina-c",
    isProfessional: false,
    description: "Reduz rugas e linhas de expressão, deixa a pele visivelmente mais iluminada e uniforme",
    price: "R$ 167,00",
    image: serumVitC,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - NIACINAMIDA
// ============================================

export const extratosNiacinamida: Product[] = [
  {
    id: 4101,
    name: "Sabonete Niacinamida Facial",
    brand: "Extratos da Terra",
    category: "niacinamida",
    isProfessional: false,
    description: "Limpa, equilibra a hidratação, controla oleosidade sem ressecar",
    price: "R$ 79,00",
    image: saboneteNiacinamida,
  },
  {
    id: 4102,
    name: "Sérum Niacinamida 10% & Booster Noturno",
    brand: "Extratos da Terra",
    category: "niacinamida",
    isProfessional: false,
    description: "Melhora textura, renova a pele, controla oleosidade e uniformiza o tom",
    price: "R$ 129,00",
    image: serumNiacinamida,
  },
  {
    id: 4103,
    name: "Tonalizante com Niacinamida FPS 50",
    brand: "Extratos da Terra",
    category: "niacinamida",
    isProfessional: false,
    description: "FPS 50 que trata e protege. Uniformiza tom, efeito blur e toque seco",
    price: "R$ 125,00",
    image: tonalizanteNiacinamida,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - EXO INTENSE
// ============================================

export const extratosExoIntense: Product[] = [
  {
    id: 4201,
    name: "EXO Intense Sérum Potencializador",
    brand: "Extratos da Terra",
    category: "exossomas",
    isProfessional: false,
    description: "Potencializador com exossomas e fator de crescimento TGFβ3. Multifuncional para anti-idade, clareadores e antiacne",
    price: "R$ 169,00",
    image: exoIntenseSerum,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - HIGIENIZAÇÃO
// ============================================

export const extratosHigienizacaoComImagem: Product[] = [
  {
    id: 4301,
    name: "Água Micelar Facial",
    brand: "Extratos da Terra",
    category: "higienizacao",
    isProfessional: false,
    description: "Nutre a pele, antioxidante e detox. Evita ressecamento e mantém hidratação natural",
    price: "R$ 57,00",
    image: aguaMicelar,
  },
  {
    id: 4302,
    name: "Sabonete Dermopurificante",
    brand: "Extratos da Terra",
    category: "higienizacao",
    isProfessional: false,
    description: "Limpeza intensa com ação hidratante. Espuma cremosa que não irrita a pele",
    price: "R$ 79,00",
    image: saboneteDermopurificante,
  },
  {
    id: 4303,
    name: "Espuma de Limpeza GlycoAcid Pré-Peel",
    brand: "Extratos da Terra",
    category: "higienizacao",
    isProfessional: true,
    description: "10% ácido glicólico + vitamina C + niacinamida. Esfoliação química e renovação celular",
    price: "Consultar",
    image: espumaGlycoacid,
  },
  {
    id: 4304,
    name: "Gluco+ Sabonete Facial",
    brand: "Extratos da Terra",
    category: "higienizacao",
    isProfessional: false,
    description: "1° sabonete anti-idade com ação antioxidante e neurocalmante do mercado",
    price: "R$ 79,00",
    image: glucoSabonete,
  },
  {
    id: 4305,
    name: "Sabonete Detoxificante Facial",
    brand: "Extratos da Terra",
    category: "higienizacao",
    isProfessional: true,
    description: "Máscara + sabonete 2 em 1. Ação detox com acneol e argila baunilha",
    price: "Consultar",
    image: saboneteDetoxificante,
  },
  {
    id: 4306,
    name: "Emulsão de Limpeza Aquaface",
    brand: "Extratos da Terra",
    category: "higienizacao",
    isProfessional: true,
    description: "Remove impurezas e purifica a pele com ação antipoluição",
    price: "Consultar",
    image: emulsaoAquaface,
  },
  {
    id: 4307,
    name: "Sabonete Líquido Aquaface",
    brand: "Extratos da Terra",
    category: "higienizacao",
    isProfessional: true,
    description: "Limpeza profunda. Remove sujidades e oleosidade com extrato de frutas vermelhas",
    price: "Consultar",
    image: saboneteAquaface,
  },
  {
    id: 4308,
    name: "Sabonete Refrescante",
    brand: "Extratos da Terra",
    category: "higienizacao",
    isProfessional: false,
    description: "Limpa controlando oleosidade e deixa sensação refrescante",
    price: "R$ 79,00",
    image: saboneteRefrescante,
  },
  {
    id: 4309,
    name: "Espuma Detox Facial Antiacne",
    brand: "Extratos da Terra",
    category: "higienizacao",
    isProfessional: false,
    description: "Limpeza profunda e desintoxicação dos poros com ação antipoluição",
    price: "R$ 137,00",
    image: espumaDetox,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - ESFOLIAÇÃO
// ============================================

export const extratosEsfoliacaoComImagem: Product[] = [
  {
    id: 4401,
    name: "Peeling Fitomineral",
    brand: "Extratos da Terra",
    category: "esfoliacao",
    isProfessional: false,
    description: "Esfoliação física e enzimática. Remove células mortas, uniformiza e elimina poluição",
    price: "R$ 85,00",
    image: peelingFitomineral,
  },
  {
    id: 4402,
    name: "Creme Esfoliante Aquaface",
    brand: "Extratos da Terra",
    category: "esfoliacao",
    isProfessional: true,
    description: "Esfoliação física suave com semente de apricot, nozes e lavanda",
    price: "Consultar",
    image: esfolianteAquaface,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - ANTI-IDADE
// ============================================

export const extratosAntiIdadeComImagem: Product[] = [
  {
    id: 4501,
    name: "Reverse AH10 Creme para Rosto, Colo e Pescoço",
    brand: "Extratos da Terra",
    category: "anti-idade",
    isProfessional: false,
    description: "Reduz rugas com 10 tipos de ácido hialurônico e nano retinol-like",
    price: "R$ 157,00",
    image: reverseAH10,
  },
  {
    id: 4502,
    name: "Preenchedor Pontual AH",
    brand: "Extratos da Terra",
    category: "anti-idade",
    isProfessional: false,
    description: "Preenchimento natural de rugas. Aumenta produção de ácido hialurônico",
    price: "R$ 119,00",
    image: preenchedorPontualAH,
  },
  {
    id: 4503,
    name: "Nano Lifting Creme Área dos Olhos",
    brand: "Extratos da Terra",
    category: "anti-idade",
    isProfessional: false,
    description: "Trata rugas, linhas de expressão, bolsas e olheiras. Com cafeína e retinol",
    price: "R$ 99,00",
    image: preenchedorPontualAH,
  },
  {
    id: 4504,
    name: "LIP Preenchedor AH",
    brand: "Extratos da Terra",
    category: "anti-idade",
    isProfessional: false,
    description: "Hidratante labial com ácido hialurônico. Aumenta volume labial em 24,8%",
    price: "R$ 74,00",
    image: lipPreenchedorAH,
  },
  {
    id: 4505,
    name: "Hydra Face Hidratante Facial",
    brand: "Extratos da Terra",
    category: "anti-idade",
    isProfessional: false,
    description: "Hidratação de 72h com prebiótico, ácido hialurônico e colágeno nano",
    price: "R$ 62,00",
    image: hydraFace,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - PELES SENSÍVEIS
// ============================================

export const extratosPelesSensiveis: Product[] = [
  {
    id: 4601,
    name: "Sabonete Peles Sensíveis",
    brand: "Extratos da Terra",
    category: "peles-sensiveis",
    isProfessional: false,
    description: "Limpeza suave sem irritação. Hipoalergênico, diminui vermelhidão e coceira",
    price: "R$ 79,00",
    image: sabonetePelesSensiveis,
  },
  {
    id: 4602,
    name: "Hidratante Peles Sensíveis",
    brand: "Extratos da Terra",
    category: "peles-sensiveis",
    isProfessional: false,
    description: "Reduz vermelhidão e queimação. Com Alga da Felicidade para bem-estar emocional",
    price: "R$ 127,00",
    image: hidratantePelesSensiveis,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - CLAREAMENTO
// ============================================

export const extratosClareamentoComImagem: Product[] = [
  {
    id: 4701,
    name: "Espuma Clareadora",
    brand: "Extratos da Terra",
    category: "clareamento",
    isProfessional: false,
    description: "Limpa e auxilia no clareamento com efeito antipoluição e ácido glicólico",
    price: "R$ 119,00",
    image: espumaClareadora,
  },
  {
    id: 4702,
    name: "M-Solution Sérum Facial",
    brand: "Extratos da Terra",
    category: "clareamento",
    isProfessional: false,
    description: "Previne, bloqueia e elimina marcas escuras e melasma. Com nano resveratrol",
    price: "R$ 219,00",
    image: mSolution,
  },
  {
    id: 4703,
    name: "Nanospot Clareador Pontual",
    brand: "Extratos da Terra",
    category: "clareamento",
    isProfessional: false,
    description: "Uso pontual sobre manchas resistentes. Com nano alfa-arbutin e vitamina C",
    price: "R$ 109,00",
    image: nanospotClareador,
  },
  {
    id: 4704,
    name: "Tranex Peel - Peeling Químico",
    brand: "Extratos da Terra",
    category: "clareamento",
    isProfessional: true,
    description: "Remove células pigmentadas e bloqueia produção de melanina. 4% ácido tranexâmico",
    price: "Consultar",
    image: tranexPeel,
  },
  {
    id: 4705,
    name: "Melan T-Block Sérum Facial e Corporal",
    brand: "Extratos da Terra",
    category: "clareamento",
    isProfessional: true,
    description: "Reduz marcas escuras e melasma. Inibe tirosinase e transferência de melanina",
    price: "Consultar",
    image: melanTBlock,
  },
  {
    id: 4706,
    name: "Máscara Bioiluminadora",
    brand: "Extratos da Terra",
    category: "clareamento",
    isProfessional: true,
    description: "Inibe produção e transferência de melanina. Com vitamina C e argila bege",
    price: "Consultar",
    image: mascaraBioiluminadora,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - ANTIOLEOSIDADE
// ============================================

export const extratosAntioleosidade: Product[] = [
  {
    id: 4801,
    name: "Gel-Creme Antioleosidade Facial",
    brand: "Extratos da Terra",
    category: "antioleosidade",
    isProfessional: false,
    description: "Mantém pele sequinha o dia inteiro, reduz poros e uniformiza tom",
    price: "R$ 137,00",
    image: gelCremeAntioleosidade,
  },
  {
    id: 4802,
    name: "Pó Compacto Multiprotetor Matificante FPS 50",
    brand: "Extratos da Terra",
    category: "antioleosidade",
    isProfessional: false,
    description: "Proteção UV, poluição urbana e luz azul. Efeito matte translúcido",
    price: "R$ 157,00",
    image: poMultiprotetor,
  },
  {
    id: 4803,
    name: "Kit Antioleosidade Completo",
    brand: "Extratos da Terra",
    category: "antioleosidade",
    isProfessional: false,
    description: "Sabonete Refrescante + Gel-Creme + Pó Multiprotetor",
    price: "R$ 373,00",
    image: kitAntioleosidade,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - ANTIACNE
// ============================================

export const extratosAntiacneComImagem: Product[] = [
  {
    id: 4901,
    name: "Sérum Multissolução Antiacne",
    brand: "Extratos da Terra",
    category: "antiacne",
    isProfessional: false,
    description: "Controla acne, processo inflamatório e reduz poros. 97% eficácia comprovada",
    price: "R$ 137,00",
    image: serumMultisolucao,
  },
  {
    id: 4902,
    name: "Sérum Secativo Pontual",
    brand: "Extratos da Terra",
    category: "antiacne",
    isProfessional: false,
    description: "Reduz inflamação, inchaço e vermelhidão rapidamente. Efeito bactericida",
    price: "Consultar",
    image: serumSecativo,
  },
  {
    id: 4903,
    name: "Tônico Equalizador",
    brand: "Extratos da Terra",
    category: "antiacne",
    isProfessional: true,
    description: "Controla oleosidade, reduz irritação e equilibra pH. Com acneol e aloe vera",
    price: "Consultar",
    image: tonicoEqualizador,
  },
  {
    id: 4904,
    name: "Máscara Antioleosidade",
    brand: "Extratos da Terra",
    category: "antiacne",
    isProfessional: true,
    description: "Controle de oleosidade, ação secativa e cicatrizante. Com argilas",
    price: "Consultar",
    image: mascaraAntioleosidade,
  },
  {
    id: 4905,
    name: "Sérum Equilíbrio Total",
    brand: "Extratos da Terra",
    category: "antiacne",
    isProfessional: true,
    description: "Reduz acne e marcas escuras, acelera cicatrização. 100% eficácia comprovada",
    price: "Consultar",
    image: serumEquilibrioTotal,
  },
];

// ============================================
// PRODUTOS EXTRATOS DA TERRA - PROTEÇÃO SOLAR
// ============================================

export const extratosSolarComImagem: Product[] = [
  {
    id: 5001,
    name: "Fotoprotetor Facial FPS 20",
    brand: "Extratos da Terra",
    category: "fotoprotecao",
    isProfessional: false,
    description: "Para peles oleosas. Oil free com ativos que controlam oleosidade",
    price: "R$ 83,00",
    image: fotoprotetorFps20,
  },
  {
    id: 5002,
    name: "Fotoprotetor Facial FPS 30",
    brand: "Extratos da Terra",
    category: "fotoprotecao",
    isProfessional: false,
    description: "Com Coenzima Q10 e vitamina E. Combate envelhecimento e melhora firmeza",
    price: "R$ 83,00",
    image: fotoprotetorFps30,
  },
  {
    id: 5003,
    name: "Fotoprotetor Facial FPS 50",
    brand: "Extratos da Terra",
    category: "fotoprotecao",
    isProfessional: false,
    description: "Alta proteção UVA e UVB. Com Coenzima Q10 para prevenção do envelhecimento",
    price: "R$ 120,00",
    image: fotoprotetorFps50,
  },
];

// ============================================
// EXPORT ALL EXTRATOS WITH IMAGES
// ============================================

export const allExtratosWithImages: Product[] = [
  ...extratosVitaminaC,
  ...extratosNiacinamida,
  ...extratosExoIntense,
  ...extratosHigienizacaoComImagem,
  ...extratosEsfoliacaoComImagem,
  ...extratosAntiIdadeComImagem,
  ...extratosPelesSensiveis,
  ...extratosClareamentoComImagem,
  ...extratosAntioleosidade,
  ...extratosAntiacneComImagem,
  ...extratosSolarComImagem,
];
