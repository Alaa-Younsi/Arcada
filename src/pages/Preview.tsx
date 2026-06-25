import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RotateCcw, Mail, ChevronRight, Bath, Sofa, BedDouble, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { CATEGORIES, PRODUCTS, getProductsByCategory } from '@/data/catalogue';
import type { Lang, RoomId, ColorVariant, CatalogueProduct } from '@/types';

// Room config

interface RoomConfig {
  id: RoomId;
  label: Record<Lang, string>;
  defaultImage: string;
  Icon: LucideIcon;
}

const ROOMS: RoomConfig[] = [
  {
    id: 'bathroom',
    label: { en: 'Bathroom', fr: 'Salle de bain', ar: 'الحمام' },
    defaultImage: '/rooms/bathroom-default.jpg?v=2',
    Icon: Bath,
  },
  {
    id: 'living-room',
    label: { en: 'Living Room', fr: 'Salon', ar: 'غرفة المعيشة' },
    defaultImage: '/rooms/living-room-default.jpg?v=2',
    Icon: Sofa,
  },
  {
    id: 'bedroom',
    label: { en: 'Bedroom', fr: 'Chambre', ar: 'غرفة النوم' },
    defaultImage: '/rooms/bedroom-default.jpg?v=2',
    Icon: BedDouble,
  },
  {
    id: 'kitchen',
    label: { en: 'Kitchen', fr: 'Cuisine', ar: 'المطبخ' },
    defaultImage: '/rooms/kitchen-default.jpg?v=2',
    Icon: UtensilsCrossed,
  },
];

function getRoomImage(variant: ColorVariant | null, roomId: RoomId): string {
  if (!variant) return ROOMS.find((r) => r.id === roomId)!.defaultImage;
  if (variant.roomImages?.[roomId]) return variant.roomImages[roomId]!;
  return `/previews/${roomId}/${variant.id}.jpg`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

export default function Preview() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const lang = i18n.language as Lang;

  const [selectedRoomId, setSelectedRoomId] = useState<RoomId>(() => {
    return (localStorage.getItem('arcada_preview_room') as RoomId) ?? 'bathroom';
  });

  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<CatalogueProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant | null>(null);

  const productsInCategory = useMemo(
    () => (selectedCategorySlug ? getProductsByCategory(selectedCategorySlug) : []),
    [selectedCategorySlug],
  );

  useEffect(() => {
    localStorage.setItem('arcada_preview_room', selectedRoomId);
  }, [selectedRoomId]);

  useEffect(() => {
    const productSlug = searchParams.get('product');
    const variantId = searchParams.get('variant');
    if (!productSlug) return;
    const product = PRODUCTS.find((p) => p.slug === productSlug);
    if (!product) return;
    setSelectedCategorySlug(product.categorySlug);
    setSelectedProduct(product);
    const variant = variantId
      ? (product.variants.find((v) => v.id === variantId) ?? product.variants[0])
      : product.variants[0];
    setSelectedVariant(variant ?? null);
  }, [searchParams]);

  const handleReset = () => {
    setSelectedCategorySlug(null);
    setSelectedProduct(null);
    setSelectedVariant(null);
  };

  const buildWhatsApp = () => {
    const base = 'https://wa.me/213550242454';
    if (!selectedProduct || !selectedVariant) return base;
    const roomLabel = ROOMS.find((r) => r.id === selectedRoomId)?.label[lang] ?? selectedRoomId;
    const text = [
      'Bonjour ARCADA,',
      '',
      'Je suis intéressé par le produit suivant :',
      `- ${selectedProduct.name[lang]} · ${selectedVariant.name[lang]}`,
      `- Pièce : ${roomLabel}`,
      '',
      'Merci de me contacter pour un devis.',
    ].join('\n');
    return `${base}?text=${encodeURIComponent(text)}`;
  };

  const roomImage = getRoomImage(selectedVariant, selectedRoomId);
  const currentRoom = ROOMS.find((r) => r.id === selectedRoomId)!;

  return (
    <>
      <SEOHead
        title="Visualiseur de pièce — ARCADA"
        description="Prévisualisez nos carreaux céramiques dans votre espace avec le visualiseur ARCADA."
      />

      <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">

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

          {/* Room selector — full width above split */}
          <div className="mb-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-4">
              {lang === 'fr' ? '0 · Choisir une pièce' : lang === 'ar' ? '٠ · اختر الغرفة' : '0 · Choose a room'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ROOMS.map((room) => {
                const Icon = room.Icon;
                const isActive = selectedRoomId === room.id;
                return (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`flex items-center gap-3 px-5 py-4 border transition-all duration-200 text-left ${
                      isActive
                        ? 'border-dark bg-dark text-white'
                        : 'border-[#E8E2D9] bg-white text-dark hover:border-dark'
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    <span className="font-sans text-[11px] uppercase tracking-[0.18em] leading-tight">
                      {room.label[lang]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-10">

            {/* Left panel */}
            <aside className="lg:w-[38%] flex-shrink-0 space-y-8">

              <section>
                <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">
                  {t('visualizer.step1')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setSelectedCategorySlug(cat.slug);
                        setSelectedProduct(null);
                        setSelectedVariant(null);
                      }}
                      className={`px-3 py-1.5 font-sans text-[11px] uppercase tracking-wider border transition-all duration-200 ${
                        selectedCategorySlug === cat.slug
                          ? 'bg-dark text-white border-dark'
                          : 'text-muted border-[#E8E2D9] hover:border-dark hover:text-dark'
                      }`}
                    >
                      {cat.name[lang]}
                    </button>
                  ))}
                </div>
              </section>

              <AnimatePresence mode="wait">
                {selectedCategorySlug && (
                  <motion.section
                    key={selectedCategorySlug}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">
                      {t('visualizer.step2')}
                    </p>
                    <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
                      {productsInCategory.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product);
                            setSelectedVariant(product.variants[0] ?? null);
                          }}
                          className={`text-left px-4 py-3 border font-sans text-sm transition-all duration-200 ${
                            selectedProduct?.id === product.id
                              ? 'border-dark bg-dark text-white'
                              : 'border-[#E8E2D9] text-dark hover:border-dark bg-white'
                          }`}
                        >
                          <span className="block">{product.name[lang]}</span>
                          <span className="block text-[10px] tracking-wider mt-0.5 opacity-60">
                            {product.size} · {product.finish}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {selectedProduct && (
                  <motion.section
                    key={selectedProduct.id}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">
                      {t('visualizer.step3')}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-3">
                      {selectedProduct.variants.map((variant) => (
                        <button
                          key={variant.id}
                          title={variant.name[lang]}
                          onClick={() => setSelectedVariant(variant)}
                          className="w-10 h-10 rounded-full flex-shrink-0 transition-transform duration-200 hover:scale-110"
                          style={{
                            backgroundColor: variant.hex,
                            outline:
                              selectedVariant?.id === variant.id
                                ? '2px solid #1A1714'
                                : '2px solid #E8E2D9',
                            outlineOffset: '2px',
                          }}
                        />
                      ))}
                    </div>
                    {selectedVariant && (
                      <p className="font-sans text-xs text-muted tracking-wide">
                        {selectedVariant.name[lang]}
                      </p>
                    )}
                  </motion.section>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {selectedVariant && (
                  <motion.section
                    key="cta"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border-t border-[#E8E2D9] pt-6"
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-muted mb-3">
                      {t('visualizer.selectedProducts')}
                    </p>
                    <div className="flex items-center gap-3 mb-6 p-4 bg-[#F2EDE6]">
                      <span
                        className="w-8 h-8 rounded-full flex-shrink-0 border border-[#E8E2D9]"
                        style={{ backgroundColor: selectedVariant.hex }}
                      />
                      <div className="min-w-0">
                        <p className="font-display text-dark text-lg font-light leading-tight truncate">
                          {selectedProduct?.name[lang]}
                        </p>
                        <p className="font-sans text-xs text-muted mt-0.5">
                          {selectedVariant.name[lang]}
                          {selectedProduct && ` · ${selectedProduct.size}`}
                        </p>
                        <p className="font-sans text-[10px] text-accent mt-0.5 uppercase tracking-wide">
                          {currentRoom.label[lang]}
                        </p>
                      </div>
                      <ChevronRight size={14} className="text-muted flex-shrink-0 ml-auto" />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleReset}
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
                  </motion.section>
                )}
              </AnimatePresence>
            </aside>

            {/* Right panel */}
            <main className="lg:flex-1 min-w-0">
              <div className="lg:sticky lg:top-28">
                <div className="relative overflow-hidden aspect-[4/3] bg-[#E8E2D9]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={roomImage}
                      src={roomImage}
                      alt={
                        selectedVariant
                          ? `${selectedProduct?.name[lang]} · ${selectedVariant.name[lang]} — ${currentRoom.label[lang]}`
                          : currentRoom.label[lang]
                      }
                      className="absolute inset-0 w-full h-full object-cover"
                      fetchPriority="high"
                      decoding="async"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </AnimatePresence>

                  {!selectedVariant && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark/20 pointer-events-none">
                      <p className="font-sans text-white text-xs uppercase tracking-[0.4em] text-center px-8 drop-shadow">
                        {lang === 'fr'
                          ? 'Choisissez une couleur pour voir le résultat'
                          : lang === 'ar'
                            ? 'اختر لونًا لرؤية النتيجة'
                            : 'Choose a color to see the result'}
                      </p>
                    </div>
                  )}

                  {selectedVariant && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#E8E2D9] flex-shrink-0"
                        style={{ backgroundColor: selectedVariant.hex }}
                      />
                      <span className="font-sans text-[11px] text-dark tracking-wide">
                        {selectedProduct?.name[lang]} · {selectedVariant.name[lang]}
                      </span>
                      <span className="font-sans text-[10px] text-accent uppercase tracking-wider ml-1">
                        — {currentRoom.label[lang]}
                      </span>
                    </motion.div>
                  )}

                  <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                    {ROOMS.map((room) => {
                      const Icon = room.Icon;
                      const isActive = selectedRoomId === room.id;
                      return (
                        <button
                          key={room.id}
                          onClick={() => setSelectedRoomId(room.id)}
                          title={room.label[lang]}
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