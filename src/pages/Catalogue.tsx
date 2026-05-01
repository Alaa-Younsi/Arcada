import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';
import { CATEGORIES, PRODUCTS, getProductsByCategory } from '@/data/catalogue';
import type { Lang } from '@/types';

const MAX_SWATCHES = 8;

function ProductCard({ product, lang }: { product: typeof PRODUCTS[0]; lang: Lang }) {
  const { t } = useTranslation();
  const name = product.name[lang];
  const cat = CATEGORIES.find((c) => c.slug === product.categorySlug);
  const catName = cat ? cat.name[lang] : product.categorySlug;
  const firstImage = product.variants[0]?.image ?? '/placeholder.jpg';
  const extra = product.variants.length > MAX_SWATCHES ? product.variants.length - MAX_SWATCHES : 0;
  const shown = product.variants.slice(0, MAX_SWATCHES);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/catalogue/${product.categorySlug}/${product.slug}`} className="block">
        <div className="overflow-hidden bg-surface-warm aspect-[4/5] relative rounded-2xl">
          <img
            src={firstImage}
            alt={name}
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
          <h3 className="font-display text-dark font-light text-xl leading-tight mb-2">{name}</h3>
          <p className="font-sans text-muted text-xs tracking-wide mb-3">
            {product.size} · {product.finish}
          </p>
        </div>
      </Link>
      <div className="flex items-center gap-1.5 flex-wrap">
        {shown.map((v) => (
          <Link
            key={v.id}
            to={`/catalogue/${product.categorySlug}/${product.slug}`}
            title={v.name[lang]}
            className="w-5 h-5 rounded-full border border-[#E8E2D9] hover:scale-125 transition-transform duration-200 flex-shrink-0"
            style={{ backgroundColor: v.hex }}
          />
        ))}
        {extra > 0 && (
          <span className="font-sans text-[10px] text-muted tracking-wide">+{extra}</span>
        )}
      </div>
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

  const displayedCategories = activeSlug
    ? CATEGORIES.filter((c) => c.slug === activeSlug)
    : CATEGORIES;

  return (
    <>
      <SEOHead
        title={`${t('catalogue.title')} — ARCADA`}
        description={t('catalogue.subtitle')}
      />

      {/* Header */}
      <div className="pt-32 pb-16 px-6 lg:px-16 max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 pb-28">
        <div className="flex gap-12">
          {/* Sidebar filter */}
          <aside className="w-56 flex-shrink-0 hidden lg:block">
            <div className="sticky top-28">
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

          {/* Product sections */}
          <div className="flex-1 min-w-0 space-y-20">
            {displayedCategories.map((cat) => {
              const products = getProductsByCategory(cat.slug);
              if (!products.length) return null;
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
                    {products.map((p) => (
                      <ProductCard key={p.id} product={p} lang={lang} />
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
