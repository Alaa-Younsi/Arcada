import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Pause, Play } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { CATEGORIES, getFeaturedProducts } from '@/data/catalogue';
import type { Lang } from '@/types';

const MAX_SWATCHES = 6;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08 } }),
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const featured = getFeaturedProducts();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      void videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <SEOHead
        title="ARCADA — Surfaces Céramiques de Prestige"
        description="Découvrez ARCADA, fabricant algérien de carreaux céramique premium. 9 collections exclusives."
      />

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/40 to-dark/10" />

        {/* Pause / Resume button */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          className="absolute bottom-8 right-8 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-colors duration-200"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <div className="relative h-full flex flex-col justify-end px-6 lg:px-16 pb-20 max-w-screen-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/60 mb-5">
              {t('hero.tagline')}
            </p>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display font-light text-white mb-6 leading-[1.05]"
            style={{ fontSize: 'clamp(44px, 7vw, 100px)' }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="font-sans text-white/70 text-sm max-w-md tracking-wide leading-relaxed mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Link
              to="/preview"
              className="inline-block rounded-2xl px-8 py-4 bg-white text-dark font-sans text-xs uppercase tracking-[0.25em] hover:bg-accent hover:text-white transition-colors duration-300"
            >
              {t('hero.ctaVisualizer')}
            </Link>
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors group pt-4 sm:pt-0 sm:self-center"
            >
              {t('hero.ctaCatalogue')}
              <span className="w-6 h-px bg-current group-hover:w-12 transition-all duration-300" />
            </Link>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 font-sans text-white/40 text-xs tracking-widest"
          >
            ✦ {t('hero.visualizerTeaser')}
          </motion.p>
        </div>
      </section>

      {/* ─── MANIFESTO QUOTE ────────────────────────────────────────── */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-[#FAF8F5]">
        {/* Decorative large background letter */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-display font-light text-[#E8E2D9] leading-none"
          style={{ fontSize: 'clamp(160px, 28vw, 380px)' }}
        >
          A
        </span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative max-w-screen-xl mx-auto px-6 lg:px-16 text-center"
        >
          {/* Opening mark */}
          <p
            aria-hidden="true"
            className="font-display text-accent/40 leading-none mb-2 select-none"
            style={{ fontSize: 'clamp(60px, 8vw, 120px)' }}
          >
            "
          </p>

          <blockquote
            className="font-display font-light text-dark leading-[1.15]"
            style={{ fontSize: 'clamp(28px, 4.5vw, 68px)' }}
          >
            {lang === 'fr' ? (
              <>
                Qualité,{' '}
                <em className="not-italic text-accent">durabilité</em>,{' '}
                design<br className="hidden md:block" /> et innovation
              </>
            ) : lang === 'ar' ? (
              <>
                جودة،{' '}
                <em className="not-italic text-accent">استدامة</em>،{' '}
                تصميم وابتكار
              </>
            ) : (
              <>
                Quality,{' '}
                <em className="not-italic text-accent">sustainability</em>,{' '}
                design<br className="hidden md:block" /> and innovation
              </>
            )}
          </blockquote>

          {/* Closing mark + divider */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <span className="flex-1 max-w-[120px] h-px bg-[#E8E2D9]" />
            <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-muted">
              ARCADA
            </p>
            <span className="flex-1 max-w-[120px] h-px bg-[#E8E2D9]" />
          </div>
        </motion.div>
      </section>

      {/* ─── EXCLUSIVE MANUFACTURER ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: bold statement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-accent mb-6">
              {lang === 'fr' ? 'Fabricant exclusif' : lang === 'ar' ? 'الشركة المصنّعة الحصرية' : 'Exclusive Manufacturer'}
            </p>
            <h2
              className="font-display font-light text-white leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(36px, 5.5vw, 80px)' }}
            >
              {lang === 'fr'
                ? <>Nous concevons.<br />Nous fabriquons.<br />Nous vendons.</>
                : lang === 'ar'
                  ? <>نصمم.<br />نصنع.<br />نبيع.</>
                  : <>We design.<br />We manufacture.<br />We sell.</>}
            </h2>
            <div className="w-12 h-px bg-accent mb-8" />
            <p className="font-sans text-white/50 text-sm leading-relaxed tracking-wide max-w-md">
              {lang === 'fr'
                ? 'ARCADA est le premier et unique fabricant algérien de ces produits. Chaque modèle, chaque couleur, chaque finition est conçu et produit exclusivement par nos équipes. Ces carreaux n\'existent nulle part ailleurs.'
                : lang === 'ar'
                  ? 'ARCADA هي أول وحيد شركة جزائرية تصنّع هذه المنتجات. كل نموذج، كل لون، كل تشطيب مصمَّم ومنتَج حصريًا من قِبَل فِرَقنا. هذه البلاطات لا توجد في أي مكان آخر.'
                  : 'ARCADA is the first and only Algerian manufacturer of these products. Every model, every color, every finish is designed and produced exclusively by our teams. These tiles exist nowhere else.'}
            </p>
          </motion.div>

          {/* Right: three pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:w-1/2 grid grid-cols-1 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden"
          >
            {[
              {
                icon: '◈',
                title: lang === 'fr' ? 'Conception' : lang === 'ar' ? 'التصميم' : 'Design',
                body: lang === 'fr'
                  ? 'Chaque forme, motif et couleur naît dans nos ateliers.'
                  : lang === 'ar'
                    ? 'كل شكل ونقش ولون يولد في ورشاتنا.'
                    : 'Every shape, pattern and colour is born in our studios.',
              },
              {
                icon: '◉',
                title: lang === 'fr' ? 'Fabrication' : lang === 'ar' ? 'التصنيع' : 'Manufacture',
                body: lang === 'fr'
                  ? 'Produit entièrement en Algérie, avec une maîtrise artisanale totale.'
                  : lang === 'ar'
                    ? 'مصنوع بالكامل في الجزائر بإتقان حرفي كامل.'
                    : 'Made entirely in Algeria with complete artisanal mastery.',
              },
              {
                icon: '◎',
                title: lang === 'fr' ? 'Distribution directe' : lang === 'ar' ? 'البيع المباشر' : 'Direct Sales',
                body: lang === 'fr'
                  ? 'Vendu directement par ARCADA — aucun intermédiaire.'
                  : lang === 'ar'
                    ? 'يُباع مباشرةً بواسطة ARCADA — لا وسيط.'
                    : 'Sold directly by ARCADA — no intermediary.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-dark px-8 py-7 flex items-start gap-5">
                <span className="text-accent text-xl mt-0.5 flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-sans text-white text-xs uppercase tracking-[0.25em] mb-2">{title}</p>
                  <p className="font-sans text-white/40 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── COLLECTIONS GRID ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-16 max-w-screen-2xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">
              {t('nav.collections')}
            </p>
            <h2
              className="font-display font-light text-dark"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              {lang === 'fr' ? '9 Collections' : lang === 'ar' ? '9 مجموعات' : '9 Collections'}
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="hidden sm:inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.25em] text-muted hover:text-accent transition-colors group"
          >
            {t('common.viewAll')}
            <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i * 0.5}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface-warm"
            >
              <img
                src={cat.image}
                alt={cat.name[lang]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />

              {/* Default state */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 group-hover:opacity-0">
                <p className="font-sans text-white/60 text-[10px] uppercase tracking-[0.3em] mb-2">
                  {cat.shape}
                </p>
                <h3 className="font-display font-light text-white text-2xl leading-tight">
                  {cat.name[lang]}
                </h3>
              </div>

              {/* Hover state */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark/60">
                <p className="font-sans text-white/60 text-[10px] uppercase tracking-[0.3em] mb-2">
                  {cat.shape}
                </p>
                <h3 className="font-display font-light text-white text-2xl leading-tight mb-3">
                  {cat.name[lang]}
                </h3>
                <p className="font-sans text-white/70 text-xs leading-relaxed mb-4">
                  {cat.description[lang]}
                </p>
                <Link
                  to={`/catalogue/${cat.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-white text-[10px] uppercase tracking-[0.25em] group/link"
                >
                  Voir →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-surface-warm">
        <div className="px-6 lg:px-16 max-w-screen-2xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-accent mb-3">
                {lang === 'fr' ? 'Sélection' : lang === 'ar' ? 'اختيار' : 'Selection'}
              </p>
              <h2
                className="font-display font-light text-dark"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                {lang === 'fr' ? 'Produits phares' : lang === 'ar' ? 'المنتجات المميزة' : 'Featured Products'}
              </h2>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-16 overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
            {featured.slice(0, 6).map((product) => {
              const cat = CATEGORIES.find((c) => c.slug === product.categorySlug);
              const firstImage = product.variants[0]?.image ?? '/placeholder.jpg';
              const shown = product.variants.slice(0, MAX_SWATCHES);
              const extra = product.variants.length > MAX_SWATCHES ? product.variants.length - MAX_SWATCHES : 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-72 flex-shrink-0 group"
                >
                  <Link to={`/catalogue/${product.categorySlug}/${product.slug}`} className="block">
                    <div className="aspect-[3/4] bg-surface overflow-hidden relative rounded-2xl">
                      <img
                        src={firstImage}
                        alt={product.name[lang]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="pt-4">
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
                        {cat?.name[lang]}
                      </p>
                      <h3 className="font-display font-light text-dark text-xl mb-3">
                        {product.name[lang]}
                      </h3>
                    </div>
                  </Link>
                  <div className="flex items-center gap-1.5">
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
            })}
          </div>
        </div>
      </section>

      {/* ─── VISUALIZER CTA ─────────────────────────────────────────── */}
      <section className="py-20 md:py-32 px-6 lg:px-16 bg-[#1A1714]">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-accent mb-5">
              {t('visualizer.title')}
            </p>
            <h2
              className="font-display font-light text-white mb-6 leading-tight"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              {lang === 'fr' ? 'Créez votre espace' : lang === 'ar' ? 'صمم مساحتك' : 'Design your space'}
            </h2>
            <p className="font-sans text-white/50 text-sm leading-relaxed tracking-wide mb-10 max-w-md">
              {t('visualizer.subtitle')}
            </p>
            <Link
              to="/preview"
              className="inline-block px-8 py-4 border border-white/30 text-white font-sans text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-dark transition-all duration-300"
            >
              {lang === 'fr' ? 'Lancer le Visualiseur' : lang === 'ar' ? 'فتح العارض' : 'Open the Visualizer'}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative aspect-square overflow-hidden hidden lg:block"
          >
            <img src="/image6.png" alt="Carreaux céramiques ARCADA dans un espace intérieur" className="w-full h-full object-cover opacity-60" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/60 to-transparent" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
