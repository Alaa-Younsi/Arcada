import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import {
  CATEGORIES,
  PRODUCTS,
  getProductsByCategory,
  getProductBySlug,
} from '@/data/catalogue';
import type { Lang, CatalogueProduct, ColorVariant } from '@/types';
import { useParams } from 'react-router-dom';

const MAX_SWATCHES = 8;

function SmallProductCard({ product, lang }: { product: CatalogueProduct; lang: Lang }) {
  const { t } = useTranslation();
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
            alt={product.name[lang]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-dark/70 to-transparent">
            <span className="font-sans text-white text-[10px] uppercase tracking-[0.2em]">
              {t('catalogue.viewDetails')}
            </span>
          </div>
        </div>
        <div className="pt-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent mb-1">{catName}</p>
          <h3 className="font-display text-dark font-light text-xl leading-tight mb-2">{product.name[lang]}</h3>
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
          <span className="font-sans text-[10px] text-muted">+{extra}</span>
        )}
      </div>
    </motion.div>
  );
}

export default function Product() {
  const { categorySlug = '', productSlug = '' } = useParams<{
    categorySlug: string;
    productSlug: string;
  }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const product = getProductBySlug(productSlug);
  const category = CATEGORIES.find((c) => c.slug === categorySlug);

  // ✅ Always call hooks before any conditional return
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant | null>(
    product?.variants[0] ?? null
  );

  const relatedProducts = product
    ? getProductsByCategory(categorySlug).filter((p) => p.slug !== productSlug).slice(0, 3)
    : [];

  if (!product || !category || !selectedVariant) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-display text-dark/30 text-3xl font-light">Produit introuvable</p>
        <Link to="/catalogue" className="font-sans text-xs uppercase tracking-[0.2em] text-accent hover:text-dark transition-colors">
          {t('common.backTo')} {t('nav.catalogue')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${product.name[lang]} — ARCADA`}
        description={product.description[lang]}
      />

      {/* Breadcrumb */}
      <div className="pt-24 pb-0 px-6 lg:px-16 max-w-screen-2xl mx-auto">
        <nav className="flex items-center gap-2 font-sans text-xs text-muted tracking-wide">
          <Link to="/catalogue" className="hover:text-accent transition-colors">
            {t('nav.catalogue')}
          </Link>
          <span>/</span>
          <Link to={`/catalogue/${categorySlug}`} className="hover:text-accent transition-colors">
            {category.name[lang]}
          </Link>
          <span>/</span>
          <span className="text-dark">{product.name[lang]}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square bg-surface-warm overflow-hidden rounded-2xl">
              <img
                key={selectedVariant.id}
                src={selectedVariant.image}
                alt={`${product.name[lang]} — ${selectedVariant.name[lang]}`}
                className="w-full h-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Right: details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:sticky lg:top-28"
          >
            <Link
              to={`/catalogue/${categorySlug}`}
              className="inline-flex items-center gap-1 font-sans text-[10px] uppercase tracking-[0.25em] text-accent hover:text-dark transition-colors mb-6"
            >
              <ChevronLeft size={12} />
              {category.name[lang]}
            </Link>

            <h1
              className="font-display font-light text-dark mb-2 leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              {product.name[lang]}
            </h1>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
              ✦&nbsp;{lang === 'fr' ? 'Fabriqué exclusivement par ARCADA' : lang === 'ar' ? 'مصنوع حصريًا بواسطة ARCADA' : 'Made exclusively by ARCADA'}
            </p>

            <p className="font-sans text-muted text-sm leading-relaxed mb-8 tracking-wide">
              {product.description[lang]}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-10 py-6 border-y border-[#E8E2D9]">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted mb-1">
                  {t('catalogue.size')}
                </p>
                <p className="font-sans text-sm text-dark">{product.size}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted mb-1">
                  {t('catalogue.finish')}
                </p>
                <p className="font-sans text-sm text-dark">{product.finish}</p>
              </div>
            </div>

            {/* Variant selector */}
            <div className="mb-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted mb-4">
                {t('catalogue.variants')} — <span className="text-dark normal-case">{selectedVariant.name[lang]}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    title={v.name[lang]}
                    className={[
                      'w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110',
                      selectedVariant.id === v.id
                        ? 'border-dark scale-110'
                        : 'border-[#E8E2D9]',
                    ].join(' ')}
                    style={{ backgroundColor: v.hex }}
                    aria-label={v.name[lang]}
                    aria-pressed={selectedVariant.id === v.id}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              to={`/preview?product=${product.slug}&variant=${selectedVariant.id}`}
              className="block w-full rounded-2xl py-4 bg-dark text-white font-sans text-xs uppercase tracking-[0.25em] text-center hover:bg-dark/80 transition-colors mb-4"
            >
              {t('catalogue.previewInRoom')}
            </Link>

            <a
              href={`https://wa.me/213550242454?text=${encodeURIComponent(`Bonjour ARCADA,\n\nJe suis intéressé par : ${product.name[lang]} · ${selectedVariant.name[lang]}\n\nMerci de me contacter.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-2xl py-4 border border-dark text-dark font-sans text-xs uppercase tracking-[0.25em] text-center hover:bg-surface-warm transition-colors"
            >
              {t('contact.cta')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-20 border-t border-[#E8E2D9]">
          <h2 className="font-display font-light text-dark text-3xl mb-10">
            {t('catalogue.relatedProducts')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <SmallProductCard key={p.id} product={p} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
