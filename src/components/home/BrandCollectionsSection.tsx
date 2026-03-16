import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const CDN = "https://kmblagikmhbigsceyqjo.supabase.co/storage/v1/object/public/product-images/hero";

// CDN URLs for collection images
const blackSecretPeeling2Fases = `${CDN}/black-secret-2fases-hero.jpg`;
const lifeCSerum = `${CDN}/life-c-serum-20.jpg`;
const niacineEspuma = `${CDN}/niacine-espuma-150ml-hero.jpg`;
const sweetLipsEsfoliante = `${CDN}/sweet-lips-esfoliante.jpg`;

const acneXsome = `${CDN}/acne-xsome.jpg`;
const mellanWhiteXsome = `${CDN}/mellan-white-xsome-new.png`;
const trichologyXsome = `${CDN}/trichology-xsome.jpg`;
const skinFillXsome = `${CDN}/skin-fill-xsome-new.png`;

const hydraVitCHidratante = `${CDN}/hydra-vit-c-hidratante.jpg`;
const serumNiacinamida = `${CDN}/serum-niacinamida.jpg`;
const exoIntenseSerum = `${CDN}/exo-intense-serum.jpg`;
const aquafaceSabonete = `${CDN}/sabonete-aquaface.jpg`;

const smartPeptideSkinPro = `${CDN}/smart-peptide-skin-pro.jpg`;
const smartExoSkinPro = `${CDN}/smart-exo-skin-pro.jpg`;
const smartVitac = `${CDN}/smart-vitac.jpg`;
const smartHair = `${CDN}/smart-hair.jpg`;

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

interface BrandWithCollections {
  id: string;
  name: string;
  tagline: string;
  href: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  collections: Collection[];
}

const brandsWithCollections: BrandWithCollections[] = [
  {
    id: "tulipia",
    name: "Tulípia",
    tagline: "Nanotecnologia Premium",
    href: "/tulipia",
    bgColor: "bg-neutral-900",
    textColor: "text-white",
    accentColor: "text-neutral-400",
    collections: [
      {
        id: "black-secret",
        name: "Black Secret",
        description: "Clareamento profissional com tecnologia de ponta",
        image: blackSecretPeeling2Fases,
        href: "/tulipia?linha=black-secret",
      },
      {
        id: "life-c",
        name: "Life C+",
        description: "Vitamina C de alta performance",
        image: lifeCSerum,
        href: "/tulipia?linha=life-c",
      },
      {
        id: "niacine",
        name: "Niacine+",
        description: "Niacinamida para pele equilibrada",
        image: niacineEspuma,
        href: "/tulipia?linha=niacine",
      },
      {
        id: "sweet-lips",
        name: "Sweet Lips",
        description: "Tratamento labial completo",
        image: sweetLipsEsfoliante,
        href: "/tulipia?linha=sweet-lips",
      },
    ],
  },
  {
    id: "mezzo",
    name: "Mezzo",
    tagline: "Alta Performance",
    href: "/mezzo",
    bgColor: "bg-rose-950",
    textColor: "text-white",
    accentColor: "text-rose-300",
    collections: [
      {
        id: "xsome-acne",
        name: "Acne Xsome",
        description: "Tecnologia exossoma antiacne",
        image: acneXsome,
        href: "/mezzo?linha=acne-xsome",
      },
      {
        id: "mellan-white",
        name: "Mellan White",
        description: "Clareamento com exossomas",
        image: mellanWhiteXsome,
        href: "/mezzo?linha=mellan",
      },
      {
        id: "trichology",
        name: "Trichology",
        description: "Tratamento capilar avançado",
        image: trichologyXsome,
        href: "/mezzo?linha=trichology",
      },
      {
        id: "skin-fill",
        name: "Skin Fill",
        description: "Preenchimento e firmeza",
        image: skinFillXsome,
        href: "/mezzo?linha=skin-fill",
      },
    ],
  },
  {
    id: "extratos",
    name: "Extratos da Terra",
    tagline: "Natureza & Ciência",
    href: "/extratos-da-terra",
    bgColor: "bg-purple-950",
    textColor: "text-white",
    accentColor: "text-purple-300",
    collections: [
      {
        id: "vitamina-c",
        name: "Hydra Vit C",
        description: "Antioxidante iluminador",
        image: hydraVitCHidratante,
        href: "/extratos-da-terra?linha=vitamina-c",
      },
      {
        id: "niacinamida",
        name: "Niacinamida",
        description: "Controle de oleosidade",
        image: serumNiacinamida,
        href: "/extratos-da-terra?linha=niacinamida",
      },
      {
        id: "exo-intense",
        name: "EXO Intense",
        description: "Potencializador com exossomas",
        image: exoIntenseSerum,
        href: "/extratos-da-terra?linha=exossomas",
      },
      {
        id: "aquaface",
        name: "Aquaface",
        description: "Higienização profissional",
        image: aquafaceSabonete,
        href: "/extratos-da-terra?linha=higienizacao",
      },
    ],
  },
  {
    id: "smartgr",
    name: "Smart GR",
    tagline: "Ativos Inteligentes",
    href: "/smart-gr",
    bgColor: "bg-indigo-950",
    textColor: "text-white",
    accentColor: "text-indigo-300",
    collections: [
      {
        id: "peptide",
        name: "Smart Peptide",
        description: "Fluido rejuvenescedor",
        image: smartPeptideSkinPro,
        href: "/smart-gr?linha=skin-pro",
      },
      {
        id: "exo",
        name: "Smart EXO",
        description: "Tecnologia com exossomas",
        image: smartExoSkinPro,
        href: "/smart-gr?linha=skin-pro",
      },
      {
        id: "vitac",
        name: "Smart Vita C",
        description: "Antioxidante Bio Green",
        image: smartVitac,
        href: "/smart-gr?linha=boosters",
      },
      {
        id: "hair",
        name: "Smart Hair",
        description: "Tratamento capilar",
        image: smartHair,
        href: "/smart-gr?linha=capilar",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const BrandCollectionsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-editorial">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-body font-semibold">
            Nossas Linhas
          </span>
          <h2 className="font-display text-display-sm md:text-display text-foreground mt-3">
            Descubra Nossas Coleções
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto mt-4">
            Cada marca possui linhas especializadas para diferentes necessidades da pele
          </p>
        </AnimatedSection>

        {/* Brands with Collections */}
        <div className="space-y-8">
          {brandsWithCollections.map((brand, brandIndex) => (
            <motion.div
              key={brand.id}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="overflow-hidden rounded-lg"
            >
              {/* Brand Header Bar */}
              <div className={`${brand.bgColor} ${brand.textColor} p-4 md:p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold">
                      {brand.name}
                    </h3>
                    <p className={`text-sm ${brand.accentColor} mt-1`}>
                      {brand.tagline}
                    </p>
                  </div>
                  <Link
                    to={brand.href}
                    className={`hidden md:flex items-center gap-2 text-sm font-medium ${brand.accentColor} hover:text-white transition-colors`}
                  >
                    Ver todos os produtos
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Collections Grid */}
              <div className={`${brand.bgColor}/5 border border-border/50`}>
                <div className="grid grid-cols-2 md:grid-cols-4">
                  {brand.collections.map((collection, index) => (
                    <motion.div
                      key={collection.id}
                      variants={itemVariants}
                      className={`group relative ${
                        index < brand.collections.length - 1 ? "border-r border-border/30" : ""
                      }`}
                    >
                      <Link to={collection.href} className="block">
                        {/* Collection Image */}
                        <div className="aspect-square overflow-hidden bg-secondary/20">
                          <img
                            src={collection.image}
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Overlay on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Collection Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <h4 className="font-display text-sm md:text-base font-semibold">
                            {collection.name}
                          </h4>
                          <p className="text-xs text-white/70 mt-0.5 line-clamp-1">
                            {collection.description}
                          </p>
                        </div>

                        {/* Always visible name tag */}
                        <div className="absolute bottom-3 left-3 right-3 group-hover:opacity-0 transition-opacity duration-300">
                          <span className={`inline-block px-2 py-1 text-xs font-medium ${brand.bgColor} ${brand.textColor} rounded`}>
                            {collection.name}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile View All Button */}
              <Link
                to={brand.href}
                className={`md:hidden flex items-center justify-center gap-2 ${brand.bgColor} ${brand.textColor} py-3 text-sm font-medium`}
              >
                Ver todos os produtos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCollectionsSection;
