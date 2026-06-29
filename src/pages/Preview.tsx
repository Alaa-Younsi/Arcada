import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  RotateCcw, Mail, Waves, Sofa, Bath, ShoppingBag, UtensilsCrossed, Utensils,
  type LucideIcon,
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { PRODUCTS } from '@/data/catalogue';
import type { Lang } from '@/types';

type PlaceId = 'pool' | 'livingroom' | 'bathroom' | 'shop' | 'kitchen' | 'restaurant';

interface PlaceConfig {
  id: PlaceId;
  label: Record<Lang, string>;
  defaultImage: string;
  Icon: LucideIcon;
}

const PLACES: PlaceConfig[] = [
  { id: 'pool',       label: { en: 'Pool',        fr: 'Piscine',       ar: 'المسبح'       }, defaultImage: '/scenes/pool.png',       Icon: Waves           },
  { id: 'livingroom', label: { en: 'Living Room',  fr: 'Salon',         ar: 'غرفة المعيشة' }, defaultImage: '/scenes/livingroom.png', Icon: Sofa            },
  { id: 'bathroom',   label: { en: 'Bathroom',     fr: 'Salle de bain', ar: 'الحمام'       }, defaultImage: '/scenes/bathroom.png',   Icon: Bath            },
  { id: 'shop',       label: { en: 'Shop',         fr: 'Boutique',      ar: 'متجر'         }, defaultImage: '/scenes/shop.png',       Icon: ShoppingBag     },
  { id: 'kitchen',    label: { en: 'Kitchen',      fr: 'Cuisine',       ar: 'المطبخ'       }, defaultImage: '/scenes/kitchen.png',    Icon: UtensilsCrossed },
  { id: 'restaurant', label: { en: 'Restaurant',   fr: 'Restaurant',    ar: 'مطعم'         }, defaultImage: '/scenes/restaurant.png', Icon: Utensils        },
];

interface CombinationInfo {
  place: PlaceId;
  sku: string;
  image: string;
  productName: Record<Lang, string>;
  variantName: Record<Lang, string>;
  hex: string;
}

// Build SKU → product/variant info from the catalogue at module level
const SKU_LOOKUP: Record<string, { productName: Record<Lang, string>; variantName: Record<Lang, string>; hex: string } | undefined> = {};
for (const product of PRODUCTS) {
  for (const variant of product.variants) {
    const match = variant.image.match(/\/products\/(ARC-[A-Z]+-\d+)\.jpg/);
    if (match) {
      SKU_LOOKUP[match[1]] = { productName: product.name, variantName: variant.name, hex: variant.hex };
    }
  }
}

// All available combinations — sorted by place (alphabetical), then by SKU
const RAW: Array<{ place: PlaceId; sku: string }> = [
  { place: 'bathroom',   sku: 'ARC-ATL-003' },
  { place: 'bathroom',   sku: 'ARC-ATL-007' },
  { place: 'bathroom',   sku: 'ARC-ATL-008' },
  { place: 'bathroom',   sku: 'ARC-ATL-009' },
  { place: 'bathroom',   sku: 'ARC-ATL-010' },
  { place: 'bathroom',   sku: 'ARC-CHI-011' },
  { place: 'bathroom',   sku: 'ARC-DUC-009' },
  { place: 'bathroom',   sku: 'ARC-LEA-001' },
  { place: 'bathroom',   sku: 'ARC-LEA-003' },
  { place: 'bathroom',   sku: 'ARC-LEA-010' },
  { place: 'bathroom',   sku: 'ARC-SIL-012' },
  { place: 'kitchen',    sku: 'ARC-DUC-006' },
  { place: 'kitchen',    sku: 'ARC-LEA-010' },
  { place: 'kitchen',    sku: 'ARC-LEA-011' },
  { place: 'kitchen',    sku: 'ARC-SIL-005' },
  { place: 'livingroom', sku: 'ARC-DUC-007' },
  { place: 'livingroom', sku: 'ARC-DUC-011' },
  { place: 'livingroom', sku: 'ARC-SIL-005' },
  { place: 'pool',       sku: 'ARC-AND-001' },
  { place: 'pool',       sku: 'ARC-AZA-001' },
  { place: 'pool',       sku: 'ARC-LEA-001' },
  { place: 'restaurant', sku: 'ARC-DUC-006' },
  { place: 'restaurant', sku: 'ARC-DUC-007' },
  { place: 'restaurant', sku: 'ARC-LEA-009' },
  { place: 'restaurant', sku: 'ARC-SIL-011' },
  { place: 'shop',       sku: 'ARC-CHI-003' },
  { place: 'shop',       sku: 'ARC-DUC-007' },
  { place: 'shop',       sku: 'ARC-DUC-011' },
  { place: 'shop',       sku: 'ARC-LEA-009' },
  { place: 'shop',       sku: 'ARC-LEA-011' },
  { place: 'shop',       sku: 'ARC-SIL-011' },
];

const COMBINATIONS: CombinationInfo[] = RAW.flatMap(({ place, sku }) => {
  const info = SKU_LOOKUP[sku];
  if (!info) return [];
  return [{ place, sku, image: `/previews/combinations/${place}-${sku}.png`, ...info }];
});

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.3 } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

export default function Preview() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const [selectedPlace, setSelectedPlace] = useState<PlaceId>('bathroom');
  const [selectedCombo, setSelectedCombo] = useState<CombinationInfo | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const currentPlace = PLACES.find((p) => p.id === selectedPlace)!;
  const placeCombinations = useMemo(
    () => COMBINATIONS.filter((c) => c.place === selectedPlace),
    [selectedPlace],
  );

  const displayImage = selectedCombo?.image ?? currentPlace.defaultImage;

  const scrollToImageOnMobile = () => {
    if (window.innerWidth < 1024) {
      imageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSelectPlace = (placeId: PlaceId) => {
    setSelectedPlace(placeId);
    setSelectedCombo(null);
    scrollToImageOnMobile();
  };

  const handleComboSelect = (combo: CombinationInfo) => {
    const isActive = selectedCombo?.sku === combo.sku && selectedCombo?.place === combo.place;
    setSelectedCombo(isActive ? null : combo);
    if (!isActive) scrollToImageOnMobile();
  };

  const buildWhatsApp = () => {
    const base = 'https://wa.me/213550242454';
    if (!selectedCombo) return base;
    const text = [
      'Bonjour ARCADA,',
      '',
      'Je suis intéressé par le produit suivant :',
      `- ${selectedCombo.productName[lang]} · ${selectedCombo.variantName[lang]}`,
      `- Espace : ${currentPlace.label[lang]}`,
      '',
      'Merci de me contacter pour un devis.',
    ].join('\n');
    return `${base}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <SEOHead
        title="Visualiseur — ARCADA"
        description="Prévisualisez nos carreaux céramiques dans votre espace avec le visualiseur ARCADA."
      />

      <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">

          {/* Header */}
          <div className="mb-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-accent mb-3">
              {t('visualizer.title')}
            </p>
            <h1
              className="font-display font-light text-dark"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              {t('visualizer.subtitle')}
            </h1>
          </div>

          {/* Place selector — full width */}
          <div className="mb-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-4">
              {lang === 'fr' ? '1 · Choisir un espace' : lang === 'ar' ? '١ · اختر الفضاء' : '1 · Choose a space'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {PLACES.map((place) => {
                const Icon = place.Icon;
                const isActive = selectedPlace === place.id;
                return (
                  <button
                    key={place.id}
                    onClick={() => handleSelectPlace(place.id)}
                    className={`flex items-center gap-2.5 px-4 py-4 border transition-all duration-200 text-left ${
                      isActive
                        ? 'border-dark bg-dark text-white'
                        : 'border-[#E8E2D9] bg-white text-dark hover:border-dark'
                    }`}
                  >
                    <Icon size={15} strokeWidth={1.5} className="flex-shrink-0" />
                    <span className="font-sans text-[11px] uppercase tracking-[0.12em] leading-tight">
                      {place.label[lang]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main split layout */}
          <div className="flex flex-col-reverse lg:flex-row gap-10">

            {/* Left: combination panel */}
            <aside className="lg:w-[38%] flex-shrink-0 space-y-6">

              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-4">
                  {lang === 'fr' ? '2 · Choisir une combinaison' : lang === 'ar' ? '٢ · اختر التركيبة' : '2 · Choose a combination'}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPlace}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1"
                  >
                    {placeCombinations.map((combo) => {
                      const isActive =
                        selectedCombo?.sku === combo.sku && selectedCombo?.place === combo.place;
                      return (
                        <button
                          key={`${combo.place}-${combo.sku}`}
                          onClick={() => handleComboSelect(combo)}
                          className={`flex items-center gap-3 px-4 py-3 border text-left transition-all duration-200 ${
                            isActive
                              ? 'border-dark bg-dark text-white'
                              : 'border-[#E8E2D9] bg-white text-dark hover:border-dark'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full flex-shrink-0 border border-white/20"
                            style={{ backgroundColor: combo.hex }}
                          />
                          <span className="min-w-0">
                            <span className="block font-sans text-sm leading-snug truncate">
                              {combo.productName[lang]}
                            </span>
                            <span
                              className={`block font-sans text-[10px] tracking-wider mt-0.5 uppercase ${
                                isActive ? 'text-white/70' : 'text-muted'
                              }`}
                            >
                              {combo.variantName[lang]}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Selected combination summary + CTA */}
              <AnimatePresence>
                {selectedCombo && (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-[#E8E2D9] pt-6 space-y-4"
                  >
                    <div className="flex items-center gap-3 p-4 bg-[#F2EDE6]">
                      <span
                        className="w-8 h-8 rounded-full flex-shrink-0 border border-[#E8E2D9]"
                        style={{ backgroundColor: selectedCombo.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-dark text-lg font-light leading-tight truncate">
                          {selectedCombo.productName[lang]}
                        </p>
                        <p className="font-sans text-xs text-muted mt-0.5">
                          {selectedCombo.variantName[lang]} · {currentPlace.label[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedCombo(null)}
                        className="flex items-center gap-2 px-4 py-3 border border-[#E8E2D9] font-sans text-[10px] uppercase tracking-wider text-muted hover:border-dark hover:text-dark transition-colors"
                      >
                        <RotateCcw size={11} />
                        {t('visualizer.reset')}
                      </button>
                      <a
                        href={buildWhatsApp()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white font-sans text-[10px] uppercase tracking-wider hover:bg-dark transition-colors duration-300"
                      >
                        <Mail size={11} />
                        {t('contact.cta')}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </aside>

            {/* Right: image viewer */}
            <main className="lg:flex-1 min-w-0">
              <div className="lg:sticky lg:top-28">
                <div ref={imageRef} className="relative w-full overflow-hidden bg-[#E8E2D9]">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={displayImage}
                      src={displayImage}
                      alt={
                        selectedCombo
                          ? `${selectedCombo.productName[lang]} · ${selectedCombo.variantName[lang]} — ${currentPlace.label[lang]}`
                          : currentPlace.label[lang]
                      }
                      className="w-full h-auto block"
                      decoding="async"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    />
                  </AnimatePresence>

                  {/* Default overlay prompt */}
                  {!selectedCombo && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-dark/15 pointer-events-none">
                      <p className="font-sans text-white text-xs uppercase tracking-[0.4em] text-center px-8 drop-shadow">
                        {lang === 'fr'
                          ? 'Choisissez une combinaison'
                          : lang === 'ar'
                            ? 'اختر تركيبة'
                            : 'Choose a combination'}
                      </p>
                    </div>
                  )}

                  {/* Active combination badge */}
                  {selectedCombo && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#E8E2D9] flex-shrink-0"
                        style={{ backgroundColor: selectedCombo.hex }}
                      />
                      <span className="font-sans text-[11px] text-dark tracking-wide">
                        {selectedCombo.productName[lang]} · {selectedCombo.variantName[lang]}
                      </span>
                      <span className="font-sans text-[10px] text-accent uppercase tracking-wider ml-1">
                        — {currentPlace.label[lang]}
                      </span>
                    </motion.div>
                  )}

                  {/* Place quick-switch icons */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5">
                    {PLACES.map((place) => {
                      const Icon = place.Icon;
                      const isActive = selectedPlace === place.id;
                      return (
                        <button
                          key={place.id}
                          onClick={() => handleSelectPlace(place.id)}
                          title={place.label[lang]}
                          className={`w-9 h-9 flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                            isActive
                              ? 'bg-white text-dark shadow-md'
                              : 'bg-dark/40 text-white hover:bg-dark/60'
                          }`}
                        >
                          <Icon size={15} strokeWidth={1.5} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="mt-3 font-sans text-[10px] text-muted/50 text-center tracking-[0.2em]">
                  {lang === 'fr'
                    ? 'Résultat indicatif — visualisation IA'
                    : lang === 'ar'
                      ? 'نتيجة استرشادية — تصور بالذكاء الاصطناعي'
                      : 'Indicative result — AI visualisation'}
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
