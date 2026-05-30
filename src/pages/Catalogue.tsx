import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';
import { CATEGORIES, getFlatVariantsByCategory, type FlatVariant } from '@/data/catalogue';
import type { Lang } from '@/types';

function ProductCard({ variant, lang }: { variant: FlatVariant; lang: Lang }) {
  const { t } = useTranslation();
  const cat = CATEGORIES.find((c) => c.slug === variant.categorySlug);
  const catName = cat ? cat.name[lang] : variant.categorySlug;
  const href = `/catalogue/${variant.categorySlug}/${variant.productSlug}?variant=${variant.variantId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={href} className="block">
        <div className="overflow-hidden bg-surface-warm aspect-[4/5] relative rounded-2xl">
          <img
            src={variant.image}
            alt={`${variant.productName[lang]} — ${variant.name[lang]}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-dark/70 to-transparent">
            <span className="font-sans text-white text-[10px] uppercase tracking-[0.2em]">
              {t('catalogue.viewDetails')}
            </span>
          </div>
        </div>
        <div className="pt-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent mb-1">{catName}</p>
          <h3 className="font-display text-dark font-light text-xl leading-tight mb-1">{variant.productName[lang]}</h3>
          <p className="font-sans text-muted text-xs tracking-wide">
            {variant.name[lang]} · {variant.size}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Catalogue() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = (slug: string) => {
    setActiveSlug(slug);
    sectionRefs.current[slug]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Always render all categories; setActiveSlug is only used for sidebar highlight
  const displayedCategories = CATEGORIES;

  return (
    <>
      <SEOHead
        title={`${t('catalogue.title')} — ARCADA`}
        description={t('catalogue.subtitle')}
      />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 pt-32 pb-28 flex gap-16">

        {/* ── Desktop sidebar ───────────────────────────────────────── */}
        <aside className="w-52 flex-shrink-0 hidden lg:block">
          <div className="sticky top-24">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted mb-6">
              {t('catalogue.filterBy')}
            </p>
            <button
              onClick={() => { setActiveSlug(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={[
                'block w-full text-left font-sans text-sm py-2.5 border-b border-[#E8E2D9]/60 transition-colors duration-200',
                activeSlug === null ? 'text-accent' : 'text-muted hover:text-dark',
              ].join(' ')}
            >
              {t('catalogue.allCollections')}
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => scrollToCategory(cat.slug)}
                className={[
                  'block w-full text-left font-sans text-sm py-2.5 border-b border-[#E8E2D9]/60 transition-colors duration-200',
                  activeSlug === cat.slug ? 'text-accent' : 'text-muted hover:text-dark',
                ].join(' ')}
              >
                {cat.name[lang]}
              </button>
            ))}
          </div>
        </aside>

        {/* ── Main content ────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent mb-4">
              {t('catalogue.allCollections')}
            </p>
            <h1
              className="font-display font-light text-dark mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              {t('catalogue.title')}
            </h1>
            <p className="font-sans text-muted text-sm max-w-xl tracking-wide leading-relaxed">
              {t('catalogue.subtitle')}
            </p>
          </motion.div>

          {/* Mobile filter bar */}
          <div className="lg:hidden -mx-1 mb-12 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => { setActiveSlug(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={[
                'flex-shrink-0 font-sans text-xs px-4 py-2 rounded-full border transition-colors duration-200',
                activeSlug === null
                  ? 'border-accent bg-accent text-white'
                  : 'border-[#E8E2D9] text-muted hover:border-accent hover:text-accent',
              ].join(' ')}
            >
              {t('catalogue.allCollections')}
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => scrollToCategory(cat.slug)}
                className={[
                  'flex-shrink-0 font-sans text-xs px-4 py-2 rounded-full border transition-colors duration-200',
                  activeSlug === cat.slug
                    ? 'border-accent bg-accent text-white'
                    : 'border-[#E8E2D9] text-muted hover:border-accent hover:text-accent',
                ].join(' ')}
              >
                {cat.name[lang]}
              </button>
            ))}
          </div>

          {/* Product sections */}
          <div className="space-y-20">
            {displayedCategories.map((cat) => {
              const flatVariants = getFlatVariantsByCategory(cat.slug);
              if (!flatVariants.length) return null;
              return (
                <section
                  key={cat.slug}
                  ref={(el) => { sectionRefs.current[cat.slug] = el; }}
                >
                  <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#E8E2D9]">
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent mb-2">
                        {cat.shape}
                      </p>
                      <h2 className="font-display font-light text-dark text-3xl">{cat.name[lang]}</h2>
                    </div>
                    <Link
                      to={`/catalogue/${cat.slug}`}
                      className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors hidden sm:inline-flex items-center gap-2 group"
                    >
                      {t('common.viewAll')}
                      <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {flatVariants.map((fv) => (
                      <ProductCard key={fv.variantId} variant={fv} lang={lang} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}
