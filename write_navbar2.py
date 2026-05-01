content = r"""import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/store/cartStore';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const COLLECTIONS = [
  { slug: 'carrelage-sol',    label_en: 'Floor Tiles',   label_fr: 'Silos',   label_ar: '\u0628\u0644\u0627\u0637 \u0627\u0644\u0623\u0631\u0636\u064a\u0629' },
  { slug: 'revetement-mural', label_en: 'Wall Cladding', label_fr: 'Atelier', label_ar: '\u062a\u0643\u0633\u064a\u0629 \u0627\u0644\u062c\u062f\u0631\u0627\u0646' },
  { slug: 'grandes-dalles',   label_en: 'Large Format',  label_fr: 'Ducal',   label_ar: '\u0628\u0644\u0627\u0637 \u0643\u0628\u064a\u0631' },
  { slug: 'exterieur',        label_en: 'Outdoor',       label_fr: 'Chic',    label_ar: '\u0627\u0644\u062e\u0627\u0631\u062c\u064a' },
  { slug: 'plans-de-travail', label_en: 'Countertops',   label_fr: 'Gonos',   label_ar: '\u0633\u0637\u062d \u0627\u0644\u0639\u0645\u0644' },
  { slug: 'salle-de-bain',    label_en: 'Bathroom',      label_fr: 'Leaf',    label_ar: '\u0627\u0644\u062d\u0645\u0627\u0645' },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());
  const isCartOpen = useCartStore((s) => s.isCartOpen);
  const openCart = useCartStore((s) => s.openCart);
  const closeCart = useCartStore((s) => s.closeCart);

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevScrollY = useRef(0);

  const lang = i18n.language as 'en' | 'fr' | 'ar';
  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
    closeCart();
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      const isScrolled = curr > 80;
      setScrolled(isScrolled);
      if (isScrolled) {
        setVisible(curr < prevScrollY.current);
      } else {
        setVisible(true);
      }
      prevScrollY.current = curr;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const getCatLabel = (c: typeof COLLECTIONS[0]) =>
    lang === 'fr' ? c.label_fr : lang === 'ar' ? c.label_ar : c.label_en;

  const iconCls = transparent
    ? 'text-white/80 hover:text-white'
    : 'text-[#1A1714] hover:text-[#8B7355]';

  const linkBase =
    'nav-link font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 whitespace-nowrap';

  const linkCls = (active = false) =>
    [
      linkBase,
      transparent
        ? active
          ? 'text-white'
          : 'text-white/80 hover:text-white'
        : active
        ? 'text-[#8B7355]'
        : 'text-[#1A1714]',
    ].join(' ');

  return (
    <>
      {/* ── Outer wrapper: fixed full-width, handles y-slide on scroll direction ── */}
      <motion.div
        className="fixed z-[70] left-0 right-0 top-0"
        animate={{ y: !visible && scrolled ? '-110%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Inner: becomes a floating pill when scrolled */}
        <div
          className={[
            'transition-all duration-300',
            scrolled ? 'mx-3 mt-3' : '',
          ].join(' ')}
        >
          <header
            className={[
              'transition-all duration-300',
              scrolled
                ? 'rounded-full bg-white/95 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.10)]'
                : transparent
                ? 'bg-transparent'
                : 'bg-white border-b border-[#E8E2D9]',
            ].join(' ')}
          >
            <div
              className={[
                'grid grid-cols-[1fr_auto_1fr] items-center',
                scrolled ? 'h-[60px] px-5 lg:px-8' : 'h-[72px] px-6 lg:px-14',
              ].join(' ')}
            >
              {/* LEFT — desktop nav links */}
              <div className="flex items-center">
                <nav className="hidden lg:flex items-center gap-8">
                  <div onMouseEnter={openMega} onMouseLeave={closeMega}>
                    <button className={linkCls()}>{t('nav.collections')}</button>
                  </div>
                  <NavLink to="/shop" className={({ isActive }) => linkCls(isActive)}>
                    {t('nav.shop')}
                  </NavLink>
                  <NavLink to="/contact" className={({ isActive }) => linkCls(isActive)}>
                    {t('nav.contact')}
                  </NavLink>
                  <NavLink to="/contact" className={linkCls()}>
                    {t('nav.showroom')}
                  </NavLink>
                </nav>
                <button
                  onClick={() => setMobileOpen(true)}
                  className={`lg:hidden p-2 transition-colors ${iconCls}`}
                  aria-label="Menu"
                >
                  <Menu size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* CENTER — logo */}
              <Link to="/" className="flex justify-center" aria-label="ARCADA">
                <img
                  src="/logo.jpg"
                  alt="ARCADA"
                  className={[
                    'w-auto object-contain transition-all duration-300',
                    scrolled ? 'h-9' : 'h-12',
                  ].join(' ')}
                />
              </Link>

              {/* RIGHT — language, search, cart */}
              <div className="flex items-center justify-end gap-4 lg:gap-5">
                <div className="hidden lg:block">
                  <LanguageSwitcher />
                </div>
                <button
                  onClick={() => setSearchOpen((o) => !o)}
                  className={`hidden lg:flex items-center p-1.5 transition-colors ${iconCls}`}
                  aria-label={t('common.search')}
                >
                  <Search size={17} strokeWidth={1.5} />
                </button>
                <button
                  onClick={openCart}
                  className={`relative p-1.5 transition-colors ${iconCls}`}
                  aria-label={t('nav.cart')}
                >
                  <ShoppingCart size={17} strokeWidth={1.5} />
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span
                        key={totalItems}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B7355] text-white text-[9px] font-sans font-semibold rounded-full flex items-center justify-center"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* SEARCH DROPDOWN */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`overflow-hidden bg-white border-t border-[#E8E2D9] ${scrolled ? 'rounded-b-[30px]' : ''}`}
                >
                  <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center gap-4">
                    <Search size={15} strokeWidth={1.5} className="text-[#6B6459] flex-shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }
                        if (e.key === 'Escape') setSearchOpen(false);
                      }}
                      placeholder={t('common.search')}
                      className="flex-1 font-sans text-sm text-[#1A1714] placeholder-[#9E9189] bg-transparent focus:outline-none"
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="text-[#6B6459] hover:text-[#1A1714] transition-colors"
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>
        </div>

        {/* MEGA MENU — directly below the pill/header in the fixed stack */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className={[
                'bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] z-50',
                scrolled
                  ? 'mx-3 rounded-b-[30px] border border-t-0 border-[#E8E2D9]'
                  : 'border-b border-[#E8E2D9]',
              ].join(' ')}
            >
              <div className="max-w-screen-xl mx-auto px-14 py-12 grid grid-cols-[1fr_380px] gap-16">
                {/* Left: collection list */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B6459] mb-8">
                    {t('nav.collections')}
                  </p>
                  <div className="grid grid-cols-2 gap-x-10">
                    {COLLECTIONS.map((col) => (
                      <Link
                        key={col.slug}
                        to={`/category/${col.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group flex items-center justify-between py-4 border-b border-[#E8E2D9]/70"
                      >
                        <span className="font-display text-[22px] font-light text-[#1A1714] group-hover:text-[#8B7355] transition-colors duration-200 leading-none">
                          {getCatLabel(col)}
                        </span>
                        <span className="w-0 group-hover:w-5 h-px bg-[#8B7355] transition-all duration-300 ml-2 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/shop"
                    onClick={() => setMegaOpen(false)}
                    className="inline-flex items-center gap-3 mt-10 font-sans text-[10px] uppercase tracking-[0.28em] text-[#8B7355] hover:text-[#6A5840] transition-colors group"
                  >
                    {t('sections.viewAll')}
                    <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
                  </Link>
                </div>

                {/* Right: atmospheric image panel */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    backgroundImage: "url('/image6.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '300px',
                  }}
                >
                  <div className="absolute inset-0 bg-dark/55" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p className="font-sans text-white/50 text-[10px] uppercase tracking-[0.3em] mb-2">
                      {t('hero.tagline')}
                    </p>
                    <p
                      className="font-display text-white font-light leading-tight mb-5"
                      style={{ fontSize: '26px' }}
                    >
                      Collection Signature
                      <br />
                      2026
                    </p>
                    <Link
                      to="/shop"
                      onClick={() => setMegaOpen(false)}
                      className="inline-flex items-center gap-2 font-sans text-white/70 text-[10px] uppercase tracking-[0.25em] hover:text-white transition-colors group"
                    >
                      {t('hero.cta')}
                      <span className="w-4 h-px bg-current group-hover:w-7 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* MOBILE MENU — slides from LEFT with backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-[75]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-white z-[80] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E2D9]">
                <img src="/logo.jpg" alt="ARCADA" className="h-10 w-auto object-contain" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-[#6B6459] hover:text-[#1A1714] transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-6">
                {[
                  { to: '/', label: t('nav.home') },
                  { to: '/shop', label: t('nav.collections') },
                  { to: '/contact', label: t('nav.contact') },
                  { to: '/contact', label: t('nav.showroom') },
                ].map((item, i) => (
                  <motion.button
                    key={item.label + String(i)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={() => {
                      setMobileOpen(false);
                      navigate(item.to);
                    }}
                    className="block w-full text-left font-display text-[36px] font-light text-[#1A1714] hover:text-[#8B7355] transition-colors py-3 border-b border-[#E8E2D9]/60 leading-none"
                  >
                    {item.label}
                  </motion.button>
                ))}

                <div className="pt-8 pb-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B6459] mb-5">
                    {t('nav.collections')}
                  </p>
                  {COLLECTIONS.map((col, i) => (
                    <motion.button
                      key={col.slug}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 + 0.3 }}
                      onClick={() => {
                        setMobileOpen(false);
                        navigate(`/category/${col.slug}`);
                      }}
                      className="block w-full text-left font-sans text-sm text-[#2D2926] hover:text-[#8B7355] transition-colors py-2.5 border-b border-[#E8E2D9]/40 tracking-wide"
                    >
                      {getCatLabel(col)}
                    </motion.button>
                  ))}
                </div>
              </nav>

              <div className="px-6 py-4 border-t border-[#E8E2D9] flex items-center justify-between gap-4">
                <LanguageSwitcher />
                <button
                  onClick={() => {
                    openCart();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#2D2926] hover:text-[#8B7355] transition-colors"
                >
                  <ShoppingCart size={15} strokeWidth={1.5} />
                  {t('nav.cart')} {totalItems > 0 && `(${totalItems})`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
"""

with open("src/components/layout/Navbar.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Navbar.tsx written successfully")
