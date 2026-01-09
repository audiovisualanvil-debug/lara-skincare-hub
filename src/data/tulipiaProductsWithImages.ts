import { Product } from "@/components/shop/ProductCard";

// ============================================
// IMAGENS DOS PRODUTOS TULIPIA
// Linha exclusiva de dermocosméticos profissionais
// ============================================

// Importações das imagens dos banners existentes
import sweetLipsEsfoliante from "@/assets/banners/sweet-lips-esfoliante.webp";
import sweetLipsFluido from "@/assets/banners/sweet-lips-fluido.webp";
import lifeCNano from "@/assets/banners/life-c-nano.webp";
import miracleEyes from "@/assets/banners/miracle-eyes-1.webp";
import primaveraMask from "@/assets/banners/primavera-mask.webp";
import renotratGel from "@/assets/banners/renotrat-gel.webp";
import resilienceSerum from "@/assets/banners/resilience-serum.webp";

// Importações das novas imagens Tulipia
// Exogenetic PDRN
import exogeneticPdrnHero from "@/assets/products/tulipia/exogenetic-pdrn-hero.jpg";
import exogeneticPdrnUso from "@/assets/products/tulipia/exogenetic-pdrn-uso.jpg";
import exogeneticPdrnTextura from "@/assets/products/tulipia/exogenetic-pdrn-textura.jpg";
import exogeneticPdrnTampa from "@/assets/products/tulipia/exogenetic-pdrn-tampa.jpg";
import exogeneticPdrn from "@/assets/products/tulipia/exogenetic-pdrn.jpg";
import niacineEspuma150ml from "@/assets/products/tulipia/niacine-espuma-150ml-hero.jpg";
import niacineEspuma50ml from "@/assets/products/tulipia/niacine-espuma-150ml-new.jpg";
// Galeria Niacine+
import niacineEspumaUso from "@/assets/products/tulipia/niacine-espuma-uso.jpg";
import niacineEspumaTextura from "@/assets/products/tulipia/niacine-espuma-textura.jpg";
import niacineEspumaProduto from "@/assets/products/tulipia/niacine-espuma-produto.jpg";
import niacineEspumaMasculino from "@/assets/products/tulipia/niacine-espuma-masculino.jpg";
import niacineEspumaFrasco from "@/assets/products/tulipia/niacine-espuma-frasco.jpg";
// Galeria Black Secret Antiacne
import blackSecretAntiacneAgua from "@/assets/products/tulipia/black-secret-antiacne-agua.jpg";
import blackSecretAntiacneRobo from "@/assets/products/tulipia/black-secret-antiacne-robo.jpg";
import blackSecretAntiacneAplicacao from "@/assets/products/tulipia/black-secret-antiacne-aplicacao.jpg";
import blackSecretAntiacneFamilia from "@/assets/products/tulipia/black-secret-antiacne-familia.jpg";
import blackSecretAntiacneFrasco from "@/assets/products/tulipia/black-secret-antiacne-frasco.jpg";
import blackSecretPeelingAntiacne from "@/assets/products/tulipia/black-secret-peeling-antiacne.jpg";
import blackSecretPeeling2Fases from "@/assets/products/tulipia/black-secret-peeling-2-fases.jpg";
import blackSecretSaboneteGlico from "@/assets/products/tulipia/black-secret-sabonete-glico.jpg";
import blackSecretSolucaoPrePeeling from "@/assets/products/tulipia/black-secret-solucao-pre-peeling.jpg";
import blackSecretClareador from "@/assets/products/tulipia/black-secret-clareador.jpg";
import blackSecretMicroSpikes from "@/assets/products/tulipia/black-secret-micro-spikes.jpg";
// Galeria Black Secret Peeling 2 Fases
import blackSecret2FasesHero from "@/assets/products/tulipia/black-secret-2fases-hero.jpg";
import blackSecretAntes1 from "@/assets/products/tulipia/black-secret-antes-1.jpg";
import blackSecretAntes2 from "@/assets/products/tulipia/black-secret-antes-2.jpg";
import blackSecretDepois1 from "@/assets/products/tulipia/black-secret-depois-1.jpg";
import blackSecretDepois2 from "@/assets/products/tulipia/black-secret-depois-2.jpg";
import blackSecretSaboneteGlicoProduto from "@/assets/products/tulipia/black-secret-sabonete-glico-produto.jpg";
import blackSecretSolucaoPrePeelingProduto from "@/assets/products/tulipia/black-secret-solucao-pre-peeling-produto.jpg";
import blackSecretPeelingFase1Produto from "@/assets/products/tulipia/black-secret-peeling-fase1-produto.jpg";
import blackSecretClareadorProduto from "@/assets/products/tulipia/black-secret-clareador-produto.jpg";
import blackSecretPeelingFase2Produto from "@/assets/products/tulipia/black-secret-peeling-fase2-produto.jpg";
import blackSecretSaboneteGlicoHero from "@/assets/products/tulipia/black-secret-sabonete-glico-hero.jpg";
import blackSecretSolucaoPrePeelingHero from "@/assets/products/tulipia/black-secret-solucao-pre-peeling-hero.jpg";
import blackSecretClareadorHero from "@/assets/products/tulipia/black-secret-clareador-hero.jpg";
import blackSecretMicroSpikesHero from "@/assets/products/tulipia/black-secret-micro-spikes-hero.jpg";
import blackSecretMicroSpikesPedra from "@/assets/products/tulipia/black-secret-micro-spikes-pedra.jpg";
import blackBiowhiteLocao from "@/assets/products/tulipia/black-biowhite-locao.jpg";
import biowhiteHero from "@/assets/products/tulipia/biowhite-hero.jpg";
// Novas imagens oficiais Tulipia CDN
import exogeneticPdrnOfficial from "@/assets/products/tulipia/exogenetic-pdrn-official.png";
import niacineEspumaOfficial from "@/assets/products/tulipia/niacine-espuma-official.png";
import blackSecretAntiacneOfficial from "@/assets/products/tulipia/black-secret-antiacne-official.png";
import blackSecret2FasesOfficial from "@/assets/products/tulipia/black-secret-2fases-official.png";
import blackSecretSaboneteOfficial from "@/assets/products/tulipia/black-secret-sabonete-official.png";
import blackSecretPrePeelingOfficial from "@/assets/products/tulipia/black-secret-prepeeling-official.png";
import blackSecretClareadorOfficial from "@/assets/products/tulipia/black-secret-clareador-official.png";
import immortaliteSerumOfficial from "@/assets/products/tulipia/immortalite-serum-official.png";
import lifeCSerumClareadorOfficial from "@/assets/products/tulipia/life-c-serum-clareador-official.png";
import sweetLipsTuttiFruttiOfficial from "@/assets/products/tulipia/sweet-lips-tutti-frutti-official.png";
import firmFlaccid300mlOfficial from "@/assets/products/tulipia/firm-flaccid-300ml-official.png";
import hialuxSerumOfficial from "@/assets/products/tulipia/hialux-serum-official.png";
import biowhiteUso from "@/assets/products/tulipia/biowhite-uso.jpg";
import biowhiteFrasco from "@/assets/products/tulipia/biowhite-frasco.jpg";
// ProSkin Repair galeria
import proskinSaboneteTextura from "@/assets/products/tulipia/proskin-sabonete-textura.jpg";
import proskinSaboneteUso from "@/assets/products/tulipia/proskin-sabonete-uso.jpg";
import proskinSaboneteHero from "@/assets/products/tulipia/proskin-sabonete-hero.jpg";
import proskinBrumaHero from "@/assets/products/tulipia/proskin-bruma-hero.jpg";
import proskinCremeHero from "@/assets/products/tulipia/proskin-creme-hero.jpg";
import proskinSaboneteNovo from "@/assets/products/tulipia/proskin-sabonete-novo.jpg";
import proskinSaboneteLifestyle from "@/assets/products/tulipia/proskin-sabonete-lifestyle.jpg";
import proskinSabonete from "@/assets/products/tulipia/proskin-sabonete.jpg";
import proskinBruma from "@/assets/products/tulipia/proskin-bruma.jpg";
import proskinCreme from "@/assets/products/tulipia/proskin-creme.jpg";
import dermoEsteticUltraemoliente from "@/assets/products/tulipia/dermo-estetic-ultraemoliente.jpg";
import dermoEsteticPosExtracao from "@/assets/products/tulipia/dermo-estetic-pos-extracao.jpg";
import niacineSerum from "@/assets/products/tulipia/niacine-serum.jpg";
import dermacosBooster from "@/assets/products/tulipia/dermacos-booster.jpg";
import dermacosEspuma from "@/assets/products/tulipia/dermacos-espuma.jpg";
import immortaliteCSerum from "@/assets/products/tulipia/immortalite-c-serum.jpg";
import hydrogenBruma from "@/assets/products/tulipia/hydrogen-bruma.jpg";
import firmFlaccid300ml from "@/assets/products/tulipia/firm-flaccid-300ml.jpg";
import firmFlaccid60ml from "@/assets/products/tulipia/firm-flaccid-60ml.jpg";
import lifeCMascaraImg from "@/assets/products/tulipia/life-c-mascara.jpg";
import lifeCPeelingImg from "@/assets/products/tulipia/life-c-peeling.jpg";
import lifeCSerum20Img from "@/assets/products/tulipia/life-c-serum-20.jpg";
import lifeCMonodoseImg from "@/assets/products/tulipia/life-c-monodose.jpg";
import lifeCTonicoImg from "@/assets/products/tulipia/life-c-tonico.jpg";
import lifeCsaboneteMouseImg from "@/assets/products/tulipia/life-c-sabonete-mousse.jpg";
import sweetLipsEsfolianteImg from "@/assets/products/tulipia/sweet-lips-esfoliante.jpg";
import sweetLipsGlossImg from "@/assets/products/tulipia/sweet-lips-gloss.jpg";
import chokolaMascaraImg from "@/assets/products/tulipia/chokola-mascara.jpg";
import ultimateEsteticMascaraImg from "@/assets/products/tulipia/ultimate-estetic-mascara.jpg";
import outonoMaskImg from "@/assets/products/tulipia/outono-mask.jpg";
import outonoMaskHero from "@/assets/products/tulipia/outono-mask-hero.png";
import primaveraMaskImg from "@/assets/products/tulipia/primavera-mask.jpg";
import primaveraMaskHero from "@/assets/products/tulipia/primavera-mask-hero.png";
import veraoMaskImg from "@/assets/products/tulipia/verao-mask.jpg";
import veraoMaskHero from "@/assets/products/tulipia/verao-mask-hero.png";
import invernoMaskImg from "@/assets/products/tulipia/inverno-mask.jpg";
import invernoMaskHero from "@/assets/products/tulipia/inverno-mask-hero.png";
import stellarMaskEnzimaticaImg from "@/assets/products/tulipia/stellar-mask-enzimatica.jpg";
import stellarMaskMatificanteImg from "@/assets/products/tulipia/stellar-mask-matificante.jpg";
import stellarMaskRejuvenescedoraImg from "@/assets/products/tulipia/stellar-mask-rejuvenescedora.jpg";
import stellarMaskHidronutritivaImg from "@/assets/products/tulipia/stellar-mask-hidronutritiva.jpg";
import miracleEyesImg from "@/assets/products/tulipia/miracle-eyes.jpg";
import cilsLashesImg from "@/assets/products/tulipia/cils-lashes.jpg";
import hialuxSaboneteImg from "@/assets/products/tulipia/hialux-sabonete.jpg";
import hialuxSerumImg from "@/assets/products/tulipia/hialux-serum.jpg";
import hialuxCremeImg from "@/assets/products/tulipia/hialux-creme.jpg";
import hidrasolFps30Img from "@/assets/products/tulipia/hidrasol-fps30.jpg";
import citrogelClareadorImg from "@/assets/products/tulipia/citrogel-clareador.jpg";
import renotratGelImg from "@/assets/products/tulipia/renotrat-gel.jpg";

// Novas imagens baixadas - Fase 1 (Hialux, Kinelyn, Marezi, Citrata, Hidrasol)
import hialuxSerumHero from "@/assets/products/tulipia/hialux-serum-hero.png";
import hialuxSaboneteHero from "@/assets/products/tulipia/hialux-sabonete-hero.png";
import hialuxCremeHero from "@/assets/products/tulipia/hialux-creme-hero.png";
import kinelynGelHero from "@/assets/products/tulipia/kinelyn-gel-hero.png";
import kinelynLocaoHero from "@/assets/products/tulipia/kinelyn-locao-hero.png";
import kinelynMascaraHero from "@/assets/products/tulipia/kinelyn-mascara-hero.png";
import mareziSaboneteHero from "@/assets/products/tulipia/marezi-sabonete-hero.png";
import mareziMascaraHero from "@/assets/products/tulipia/marezi-mascara-hero.png";
import citrataSaboneteHero from "@/assets/products/tulipia/citrata-sabonete-hero.png";
import citrataLocaoHero from "@/assets/products/tulipia/citrata-locao-hero.png";
import hidrasolFps30Hero from "@/assets/products/tulipia/hidrasol-fps30-hero.png";
import hidrasolFps60Hero from "@/assets/products/tulipia/hidrasol-fps60-hero.png";

// Life C+ - novas imagens do site oficial
import lifeCMascaraNew from "@/assets/products/tulipia/life-c-mascara-new.png";
import lifeCsaboneteMouseNew from "@/assets/products/tulipia/life-c-sabonete-mousse-new.png";
import lifeCSerum20New from "@/assets/products/tulipia/life-c-serum-20-new.png";
import lifeCTonicoNew from "@/assets/products/tulipia/life-c-tonico-new.png";
import lifeCMonodoseNew from "@/assets/products/tulipia/life-c-monodose-new.png";

// Sweet Lips - novas imagens
import sweetLipsEsfolianteCereja from "@/assets/products/tulipia/sweet-lips-esfoliante-cereja.png";
import sweetLipsGlossCereja from "@/assets/products/tulipia/sweet-lips-gloss-cereja.png";

// Stellar Mask - imagens oficiais do site
import stellarMaskEnzimaticaOfficial from "@/assets/products/tulipia/stellar-mask-enzimatica.png";
import stellarMaskMatificanteOfficial from "@/assets/products/tulipia/stellar-mask-matificante.png";
import stellarMaskHidronutritivaOfficial from "@/assets/products/tulipia/stellar-mask-hidronutritiva.png";

// Máscaras e clareadores - novas imagens
import chokolaMascaraNew from "@/assets/products/tulipia/chokola-mascara-new.png";
import ultimateEsteticMascaraNew from "@/assets/products/tulipia/ultimate-estetic-mascara-new.png";
import citrogelClareadorNew from "@/assets/products/tulipia/citrogel-clareador-new.png";
import sepiwhiteGelNew from "@/assets/products/tulipia/sepiwhite-gel-new.png";

// Imagens oficiais do site Tulipia
import stellarMaskRejuvenescedoraOfficial from "@/assets/products/tulipia/stellar-mask-rejuvenescedora.png";
import chokolaMascaraOfficial from "@/assets/products/tulipia/chokola-mascara-chocolate.png";
import ultimateEsteticOuroOfficial from "@/assets/products/tulipia/ultimate-estetic-mascara-ouro.png";
import lifeCPeelingAbrasivoOfficial from "@/assets/products/tulipia/life-c-peeling-abrasivo.png";

// Séruns - novas imagens
import ageMatteSerumNew from "@/assets/products/tulipia/age-matte-serum-new.png";
import dermacollSerumNew from "@/assets/products/tulipia/dermacoll-serum-new.png";

// Body HD e corporais - novas imagens
import bodyHdGelHiperemiante from "@/assets/products/tulipia/body-hd-gel-hiperemiante.png";
import bodyHdGomaEsfoliante from "@/assets/products/tulipia/body-hd-goma-esfoliante.png";
import bodyHdGelCrioterapico from "@/assets/products/tulipia/body-hd-gel-crioterapico.png";
import moovyCremeOzonizado from "@/assets/products/tulipia/moovy-creme-ozonizado.png";

// Capilar - novas imagens
import tricoGeneticistTonico from "@/assets/products/tulipia/trico-geneticist-tonico.png";

// Floraty - novas imagens
import floratyEmolienteHero from "@/assets/products/tulipia/floraty-emoliente-hero.png";
import floratyEsfolianteHero from "@/assets/products/tulipia/floraty-esfoliante-hero.png";
import floratyLocaoHero from "@/assets/products/tulipia/floraty-locao-hero.png";
import floratyAmolecedorCravos from "@/assets/products/tulipia/floraty-amolecedor-cravos.png";

// Dermacos - novas imagens oficiais
import dermacosEspumaHero from "@/assets/products/tulipia/dermacos-espuma-hero.png";
import dermacosEspumaLifestyle from "@/assets/products/tulipia/dermacos-espuma-lifestyle.png";
import dermacosEspumaUso from "@/assets/products/tulipia/dermacos-espuma-uso.png";

// Immortalite-C - novas imagens oficiais
import immortaliteCHero from "@/assets/products/tulipia/immortalite-c-hero.png";
import immortaliteCLaranja from "@/assets/products/tulipia/immortalite-c-laranja.png";

// Firm Flaccid - nova imagem oficial
import firmFlaccid300mlHero from "@/assets/products/tulipia/firm-flaccid-300ml-hero.png";

// Calmskin - nova imagem
import calmskinPomadaHero from "@/assets/products/tulipia/calmskin-pomada-hero.png";
import calmskinPomadaOfficial from "@/assets/products/tulipia/calmskin-pomada-official.png";

// Miracle Eyes - imagem oficial
import miracleEyesOfficial from "@/assets/products/tulipia/miracle-eyes-official.png";

// Floraty - imagem oficial esfoliante
import floratyEsfolianteApricot from "@/assets/products/tulipia/floraty-esfoliante-apricot.png";

// Marezi - loção
import mareziLocaoHero from "@/assets/products/tulipia/marezi-locao-hero.png";

// Corpus e Elegance Body - novas imagens
import corpusArgilaHero from "@/assets/products/tulipia/corpus-argila-hero.png";
import eleganceSprayHero from "@/assets/products/tulipia/elegance-spray-hero.png";

// Ultimate Estetic - solução ultraemoliente
import ultimateUltraemolienteHero from "@/assets/products/tulipia/ultimate-ultraemoliente-hero.png";

// Kits - nova imagem
import kitSweetLipsHero from "@/assets/products/tulipia/kit-sweet-lips-hero.png";

// Placeholder para produtos sem imagem
const placeholder = "/placeholder.svg";

// ============================================
// LANÇAMENTOS
// ============================================

export const tulipiaLancamentos: Product[] = [
  {
    id: 7001,
    name: "Exogenetic PDRN Creme Facial 30g",
    brand: "Tulipia",
    category: "lancamentos",
    isProfessional: false,
    description: "Creme facial que combina biotecnologia de ponta e ativos inovadores para manter a pele revitalizada, firme e luminosa, ajudando a retardar os sinais do tempo de forma contínua.",
    fullDescription: "Creme facial que combina biotecnologia de ponta e ativos inovadores para manter a pele revitalizada, firme e luminosa, ajudando a retardar os sinais do tempo de forma contínua. Promove a longevidade da pele, recupera a energia celular e reduz linhas de expressão e rugas. Testado dermatologicamente com biotecnologia avançada. Rendimento: ± 37 aplicações.",
    price: undefined,
    image: exogeneticPdrnOfficial,
    applicationIndications: [
      "Anti-idade",
      "Biotecnologia",
      "Eficácia comprovada",
      "Facial",
      "Hidratação",
      "Indicado para todos os tipos de pele",
      "Nanotecnologia",
      "Rugas",
      "Testado Dermatologicamente",
    ],
    gallery: [
      exogeneticPdrnUso,
      exogeneticPdrnTextura,
      exogeneticPdrnTampa,
      exogeneticPdrn,
    ],
    activeIngredients: [
      "PDRN",
      "Exossomas",
      "Peptídeos",
      "NAD+",
      "NMN",
      "Ácido Hialurônico",
      "Niacinamida",
    ],
  },
  {
    id: 7002,
    name: "Niacine+ Espuma de Limpeza de Niacinamida 150ml",
    brand: "Tulipia",
    category: "lancamentos",
    isProfessional: false,
    description: "Uma espuma suave com Niacinamida, ativos hidratantes e pH fisiológico para uma limpeza delicada e precisa. Com ação probiótica, ajuda hidratar a pele, remove impurezas, oleosidade e mantém o conforto desde o primeiro uso.",
    fullDescription: "Uma espuma suave com Niacinamida, ativos hidratantes e pH fisiológico para uma limpeza delicada e precisa. Com ação probiótica, ajuda hidratar a pele, remove impurezas, oleosidade e mantém o conforto desde o primeiro uso.",
    price: "R$ 94,90",
    image: niacineEspumaOfficial,
    applicationIndications: [
      "Controle da oleosidade",
      "Eficácia comprovada",
      "Espuma de limpeza",
      "Facial",
      "Indicado para todos os tipos de pele",
      "Nanotecnologia",
      "Pré-biótico",
    ],
    gallery: [
      niacineEspumaTextura,
      niacineEspumaProduto,
      niacineEspumaUso,
      niacineEspumaMasculino,
      niacineEspumaFrasco,
    ],
    video: "/videos/niacine-espuma-video.mp4",
    activeIngredients: [
      "Alantoína",
      "D-Pantenol",
      "Lactobacillus",
      "Nano Ácido Hialurônico",
      "Nano Niacinamida",
      "PCA de Sódio",
      "Pullulan",
    ],
  },
  {
    id: 7003,
    name: "Niacine+ Espuma de Limpeza de Niacinamida 50ml",
    brand: "Tulipia",
    category: "lancamentos",
    isProfessional: false,
    description: "Uma espuma suave com Niacinamida, ativos hidratantes e pH fisiológico para uma limpeza delicada e precisa. Versão travel size com ± 20 aplicações.",
    fullDescription: "Uma espuma suave com Niacinamida, ativos hidratantes e pH fisiológico para uma limpeza delicada e precisa. Com ação probiótica, ajuda hidratar a pele, remove impurezas, oleosidade e mantém o conforto desde o primeiro uso.",
    price: "R$ 49,90",
    image: niacineEspuma50ml,
    gallery: [
      niacineEspumaTextura,
      niacineEspumaProduto,
      niacineEspumaUso,
      niacineEspumaMasculino,
      niacineEspumaFrasco,
    ],
    video: "/videos/niacine-espuma-video.mp4",
    activeIngredients: [
      "Alantoína",
      "D-Pantenol",
      "Lactobacillus",
      "Nano Ácido Hialurônico",
      "Nano Niacinamida",
      "PCA de Sódio",
      "Pullulan",
    ],
  },
];

// ============================================
// BLACK SECRET - Linha Clareamento
// ============================================

export const tulipiaBlackSecret: Product[] = [
  {
    id: 7010,
    name: "Black Secret Peeling Antiacne 30ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: true,
    description: "Peeling profissional para tratamento de acne com Azeloglicina®. Reduz inflamação, controla oleosidade e clareia manchas pós-inflamatórias.",
    fullDescription: "Peeling profissional para tratamento de acne com Azeloglicina®. Reduz inflamação, controla oleosidade e clareia manchas pós-inflamatórias. Testado dermatologicamente.",
    price: "R$ 199,86",
    image: blackSecretAntiacneOfficial,
    applicationIndications: [
      "Acne",
      "Calmante",
      "Cicatrizes de acne",
      "Clareamento e uniformização da pele",
      "Controle da oleosidade",
      "Eficácia comprovada",
      "Exclusivo para profissional",
      "Facial",
      "Indicado para todos os tipos de pele",
      "Nanotecnologia",
      "Testado Dermatologicamente",
    ],
    gallery: [
      blackSecretAntiacneAgua,
      blackSecretAntiacneRobo,
      blackSecretAntiacneAplicacao,
      blackSecretAntiacneFamilia,
      blackSecretAntiacneFrasco,
    ],
    activeIngredients: [
      "Azeloglicina®",
      "Ácido Succínico",
      "Ácido Chiquímico",
      "Ácido Glicirrízico",
      "Ácido Salicílico",
      "Ácido Lático",
      "Ácido Glicólico",
      "Centella Asiática",
      "Pantenol",
    ],
  },
  {
    id: 7011,
    name: "Black Secret Peeling Facial 2 Fases",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: true,
    description: "O segredo de profissional para profissional. A nova geração dos peelings profissionais com esfoliação química, física e enzimática.",
    fullDescription: "O Black Secret Peeling Facial é a nova geração dos peelings profissionais. Com tecnologia e ativos consagrados pela ciência dermocosmética, sua fórmula inovadora traz o equilíbrio entre segurança e performance, unindo a esfoliação química, física e enzimática a um blend clareador de alta potência. Clareia com precisão, além de atuar sobre a textura irregular e sinais de envelhecimento, inclusive linhas finas e marcas. A descamação controlada garante segurança e eficácia, promovendo uma pele mais luminosa, uniforme, sem marcas e rejuvenescida em poucas sessões.",
    price: "R$ 714,14",
    image: blackSecret2FasesOfficial,
    applicationIndications: [
      "Clareamento e uniformização da pele",
      "Eficácia comprovada",
      "Esfoliação",
      "Exclusivo para profissional",
      "Facial",
      "Nanotecnologia",
      "Peeling",
      "Rugas",
    ],
    gallery: [
      blackSecretPeeling2Fases,
      blackSecretAntes1,
      blackSecretDepois1,
      blackSecretAntes2,
      blackSecretDepois2,
    ],
    activeIngredients: [
      "Epicuticle®",
      "Papaína",
      "Bromelina",
      "Ácido Glicólico",
      "Ácido Salicílico",
      "Cristais de Quartzo",
      "Retinol",
      "Brightenyl®",
      "Ácido Diglicosil Gálico",
      "Cybright®",
      "Ácido Kójico",
    ],
    beforeAfterImages: [
      { before: blackSecretAntes1, after: blackSecretAntes2 },
      { before: blackSecretDepois2, after: blackSecretDepois1 },
    ],
    protocolSteps: [
      {
        step: 1,
        title: "Black Secret Sabonete Glico-Renovador",
        description: "Aplique o produto na pele seca. Em seguida, massageie de 2 a 3 minutos. Remova com algodão umedecido em água.",
        image: blackSecretSaboneteGlicoProduto,
      },
      {
        step: 2,
        title: "Black Secret Solução Pré-Peeling Desengordurante",
        description: "Umedeça o algodão com o produto e aplique na face. Aguarde até a completa absorção e não remova. Para intensificar os resultados, o produto pode ser aplicado em duas camadas.",
        image: blackSecretSolucaoPrePeelingProduto,
      },
      {
        step: 3,
        title: "Black Secret Peeling Facial Fase 1",
        description: "Aplique a Fase 1 em toda a área, dividindo-a por quadrantes, e realize movimentos circulares até a completa absorção do produto. Deixe agir por 10 minutos e, em seguida, remova o excesso do filme formado suavemente com algodão umedecido em água.",
        image: blackSecretPeelingFase1Produto,
      },
      {
        step: 4,
        title: "Black Secret Clareador Concentrado",
        description: "Aplique o produto na face seca e aguarde até a completa absorção. Não remover.",
        image: blackSecretClareadorProduto,
      },
      {
        step: 5,
        title: "Black Secret Peeling Fase 2",
        description: "Com a área completamente seca, aplique uma camada da Fase 2 nas regiões desejadas. Deixe agir de 6 a 8 horas, respeitando a tolerância da pele.",
        image: blackSecretPeelingFase2Produto,
      },
    ],
  },
  {
    id: 7012,
    name: "Black Secret Sabonete Glico-Renovador 300ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Sabonete rico em Ácido Glicólico que promove limpeza profunda, esfoliação química leve e segura, revitalização e uniformização da pele.",
    fullDescription: "O sabonete glico-renovador Black Secret é um sabonete rico em Ácido Glicólico que promove limpeza profunda, esfoliação química leve e segura, revitalização e uniformização da pele, para uma pele visivelmente mais macia e luminosa já nas primeiras aplicações. Promove uma limpeza profunda da pele, desobstruindo os poros e eliminando os detritos celulares e poluição. Realiza um importante afinamento da capa córnea, potencializando os tratamentos estéticos faciais e corporais.",
    price: "R$ 180,00",
    image: blackSecretSaboneteOfficial,
    applicationIndications: [
      "Clareamento e uniformização da pele",
      "Esfoliação",
      "Facial e Corporal",
      "Indicado para todos os tipos de pele",
      "Limpeza profunda",
      "Nanotecnologia",
    ],
    gallery: [
      blackSecretSaboneteGlico,
      blackSecretSaboneteGlicoProduto,
    ],
    activeIngredients: [
      "Ácido Glicólico 10%",
      "Gluconolactona",
      "Ácido Lactobiônico",
      "Extrato de Pepino",
      "Lactato de Mentila",
      "Nano Acids",
      "Ácido Cítrico",
      "Ácido Láctico",
      "Extrato de Juá",
    ],
  },
  {
    id: 7013,
    name: "Black Secret Solução Pré-Peeling Desengordurante 120ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: true,
    description: "Concentrado de ativos purificantes e nanopartículas que remove oleosidade e potencializa a renovação celular.",
    fullDescription: "Concentrado de ativos purificantes e nanopartículas, esta solução não somente remove a oleosidade e impurezas da pele, mas potencializa o processo de renovação celular, deixando-a profundamente limpa e com uma agradável sensação de frescor. Sua utilização, especialmente nas peles oleosas e seborreicas, permite um preparo perfeito para os procedimentos estéticos, aumentando significativamente a receptividade dos cosméticos de tratamento.",
    price: "R$ 170,00",
    image: blackSecretPrePeelingOfficial,
    applicationIndications: [
      "Controle da oleosidade",
      "Exclusivo para profissional",
      "Facial",
      "Limpeza profunda",
      "Nanotecnologia",
      "Pré-Peeling",
    ],
    gallery: [
      blackSecretSolucaoPrePeeling,
      blackSecretSolucaoPrePeelingProduto,
    ],
    activeIngredients: [
      "Ácido Glicólico 10%",
      "Nano Acids",
      "Ácido Cítrico",
      "Ácido Láctico",
      "Acetona",
      "Mentol",
    ],
  },
  {
    id: 7014,
    name: "Black Secret Clareador Concentrado 60ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Concentrado com blend de ácidos clareadores que auxilia na uniformização do tom da pele e suaviza áreas escurecidas.",
    fullDescription: "Com uma combinação sinérgica de ácidos, este concentrado auxilia no clareamento e na uniformização do tom da pele, contribuindo para a melhora da aparência de áreas escurecidas. Proporciona textura suavizada, luminosidade e conforto, promovendo o equilíbrio cutâneo. Ideal para protocolos de manutenção da pele e para cuidados com áreas escurecidas, sem causar descamação ou vermelhidão perceptível.",
    price: "R$ 199,00",
    image: blackSecretClareadorOfficial,
    applicationIndications: [
      "Clareamento e uniformização da pele",
      "Facial e Corporal",
      "Indicado para todos os tipos de pele",
      "Manchas",
      "Nanotecnologia",
    ],
    gallery: [
      blackSecretClareador,
      blackSecretClareadorProduto,
    ],
    activeIngredients: [
      "Ácido Fítico",
      "Ácido Glicólico",
      "Ácido Kójico",
      "Ácido Mandélico",
      "Ácido Tranexâmico",
      "Alantoína",
      "Nicotinamida",
    ],
  },
  {
    id: 7015,
    name: "Black Secret Micro Spikes Peeling 30g",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: true,
    description: "Peeling com microespículas naturais que potencializa a permeação de ativos, esfolia, regenera e ilumina o tom da pele.",
    fullDescription: "Peeling profissional com microespículas naturais de esponja que potencializam a permeação de ativos, esfoliam, regeneram e iluminam o tom da pele. Uniformiza e promove renovação celular intensa com tecnologia Drone Copper e ativos de alta performance.",
    price: "R$ 220,00",
    image: blackSecretMicroSpikesHero,
    gallery: [
      blackSecretMicroSpikesPedra,
      blackSecretMicroSpikes,
    ],
    activeIngredients: [
      "Micro Spikes",
      "Drone Copper",
      "Nano Ácido Tranexâmico",
      "Esqualano Vegetal",
      "Ácido Poliglutâmico",
      "Manteiga de Tucumã",
      "Vitamina E",
    ],
  },
  {
    id: 7016,
    name: "Biowhite Nano Loção Clareadora 60ml",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Loção com Nano Hydroxy Acids que estimula a síntese de colágeno, promove firmeza, clareia e uniformiza o tom da pele.",
    fullDescription: "A Nano Loção Clareadora Biowhite possui ação rejuvenescedora e clareadora na pele. Com o ativo Nano Hydroxy Acids em sua composição, estimula a síntese de colágeno, promove firmeza e reduz rugas e linhas de expressão. Por seu efeito clareador prolongado, a Biowhite não só suaviza as marcas escurecidas como também ajuda a prevenir seu reaparecimento ao longo do tempo. Resultados comprovados: 85% de melhora no clareamento da pele, 80% na uniformização do tom e 75% na firmeza.",
    price: "R$ 149,00",
    image: biowhiteHero,
    gallery: [
      biowhiteUso,
      biowhiteFrasco,
      blackBiowhiteLocao,
    ],
    activeIngredients: [
      "Nano Hydroxy Acids",
      "Nano Up Lift",
      "Ácido Kójico",
      "Ácido Mandélico",
      "Ácido Glicólico",
      "Ácido Láctico",
      "Ácido Cítrico",
      "Ácido Fítico",
      "Ácido Hialurônico",
      "Extrato de Acácia do Senegal",
      "Extrato de Alcaçuz",
      "Óleo de Aveia",
    ],
  },
];

// ============================================
// PROSKIN REPAIR - Barreira Cutânea
// ============================================

export const tulipiaProskinRepair: Product[] = [
  {
    id: 7020,
    name: "ProSkin Repair Sabonete Restaurador 110ml",
    brand: "Tulipia",
    category: "barreira-cutanea",
    isProfessional: false,
    description: "Limpa suavemente sem agredir a barreira cutânea, preservando a hidratação natural da pele.",
    fullDescription: "Sabonete restaurador que limpa suavemente sem agredir a barreira cutânea, preservando a hidratação natural da pele. Ideal para peles sensibilizadas, fortalece e repara a barreira cutânea, previne sinais de envelhecimento e acalma a pele intensamente.",
    price: "R$ 79,90",
    image: proskinSaboneteNovo,
    gallery: [
      proskinSaboneteLifestyle,
      proskinSaboneteUso,
      proskinSaboneteTextura,
      proskinSabonete,
    ],
    activeIngredients: [
      "Hydra H+",
      "Ácido Hialurônico",
      "Extrato de Lótus",
      "NanoCurcuma™",
      "Symbiocaps LA",
      "Ecodermist",
      "BioEcolia®",
      "Oligossacarídeo Alfa-Glucan",
      "BisaboLife™",
    ],
  },
  {
    id: 7021,
    name: "ProSkin Repair Bruma Dermatológica 55ml",
    brand: "Tulipia",
    category: "barreira-cutanea",
    isProfessional: false,
    description: "Hidrata, acalma e fortalece a barreira cutânea. Equilibra a microbiota, reduz vermelhidão e proporciona conforto duradouro.",
    fullDescription: "Hidrata, acalma e fortalece a barreira cutânea. Equilibra a microbiota, reduz vermelhidão e proporciona conforto duradouro, ideal para peles sensibilizadas no dia a dia ou em rotinas profissionais, oferecendo reparação a qualquer hora com frescor e hidratação visível.",
    price: "R$ 119,90",
    image: proskinBrumaHero,
    gallery: [
      proskinBruma,
    ],
    activeIngredients: [
      "Água de Lótus",
      "BioEcolia®",
      "Bisabolife™",
      "Hydroviton® PLUS 2290",
      "Lactobacillus",
      "Nano Olive Upcycling",
      "NanoCurcuma™",
      "Oligossacarídeo Alpha-Glucan",
      "Symbiocaps LA",
    ],
  },
  {
    id: 7022,
    name: "ProSkin Repair Creme Fortalecedor de Barreira 30g",
    brand: "Tulipia",
    category: "barreira-cutanea",
    isProfessional: false,
    description: "Purifica e hidrata a pele, acalma e reforça a barreira cutânea. Nutre, rejuvenesce e melhora linhas de expressão.",
    fullDescription: "Creme concentrado para fortalecimento e recuperação da barreira cutânea. Purifica e hidrata a pele, acalma e reforça a barreira cutânea. Nutre, rejuvenesce e melhora as linhas de expressão. Testado dermatologicamente com nanotecnologia.",
    price: "R$ 119,90",
    image: proskinCremeHero,
    gallery: [
      proskinCreme,
    ],
    activeIngredients: [
      "Epinutrix",
      "Nano Olive Upcycling",
      "Água de Lótus",
      "NanoCurcuma™",
      "Symbiocaps LA",
      "Lactobacillus",
      "BioEcolia®",
      "Oligossacarídeo Alpha-Glucan",
      "Hydroviton® PLUS 2290",
      "BisaboLife™",
    ],
  },
];

// ============================================
// DERMO ESTETIC - Profissional
// ============================================

export const tulipiaDermoEstetic: Product[] = [
  {
    id: 7030,
    name: "Dermo Estetic Solução Ultraemoliente de Trietanolamina 500ml",
    brand: "Tulipia",
    category: "profissional",
    isProfessional: true,
    description: "Solução emoliente profissional para procedimentos estéticos. Amacia e prepara a pele",
    price: "R$ 127,14",
    image: dermoEsteticUltraemoliente,
  },
  {
    id: 7031,
    name: "Dermo Estetic Solução Pós Extração 50ml",
    brand: "Tulipia",
    category: "profissional",
    isProfessional: true,
    description: "Solução calmante e antisséptica para uso após procedimentos de extração",
    price: "R$ 100,00",
    image: dermoEsteticPosExtracao,
  },
];

// ============================================
// MÁSCARAS
// ============================================

export const tulipiaMascaras: Product[] = [
  {
    id: 7040,
    name: "Outono Mask Nano Máscara Reequilibrante 150g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Sinta o alento renovador dessa máscara, que liberta a pele de radicais livres, assim como o cair das folhas secas no outono.",
    fullDescription: "Máscara nutritiva, retexturizadora, detox e antioxidante que fortalece e condiciona a pele, proporcionando textura suave e aparência descansada. Ideal para todos os tipos de pele, especialmente aquelas afetadas por poluição ou tabagismo. Rendimento: ± 30 aplicações.",
    price: "R$ 141,43",
    image: outonoMaskHero,
    gallery: [outonoMaskImg],
    activeIngredients: [
      "Ácido Hialurônico",
      "Alantoína",
      "Algisium C2",
      "Cera de Carnaúba",
      "Colágeno Hidrolisado",
      "Extrato de Chá Verde",
      "Extrato de Figo",
      "Manteiga de Cupuaçu",
      "Nano Hydrolift",
      "Óleo de Semente de Uva",
    ],
    protocolSteps: [
      {
        step: 1,
        title: "Aplicação",
        description: "Aplique uma camada uniforme sobre a pele limpa e deixe agir por 20 minutos.",
      },
      {
        step: 2,
        title: "Remoção",
        description: "Remova após o tempo de ação com água morna ou algodão umedecido.",
      },
      {
        step: 3,
        title: "Dica Profissional",
        description: "Use a linha completa '4 Estações' para melhores resultados.",
      },
    ],
  },
  {
    id: 7041,
    name: "Verão Mask Nano Máscara Energizante 150g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Coquetel refrescante de frutas tropicais e algas marinhas que despertam a energia celular, devolvendo vigor, maciez e brilho.",
    fullDescription: "Verão, a estação da vida! Alegre convite para um banho de hidratação com um coquetel de nutrientes que despertam a energia celular, devolvendo à pele seu vigor, maciez e brilho. Uma face resplandecente como um dia ensolarado. Ideal para todos os tipos de pele e coadjuvante em protocolos de hidratação e revitalização pós-sol. Rendimento: ± 30 aplicações.",
    price: "R$ 141,43",
    image: veraoMaskHero,
    gallery: [veraoMaskImg],
    activeIngredients: [
      "Extrato de Manga",
      "Extrato de Maracujá",
      "Extrato de Grapefruit",
      "Algas Marinhas",
      "Ácido Hialurônico",
      "Nano Lift",
      "Óleo de Coco",
      "Óleo de Girassol",
    ],
    protocolSteps: [
      {
        step: 1,
        title: "Aplicação",
        description: "Aplique uma camada uniforme sobre a pele limpa e deixe agir por 15-20 minutos.",
      },
      {
        step: 2,
        title: "Potencialização",
        description: "Pode ser potencializada com máscara de TNT umedecida em tônico facial.",
      },
      {
        step: 3,
        title: "Remoção",
        description: "Remova com água morna ou algodão umedecido. Use a linha completa '4 Estações' para melhores resultados.",
      },
    ],
  },
  {
    id: 7042,
    name: "Inverno Mask Nano Máscara Hidronutritiva 150g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Desfrute do aconchego dessa máscara, que abraça a pele como um manto protetor, permitindo-a restaurar sua barreira de proteção natural.",
    fullDescription: "Inverno, tempo de repousar! Desfrute do aconchego dessa máscara, que abraça a pele como um manto protetor, permitindo-a restaurar sua barreira de proteção natural. Com ativos que recriam as reservas hídricas e nutricionais no interior da pele enquanto protegem a superfície, trazendo conforto e maciez. Ideal para todos os tipos de pele e coadjuvante em tratamentos de peles expostas a mudanças climáticas. Rendimento: ± 30 aplicações.",
    price: "R$ 141,43",
    image: invernoMaskHero,
    gallery: [invernoMaskImg],
    activeIngredients: [
      "Mica",
      "Calcidone®",
      "Colágeno Hidrolisado",
      "Manteiga de Cupuaçu",
      "Cera de Carnaúba",
      "Nano Lift",
      "Extrato de Aveia",
      "Óleo de Gérmen de Trigo",
      "Extrato de Levedo",
      "Ácido Hialurônico",
    ],
    protocolSteps: [
      {
        step: 1,
        title: "Aplicação",
        description: "Aplique uma camada uniforme sobre a pele limpa e deixe agir por 20 minutos.",
      },
      {
        step: 2,
        title: "Uso Profissional",
        description: "Pode ser usada como pré-emoliente em limpezas de pele profissionais.",
      },
      {
        step: 3,
        title: "Remoção",
        description: "Remova com água morna ou algodão umedecido. Use a linha completa '4 Estações' para melhores resultados.",
      },
    ],
  },
  {
    id: 7043,
    name: "Primavera Mask Nano Máscara Renovadora 150g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Presenteie sua pele com uma fusão de ingredientes que revitalizam e transformam a textura e radiância, deixando-a macia e aveludada como uma pétala de rosa.",
    fullDescription: "Primavera, a estação dos recomeços! Presenteie sua pele com uma fusão de ingredientes que revitalizam e transformam a textura e radiância, deixando-a macia e aveludada como uma pétala de rosa. Um novo rosto se revela, mais claro, luminoso, resplandecente. Ideal para todos os tipos de pele como coadjuvante em protocolos de hidratação e clareamento. Rendimento: ± 30 aplicações.",
    price: "R$ 141,43",
    image: primaveraMaskHero,
    gallery: [primaveraMaskImg],
    activeIngredients: [
      "Extrato Hidroglicólico de Hibiscus",
      "Ácido Hialurônico",
      "Colágeno Hidrolisado",
      "Nano Hydrolift",
      "Extrato de Orquídea",
      "Extrato de Maracujá",
      "Proteína do Leite",
    ],
    protocolSteps: [
      {
        step: 1,
        title: "Aplicação",
        description: "Aplique uma camada uniforme sobre a pele limpa e deixe agir por 20 minutos.",
      },
      {
        step: 2,
        title: "Remoção",
        description: "Remova com água morna ou algodão umedecido.",
      },
      {
        step: 3,
        title: "Dica Profissional",
        description: "Use a linha completa '4 Estações' para melhores resultados em protocolos de hidratação e clareamento.",
      },
    ],
  },
  {
    id: 7044,
    name: "Stellar Mask Enzimática 100g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Uma fusão cósmica de benefícios que transformam a pele. Esfoliação eficaz com enzimas naturais.",
    fullDescription: "A Máscara Enzimática foi desenvolvida para o uso profissional estético. Com a combinação de ativos naturais, essa máscara proporciona uma esfoliação eficaz, capaz de remover células mortas e preparar a pele para a absorção otimizada de ativos.",
    price: "R$ 185,57",
    image: stellarMaskEnzimaticaOfficial,
    activeIngredients: [
      "Nano Ozônio Corporal",
      "Ácido Poliglutâmico",
      "Extrato de Uva",
      "Extrato de Bromelina (Abacaxi)",
      "Extrato de Papaína (Mamão)",
    ],
  },
  {
    id: 7045,
    name: "Stellar Mask Matificante 100g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Encontre a perfeita harmonia para uma pele suave e uniforme. Controle de oleosidade com ativo probiótico.",
    fullDescription: "Desenvolvida especialmente para regular a produção de oleosidade com ativo probiótico, mantendo a pele equilibrada e matificada, revelando uma aparência fresca e sem brilho excessivo.",
    price: "R$ 185,57",
    image: stellarMaskMatificanteOfficial,
    activeIngredients: [
      "Extrato de Chá Verde",
      "PCA de Zinco",
      "Acne Less",
      "Symbiocaps LA",
    ],
  },
  {
    id: 7046,
    name: "Stellar Mask Rejuvenescedora 100g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Máscara rejuvenescedora que maximiza resultados em peles maduras. Previne envelhecimento precoce com alto poder de reparação.",
    fullDescription: "Máscara rejuvenescedora desenvolvida para maximizar resultados em peles maduras. Previne o envelhecimento precoce, oferece alto poder de reparação, trata rugas e linhas finas, proporcionando efeito botox-like e alternativa segura ao retinol.",
    price: "R$ 185,57",
    image: stellarMaskRejuvenescedoraOfficial,
    activeIngredients: [
      "NanoTech-C",
      "Extrato de Gengibre",
      "Hypskin®",
      "Revinage®",
      "Nano BTX Solution",
    ],
    applicationIndications: [
      "Anti-idade",
      "Exclusivo para profissional",
      "Facial",
      "Não indicado para gestantes",
      "Rugas",
    ],
  },
  {
    id: 7047,
    name: "Stellar Mask Hidronutritiva 100g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Mergulhe na hidratação profunda com ação prebiótica. Textura gélida que acalma e revitaliza a pele.",
    fullDescription: "A Máscara Hidronutritiva é ideal para o uso profissional no pré e pós procedimento. Com experiência sensorial de uma textura gélida, ela acalma e garante uma pele revitalizada e equilibrada.",
    price: "R$ 185,57",
    image: stellarMaskHidronutritivaOfficial,
    activeIngredients: [
      "D-Pantenol",
      "Extrato de Camomila",
      "Nano Caviar",
      "Moistshield™ HA",
      "Actibiome",
      "Pentavitin®",
    ],
  },
  {
    id: 7048,
    name: "Chokola Máscara de Chocolate 200g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: false,
    description: "Máscara multifuncional, nutritiva, antioxidante e firmadora. Rejuvenesce e retarda o envelhecimento com aroma agradável de chocolate.",
    fullDescription: "Máscara multifuncional com extrato de cacau que nutre, protege e firma a pele. Rica em antioxidantes, rejuvenesce e retarda o processo de envelhecimento. Promove hidratação intensa e reequilibra o microbioma cutâneo com seu delicioso aroma de chocolate.",
    price: "R$ 157,00",
    image: chokolaMascaraOfficial,
    activeIngredients: [
      "Ácido Ferúlico",
      "Extrato de Cacau",
      "Óleo de Amêndoas Doce",
      "Ecoskin® (Pré/Probiótico)",
      "NV Retinol",
      "Nanovetor Q-10",
    ],
    applicationIndications: [
      "Chocolate",
      "Facial e Corporal",
      "Indicado para todos os tipos de pele",
      "Máscara",
      "Nova fórmula",
      "Nutrição",
    ],
  },
  {
    id: 7049,
    name: "Ultimate Estetic+ Nano Máscara Tensora de Ouro 250g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Máscara tensora mágica com Ouro para revitalização cutânea. Efeito lifting imediato e produção de colágeno/elastina.",
    fullDescription: "Uma máscara tensora mágica de alto impacto na revitalização cutânea e antienvelhecimento exclusiva. Formulada com Ouro, precioso elemento que catalisa o transporte dos nutrientes para o interior das células e tem papel importante na produção de colágeno e elastina. Enriquecida com Colágeno, Ginseng e Ginkgo Biloba para hidratação, nutrição e restauração da vitalidade da pele.",
    price: "R$ 140,00",
    image: ultimateEsteticOuroOfficial,
    activeIngredients: [
      "Mica Dourada",
      "Ginkgo Biloba",
      "Extrato Glicólico de Hamamelis Virginiana L.",
      "Colágeno Hidrolisado",
      "Nanopartículas de Ouro",
      "Extrato de Ginseng",
      "Extrato de Sálvia",
      "Alantoína",
    ],
    applicationIndications: [
      "Anti-idade",
      "Exclusivo para profissional",
      "Facial",
      "Hidratação",
      "Indicado para todos os tipos de pele",
      "Lifting",
      "Nanotecnologia",
      "Não indicado para gestantes",
    ],
  },
  {
    id: 7050,
    name: "Marezi Nano Máscara Hidrocalmante 200g",
    brand: "Tulipia",
    category: "mascara",
    isProfessional: true,
    description: "Máscara calmante profissional com Drone EGF, ácido hialurônico e beta-glucana para peles sensíveis.",
    price: "R$ 141,43",
    image: mareziMascaraHero,
    activeIngredients: [
      "Drone EGF",
      "Ácido Hialurônico",
      "Calmaline",
      "Beta-Glucana",
      "Algas Marinhas",
    ],
  },
];

// ============================================
// NIACINE+ - Linha Niacinamida
// ============================================

export const tulipiaNiacine: Product[] = [
  {
    id: 7060,
    name: "Niacine+ Sérum de Niacinamida 30ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum concentrado de niacinamida para controle de oleosidade, redução de poros e uniformização",
    price: "R$ 139,00",
    image: niacineSerum,
  },
];

// ============================================
// DERMACOS - Anti-idade
// ============================================

export const tulipiaDermacos: Product[] = [
  {
    id: 7070,
    name: "Dermacos Booster Rejuvenescedor 30ml",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Booster potencializador de tratamentos anti-idade. Intensifica resultados",
    price: "R$ 199,00",
    image: dermacosBooster,
  },
  {
    id: 7071,
    name: "Dermacos Espuma de Limpeza Rejuvenescedora 150ml",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Possui ação antioxidante, limpa e purifica a pele. Reduz e previne sinais de envelhecimento.",
    fullDescription: "Espuma de limpeza rejuvenescedora com ação antioxidante que limpa profundamente e purifica a pele. Sua fórmula avançada reduz e previne sinais de envelhecimento, deixando a pele renovada e revitalizada.",
    price: "R$ 120,00",
    image: dermacosEspumaHero,
    gallery: [dermacosEspumaHero, dermacosEspumaLifestyle, dermacosEspumaUso],
    activeIngredients: [
      "Niacinamida 10%",
      "NV Hydratech (Lactato de Amônio)",
      "Óleo de Arula Nanoemulsão",
      "Revysol (Extrato de Framboesa)",
      "Extrato de Unia e Laranja",
      "NV Resveratrol ECO",
      "Óleo de Rosa Mosqueta",
      "Alantoína",
    ],
  },
];

// ============================================
// IMMORTALITE-C - Vitamina C
// ============================================

export const tulipiaImmortaliteC: Product[] = [
  {
    id: 7080,
    name: "Immortalite-C Nano Sérum de Vitamina C 50ml",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Possui ação clareadora e firmadora. Promove preenchimento e hidratação.",
    fullDescription: "Nano Sérum de Vitamina C com ação clareadora e firmadora. Sua nanotecnologia permite que os ativos penetrem profundamente na pele, promovendo preenchimento visível e hidratação intensa. Combate sinais de envelhecimento e uniformiza o tom da pele.",
    price: "R$ 159,00",
    image: immortaliteSerumOfficial,
    applicationIndications: [
      "Anti-idade",
      "Clareamento e uniformização da pele",
      "Eficácia comprovada",
      "Facial",
      "Hidratação",
      "Indicado para todos os tipos de pele",
      "Nanotecnologia",
      "Vitamina C",
    ],
    gallery: [immortaliteCHero, immortaliteCLaranja],
    activeIngredients: [
      "Ácido Hialurônico",
      "Algisium C® (Ácido Mandélico e Silício Orgânico)",
      "Nano Vitamina C (Palmitato de Ascorbila)",
      "Óleo de Romã",
    ],
  },
];

// ============================================
// HYDROGEN - Hidrogênio Molecular
// ============================================

export const tulipiaHydrogen: Product[] = [
  {
    id: 7090,
    name: "Hydrogen Bruma de Hidrogênio Molecular 50ml",
    brand: "Tulipia",
    category: "antioxidante",
    isProfessional: false,
    description: "Bruma facial com hidrogênio molecular. Potente antioxidante para proteção celular",
    price: "R$ 109,00",
    image: hydrogenBruma,
  },
];

// ============================================
// FIRM FLACCID - Firmeza
// ============================================

export const tulipiaFirmFlaccid: Product[] = [
  {
    id: 7100,
    name: "Firm Flaccid Nano Fluido Remineralizante 300ml",
    brand: "Tulipia",
    category: "firmeza",
    isProfessional: false,
    description: "Combate a flacidez com ação firmadora e hidratante. Assinatura Ana Paula Graf.",
    fullDescription: "Nano Fluido Remineralizante desenvolvido com a assinatura de Ana Paula Graf. Combate a flacidez com potente ação firmadora e hidratante. Sua tecnologia nano permite penetração profunda dos ativos, promovendo firmeza visível e pele revitalizada.",
    price: "R$ 169,00",
    image: firmFlaccid300mlOfficial,
    applicationIndications: [
      "Facial e Corporal",
      "Firmeza",
      "Flacidez",
      "Hidratação",
      "Indicado para todos os tipos de pele",
      "Nanotecnologia",
    ],
    activeIngredients: [
      "Adenosina®",
      "Nano Hydra Lift (Ácido Hialurônico)",
      "Colágeno Hidrolisado",
      "Algisium C® (Ácido Mandélico e Silício Orgânico)",
      "Sulfato de Zinco",
      "Óleo de Sódio",
      "Aloe Vera",
      "Algas Marinhas",
    ],
  },
  {
    id: 7101,
    name: "Firm Flaccid Nano Fluido Remineralizante 60ml",
    brand: "Tulipia",
    category: "firmeza",
    isProfessional: false,
    description: "Fluido corporal para firmeza - versão facial/travel size",
    price: "R$ 69,00",
    image: firmFlaccid60ml,
  },
];

// ============================================
// LIFE C+ - Vitamina C
// ============================================

export const tulipiaLifeC: Product[] = [
  {
    id: 7110,
    name: "Life C+ Nano Sabonete Mousse Home Care 150ml",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Sabonete mousse com vitamina C nano encapsulada, Biofruits e ácido ferúlico. Aplicador com microcerdas para limpeza profunda.",
    fullDescription: "Sabonete mousse inovador com vitamina C nano encapsulada para limpeza e iluminação simultâneas. Conta com Biofruits para renovação celular suave e ácido ferúlico para potencializar a ação antioxidante. O aplicador com microcerdas promove limpeza profunda sem agredir a pele.",
    price: "R$ 119,00",
    image: lifeCsaboneteMouseNew,
    activeIngredients: [
      "Vitamina C Nano",
      "Biofruits",
      "Ácido Ferúlico",
      "D-Pantenol",
    ],
  },
  {
    id: 7111,
    name: "Life C+ Nano Máscara Iluminadora 150g",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: true,
    description: "Máscara com tripla ação: conforto imediato, poder ultra clareador e alta hidratação com NanoTech-C e Resveratrol.",
    fullDescription: "Máscara facial com tripla ação: conforto e maciez imediatos graças à manteiga de karité e óleo de amêndoas; poder ultra clareador e rejuvenescedor com vitamina C, ácido ferúlico e phloretin; e alta hidratação/nutrição com ceramidas e arginina. Restaura o brilho e a saúde da pele enquanto combate os radicais livres.",
    price: "R$ 180,00",
    image: lifeCMascaraNew,
    activeIngredients: [
      "Ácido Ferúlico",
      "D-Pantenol",
      "Vitamina E",
      "Phloretin",
      "Manteiga de Karité",
      "NanoTech-C",
      "Palmitato de Ascorbila",
      "Resveratrol",
      "Óleo de Amêndoas Doce",
      "Nano Acqua",
      "Ceramidas",
      "Arginina",
      "PCA-Na",
      "Inulina",
      "Glicina",
    ],
    protocolSteps: [
      {
        step: 1,
        title: "Aplicação",
        description: "Aplique uma camada uniforme sobre toda a face limpa.",
      },
      {
        step: 2,
        title: "Tempo de Ação",
        description: "Deixe agir por 20 minutos.",
      },
      {
        step: 3,
        title: "Remoção",
        description: "Remova com algodão umedecido em água e seque delicadamente.",
      },
    ],
  },
  {
    id: 7112,
    name: "Life C+ Nano Peeling Abrasivo C 150g",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: true,
    description: "Peeling abrasivo de base argilosa que recupera textura uniforme e luminosidade. Esfoliação intensa com Vitamina C.",
    fullDescription: "O Nano Peeling Abrasivo Life C+ é uma base argilosa de alto impacto para esfoliação, que recupera a textura uniforme e a luminosidade da pele através de intensa ação abrasiva, revelando uma pele visivelmente mais clara e revigorada. Remove camadas superiores de células danificadas sem ressecamento ou irritação.",
    price: "R$ 170,00",
    image: lifeCPeelingAbrasivoOfficial,
    activeIngredients: [
      "Ácido Ferúlico",
      "Ácido Glicólico",
      "Argila Branca",
      "Cristais de Quartzo",
      "NanoTech-C",
      "Óleo de Amêndoas Doce",
      "Palmitato de Ascorbila",
      "Phloretin",
    ],
    applicationIndications: [
      "Creme",
      "Esfoliação",
      "Exclusivo para profissional",
      "Facial",
      "Indicado para todos os tipos de pele",
      "Nanotecnologia",
      "Não indicado para gestantes",
    ],
  },
  {
    id: 7113,
    name: "Life C+ Nano Sérum Clareador 20% 30ml",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Sérum com alta concentração de vitamina C 20%, Hyaxel e Alpha-Arbutina para clareamento intensivo.",
    fullDescription: "Sérum clareador de alta potência com 20% de vitamina C estabilizada. Formulado com Hyaxel para hidratação profunda e Alpha-Arbutina para uniformização do tom. Proporciona ação antioxidante intensa, clareamento de manchas e prevenção do envelhecimento precoce.",
    price: "R$ 212,86",
    image: lifeCSerumClareadorOfficial,
    applicationIndications: [
      "Clareamento e uniformização da pele",
      "Eficácia comprovada",
      "Facial",
      "Indicado para todos os tipos de pele",
      "Manchas",
      "Nanotecnologia",
      "Vitamina C",
    ],
    activeIngredients: [
      "Vitamina C 20%",
      "Hyaxel",
      "Alpha-Arbutina",
      "Ácido Ferúlico",
      "Vitamina E",
    ],
  },
  {
    id: 7114,
    name: "Life C+ Monodose Clareadora de Vitamina C 4ml (5 amp)",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: true,
    description: "Ampolas profissionais com 10% de vitamina C e Nano Hydrolift para microagulhamento ou iontoforese.",
    fullDescription: "Blend profissional concentrado com 10% de vitamina C estabilizada e Nano Hydrolift. Ideal para protocolos de microagulhamento, iontoforese ou eletroporação. Promove clareamento intensivo, estímulo de colágeno e rejuvenescimento visível.",
    price: "R$ 257,00",
    image: lifeCMonodoseNew,
    activeIngredients: [
      "Vitamina C 10%",
      "Nano Hydrolift",
      "Ácido Hialurônico",
      "Peptídeos",
    ],
  },
  {
    id: 7115,
    name: "Life C+ Nano Tônico 110ml",
    brand: "Tulipia",
    category: "vitamina-c",
    isProfessional: false,
    description: "Tônico facial com vitamina C para preparação e potencialização de tratamentos clareadores.",
    price: "R$ 89,00",
    image: lifeCTonicoNew,
    activeIngredients: [
      "Vitamina C Nano",
      "Ácido Hialurônico",
      "Alantoína",
    ],
  },
];

// ============================================
// SWEET LIPS - Cuidado Labial
// ============================================

export const tulipiaSweetLips: Product[] = [
  {
    id: 7120,
    name: "Sweet Lips Esfoliante Labial Cereja 15g",
    brand: "Tulipia",
    category: "labial",
    isProfessional: false,
    description: "Esfoliante labial anti-idade com vitamina E, manteiga de karité e óleos de coco e jojoba. Fragrância de cereja.",
    fullDescription: "Esfoliante labial com ação rejuvenescedora e regeneradora. Remove células mortas sem lesionar, estimula a renovação celular e ativa a microcirculação. Com vitamina E antioxidante, manteiga de karité e óleos de coco e jojoba para hidratação intensa. Ideal para protocolos de microagulhamento e micropigmentação labial.",
    price: "R$ 79,00",
    image: sweetLipsEsfolianteCereja,
    activeIngredients: [
      "Vitamina E",
      "Manteiga de Karité",
      "Óleo de Coco",
      "Óleo de Jojoba",
      "Microesferas Esfoliantes",
    ],
  },
  {
    id: 7121,
    name: "Sweet Lips Esfoliante Labial Tutti Frutti 15g",
    brand: "Tulipia",
    category: "labial",
    isProfessional: false,
    description: "Esfoliante labial sabor tutti frutti. Remove células mortas e suaviza os lábios",
    price: "R$ 79,00",
    image: sweetLipsEsfolianteCereja,
  },
  {
    id: 7122,
    name: "Sweet Lips Gloss Labial Cereja 10g",
    brand: "Tulipia",
    category: "labial",
    isProfessional: false,
    description: "Gloss com Dragon's Blood LP, DMAE e ácido hialurônico. Ultra hidratante e rejuvenescedor.",
    fullDescription: "Gloss labial com ação ultra hidratante e rejuvenescedora. Dragon's Blood LP repara e suaviza, DMAE previne envelhecimento e reduz rugas verticais, ácido hialurônico hidrata intensamente. Restaura volume e textura aveludada dos lábios.",
    price: "R$ 69,00",
    image: sweetLipsGlossCereja,
    activeIngredients: [
      "Dragon's Blood LP",
      "Drone EGF",
      "Nano Ácido Hialurônico",
      "Nano DMAE",
      "Óleo de Amêndoas Doce",
    ],
  },
  {
    id: 7123,
    name: "Sweet Lips Gloss Labial Tutti Frutti 10g",
    brand: "Tulipia",
    category: "labial",
    isProfessional: false,
    description: "Gloss labial com Dragon's Blood LP, DMAE e ácido hialurônico. Ultra hidratante e rejuvenescedor com sabor tutti frutti.",
    fullDescription: "Gloss labial com ação ultra hidratante e rejuvenescedora. Dragon's Blood LP repara e suaviza, DMAE previne envelhecimento e reduz rugas verticais, ácido hialurônico hidrata intensamente. Restaura volume e textura aveludada dos lábios com delicioso sabor tutti frutti.",
    price: "R$ 69,00",
    image: sweetLipsTuttiFruttiOfficial,
    activeIngredients: [
      "Dragon's Blood LP",
      "Drone EGF",
      "Nano Ácido Hialurônico",
      "Nano DMAE",
      "Óleo de Amêndoas Doce",
    ],
    applicationIndications: [
      "Hidratação",
      "Labial",
      "Rejuvenescimento",
      "Volume",
    ],
  },
  {
    id: 7124,
    name: "Sweet Lips Fluido Microagulhamento Labial",
    brand: "Tulipia",
    category: "labial",
    isProfessional: true,
    description: "Fluido para microagulhamento labial profissional. Estimula colágeno e volume natural",
    price: "Consultar",
    image: sweetLipsFluido,
  },
  {
    id: 7125,
    name: "Sweet Lips Fluido Ultra Concentrado Labial 5ml (3 amp)",
    brand: "Tulipia",
    category: "labial",
    isProfessional: true,
    description: "Ampolas concentradas para tratamento labial profissional. Preenchimento e rejuvenescimento",
    price: "R$ 347,00",
    image: sweetLipsFluido,
  },
];

// ============================================
// HIDRASOL - Fotoprotetores
// ============================================

export const tulipiaHidrasol: Product[] = [
  {
    id: 7130,
    name: "Hidrasol Fotoprotetor Facial FPS 30 50g",
    brand: "Tulipia",
    category: "protetor-solar",
    isProfessional: false,
    description: "Fotoprotetor facial FPS 30 com textura leve. Proteção UVA/UVB",
    price: "R$ 119,00",
    image: hidrasolFps30Hero,
  },
  {
    id: 7131,
    name: "Hidrasol Fotoprotetor Facial FPS 60 50g",
    brand: "Tulipia",
    category: "protetor-solar",
    isProfessional: false,
    description: "Fotoprotetor facial FPS 60 de alta proteção. Ideal para exposição intensa",
    price: "R$ 129,00",
    image: hidrasolFps60Hero,
  },
];

// ============================================
// HIALUX - Ácido Hialurônico
// ============================================

export const tulipiaHialux: Product[] = [
  {
    id: 7140,
    name: "Hialux Sabonete Clareador 110ml",
    brand: "Tulipia",
    category: "acido-hialuronico",
    isProfessional: false,
    description: "Sabonete clareador com ácido hialurônico e ácido tranexâmico. Limpa, hidrata e clareia simultaneamente.",
    fullDescription: "Sabonete clareador com ácido hialurônico, ácido tranexâmico e Nano Up Lift. Promove limpeza suave enquanto clareia manchas e uniformiza o tom da pele. Ideal para todos os tipos de pele, especialmente aquelas com manchas e hiperpigmentação.",
    price: "R$ 99,00",
    image: hialuxSaboneteHero,
    activeIngredients: [
      "Ácido Tranexâmico",
      "Ácido Hialurônico",
      "Nano Up Lift",
    ],
  },
  {
    id: 7141,
    name: "Hialux Sérum Preenchedor 30ml",
    brand: "Tulipia",
    category: "acido-hialuronico",
    isProfessional: false,
    description: "Sérum preenchedor com 6 tipos de ácido hialurônico e 4 bioestimuladores. Hidratação profunda e preenchimento de linhas.",
    fullDescription: "Sérum concentrado com 6 tipos de ácido hialurônico de diferentes pesos moleculares que atuam em todas as camadas da pele. Conta com 4 bioestimuladores, vitamina E, alantoína e D-pantenol para nutrição completa. Promove preenchimento visível, hidratação profunda e rejuvenescimento.",
    price: "R$ 199,00",
    image: hialuxSerumOfficial,
    applicationIndications: [
      "Anti-idade",
      "Facial",
      "Hidratação",
      "Indicado para todos os tipos de pele",
      "Nanotecnologia",
      "Preenchimento",
    ],
    activeIngredients: [
      "6 Tipos de Ácido Hialurônico",
      "4 Bioestimuladores",
      "Vitamina E",
      "Alantoína",
      "D-Pantenol",
    ],
  },
  {
    id: 7142,
    name: "Hialux Creme Preenchedor 150g",
    brand: "Tulipia",
    category: "acido-hialuronico",
    isProfessional: true,
    description: "Creme preenchedor profissional com 6 tipos de ácido hialurônico e 4 bioestimuladores para tratamentos intensivos.",
    fullDescription: "Creme profissional com alta concentração de 6 tipos de ácido hialurônico, 4 bioestimuladores, Epidermosil e Nano Up Lift. Ideal para protocolos de hidratação intensiva, preenchimento e rejuvenescimento facial. Proporciona firmeza, elasticidade e volume à pele.",
    price: "R$ 170,00",
    image: hialuxCremeHero,
    activeIngredients: [
      "6 Tipos de Ácido Hialurônico",
      "4 Bioestimuladores",
      "Epidermosil",
      "Nano Up Lift",
    ],
  },
];

// ============================================
// CLAREADORES
// ============================================

export const tulipiaClareadores: Product[] = [
  {
    id: 7150,
    name: "Citrogel Nano Gel Clareador da Pele 30g",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Gel clareador com ácido kójico, extrato de limão e Nano Acids para tratamento de manchas.",
    fullDescription: "Gel clareador concentrado com tecnologia nano para tratamento de manchas localizadas. Ácido kójico e extrato de limão promovem clareamento eficaz, enquanto Nano Acids garantem permeação profunda dos ativos.",
    price: "R$ 149,00",
    image: citrogelClareadorNew,
    activeIngredients: [
      "Ácido Kójico",
      "Extrato de Limão",
      "Nano Acids",
    ],
  },
  {
    id: 7151,
    name: "Sepiwhite Gel Clareador 30g",
    brand: "Tulipia",
    category: "clareamento",
    isProfessional: false,
    description: "Gel clareador com Sepiwhite™ MSH, ácido mandélico e niacinamida para uniformização.",
    fullDescription: "Gel clareador premium com Sepiwhite™ MSH, tecnologia exclusiva que inibe a síntese de melanina. Formulado com ácido mandélico para renovação suave e niacinamida para uniformização do tom e controle de oleosidade.",
    price: "R$ 170,00",
    image: sepiwhiteGelNew,
    activeIngredients: [
      "Sepiwhite™ MSH",
      "Ácido Mandélico",
      "Niacinamida",
    ],
  },
];

// ============================================
// CILS & LASHES - Área dos Olhos
// ============================================

export const tulipiaCilsLashes: Product[] = [
  {
    id: 7160,
    name: "Cils & Lashes Sérum para Cílios e Sobrancelhas 8ml",
    brand: "Tulipia",
    category: "area-olhos",
    isProfessional: false,
    description: "Sérum fortalecedor e estimulante do crescimento de cílios e sobrancelhas",
    price: "R$ 109,00",
    image: placeholder,
  },
  {
    id: 7161,
    name: "Miracle Eyes Nano Gel Área dos Olhos 13g",
    brand: "Tulipia",
    category: "area-olhos",
    isProfessional: false,
    description: "Dermocosmético completo para sinais de estresse e idade ao redor dos olhos. Reduz olheiras e proporciona efeito lifting imediato.",
    fullDescription: "Dermocosmético completo para combater os sinais de estresse e idade ao redor dos olhos. Reduz olheiras melânicas e vasculares, melhora a microcirculação e possui efeito lifting imediato. Fórmula testada oftalmologicamente e hipoalergênica.",
    price: "R$ 129,00",
    image: miracleEyesOfficial,
    activeIngredients: [
      "CoffeeSkin®",
      "DMAE",
      "Matrixyl™",
      "Vitamina E",
      "Nanovetor Vitamina C",
      "Alantoína",
      "Palmitato de Ascorbila",
      "Nano Up Lift",
      "Silício Orgânico",
      "Óleos Essenciais",
      "Ácido Hialurônico",
    ],
    applicationIndications: [
      "Anti-idade",
      "Eficácia comprovada",
      "Gel",
      "Hidratação",
      "Hipoalergênico",
      "Home care",
      "Peles sensíveis",
      "Lifting",
      "Olheiras",
      "Rugas",
      "Testado Oftalmologicamente",
    ],
  },
];

// ============================================
// CORPORAL PROFISSIONAL
// ============================================

export const tulipiaCorporalPro: Product[] = [
  {
    id: 7170,
    name: "Corpus Máscara Corporal Poliativa 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Máscara corporal de argila amarela com colágeno para firmeza, nutrição e tratamentos redutores.",
    fullDescription: "Máscara corporal profissional poliativa com argila amarela e colágeno. Promove firmeza, nutrição intensa e potencializa tratamentos redutores e anticelulite. Ideal para envolvimentos corporais e protocolos de cabine.",
    price: "R$ 199,00",
    image: corpusArgilaHero,
    activeIngredients: [
      "Argila Amarela",
      "Colágeno",
      "Ativos Redutores",
    ],
  },
  {
    id: 7171,
    name: "Elegance Body Nano Spray Lipotérmico 5 em 1 300ml",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Spray lipotérmico 5 em 1: aquece, tonifica, ativa circulação, reduz medidas e potencializa tratamentos corporais.",
    fullDescription: "Spray lipotérmico profissional 5 em 1 com ação térmica que aquece a região, ativa a microcirculação, tonifica os tecidos, auxilia na redução de medidas e potencializa a absorção de ativos em tratamentos corporais.",
    price: "R$ 212,86",
    image: eleganceSprayHero,
    activeIngredients: [
      "Ativos Lipotérmicos",
      "Cafeína",
      "Mentol",
    ],
  },
  {
    id: 7172,
    name: "Elegance Nano Dual-Peeling Esfoliante 500g",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Esfoliante 3 em 1: ação mecânica, química (10% Ácido Glicólico) e gomagem para renovação completa.",
    fullDescription: "Gel esfoliante dermodinâmico multiação para preparação perfeita de diversos protocolos. Combina esfoliação mecânica com cristais de bambu e quartzo, esfoliação química com 10% de Ácido Glicólico e ação gomagem com cera de carnaúba.",
    price: "R$ 212,86",
    image: eleganceSprayHero,
    activeIngredients: [
      "Ácido Glicólico 10%",
      "Ácido Hialurônico",
      "Cristais de Bambu",
      "Cera de Carnaúba",
      "Cristais de Quartzo",
    ],
  },
];

// ============================================
// FLORATY - Limpeza de Pele Profissional
// ============================================

export const tulipiaFloraty: Product[] = [
  {
    id: 7180,
    name: "Floraty Loção Amolecedora de Cravos 500ml",
    brand: "Tulipia",
    category: "limpeza-pele",
    isProfessional: true,
    description: "Um dos grandes segredos de uma limpeza de pele perfeita é a emoliência bem realizada. Emoliente eficaz sem efeitos indesejáveis.",
    fullDescription: "Floraty Amolecedor de Cravos contém AMP, um emoliente tão eficaz quanto a trietanolamina, porém sem os efeitos indesejáveis, tais como irritação e pinicação. Hidrata profundamente, promove emoliência e evita o ressecamento da pele. Indicado para todos os tipos de pele, inclusive sensíveis. Fórmula vegana e zero glúten.",
    price: "R$ 141,43",
    image: floratyAmolecedorCravos,
    activeIngredients: [
      "Alantoína",
      "AMP Ultra PC 2000",
      "Extrato de Camomila",
    ],
  },
  {
    id: 7181,
    name: "Floraty Creme Esfoliante Apricot 200g",
    brand: "Tulipia",
    category: "limpeza-pele",
    isProfessional: true,
    description: "Esfoliante físico de textura suave e cremosa. Microesferas removem impurezas deixando a pele sedosa e radiante.",
    fullDescription: "O Creme Esfoliante Apricot possui textura suave e cremosa, que desliza facilmente sobre a pele, deixando-a visivelmente mais macia, iluminada e com toque aveludado. Suas microesferas promovem uma esfoliação gentil, auxiliando na remoção de células mortas e impurezas, sem causar irritações. Rico em ácidos graxos essenciais Ômega 9 e Ômega 6, oferece emoliência intensa.",
    price: "R$ 141,43",
    image: floratyEsfolianteApricot,
    activeIngredients: [
      "Semente de Apricot (Damasco)",
      "Ômega 9 (Ácido Oleico)",
      "Ômega 6 (Ácido Linoleico)",
      "Vitamina B",
    ],
    applicationIndications: [
      "Creme",
      "Esfoliação",
      "Exclusivo para profissional",
      "Facial e Corporal",
      "Higienização",
      "Indicado para todos os tipos de pele",
      "Livre de Parabeno",
      "Vegano",
    ],
  },
  {
    id: 7182,
    name: "Floraty Creme Emoliente para Cravos 200g",
    brand: "Tulipia",
    category: "limpeza-pele",
    isProfessional: true,
    description: "Creme emoliente sem trietanolamina para preparo perfeito da pele antes da extração.",
    fullDescription: "Creme emoliente profissional formulado sem trietanolamina para amolecimento de cravos sem irritação ou coceira. Contém AMP Ultra PC 2000, um emoliente tão eficaz quanto a trietanolamina, mas sem efeitos indesejáveis.",
    price: "R$ 141,43",
    image: floratyEmolienteHero,
    activeIngredients: [
      "AMP Ultra PC 2000",
      "Óleo de Gergelim",
      "Óleo de Semente de Uva",
    ],
  },
];

// ============================================
// MAREZI - Peles Sensíveis
// ============================================

export const tulipiaMarezi: Product[] = [
  {
    id: 7190,
    name: "Marezi Nano Sabonete Hidratante 110ml",
    brand: "Tulipia",
    category: "pele-sensivel",
    isProfessional: false,
    description: "Sabonete hidratante com algas marinhas, água de coco, aloe vera e arginina para peles sensíveis.",
    fullDescription: "Sabonete líquido hidratante formulado especialmente para peles sensíveis e reativas. Contém algas marinhas, água de coco, aloe vera e arginina que promovem limpeza suave, hidratação e conforto sem agredir a barreira cutânea.",
    price: "R$ 69,00",
    image: mareziSaboneteHero,
    activeIngredients: [
      "Algas Marinhas",
      "Água de Coco",
      "Aloe Vera",
      "Arginina",
    ],
  },
  {
    id: 7191,
    name: "Marezi Nano Máscara Hidrocalmante 200g",
    brand: "Tulipia",
    category: "pele-sensivel",
    isProfessional: true,
    description: "Máscara profissional com Drone EGF, ácido hialurônico, Calmaline, beta-glucana e algas marinhas.",
    fullDescription: "Máscara hidrocalmante profissional para peles sensíveis, irritadas e pós-procedimentos. Formulada com Drone EGF para regeneração, ácido hialurônico para hidratação, Calmaline para ação calmante, beta-glucana para fortalecimento da barreira e algas marinhas para nutrição.",
    price: "R$ 141,43",
    image: mareziMascaraHero,
    activeIngredients: [
      "Drone EGF",
      "Ácido Hialurônico",
      "Calmaline",
      "Beta-Glucana",
      "Algas Marinhas",
    ],
  },
  {
    id: 7192,
    name: "Marezi Nano Loção Tônica Remineralizante 110ml",
    brand: "Tulipia",
    category: "pele-sensivel",
    isProfessional: false,
    description: "Loção tônica com minerais para fortalecimento de peles sensíveis",
    price: "R$ 79,00",
    image: mareziSaboneteHero,
  },
];

// ============================================
// CITRATA - Pele Oleosa
// ============================================

export const tulipiaCitrata: Product[] = [
  {
    id: 7200,
    name: "Citrata Nano Loção Tônica Adstringente 110ml",
    brand: "Tulipia",
    category: "pele-oleosa",
    isProfessional: false,
    description: "Loção tônica com hamamelis, gluconolactona, lactato de mentila e Nano Mat para controle de oleosidade.",
    fullDescription: "Loção tônica adstringente para peles oleosas e mistas. Formulada com hamamelis para ação adstringente, gluconolactona para renovação suave, lactato de mentila para frescor e Nano Mat para controle do brilho e fechamento de poros.",
    price: "R$ 70,00",
    image: citrataLocaoHero,
    activeIngredients: [
      "Hamamelis",
      "Gluconolactona",
      "Lactato de Mentila",
      "Nano Mat",
    ],
  },
  {
    id: 7201,
    name: "Citrata Nano Loção Tônica Adstringente 300ml",
    brand: "Tulipia",
    category: "pele-oleosa",
    isProfessional: true,
    description: "Loção tônica adstringente - versão profissional",
    price: "R$ 129,00",
    image: citrataLocaoHero,
  },
  {
    id: 7202,
    name: "Citrata Nano Sabonete Equilibrante 110ml",
    brand: "Tulipia",
    category: "pele-oleosa",
    isProfessional: false,
    description: "Sabonete equilibrante com zinco PCA, ácido salicílico, extrato de tangerina e grapefruit.",
    fullDescription: "Sabonete líquido equilibrante para peles oleosas. Contém zinco PCA para regulação sebácea, ácido salicílico para desobstrução de poros, extratos de tangerina e grapefruit para frescor e controle de oleosidade sem ressecar.",
    price: "R$ 70,00",
    image: citrataSaboneteHero,
    activeIngredients: [
      "Zinco PCA",
      "Ácido Salicílico",
      "Extrato de Tangerina",
      "Extrato de Grapefruit",
    ],
  },
  {
    id: 7203,
    name: "Citrata Nano Sabonete Equilibrante 300ml",
    brand: "Tulipia",
    category: "pele-oleosa",
    isProfessional: true,
    description: "Sabonete equilibrante - versão profissional",
    price: "R$ 129,00",
    image: citrataSaboneteHero,
  },
];

// ============================================
// SÉRUNS
// ============================================

export const tulipiaSeruns: Product[] = [
  {
    id: 7210,
    name: "Age-Matte Sérum Antioleosidade 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum matificante com ácido salicílico, zinco PCA e niacinamida para controle de oleosidade.",
    fullDescription: "Sérum matificante que combina controle de oleosidade com ação anti-idade. Ácido salicílico desobstrui poros, zinco PCA regula a produção de sebo e niacinamida uniformiza o tom. Toque seco prolongado sem ressecar.",
    price: "R$ 149,00",
    image: ageMatteSerumNew,
    activeIngredients: [
      "Ácido Salicílico",
      "Zinco PCA",
      "Niacinamida",
    ],
  },
  {
    id: 7211,
    name: "Dermacoll Sérum Firmador de Colágeno 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum firmador com colágeno hidrolisado, peptídeos e ácido hialurônico.",
    fullDescription: "Sérum firmador de alta performance com colágeno hidrolisado para restauração da matriz extracelular, peptídeos bioativos para estímulo de neocolagenase e ácido hialurônico para hidratação profunda. Combate flacidez e melhora a textura da pele.",
    price: "R$ 149,00",
    image: dermacollSerumNew,
    activeIngredients: [
      "Colágeno Hidrolisado",
      "Peptídeos Bioativos",
      "Ácido Hialurônico",
    ],
  },
  {
    id: 7212,
    name: "Miracle 4D Nano Sérum Multifuncional 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum 4 em 1: hidrata, firma, clareia e protege. Tecnologia 4D Hyaluronic Acid.",
    price: "R$ 169,00",
    image: dermacollSerumNew,
  },
  {
    id: 7213,
    name: "Oligo-Nerox Nano Sérum Antirrugas 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum antirrugas com oligoelementos e Argireline®. Suaviza linhas de expressão.",
    price: "R$ 169,00",
    image: dermacollSerumNew,
  },
  {
    id: 7214,
    name: "Resilience Sérum Multirreparador Calmante 50ml",
    brand: "Tulipia",
    category: "serum",
    isProfessional: false,
    description: "Sérum calmante e reparador para peles sensibilizadas e pós-procedimentos",
    price: "R$ 129,00",
    image: resilienceSerum,
  },
];

// ============================================
// KINELYN - Antiacne
// ============================================

export const tulipiaKinelyn: Product[] = [
  {
    id: 7220,
    name: "Kinelyn Nano Gel Seborregulador 30g",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: false,
    description: "Gel regulador de sebo com ácido salicílico, zinco PCA, niacinamida e Nano Vit A para controle da acne e oleosidade.",
    fullDescription: "Gel seborregulador que atua no controle da produção de sebo e tratamento da acne. Com ácido salicílico para desobstrução dos poros, zinco PCA para regulação sebácea, niacinamida para uniformização e Nano Vit A para renovação celular.",
    price: "R$ 99,00",
    image: kinelynGelHero,
    activeIngredients: [
      "Ácido Salicílico",
      "Zinco PCA",
      "Niacinamida",
      "Nano Vit A",
    ],
  },
  {
    id: 7221,
    name: "Kinelyn Nano Loção Ultrassecativa 60ml",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: false,
    description: "Loção secativa com ácido glicólico, enxofre, óxido de zinco e mentol para tratamento de acne ativa.",
    fullDescription: "Loção ultrassecativa para tratamento intensivo de acne. Combina ácido glicólico para renovação, enxofre para ação antibacteriana, óxido de zinco para cicatrização e mentol para sensação refrescante e alívio.",
    price: "R$ 99,00",
    image: kinelynLocaoHero,
    activeIngredients: [
      "Ácido Glicólico",
      "Enxofre",
      "Óxido de Zinco",
      "Mentol",
    ],
  },
  {
    id: 7222,
    name: "Kinelyn Nano Máscara Ultrassecativa 200g",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: true,
    description: "Máscara profissional secativa com enxofre biossolúvel, niacinamida, argila branca e ácido glicólico.",
    fullDescription: "Máscara ultrassecativa profissional para tratamento intensivo de peles acneicas e oleosas. Formulada com enxofre biossolúvel, niacinamida, argila branca para absorção de oleosidade, ácido glicólico para renovação e palmitato de retinila para regeneração.",
    price: "R$ 157,00",
    image: kinelynMascaraHero,
    activeIngredients: [
      "Enxofre Biossolúvel",
      "Niacinamida",
      "Argila Branca",
      "Ácido Glicólico",
      "Palmitato de Retinila",
    ],
  },
  {
    id: 7223,
    name: "Kinelyn Sabonete Seborregulador 110ml",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: false,
    description: "Sabonete para peles acneicas. Limpa profundamente e controla oleosidade",
    price: "R$ 99,00",
    image: kinelynGelHero,
  },
  {
    id: 7224,
    name: "Kinelyn Sabonete Seborregulador 230ml",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: true,
    description: "Sabonete seborregulador - versão profissional",
    price: "R$ 170,00",
    image: kinelynGelHero,
  },
  {
    id: 7225,
    name: "Kinelyn Loção Ultrassecativa FPS30 Tonalizante 50ml",
    brand: "Tulipia",
    category: "antiacne",
    isProfessional: false,
    description: "Loção secativa com proteção solar e cobertura tonalizante. Trata e disfarça",
    price: "R$ 149,90",
    image: kinelynLocaoHero,
  },
];

// ============================================
// BODY HD - Corporal
// ============================================

export const tulipiaBodyHD: Product[] = [
  {
    id: 7230,
    name: "Body HD Creme de Massagem Redutor 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Creme redutor para massagem modeladora. Auxilia na redução de medidas",
    price: "R$ 185,57",
    image: bodyHdGelHiperemiante,
  },
  {
    id: 7231,
    name: "Body HD Gel Hiperemiante 500g",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Gel termogênico com Drone Celulite, Nano Caffeine e Pro Nano Capsaicin. Aquece e ativa metabolismo.",
    fullDescription: "Gel hiperemiante com fórmula rica em ativos termogênicos que provocam aquecimento local e melhoram a circulação. Drone Celulite, Nano Caffeine, Nano Ozônio e Pro Nano Capsaicin atuam no combate à celulite e gordura localizada.",
    price: "R$ 157,00",
    image: bodyHdGelHiperemiante,
    activeIngredients: [
      "Drone Celulite",
      "Nano Caffeine",
      "Nano Ozônio Corporal",
      "Pro Nano Capsaicin",
      "Extrato de Gengibre",
      "Alga Fucus",
    ],
  },
  {
    id: 7232,
    name: "Body HD Goma Esfoliante 500g",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Esfoliante dual-action (face e corpo) com pó de casca de arroz e óleos ozonizados.",
    fullDescription: "Goma esfoliante versátil que pode ser usada no corpo e na face. Com pó de casca de arroz para esfoliação suave, óleo de coco ozonizado para ação antimicrobiana e cafeína para ativação da circulação.",
    price: "R$ 157,00",
    image: bodyHdGomaEsfoliante,
    activeIngredients: [
      "Pó de Casca de Arroz",
      "Óleo de Coco Ozonizado",
      "Cafeína",
      "Óleo Essencial de Pimenta Preta",
    ],
  },
  {
    id: 7233,
    name: "Body HD Gel Crioterápico 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Gel crioterápico com mentol, cânfora e L-carnitina para drenagem e combate à celulite.",
    fullDescription: "Gel com propriedades crioterápicas que promovem sensação de resfriamento. Estimula o sistema linfático, elimina toxinas e ácidos graxos. Potencializa a drenagem linfática e combate celulite e flacidez.",
    price: "R$ 199,00",
    image: bodyHdGelCrioterapico,
    activeIngredients: [
      "Mentol",
      "Cânfora",
      "L-Carnitina",
      "Nano Caffeine",
    ],
  },
  {
    id: 7234,
    name: "Body HD Creme de Massagem Neutro 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Creme de massagem neutro para uso profissional. Base para associações",
    price: "R$ 141,43",
    image: bodyHdGomaEsfoliante,
  },
];

// ============================================
// MOOVY - Corporal Ozonizado
// ============================================

export const tulipiaMoovy: Product[] = [
  {
    id: 7240,
    name: "Moovy Creme de Massagem Ozonizado 1kg",
    brand: "Tulipia",
    category: "corporal",
    isProfessional: true,
    description: "Creme de massagem com Nano Ozônio Corporal. Bioestimulante tecidual que oxigena e revitaliza.",
    fullDescription: "Creme de massagem profissional enriquecido com Nano Ozônio Corporal, um bioestimulante tecidual que promove oxigenação celular, melhora a circulação e revitaliza a pele. Ideal para massagens modeladoras e tratamentos corporais.",
    price: "R$ 199,00",
    image: moovyCremeOzonizado,
    activeIngredients: [
      "Nano Ozônio Corporal",
    ],
  },
];

// ============================================
// TRICO GENETICIST - Capilar
// ============================================

export const tulipiaTricoGeneticist: Product[] = [
  {
    id: 7250,
    name: "Trico Geneticist Tônico Capilar Antiqueda 110ml",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: false,
    description: "Tônico capilar com Baicapil™, nano fatores de crescimento e biotina para tratamento de queda.",
    fullDescription: "Tônico capilar antiqueda com Baicapil™, tecnologia que fortalece o bulbo capilar e prolonga a fase de crescimento. Nano fatores de crescimento estimulam a proliferação celular e biotina nutre os fios desde a raiz.",
    price: "R$ 159,00",
    image: tricoGeneticistTonico,
    activeIngredients: [
      "Baicapil™",
      "Nano Fatores de Crescimento",
      "Biotina",
    ],
  },
  {
    id: 7251,
    name: "Trico Geneticist Nano Shampoo Esfoliante 250ml",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: false,
    description: "Shampoo esfoliante com Ácido Salicílico, cristais de quartzo e sementes de damasco para limpeza profunda.",
    fullDescription: "Shampoo esfoliante que promove peeling do couro cabeludo com Ácido Salicílico, cristais de quartzo e sementes de damasco, removendo oleosidade e desobstruindo folículos. Enriquecido com extratos vegetais e células-tronco de maçã suíça.",
    price: "R$ 141,43",
    image: tricoGeneticistTonico,
    activeIngredients: [
      "Ácido Salicílico",
      "Cristais de Quartzo",
      "Células-Tronco de Maçã Suíça",
    ],
  },
  {
    id: 7252,
    name: "Trico Geneticist Shampoo Revitalizante 250ml",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: false,
    description: "Shampoo revitalizante para cabelos fracos e danificados com ativos fortalecedores.",
    price: "R$ 129,00",
    image: tricoGeneticistTonico,
  },
  {
    id: 7253,
    name: "Trico Geneticist Nano Plasma Capilar 4ml (5 amp)",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: true,
    description: "Concentrado nanotecnológico com Redensyl para regeneração capilar e combate à queda.",
    fullDescription: "Concentrado nanotecnológico para regeneração capilar. Com Redensyl, estimula novo ciclo de crescimento, aumentando comprimento e densidade dos fios. Ativos nanoencapsulados penetram profundamente no couro cabeludo.",
    price: "R$ 227,14",
    image: tricoGeneticistTonico,
    activeIngredients: [
      "Redensyl",
      "Nano Ativos Biotecnológicos",
    ],
  },
  {
    id: 7254,
    name: "Trico Geneticist Nano Máscara Regeneradora 200g",
    brand: "Tulipia",
    category: "capilar",
    isProfessional: false,
    description: "Máscara regeneradora com óleo de jojoba, aminoácidos, ceramidas e ácido hialurônico.",
    fullDescription: "Máscara que nutre comprimentos e pontas expostos à poluição e tratamentos químicos. Base emoliente com óleo de jojoba envolve os fios, enquanto aminoácidos, ceramidas e ácido hialurônico preenchem a fibra capilar.",
    price: "R$ 141,43",
    image: tricoGeneticistTonico,
    activeIngredients: [
      "Óleo de Jojoba",
      "Aminoácidos",
      "Ceramidas",
      "Ácido Hialurônico",
    ],
  },
];

// ============================================
// DERMO GENETICIST C+ - Microagulhamento
// ============================================

export const tulipiaDermoGeneticist: Product[] = [
  {
    id: 7260,
    name: "Dermo Geneticist C+ Supreme Formula 4ml (5 amp)",
    brand: "Tulipia",
    category: "microagulhamento",
    isProfessional: true,
    description: "Ampolas para microagulhamento com vitamina C e ativos regeneradores",
    price: "R$ 285,57",
    image: placeholder,
  },
];

// ============================================
// CALMSKIN - Calmante
// ============================================

export const tulipiaCalmskin: Product[] = [
  {
    id: 7270,
    name: "Calmskin Nano Pomada Ultracalmante 30g",
    brand: "Tulipia",
    category: "calmante",
    isProfessional: false,
    description: "Pomada não oleosa com hidratação intensa e efeito calmante. Fortalece a barreira cutânea e alivia vermelhidão.",
    fullDescription: "Pomada não oleosa para uso facial e corporal, com hidratação intensa e efeito calmante. Fortalece a barreira cutânea, melhora a aparência da pele, alivia vermelhidão e desconfortos. Nutre, protege e revitaliza a pele ressecada e fragilizada, auxiliando na reparação e proporcionando maciez. Ideal para áreas ressecadas como cotovelos, mãos e pés.",
    price: "R$ 69,00",
    image: calmskinPomadaOfficial,
    activeIngredients: [
      "Ácido Hialurônico",
      "Alpha Bisabolol",
      "Beta-Glucan",
      "Calmaline",
      "Colágeno Hidrolisado",
      "Glicirrizinato de Potássio",
      "Manteiga de Cupuaçu",
      "Nano Hydrolift",
      "Palmitato de Ascorbila",
      "Pantenol",
      "Pró-TG3",
    ],
    applicationIndications: [
      "Calmante",
      "Eficácia comprovada",
      "Facial e Corporal",
      "Fatores de Crescimento",
      "Hidratação",
      "Home care",
      "Indicado para todos os tipos de pele",
      "Pós Depilação",
      "Unhas",
    ],
  },
];

// ============================================
// OCEANOX - Magnésio
// ============================================

export const tulipiaOceanox: Product[] = [
  {
    id: 7280,
    name: "Oceanox Flocos de Magnésio Dérmico (3 x 50g)",
    brand: "Tulipia",
    category: "minerais",
    isProfessional: false,
    description: "Flocos de magnésio para banho ou uso tópico. Relaxante muscular e calmante",
    price: "R$ 127,14",
    image: placeholder,
  },
];

// ============================================
// ESSENCE - Limpeza
// ============================================

export const tulipiaEssence: Product[] = [
  {
    id: 7290,
    name: "Essence Cleansing Oil 150ml",
    brand: "Tulipia",
    category: "limpeza",
    isProfessional: false,
    description: "Óleo de limpeza para remoção de maquiagem e impurezas. Limpa sem agredir",
    price: "R$ 150,00",
    image: placeholder,
  },
];

// ============================================
// ANTI-IDADE (existentes atualizados)
// ============================================

export const tulipiaAntiIdade: Product[] = [
  {
    id: 7300,
    name: "Renotrat Gel Facial com DMAE",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Gel facial com DMAE para efeito tensor imediato. Firma e rejuvenesce a pele",
    price: "R$ 149,00",
    image: renotratGel,
  },
  {
    id: 7301,
    name: "Resilience Nano Sérum Dermoprotetor",
    brand: "Tulipia",
    category: "anti-idade",
    isProfessional: false,
    description: "Sérum dermoprotetor com tecnologia nano. Fortalece a barreira cutânea",
    price: "R$ 189,00",
    image: resilienceSerum,
  },
];

// ============================================
// KITS TULIPIA
// ============================================

export const tulipiaKits: Product[] = [
  {
    id: 7400,
    name: "Kit Stellar Mask Completo",
    brand: "Tulipia",
    category: "kit",
    isProfessional: false,
    description: "Kit com 4 máscaras Stellar: Enzimática, Matificante, Rejuvenescedora e Hidronutritiva.",
    fullDescription: "Kit completo com as 4 máscaras da linha Stellar: Enzimática para renovação, Matificante para controle de oleosidade, Rejuvenescedora para anti-idade e Hidronutritiva para hidratação profunda.",
    price: "R$ 649,00",
    image: stellarMaskEnzimaticaOfficial,
  },
  {
    id: 7401,
    name: "Kit Sweet Lips Tutti Frutti Professional",
    brand: "Tulipia",
    category: "kit",
    isProfessional: true,
    description: "Kit profissional completo para cuidado labial com esfoliante, gloss e fluido hidratante.",
    fullDescription: "Kit profissional Sweet Lips sabor Tutti Frutti com esfoliante labial para renovação, gloss hidratante com cor e brilho, e fluido nutritivo para tratamento intensivo dos lábios.",
    price: "R$ 139,00",
    image: kitSweetLipsHero,
  },
  {
    id: 7402,
    name: "Kit Life C+ Home Care",
    brand: "Tulipia",
    category: "kit",
    isProfessional: false,
    description: "Kit de vitamina C para uso domiciliar com sabonete mousse, tônico e sérum 20%.",
    fullDescription: "Kit completo da linha Life C+ para uso domiciliar. Inclui Sabonete Mousse para limpeza iluminadora, Tônico Facial antioxidante e Sérum 20% de Vitamina C para tratamento anti-idade e clareador.",
    price: "R$ 389,00",
    image: lifeCMascaraNew,
  },
  {
    id: 7403,
    name: "Kit Kinelyn Antiacne",
    brand: "Tulipia",
    category: "kit",
    isProfessional: false,
    description: "Kit completo para tratamento de acne: gel seborregulador, loção tônica e máscara secativa.",
    fullDescription: "Kit completo da linha Kinelyn para controle da acne e oleosidade. Inclui Nano Gel Facial seborregulador, Loção Tônica Adstringente e Máscara Facial Secativa para tratamento intensivo.",
    price: "R$ 269,00",
    image: kinelynGelHero,
  },
  {
    id: 7404,
    name: "Kit Trico Geneticist Professional",
    brand: "Tulipia",
    category: "kit",
    isProfessional: true,
    description: "Kit capilar completo: Nano Plasma, Shampoo Esfoliante, Tônico Antiqueda e Máscara Regeneradora.",
    fullDescription: "Kit profissional completo para tratamento de queda capilar. Inclui Nano Plasma Capilar (5 ampolas) para regeneração intensa, Shampoo Esfoliante para limpeza do couro cabeludo, Tônico Antiqueda com Redensyl e Máscara Regeneradora com aminoácidos e ceramidas.",
    price: "R$ 549,00",
    image: tricoGeneticistTonico,
    activeIngredients: [
      "Redensyl",
      "Kopexyl",
      "Fatores de Crescimento",
      "Ceramidas",
      "Ácido Hialurônico",
    ],
  },
];

// ============================================
// EXPORTAÇÃO DE TODOS OS PRODUTOS TULIPIA
// ============================================

export const allTulipiaWithImages: Product[] = [
  ...tulipiaLancamentos,
  ...tulipiaBlackSecret,
  ...tulipiaProskinRepair,
  ...tulipiaDermoEstetic,
  ...tulipiaMascaras,
  ...tulipiaNiacine,
  ...tulipiaDermacos,
  ...tulipiaImmortaliteC,
  ...tulipiaHydrogen,
  ...tulipiaFirmFlaccid,
  ...tulipiaLifeC,
  ...tulipiaSweetLips,
  ...tulipiaHidrasol,
  ...tulipiaHialux,
  ...tulipiaClareadores,
  ...tulipiaCilsLashes,
  ...tulipiaCorporalPro,
  ...tulipiaFloraty,
  ...tulipiaMarezi,
  ...tulipiaCitrata,
  ...tulipiaSeruns,
  ...tulipiaKinelyn,
  ...tulipiaBodyHD,
  ...tulipiaMoovy,
  ...tulipiaTricoGeneticist,
  ...tulipiaDermoGeneticist,
  ...tulipiaCalmskin,
  ...tulipiaOceanox,
  ...tulipiaEssence,
  ...tulipiaAntiIdade,
  ...tulipiaKits,
];

// Categorias disponíveis para filtros
export const tulipiaCategories = [
  { id: "lancamentos", label: "Lançamentos", count: tulipiaLancamentos.length },
  { id: "clareamento", label: "Clareamento", count: tulipiaBlackSecret.length + tulipiaClareadores.length },
  { id: "barreira-cutanea", label: "Barreira Cutânea", count: tulipiaProskinRepair.length },
  { id: "mascara", label: "Máscaras", count: tulipiaMascaras.length },
  { id: "vitamina-c", label: "Vitamina C", count: tulipiaLifeC.length + tulipiaImmortaliteC.length },
  { id: "labial", label: "Cuidado Labial", count: tulipiaSweetLips.length },
  { id: "serum", label: "Séruns", count: tulipiaSeruns.length + tulipiaNiacine.length },
  { id: "anti-idade", label: "Anti-idade", count: tulipiaAntiIdade.length + tulipiaDermacos.length },
  { id: "antiacne", label: "Antiacne", count: tulipiaKinelyn.length },
  { id: "acido-hialuronico", label: "Ácido Hialurônico", count: tulipiaHialux.length },
  { id: "protetor-solar", label: "Proteção Solar", count: tulipiaHidrasol.length },
  { id: "area-olhos", label: "Área dos Olhos", count: tulipiaCilsLashes.length },
  { id: "corporal", label: "Corporal", count: tulipiaBodyHD.length + tulipiaCorporalPro.length + tulipiaMoovy.length },
  { id: "capilar", label: "Capilar", count: tulipiaTricoGeneticist.length },
  { id: "pele-oleosa", label: "Pele Oleosa", count: tulipiaCitrata.length },
  { id: "pele-sensivel", label: "Pele Sensível", count: tulipiaMarezi.length },
  { id: "profissional", label: "Profissional", count: tulipiaDermoEstetic.length + tulipiaFloraty.length },
  { id: "kit", label: "Kits", count: tulipiaKits.length },
];
