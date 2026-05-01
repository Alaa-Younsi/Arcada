import sys

content = r'''import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/store/cartStore';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const COLLECTIONS = [
  { slug: 'carrelage-sol',    label_en: 'Floor Tiles',   label_fr: 'Silos',   label_ar: 'بلاط الأرضية' },
  { slug: 'revetement-mural', label_en: 'Wall Cladding', label_fr: 'Atelier', label_ar: 'تكسية الجدران' },
  { slug: 'grandes-dalles',   label_en: 'Large Format',  label_fr: 'Ducal',   label_ar: 'بلاط كبير' },
  { slug: 'exterieur',        label_en: 'Outdoor',       label_fr: 'Chic',    label_ar: 'الخارجي' },
  { slug: 'plans-de-travail', label_en: 'Countertops',   label_fr: 'Gonos',   label_ar: 'سطح العمل' },
  { slug: 'salle-de-bain',    label_en: 'Bathroom',      label_fr: 'Leaf',    label_ar: 'الحمام' },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const onScroll = () => setScrolled(window.scrollY > 80);
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

  const linkBase = 'nav-link font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 whitespace-nowrap';

  const linkCls = (active = false) =>
    [
      linkBase,
      transparent
        ? active ? 'text-white' : 'text-white/80 hover:text-white'
        : active ? 'text-[#8B7355]' : 'text-[#1A1714]',
    ].join(' ');

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-[70] transition-all duration-300',
          transparent ? 'bg-transparent' : 'bg-white border-b border-[#E8E2D9]',
        ].join(' ')}
      >
        {/* Three-column grid: left nav | center logo | right actions */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[72px] px-6 lg:px-14">

          {/* LEFT — desktop nav + mobile hamburger */}
          <div className="flex items-center">
            <nav className="hidden lg:flex items-center gap-8">
              <div onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button className={linkCls()}>Collections</button>
              </div>
              <NavLink to="/shop" className={({ isActive }) => linkCls(isActive)}>
                {t('nav.shop')}
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => linkCls(isActive)}>
                {t('nav.contact')}
              </NavLink>
              <NavLink to="/contact" className={linkCls()}>
                Showroom
              </NavLink>
            </nav>
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 transition-colors ${iconCls}`}
              aria-label="Ouvrir le menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* CENTER — logo always perfectly centered */}
          <Link to="/" className="flex justify-center" aria-label="ARCADA — accueil">
            <img
              src="/logo.jpg"
              alt="ARCADA"
              className={[
                'h-12 w-auto object-contain transition-all duration-300',
                transparent ? 'brightness-0 invert' : '',
              ].join(' ')}
            />
          </Link>

          {/* RIGHT — language + search + cart */}
          <div className="flex items-center justify-end gap-4 lg:gap-5">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => setSearchOpen((o) => !o)}
              className={`hidden lg:flex items-center p-1.5 transition-colors ${iconCls}`}
              aria-label="Rechercher"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              className={`relative p-1.5 transition-colors ${iconCls}`}
              aria-label="Panier"
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
              className="overflow-hidden bg-white border-t border-[#E8E2D9]"
            >
              <div className="max-w-screen-xl mx-auto px-14 py-4 flex items-center gap-4">
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
                  placeholder="Rechercher une collection, une surface…"
                  className="flex-1 font-sans text-sm text-[#1A1714] placeholder-[#9E9189] bg-transparent focus:outline-none"
                />
                <button onClick={() => setSearchOpen(false)} className="text-[#6B6459] hover:text-[#1A1714] transition-colors">
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MEGA MENU — full-width panel */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className="absolute top-full left-0 right-0 bg-white border-b border-[#E8E2D9] shadow-[0_8px_32px_rgba(0,0,0,0.06)] z-50"
            >
              <div className="max-w-screen-xl mx-auto px-14 py-12 grid grid-cols-[1fr_380px] gap-16">
                {/* Left: collection list */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B6459] mb-8">
                    Nos Collections
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
                    Voir toutes les collections
                    <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
                  </Link>
                </div>

                {/* Right: atmospheric image panel */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, #C8BFB0 0%, #9E9189 45%, #6B6459 100%)',
                    minHeight: '300px',
                  }}
                >
                  <span
                    className="absolute top-6 right-8 font-display text-white/10 font-light leading-none select-none"
                    style={{ fontSize: '110px' }}
                  >
                    26
                  </span>
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p className="font-sans text-white/50 text-[10px] uppercase tracking-[0.3em] mb-2">Nouvelle saison</p>
                    <p className="font-display text-white font-light leading-tight mb-5" style={{ fontSize: '26px' }}>
                      Collection Signature<br />2026
                    </p>
                    <Link
                      to="/shop"
                      onClick={() => setMegaOpen(false)}
                      className="inline-flex items-center gap-2 font-sans text-white/70 text-[10px] uppercase tracking-[0.25em] hover:text-white transition-colors group"
                    >
                      Découvrir
                      <span className="w-4 h-px bg-current group-hover:w-7 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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
                <button onClick={() => setMobileOpen(false)} className="p-1.5 text-[#6B6459] hover:text-[#1A1714] transition-colors">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-6">
                {[
                  { to: '/', label: t('nav.home') },
                  { to: '/shop', label: 'Collections' },
                  { to: '/contact', label: t('nav.contact') },
                  { to: '/contact', label: 'Showroom' },
                ].map((item, i) => (
                  <motion.button
                    key={item.label + String(i)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={() => { setMobileOpen(false); navigate(item.to); }}
                    className="block w-full text-left font-display text-[36px] font-light text-[#1A1714] hover:text-[#8B7355] transition-colors py-3 border-b border-[#E8E2D9]/60 leading-none"
                  >
                    {item.label}
                  </motion.button>
                ))}

                <div className="pt-8 pb-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B6459] mb-5">Collections</p>
                  {COLLECTIONS.map((col, i) => (
                    <motion.button
                      key={col.slug}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 + 0.3 }}
                      onClick={() => { setMobileOpen(false); navigate(`/category/${col.slug}`); }}
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
                  onClick={() => { openCart(); setMobileOpen(false); }}
                  className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#2D2926] hover:text-[#8B7355] transition-colors"
                >
                  <ShoppingCart size={15} strokeWidth={1.5} />
                  Panier {totalItems > 0 && `(${totalItems})`}
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
'''

with open(r'C:\Users\USER\Desktop\arcada\src\components\layout\Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

lines = open(r'C:\Users\USER\Desktop\arcada\src\components\layout\Navbar.tsx', encoding='utf-8').readlines()
print(f'Done: {len(lines)} lines written')
