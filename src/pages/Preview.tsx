import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RotateCcw, Mail, ChevronRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { CATEGORIES, PRODUCTS, getProductsByCategory } from '@/data/catalogue';
import type { Lang, ColorVariant, CatalogueProduct } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// Each variant has an AI-generated room photo at /previews/{variant.id}.jpg
// If the variant has an explicit roomImage set, that path is used instead.
// ─────────────────────────────────────────────────────────────────────────────

function getRoomImage(variant: ColorVariant | null): string {
  if (!variant) return '/rooms/room-modern.png';
  return variant.roomImage ?? `/previews/${variant.id}.jpg`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Preview() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const lang = i18n.language as Lang;

  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<CatalogueProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant | null>(null);

  const productsInCategory = useMemo(
    () => (selectedCategorySlug ? getProductsByCategory(selectedCategorySlug) : []),
    [selectedCategorySlug],
  );

  // Pre-populate from URL params (?product=slug&variant=id)
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
    const base = 'https://wa.me/213XXXXXXXXX';
    if (!selectedProduct || !selectedVariant) return base;
    const text = [
      'Bonjour ARCADA,',
      '',
      'Je suis intéressé par le produit suivant :',
      `- ${selectedProduct.name[lang]} · ${selectedVariant.name[lang]}`,
      '',
      'Merci de me contacter pour un devis.',
    ].join('\n');
    return `${base}?text=${encodeURIComponent(text)}`;
  };

  const roomImage = getRoomImage(selectedVariant);

  return (
    <>
      <SEOHead
        title="Visualiseur de pièce — ARCADA"
        description="Prévisualisez nos carreaux céramiques dans votre espace avec le visualiseur ARCADA."
      />

      <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">

          {/* Page header */}
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

          {/* Main layout: controls left, room image right */}
          <div className="flex flex-col-reverse lg:flex-row gap-10">

            {/* ─── LEFT PANEL ──────────────────────────────────────────── */}
            <aside className="lg:w-[38%] flex-shrink-0 space-y-8">

              {/* Step 1 — Collection */}
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
                      className={`px-3 py-1.5 rounded-2xl font-sans text-[11px] uppercase tracking-wider border transition-all duration-200 ${
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

              {/* Step 2 — Product */}
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
                          className={`text-left px-4 py-3 rounded-2xl border font-sans text-sm transition-all duration-200 ${
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

              {/* Step 3 — Color */}
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

              {/* CTA section */}
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
                    {/* Summary */}
                    <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-muted mb-3">
                      {t('visualizer.selectedProducts')}
                    </p>
                    <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-surface-warm">
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
                      </div>
                      <ChevronRight size={14} className="text-muted flex-shrink-0 ml-auto" />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E8E2D9] font-sans text-[10px] uppercase tracking-wider text-muted hover:border-dark hover:text-dark transition-colors"
                      >
                        <RotateCcw size={11} />
                        {t('visualizer.reset')}
                      </button>
                      <a
                        href={buildWhatsApp()}
                      target="_blank"
                      rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent text-white font-sans text-[10px] uppercase tracking-wider hover:bg-dark transition-colors duration-300"
                      >
                        <Mail size={11} />
                        {t('contact.cta')}
                      </a>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </aside>

            {/* ─── RIGHT PANEL: Room image ──────────────────────────────── */}
            <main className="lg:flex-1 min-w-0">
              <div className="lg:sticky lg:top-28">
                {/* Image swap — crossfade between room variants */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#E8E2D9]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={roomImage}
                      src={roomImage}
                      alt={selectedVariant ? selectedVariant.name[lang] : 'Room preview'}
                      className="absolute inset-0 w-full h-full object-cover"
                      fetchPriority="high"
                      decoding="async"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </AnimatePresence>

                  {/* Hint overlay when nothing selected */}
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

                  {/* Selected variant label */}
                  {selectedVariant && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#E8E2D9] flex-shrink-0"
                        style={{ backgroundColor: selectedVariant.hex }}
                      />
                      <span className="font-sans text-[11px] text-dark tracking-wide">
                        {selectedProduct?.name[lang]} · {selectedVariant.name[lang]}
                      </span>
                    </motion.div>
                  )}
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
