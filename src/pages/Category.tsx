import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';
import { CATEGORIES, PRODUCTS, getProductsByCategory } from '@/data/catalogue';
import type { Lang, CatalogueProduct } from '@/types';

const MAX_SWATCHES = 8;

function ProductCard({ product, lang }: { product: CatalogueProduct; lang: Lang }) {
  const { t } = useTranslation();
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

export default function Category() {
  const { categorySlug = '' } = useParams<{ categorySlug: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const products = getProductsByCategory(categorySlug);

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-display text-dark/30 text-3xl font-light">Collection introuvable</p>
        <Link
          to="/catalogue"
          className="font-sans text-xs uppercase tracking-[0.2em] text-accent hover:text-dark transition-colors"
        >
          {t('common.backTo')} {t('nav.catalogue')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${category.name[lang]} — ARCADA`}
        description={category.description[lang]}
      />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name[lang]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 lg:px-16 pb-16 max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/60 mb-3">
              {t('product.category')}
            </p>
            <h1
              className="font-display font-light text-white mb-3"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              {category.name[lang]}
            </h1>
            <p className="font-sans text-white/70 text-sm max-w-xl leading-relaxed tracking-wide mb-2">
              {category.description[lang]}
            </p>
            <p className="font-sans text-white/40 text-xs tracking-widest uppercase">
              {category.shape}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-6">
        <nav className="flex items-center gap-2 font-sans text-xs text-muted tracking-wide">
          <Link to="/catalogue" className="hover:text-accent transition-colors">
            {t('nav.catalogue')}
          </Link>
          <span>/</span>
          <span className="text-dark">{category.name[lang]}</span>
        </nav>
      </div>

      {/* Products grid */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-16 pb-28">
        {products.length === 0 ? (
          <p className="font-sans text-muted text-sm py-20 text-center">
            Aucun produit dans cette collection.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} />
            ))}
          </div>
        )}
      </section>

      {/* Other collections strip */}
      <section className="bg-surface-warm py-16 px-6 lg:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted mb-8">
            {t('common.discover')}
          </p>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.filter((c) => c.slug !== categorySlug).map((cat) => (
              <Link
                key={cat.slug}
                to={`/catalogue/${cat.slug}`}
                className="flex-shrink-0 group"
              >
                <div className="w-40 h-40 overflow-hidden bg-surface relative rounded-xl">
                  <img
                    src={cat.image}
                    alt={cat.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/10 transition-colors" />
                </div>
                <p className="font-sans text-xs text-dark mt-2 tracking-wide">{cat.name[lang]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
