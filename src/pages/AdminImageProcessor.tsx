import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Loader2, Image as ImageIcon, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Import all images
import acneXsomeKit from "@/assets/routine/acne-xsome-kit.png";
import acneXsomeSerum from "@/assets/routine/acne-xsome-serum.png";
import maskXsomePdrn from "@/assets/routine/mask-xsome-pdrn.png";
import mellanWhiteXsome from "@/assets/routine/mellan-white-xsome.png";

// Mezzo images
import acneXsomeOnoff from "@/assets/products/mezzo/acne-xsome-onoff.jpg";
import acneXsome from "@/assets/products/mezzo/acne-xsome.jpg";
import acnediolNoite from "@/assets/products/mezzo/acnediol-noite.jpg";
import acquaDefense from "@/assets/products/mezzo/acqua-defense.jpg";
import bLike from "@/assets/products/mezzo/b-like.jpg";
import bubblesGlassFps55 from "@/assets/products/mezzo/bubbles-glass-fps55.jpg";
import caffeinePower from "@/assets/products/mezzo/caffeine-power.jpg";
import celluIntense from "@/assets/products/mezzo/cellu-intense.jpg";
import cicatrirepairPlus from "@/assets/products/mezzo/cicatrirepair-plus.jpg";
import collagenPro from "@/assets/products/mezzo/collagen-pro.jpg";
import creanSecFps40 from "@/assets/products/mezzo/crean-sec-fps40.jpg";
import cremeDeslizanteDetox from "@/assets/products/mezzo/creme-deslizante-detox.jpg";
import espumaGluteos from "@/assets/products/mezzo/espuma-gluteos.jpg";
import exosomeBioestimulador from "@/assets/products/mezzo/exosome-bioestimulador.jpg";
import exosomeRegenerativoPro from "@/assets/products/mezzo/exosome-regenerativo-pro.jpg";
import exossomasSerum from "@/assets/products/mezzo/exossomas-serum.jpg";
import eyesXsomeFluido from "@/assets/products/mezzo/eyes-xsome-fluido.jpg";
import eyesXsome from "@/assets/products/mezzo/eyes-xsome.jpg";
import fluidAntiacneFps70 from "@/assets/products/mezzo/fluid-antiacne-fps70.jpg";
import fluidControlFps55 from "@/assets/products/mezzo/fluid-control-fps55.jpg";
import fluidoEmoliente from "@/assets/products/mezzo/fluido-emoliente.jpg";
import foamInfusion from "@/assets/products/mezzo/foam-infusion.jpg";
import gelLimpezaAhas from "@/assets/products/mezzo/gel-limpeza-ahas.jpg";
import gelLimpezaFacial from "@/assets/products/mezzo/gel-limpeza-facial.jpg";
import gelLimpezaProfunda from "@/assets/products/mezzo/gel-limpeza-profunda.jpg";
import gelTermogenico from "@/assets/products/mezzo/gel-termogenico.jpg";
import glicolicoHyaluCa from "@/assets/products/mezzo/glicolico-hyalu-ca.jpg";
import gummieHair from "@/assets/products/mezzo/gummie-hair.jpg";
import hidraK from "@/assets/products/mezzo/hidra-k.jpg";
import hyaluronicSerumH9 from "@/assets/products/mezzo/hyaluronic-serum-h9.jpg";
import lipGlow from "@/assets/products/mezzo/lip-glow.jpg";
import lipPreenchedor from "@/assets/products/mezzo/lip-preenchedor.jpg";
import lipoIntense from "@/assets/products/mezzo/lipo-intense.jpg";
import lipoXsomeFluido from "@/assets/products/mezzo/lipo-xsome-fluido.jpg";
import lipoXsome from "@/assets/products/mezzo/lipo-xsome.jpg";
import locaoAntisseptica from "@/assets/products/mezzo/locao-antisseptica.jpg";
import locaoEmoliente from "@/assets/products/mezzo/locao-emoliente.jpg";
import locaoSecativa from "@/assets/products/mezzo/locao-secativa.jpg";
import mascaraArgilaBranca from "@/assets/products/mezzo/mascara-argila-branca.jpg";
import maskCalmAntiStress from "@/assets/products/mezzo/mask-calm-anti-stress.jpg";
import maskXsomePdrnMezzo from "@/assets/products/mezzo/mask-xsome-pdrn.jpg";
import maternity from "@/assets/products/mezzo/maternity.jpg";
import maximaProtecaoFps99 from "@/assets/products/mezzo/maxima-protecao-fps99.jpg";
import mellanCorrector from "@/assets/products/mezzo/mellan-corrector.jpg";
import mellanRepair from "@/assets/products/mezzo/mellan-repair.jpg";
import mellanWhiteXsomeMezzo from "@/assets/products/mezzo/mellan-white-xsome.jpg";
import mellanWhite from "@/assets/products/mezzo/mellan-white.jpg";
import microdermoabrasaoScrubC from "@/assets/products/mezzo/microdermoabrasao-scrub-c.jpg";
import moroEvolution from "@/assets/products/mezzo/moro-evolution.jpg";
import mousseTermogenico from "@/assets/products/mezzo/mousse-termogenico.jpg";
import omega3 from "@/assets/products/mezzo/omega-3.jpg";
import peelingCapilar from "@/assets/products/mezzo/peeling-capilar.jpg";
import peelingDetox from "@/assets/products/mezzo/peeling-detox.jpg";
import peelingEnzimatico from "@/assets/products/mezzo/peeling-enzimatico.jpg";
import peelingOrganico from "@/assets/products/mezzo/peeling-organico.jpg";
import peelingPha from "@/assets/products/mezzo/peeling-pha.jpg";
import pigmentControl from "@/assets/products/mezzo/pigment-control.jpg";
import preShampoo from "@/assets/products/mezzo/pre-shampoo.jpg";
import redensifyBody from "@/assets/products/mezzo/redensify-body.jpg";
import saboneteAntiAcne from "@/assets/products/mezzo/sabonete-anti-acne.jpg";
import salicilicoB3 from "@/assets/products/mezzo/salicilico-b3.jpg";
import shampooAnticaspa from "@/assets/products/mezzo/shampoo-anticaspa.jpg";
import shampooSensiScalp from "@/assets/products/mezzo/shampoo-sensi-scalp.jpg";
import shieldC12Fps80 from "@/assets/products/mezzo/shield-c12-fps80.jpg";
import skinCoverColorFps50 from "@/assets/products/mezzo/skin-cover-color-fps50.jpg";
import skinCoverFps50 from "@/assets/products/mezzo/skin-cover-fps50.jpg";
import skinFillXsomeFluido from "@/assets/products/mezzo/skin-fill-xsome-fluido.jpg";
import skinFillXsome from "@/assets/products/mezzo/skin-fill-xsome.jpg";
import supercha from "@/assets/products/mezzo/supercha.jpg";
import tonicoAntiquedas from "@/assets/products/mezzo/tonico-antiquedas.jpg";
import tranexamicoC10 from "@/assets/products/mezzo/tranexamico-c10.jpg";
import trichologyLocao from "@/assets/products/mezzo/trichology-locao.jpg";
import trichologyShampoo from "@/assets/products/mezzo/trichology-shampoo.jpg";
import trichologyXsome from "@/assets/products/mezzo/trichology-xsome.jpg";
import whiteningFps80 from "@/assets/products/mezzo/whitening-fps80.jpg";

// Tulipia images
import blackBiowhiteLocao from "@/assets/products/tulipia/black-biowhite-locao.jpg";
import blackSecretClareador from "@/assets/products/tulipia/black-secret-clareador.jpg";
import blackSecretMicroSpikes from "@/assets/products/tulipia/black-secret-micro-spikes.jpg";
import blackSecretPeeling2Fases from "@/assets/products/tulipia/black-secret-peeling-2-fases.jpg";
import blackSecretPeelingAntiacne from "@/assets/products/tulipia/black-secret-peeling-antiacne.jpg";
import blackSecretSaboneteGlico from "@/assets/products/tulipia/black-secret-sabonete-glico.jpg";
import blackSecretSolucaoPrePeeling from "@/assets/products/tulipia/black-secret-solucao-pre-peeling.jpg";
import chokolaMascara from "@/assets/products/tulipia/chokola-mascara.jpg";
import cilsLashes from "@/assets/products/tulipia/cils-lashes.jpg";
import citrogelClareador from "@/assets/products/tulipia/citrogel-clareador.jpg";
import dermacosBooster from "@/assets/products/tulipia/dermacos-booster.jpg";
import dermacosEspuma from "@/assets/products/tulipia/dermacos-espuma.jpg";
import dermoEsteticPosExtracao from "@/assets/products/tulipia/dermo-estetic-pos-extracao.jpg";
import dermoEsteticUltraemoliente from "@/assets/products/tulipia/dermo-estetic-ultraemoliente.jpg";
import exogeneticPdrn from "@/assets/products/tulipia/exogenetic-pdrn.jpg";
import firmFlaccid300ml from "@/assets/products/tulipia/firm-flaccid-300ml.jpg";
import firmFlaccid60ml from "@/assets/products/tulipia/firm-flaccid-60ml.jpg";
import hialuxCreme from "@/assets/products/tulipia/hialux-creme.jpg";
import hialuxSabonete from "@/assets/products/tulipia/hialux-sabonete.jpg";
import hialuxSerum from "@/assets/products/tulipia/hialux-serum.jpg";
import hidrasolFps30 from "@/assets/products/tulipia/hidrasol-fps30.jpg";
import hydrogenBruma from "@/assets/products/tulipia/hydrogen-bruma.jpg";
import immortaliteCSerum from "@/assets/products/tulipia/immortalite-c-serum.jpg";
import invernoMask from "@/assets/products/tulipia/inverno-mask.jpg";
import kitProskinRepair from "@/assets/products/tulipia/kit-proskin-repair.jpg";
import lifeCMascara from "@/assets/products/tulipia/life-c-mascara.jpg";
import lifeCMonodose from "@/assets/products/tulipia/life-c-monodose.jpg";
import lifeCPeeling from "@/assets/products/tulipia/life-c-peeling.jpg";
import lifeCSabonete300ml from "@/assets/products/tulipia/life-c-sabonete-300ml.jpg";
import lifeCSaboneteMousse from "@/assets/products/tulipia/life-c-sabonete-mousse.jpg";
import lifeCSerum20 from "@/assets/products/tulipia/life-c-serum-20.jpg";
import lifeCTonico from "@/assets/products/tulipia/life-c-tonico.jpg";
import mareziTonico from "@/assets/products/tulipia/marezi-tonico.jpg";
import miracleEyes from "@/assets/products/tulipia/miracle-eyes.jpg";
import niacineEspuma150mlHero from "@/assets/products/tulipia/niacine-espuma-150ml-hero.jpg";
import niacineEspuma150mlNew from "@/assets/products/tulipia/niacine-espuma-150ml-new.jpg";
import niacineEspuma150ml from "@/assets/products/tulipia/niacine-espuma-150ml.jpg";
import niacineEspuma50ml from "@/assets/products/tulipia/niacine-espuma-50ml.jpg";
import niacineSerum from "@/assets/products/tulipia/niacine-serum.jpg";
import outonoMask from "@/assets/products/tulipia/outono-mask.jpg";
import primaveraMask from "@/assets/products/tulipia/primavera-mask.jpg";
import proskinBruma from "@/assets/products/tulipia/proskin-bruma.jpg";
import proskinCreme from "@/assets/products/tulipia/proskin-creme.jpg";
import proskinSabonete from "@/assets/products/tulipia/proskin-sabonete.jpg";
import renotratGel from "@/assets/products/tulipia/renotrat-gel.jpg";
import stellarMaskEnzimatica from "@/assets/products/tulipia/stellar-mask-enzimatica.jpg";
import stellarMaskHidronutritiva from "@/assets/products/tulipia/stellar-mask-hidronutritiva.jpg";
import stellarMaskMatificante from "@/assets/products/tulipia/stellar-mask-matificante.jpg";
import stellarMaskRejuvenescedora from "@/assets/products/tulipia/stellar-mask-rejuvenescedora.jpg";
import sweetLipsEsfoliante from "@/assets/products/tulipia/sweet-lips-esfoliante.jpg";
import sweetLipsGloss from "@/assets/products/tulipia/sweet-lips-gloss.jpg";
import ultimateEsteticMascara from "@/assets/products/tulipia/ultimate-estetic-mascara.jpg";
import veraoMask from "@/assets/products/tulipia/verao-mask.jpg";

interface ImageItem {
  id: string;
  name: string;
  path: string;
  src: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  processedSrc?: string;
  storageUrl?: string;
  error?: string;
}

const routineImages: ImageItem[] = [
  { id: 'routine-1', name: 'acne-xsome-kit.png', path: 'routine/acne-xsome-kit.png', src: acneXsomeKit, status: 'pending' },
  { id: 'routine-2', name: 'acne-xsome-serum.png', path: 'routine/acne-xsome-serum.png', src: acneXsomeSerum, status: 'pending' },
  { id: 'routine-3', name: 'mask-xsome-pdrn.png', path: 'routine/mask-xsome-pdrn.png', src: maskXsomePdrn, status: 'pending' },
  { id: 'routine-4', name: 'mellan-white-xsome.png', path: 'routine/mellan-white-xsome.png', src: mellanWhiteXsome, status: 'pending' },
];

const mezzoImages: ImageItem[] = [
  { id: 'mezzo-1', name: 'acne-xsome-onoff.jpg', path: 'mezzo/acne-xsome-onoff.jpg', src: acneXsomeOnoff, status: 'pending' },
  { id: 'mezzo-2', name: 'acne-xsome.jpg', path: 'mezzo/acne-xsome.jpg', src: acneXsome, status: 'pending' },
  { id: 'mezzo-3', name: 'acnediol-noite.jpg', path: 'mezzo/acnediol-noite.jpg', src: acnediolNoite, status: 'pending' },
  { id: 'mezzo-4', name: 'acqua-defense.jpg', path: 'mezzo/acqua-defense.jpg', src: acquaDefense, status: 'pending' },
  { id: 'mezzo-5', name: 'b-like.jpg', path: 'mezzo/b-like.jpg', src: bLike, status: 'pending' },
  { id: 'mezzo-6', name: 'bubbles-glass-fps55.jpg', path: 'mezzo/bubbles-glass-fps55.jpg', src: bubblesGlassFps55, status: 'pending' },
  { id: 'mezzo-7', name: 'caffeine-power.jpg', path: 'mezzo/caffeine-power.jpg', src: caffeinePower, status: 'pending' },
  { id: 'mezzo-8', name: 'cellu-intense.jpg', path: 'mezzo/cellu-intense.jpg', src: celluIntense, status: 'pending' },
  { id: 'mezzo-9', name: 'cicatrirepair-plus.jpg', path: 'mezzo/cicatrirepair-plus.jpg', src: cicatrirepairPlus, status: 'pending' },
  { id: 'mezzo-10', name: 'collagen-pro.jpg', path: 'mezzo/collagen-pro.jpg', src: collagenPro, status: 'pending' },
  { id: 'mezzo-11', name: 'crean-sec-fps40.jpg', path: 'mezzo/crean-sec-fps40.jpg', src: creanSecFps40, status: 'pending' },
  { id: 'mezzo-12', name: 'creme-deslizante-detox.jpg', path: 'mezzo/creme-deslizante-detox.jpg', src: cremeDeslizanteDetox, status: 'pending' },
  { id: 'mezzo-13', name: 'espuma-gluteos.jpg', path: 'mezzo/espuma-gluteos.jpg', src: espumaGluteos, status: 'pending' },
  { id: 'mezzo-14', name: 'exosome-bioestimulador.jpg', path: 'mezzo/exosome-bioestimulador.jpg', src: exosomeBioestimulador, status: 'pending' },
  { id: 'mezzo-15', name: 'exosome-regenerativo-pro.jpg', path: 'mezzo/exosome-regenerativo-pro.jpg', src: exosomeRegenerativoPro, status: 'pending' },
  { id: 'mezzo-16', name: 'exossomas-serum.jpg', path: 'mezzo/exossomas-serum.jpg', src: exossomasSerum, status: 'pending' },
  { id: 'mezzo-17', name: 'eyes-xsome-fluido.jpg', path: 'mezzo/eyes-xsome-fluido.jpg', src: eyesXsomeFluido, status: 'pending' },
  { id: 'mezzo-18', name: 'eyes-xsome.jpg', path: 'mezzo/eyes-xsome.jpg', src: eyesXsome, status: 'pending' },
  { id: 'mezzo-19', name: 'fluid-antiacne-fps70.jpg', path: 'mezzo/fluid-antiacne-fps70.jpg', src: fluidAntiacneFps70, status: 'pending' },
  { id: 'mezzo-20', name: 'fluid-control-fps55.jpg', path: 'mezzo/fluid-control-fps55.jpg', src: fluidControlFps55, status: 'pending' },
  { id: 'mezzo-21', name: 'fluido-emoliente.jpg', path: 'mezzo/fluido-emoliente.jpg', src: fluidoEmoliente, status: 'pending' },
  { id: 'mezzo-22', name: 'foam-infusion.jpg', path: 'mezzo/foam-infusion.jpg', src: foamInfusion, status: 'pending' },
  { id: 'mezzo-23', name: 'gel-limpeza-ahas.jpg', path: 'mezzo/gel-limpeza-ahas.jpg', src: gelLimpezaAhas, status: 'pending' },
  { id: 'mezzo-24', name: 'gel-limpeza-facial.jpg', path: 'mezzo/gel-limpeza-facial.jpg', src: gelLimpezaFacial, status: 'pending' },
  { id: 'mezzo-25', name: 'gel-limpeza-profunda.jpg', path: 'mezzo/gel-limpeza-profunda.jpg', src: gelLimpezaProfunda, status: 'pending' },
  { id: 'mezzo-26', name: 'gel-termogenico.jpg', path: 'mezzo/gel-termogenico.jpg', src: gelTermogenico, status: 'pending' },
  { id: 'mezzo-27', name: 'glicolico-hyalu-ca.jpg', path: 'mezzo/glicolico-hyalu-ca.jpg', src: glicolicoHyaluCa, status: 'pending' },
  { id: 'mezzo-28', name: 'gummie-hair.jpg', path: 'mezzo/gummie-hair.jpg', src: gummieHair, status: 'pending' },
  { id: 'mezzo-29', name: 'hidra-k.jpg', path: 'mezzo/hidra-k.jpg', src: hidraK, status: 'pending' },
  { id: 'mezzo-30', name: 'hyaluronic-serum-h9.jpg', path: 'mezzo/hyaluronic-serum-h9.jpg', src: hyaluronicSerumH9, status: 'pending' },
  { id: 'mezzo-31', name: 'lip-glow.jpg', path: 'mezzo/lip-glow.jpg', src: lipGlow, status: 'pending' },
  { id: 'mezzo-32', name: 'lip-preenchedor.jpg', path: 'mezzo/lip-preenchedor.jpg', src: lipPreenchedor, status: 'pending' },
  { id: 'mezzo-33', name: 'lipo-intense.jpg', path: 'mezzo/lipo-intense.jpg', src: lipoIntense, status: 'pending' },
  { id: 'mezzo-34', name: 'lipo-xsome-fluido.jpg', path: 'mezzo/lipo-xsome-fluido.jpg', src: lipoXsomeFluido, status: 'pending' },
  { id: 'mezzo-35', name: 'lipo-xsome.jpg', path: 'mezzo/lipo-xsome.jpg', src: lipoXsome, status: 'pending' },
  { id: 'mezzo-36', name: 'locao-antisseptica.jpg', path: 'mezzo/locao-antisseptica.jpg', src: locaoAntisseptica, status: 'pending' },
  { id: 'mezzo-37', name: 'locao-emoliente.jpg', path: 'mezzo/locao-emoliente.jpg', src: locaoEmoliente, status: 'pending' },
  { id: 'mezzo-38', name: 'locao-secativa.jpg', path: 'mezzo/locao-secativa.jpg', src: locaoSecativa, status: 'pending' },
  { id: 'mezzo-39', name: 'mascara-argila-branca.jpg', path: 'mezzo/mascara-argila-branca.jpg', src: mascaraArgilaBranca, status: 'pending' },
  { id: 'mezzo-40', name: 'mask-calm-anti-stress.jpg', path: 'mezzo/mask-calm-anti-stress.jpg', src: maskCalmAntiStress, status: 'pending' },
  { id: 'mezzo-41', name: 'mask-xsome-pdrn.jpg', path: 'mezzo/mask-xsome-pdrn.jpg', src: maskXsomePdrnMezzo, status: 'pending' },
  { id: 'mezzo-42', name: 'maternity.jpg', path: 'mezzo/maternity.jpg', src: maternity, status: 'pending' },
  { id: 'mezzo-43', name: 'maxima-protecao-fps99.jpg', path: 'mezzo/maxima-protecao-fps99.jpg', src: maximaProtecaoFps99, status: 'pending' },
  { id: 'mezzo-44', name: 'mellan-corrector.jpg', path: 'mezzo/mellan-corrector.jpg', src: mellanCorrector, status: 'pending' },
  { id: 'mezzo-45', name: 'mellan-repair.jpg', path: 'mezzo/mellan-repair.jpg', src: mellanRepair, status: 'pending' },
  { id: 'mezzo-46', name: 'mellan-white-xsome.jpg', path: 'mezzo/mellan-white-xsome.jpg', src: mellanWhiteXsomeMezzo, status: 'pending' },
  { id: 'mezzo-47', name: 'mellan-white.jpg', path: 'mezzo/mellan-white.jpg', src: mellanWhite, status: 'pending' },
  { id: 'mezzo-48', name: 'microdermoabrasao-scrub-c.jpg', path: 'mezzo/microdermoabrasao-scrub-c.jpg', src: microdermoabrasaoScrubC, status: 'pending' },
  { id: 'mezzo-49', name: 'moro-evolution.jpg', path: 'mezzo/moro-evolution.jpg', src: moroEvolution, status: 'pending' },
  { id: 'mezzo-50', name: 'mousse-termogenico.jpg', path: 'mezzo/mousse-termogenico.jpg', src: mousseTermogenico, status: 'pending' },
  { id: 'mezzo-51', name: 'omega-3.jpg', path: 'mezzo/omega-3.jpg', src: omega3, status: 'pending' },
  { id: 'mezzo-52', name: 'peeling-capilar.jpg', path: 'mezzo/peeling-capilar.jpg', src: peelingCapilar, status: 'pending' },
  { id: 'mezzo-53', name: 'peeling-detox.jpg', path: 'mezzo/peeling-detox.jpg', src: peelingDetox, status: 'pending' },
  { id: 'mezzo-54', name: 'peeling-enzimatico.jpg', path: 'mezzo/peeling-enzimatico.jpg', src: peelingEnzimatico, status: 'pending' },
  { id: 'mezzo-55', name: 'peeling-organico.jpg', path: 'mezzo/peeling-organico.jpg', src: peelingOrganico, status: 'pending' },
  { id: 'mezzo-56', name: 'peeling-pha.jpg', path: 'mezzo/peeling-pha.jpg', src: peelingPha, status: 'pending' },
  { id: 'mezzo-57', name: 'pigment-control.jpg', path: 'mezzo/pigment-control.jpg', src: pigmentControl, status: 'pending' },
  { id: 'mezzo-58', name: 'pre-shampoo.jpg', path: 'mezzo/pre-shampoo.jpg', src: preShampoo, status: 'pending' },
  { id: 'mezzo-59', name: 'redensify-body.jpg', path: 'mezzo/redensify-body.jpg', src: redensifyBody, status: 'pending' },
  { id: 'mezzo-60', name: 'sabonete-anti-acne.jpg', path: 'mezzo/sabonete-anti-acne.jpg', src: saboneteAntiAcne, status: 'pending' },
  { id: 'mezzo-61', name: 'salicilico-b3.jpg', path: 'mezzo/salicilico-b3.jpg', src: salicilicoB3, status: 'pending' },
  { id: 'mezzo-62', name: 'shampoo-anticaspa.jpg', path: 'mezzo/shampoo-anticaspa.jpg', src: shampooAnticaspa, status: 'pending' },
  { id: 'mezzo-63', name: 'shampoo-sensi-scalp.jpg', path: 'mezzo/shampoo-sensi-scalp.jpg', src: shampooSensiScalp, status: 'pending' },
  { id: 'mezzo-64', name: 'shield-c12-fps80.jpg', path: 'mezzo/shield-c12-fps80.jpg', src: shieldC12Fps80, status: 'pending' },
  { id: 'mezzo-65', name: 'skin-cover-color-fps50.jpg', path: 'mezzo/skin-cover-color-fps50.jpg', src: skinCoverColorFps50, status: 'pending' },
  { id: 'mezzo-66', name: 'skin-cover-fps50.jpg', path: 'mezzo/skin-cover-fps50.jpg', src: skinCoverFps50, status: 'pending' },
  { id: 'mezzo-67', name: 'skin-fill-xsome-fluido.jpg', path: 'mezzo/skin-fill-xsome-fluido.jpg', src: skinFillXsomeFluido, status: 'pending' },
  { id: 'mezzo-68', name: 'skin-fill-xsome.jpg', path: 'mezzo/skin-fill-xsome.jpg', src: skinFillXsome, status: 'pending' },
  { id: 'mezzo-69', name: 'supercha.jpg', path: 'mezzo/supercha.jpg', src: supercha, status: 'pending' },
  { id: 'mezzo-70', name: 'tonico-antiquedas.jpg', path: 'mezzo/tonico-antiquedas.jpg', src: tonicoAntiquedas, status: 'pending' },
  { id: 'mezzo-71', name: 'tranexamico-c10.jpg', path: 'mezzo/tranexamico-c10.jpg', src: tranexamicoC10, status: 'pending' },
  { id: 'mezzo-72', name: 'trichology-locao.jpg', path: 'mezzo/trichology-locao.jpg', src: trichologyLocao, status: 'pending' },
  { id: 'mezzo-73', name: 'trichology-shampoo.jpg', path: 'mezzo/trichology-shampoo.jpg', src: trichologyShampoo, status: 'pending' },
  { id: 'mezzo-74', name: 'trichology-xsome.jpg', path: 'mezzo/trichology-xsome.jpg', src: trichologyXsome, status: 'pending' },
  { id: 'mezzo-75', name: 'whitening-fps80.jpg', path: 'mezzo/whitening-fps80.jpg', src: whiteningFps80, status: 'pending' },
];

const tulipiaImages: ImageItem[] = [
  { id: 'tulipia-1', name: 'black-biowhite-locao.jpg', path: 'tulipia/black-biowhite-locao.jpg', src: blackBiowhiteLocao, status: 'pending' },
  { id: 'tulipia-2', name: 'black-secret-clareador.jpg', path: 'tulipia/black-secret-clareador.jpg', src: blackSecretClareador, status: 'pending' },
  { id: 'tulipia-3', name: 'black-secret-micro-spikes.jpg', path: 'tulipia/black-secret-micro-spikes.jpg', src: blackSecretMicroSpikes, status: 'pending' },
  { id: 'tulipia-4', name: 'black-secret-peeling-2-fases.jpg', path: 'tulipia/black-secret-peeling-2-fases.jpg', src: blackSecretPeeling2Fases, status: 'pending' },
  { id: 'tulipia-5', name: 'black-secret-peeling-antiacne.jpg', path: 'tulipia/black-secret-peeling-antiacne.jpg', src: blackSecretPeelingAntiacne, status: 'pending' },
  { id: 'tulipia-6', name: 'black-secret-sabonete-glico.jpg', path: 'tulipia/black-secret-sabonete-glico.jpg', src: blackSecretSaboneteGlico, status: 'pending' },
  { id: 'tulipia-7', name: 'black-secret-solucao-pre-peeling.jpg', path: 'tulipia/black-secret-solucao-pre-peeling.jpg', src: blackSecretSolucaoPrePeeling, status: 'pending' },
  { id: 'tulipia-8', name: 'chokola-mascara.jpg', path: 'tulipia/chokola-mascara.jpg', src: chokolaMascara, status: 'pending' },
  { id: 'tulipia-9', name: 'cils-lashes.jpg', path: 'tulipia/cils-lashes.jpg', src: cilsLashes, status: 'pending' },
  { id: 'tulipia-10', name: 'citrogel-clareador.jpg', path: 'tulipia/citrogel-clareador.jpg', src: citrogelClareador, status: 'pending' },
  { id: 'tulipia-11', name: 'dermacos-booster.jpg', path: 'tulipia/dermacos-booster.jpg', src: dermacosBooster, status: 'pending' },
  { id: 'tulipia-12', name: 'dermacos-espuma.jpg', path: 'tulipia/dermacos-espuma.jpg', src: dermacosEspuma, status: 'pending' },
  { id: 'tulipia-13', name: 'dermo-estetic-pos-extracao.jpg', path: 'tulipia/dermo-estetic-pos-extracao.jpg', src: dermoEsteticPosExtracao, status: 'pending' },
  { id: 'tulipia-14', name: 'dermo-estetic-ultraemoliente.jpg', path: 'tulipia/dermo-estetic-ultraemoliente.jpg', src: dermoEsteticUltraemoliente, status: 'pending' },
  { id: 'tulipia-15', name: 'exogenetic-pdrn.jpg', path: 'tulipia/exogenetic-pdrn.jpg', src: exogeneticPdrn, status: 'pending' },
  { id: 'tulipia-16', name: 'firm-flaccid-300ml.jpg', path: 'tulipia/firm-flaccid-300ml.jpg', src: firmFlaccid300ml, status: 'pending' },
  { id: 'tulipia-17', name: 'firm-flaccid-60ml.jpg', path: 'tulipia/firm-flaccid-60ml.jpg', src: firmFlaccid60ml, status: 'pending' },
  { id: 'tulipia-18', name: 'hialux-creme.jpg', path: 'tulipia/hialux-creme.jpg', src: hialuxCreme, status: 'pending' },
  { id: 'tulipia-19', name: 'hialux-sabonete.jpg', path: 'tulipia/hialux-sabonete.jpg', src: hialuxSabonete, status: 'pending' },
  { id: 'tulipia-20', name: 'hialux-serum.jpg', path: 'tulipia/hialux-serum.jpg', src: hialuxSerum, status: 'pending' },
  { id: 'tulipia-21', name: 'hidrasol-fps30.jpg', path: 'tulipia/hidrasol-fps30.jpg', src: hidrasolFps30, status: 'pending' },
  { id: 'tulipia-22', name: 'hydrogen-bruma.jpg', path: 'tulipia/hydrogen-bruma.jpg', src: hydrogenBruma, status: 'pending' },
  { id: 'tulipia-23', name: 'immortalite-c-serum.jpg', path: 'tulipia/immortalite-c-serum.jpg', src: immortaliteCSerum, status: 'pending' },
  { id: 'tulipia-24', name: 'inverno-mask.jpg', path: 'tulipia/inverno-mask.jpg', src: invernoMask, status: 'pending' },
  { id: 'tulipia-25', name: 'kit-proskin-repair.jpg', path: 'tulipia/kit-proskin-repair.jpg', src: kitProskinRepair, status: 'pending' },
  { id: 'tulipia-26', name: 'life-c-mascara.jpg', path: 'tulipia/life-c-mascara.jpg', src: lifeCMascara, status: 'pending' },
  { id: 'tulipia-27', name: 'life-c-monodose.jpg', path: 'tulipia/life-c-monodose.jpg', src: lifeCMonodose, status: 'pending' },
  { id: 'tulipia-28', name: 'life-c-peeling.jpg', path: 'tulipia/life-c-peeling.jpg', src: lifeCPeeling, status: 'pending' },
  { id: 'tulipia-29', name: 'life-c-sabonete-300ml.jpg', path: 'tulipia/life-c-sabonete-300ml.jpg', src: lifeCSabonete300ml, status: 'pending' },
  { id: 'tulipia-30', name: 'life-c-sabonete-mousse.jpg', path: 'tulipia/life-c-sabonete-mousse.jpg', src: lifeCSaboneteMousse, status: 'pending' },
  { id: 'tulipia-31', name: 'life-c-serum-20.jpg', path: 'tulipia/life-c-serum-20.jpg', src: lifeCSerum20, status: 'pending' },
  { id: 'tulipia-32', name: 'life-c-tonico.jpg', path: 'tulipia/life-c-tonico.jpg', src: lifeCTonico, status: 'pending' },
  { id: 'tulipia-33', name: 'marezi-tonico.jpg', path: 'tulipia/marezi-tonico.jpg', src: mareziTonico, status: 'pending' },
  { id: 'tulipia-34', name: 'miracle-eyes.jpg', path: 'tulipia/miracle-eyes.jpg', src: miracleEyes, status: 'pending' },
  { id: 'tulipia-35', name: 'niacine-espuma-150ml-hero.jpg', path: 'tulipia/niacine-espuma-150ml-hero.jpg', src: niacineEspuma150mlHero, status: 'pending' },
  { id: 'tulipia-36', name: 'niacine-espuma-150ml-new.jpg', path: 'tulipia/niacine-espuma-150ml-new.jpg', src: niacineEspuma150mlNew, status: 'pending' },
  { id: 'tulipia-37', name: 'niacine-espuma-150ml.jpg', path: 'tulipia/niacine-espuma-150ml.jpg', src: niacineEspuma150ml, status: 'pending' },
  { id: 'tulipia-38', name: 'niacine-espuma-50ml.jpg', path: 'tulipia/niacine-espuma-50ml.jpg', src: niacineEspuma50ml, status: 'pending' },
  { id: 'tulipia-39', name: 'niacine-serum.jpg', path: 'tulipia/niacine-serum.jpg', src: niacineSerum, status: 'pending' },
  { id: 'tulipia-40', name: 'outono-mask.jpg', path: 'tulipia/outono-mask.jpg', src: outonoMask, status: 'pending' },
  { id: 'tulipia-41', name: 'primavera-mask.jpg', path: 'tulipia/primavera-mask.jpg', src: primaveraMask, status: 'pending' },
  { id: 'tulipia-42', name: 'proskin-bruma.jpg', path: 'tulipia/proskin-bruma.jpg', src: proskinBruma, status: 'pending' },
  { id: 'tulipia-43', name: 'proskin-creme.jpg', path: 'tulipia/proskin-creme.jpg', src: proskinCreme, status: 'pending' },
  { id: 'tulipia-44', name: 'proskin-sabonete.jpg', path: 'tulipia/proskin-sabonete.jpg', src: proskinSabonete, status: 'pending' },
  { id: 'tulipia-45', name: 'renotrat-gel.jpg', path: 'tulipia/renotrat-gel.jpg', src: renotratGel, status: 'pending' },
  { id: 'tulipia-46', name: 'stellar-mask-enzimatica.jpg', path: 'tulipia/stellar-mask-enzimatica.jpg', src: stellarMaskEnzimatica, status: 'pending' },
  { id: 'tulipia-47', name: 'stellar-mask-hidronutritiva.jpg', path: 'tulipia/stellar-mask-hidronutritiva.jpg', src: stellarMaskHidronutritiva, status: 'pending' },
  { id: 'tulipia-48', name: 'stellar-mask-matificante.jpg', path: 'tulipia/stellar-mask-matificante.jpg', src: stellarMaskMatificante, status: 'pending' },
  { id: 'tulipia-49', name: 'stellar-mask-rejuvenescedora.jpg', path: 'tulipia/stellar-mask-rejuvenescedora.jpg', src: stellarMaskRejuvenescedora, status: 'pending' },
  { id: 'tulipia-50', name: 'sweet-lips-esfoliante.jpg', path: 'tulipia/sweet-lips-esfoliante.jpg', src: sweetLipsEsfoliante, status: 'pending' },
  { id: 'tulipia-51', name: 'sweet-lips-gloss.jpg', path: 'tulipia/sweet-lips-gloss.jpg', src: sweetLipsGloss, status: 'pending' },
  { id: 'tulipia-52', name: 'ultimate-estetic-mascara.jpg', path: 'tulipia/ultimate-estetic-mascara.jpg', src: ultimateEsteticMascara, status: 'pending' },
  { id: 'tulipia-53', name: 'verao-mask.jpg', path: 'tulipia/verao-mask.jpg', src: veraoMask, status: 'pending' },
];

export default function AdminImageProcessor() {
  const [routineImgs, setRoutineImgs] = useState<ImageItem[]>(routineImages);
  const [mezzoImgs, setMezzoImgs] = useState<ImageItem[]>(mezzoImages);
  const [tulipiaImgs, setTulipiaImgs] = useState<ImageItem[]>(tulipiaImages);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentBatch, setCurrentBatch] = useState<string>('');

  const imageToBase64 = useCallback(async (src: string): Promise<string> => {
    const response = await fetch(src);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, []);

  const processImage = useCallback(async (
    image: ImageItem,
    setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>
  ): Promise<void> => {
    setImages(prev => prev.map(img => 
      img.id === image.id ? { ...img, status: 'processing' as const } : img
    ));

    try {
      const base64 = await imageToBase64(image.src);
      
      const { data, error } = await supabase.functions.invoke('convert-image-background', {
        body: { 
          imageBase64: base64, 
          imagePath: image.path,
          saveToStorage: true 
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Processing failed');

      setImages(prev => prev.map(img => 
        img.id === image.id ? { 
          ...img, 
          status: 'completed' as const,
          processedSrc: data.processedImageBase64,
          storageUrl: data.storageUrl
        } : img
      ));

      toast.success(`${image.name} processada!`);
    } catch (error: any) {
      console.error('Error processing image:', error);
      setImages(prev => prev.map(img => 
        img.id === image.id ? { 
          ...img, 
          status: 'error' as const,
          error: error.message 
        } : img
      ));
      toast.error(`Erro ao processar ${image.name}: ${error.message}`);
    }
  }, [imageToBase64]);

  const processBatch = useCallback(async (
    images: ImageItem[],
    setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>,
    batchName: string
  ) => {
    setIsProcessing(true);
    setCurrentBatch(batchName);

    const pendingImages = images.filter(img => img.status === 'pending');
    
    for (const image of pendingImages) {
      await processImage(image, setImages);
      // Small delay between images to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsProcessing(false);
    setCurrentBatch('');
    toast.success(`Lote ${batchName} concluído!`);
  }, [processImage]);

  const downloadImage = useCallback((image: ImageItem) => {
    if (!image.processedSrc) return;
    
    const link = document.createElement('a');
    link.href = image.processedSrc;
    link.download = image.name.replace(/\.(jpg|jpeg)$/i, '.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const getStats = (images: ImageItem[]) => {
    const completed = images.filter(img => img.status === 'completed').length;
    const pending = images.filter(img => img.status === 'pending').length;
    const processing = images.filter(img => img.status === 'processing').length;
    const errors = images.filter(img => img.status === 'error').length;
    return { completed, pending, processing, errors, total: images.length };
  };

  const renderImageGrid = (
    images: ImageItem[], 
    setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>,
    batchName: string
  ) => {
    const stats = getStats(images);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Badge variant="outline">{stats.total} total</Badge>
            <Badge variant="secondary">{stats.completed} concluídas</Badge>
            <Badge variant="default">{stats.pending} pendentes</Badge>
            {stats.errors > 0 && <Badge variant="destructive">{stats.errors} erros</Badge>}
          </div>
          <Button 
            onClick={() => processBatch(images, setImages, batchName)}
            disabled={isProcessing || stats.pending === 0}
          >
            {isProcessing && currentBatch === batchName ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                Processar Todas ({stats.pending})
              </>
            )}
          </Button>
        </div>

        {isProcessing && currentBatch === batchName && (
          <Progress value={(stats.completed / stats.total) * 100} className="h-2" />
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <CardContent className="p-2">
                <div className="relative aspect-square mb-2">
                  <img 
                    src={image.processedSrc || image.src} 
                    alt={image.name}
                    className="w-full h-full object-contain bg-gray-100 rounded"
                  />
                  <div className="absolute top-1 right-1">
                    {image.status === 'completed' && (
                      <CheckCircle className="w-5 h-5 text-green-500 bg-white rounded-full" />
                    )}
                    {image.status === 'error' && (
                      <XCircle className="w-5 h-5 text-red-500 bg-white rounded-full" />
                    )}
                    {image.status === 'processing' && (
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin bg-white rounded-full" />
                    )}
                  </div>
                </div>
                <p className="text-xs truncate mb-2" title={image.name}>{image.name}</p>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => processImage(image, setImages)}
                    disabled={isProcessing || image.status === 'processing'}
                  >
                    {image.status === 'processing' ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      'Processar'
                    )}
                  </Button>
                  {image.processedSrc && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => downloadImage(image)}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Processador de Imagens</h1>
        <p className="text-muted-foreground">
          Converta fundos pretos para fundos brancos usando IA
        </p>
      </div>

      <Tabs defaultValue="routine" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="routine">
            Routine ({getStats(routineImgs).completed}/{routineImgs.length})
          </TabsTrigger>
          <TabsTrigger value="mezzo">
            Mezzo ({getStats(mezzoImgs).completed}/{mezzoImgs.length})
          </TabsTrigger>
          <TabsTrigger value="tulipia">
            Tulipia ({getStats(tulipiaImgs).completed}/{tulipiaImgs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="routine">
          {renderImageGrid(routineImgs, setRoutineImgs, 'Routine')}
        </TabsContent>

        <TabsContent value="mezzo">
          {renderImageGrid(mezzoImgs, setMezzoImgs, 'Mezzo')}
        </TabsContent>

        <TabsContent value="tulipia">
          {renderImageGrid(tulipiaImgs, setTulipiaImgs, 'Tulipia')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
