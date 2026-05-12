import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { CATEGORIES } from '@/data/catalogue';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevScrollY = useRef(0);

  const lang = i18n.language as 'en' | 'fr' | 'ar';

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
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

  const getCatLabel = (cat: typeof CATEGORIES[0]) =>
    lang === 'fr' ? cat.name.fr : lang === 'ar' ? cat.name.ar : cat.name.en;

  const linkBase =
    'font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 whitespace-nowrap';
  const linkCls = (active = false) =>
    [linkBase, active ? 'text-[#8B7355]' : 'text-[#1A1714] hover:text-[#8B7355]'].join(' ');
  const iconCls = 'text-[#1A1714] hover:text-[#8B7355] transition-colors';

  return (
    <>
      <motion.div
        className="fixed z-[70] left-0 right-0 top-0"
        animate={{ y: !visible && scrolled ? '-110%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="mx-3 mt-3 transition-all duration-300">
          <header className="rounded-[16px] bg-white/95 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.10)] transition-all duration-300">
            <div
              className={[
                'grid grid-cols-[1fr_auto_1fr] items-center',
                scrolled ? 'h-[60px] px-5 lg:px-8' : 'h-[72px] px-6 lg:px-14',
              ].join(' ')}
            >
              {/* LEFT � desktop nav links */}
              <div className="flex items-center">
                <nav className="hidden lg:flex items-center gap-8">
                  <div onMouseEnter={openMega} onMouseLeave={closeMega} className="relative">
                    <NavLink to="/catalogue" className={({ isActive }) => linkCls(isActive)}>
                      {t('nav.collections')}
                    </NavLink>
                  </div>
                  <NavLink to="/catalogue" className={({ isActive }) => linkCls(isActive)}>
                    {t('nav.catalogue')}
                  </NavLink>
                  <NavLink to="/preview" className={({ isActive }) => linkCls(isActive)}>
                    {t('nav.visualizer')}
                  </NavLink>
                </nav>
                <button
                  onClick={() => setMobileOpen(true)}
                  className={`lg:hidden p-2 ${iconCls}`}
                  aria-label="Menu"
                >
                  <Menu size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* CENTER � logo */}
              <Link to="/" className="flex justify-center" aria-label="ARCADA">
                <img
                  src="/logo.png"
                  alt="ARCADA"
                  className={['w-auto object-contain transition-all duration-300', scrolled ? 'h-9' : 'h-12'].join(' ')}
                />
              </Link>

              {/* RIGHT � language switcher only */}
              <div className="flex items-center justify-end">
                <LanguageSwitcher />
              </div>
            </div>
          </header>
        </div>

        {/* MEGA MENU */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className="bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] z-50 mx-3 rounded-b-[16px] border border-t-0 border-[#E8E2D9]"
            >
              <div className="max-w-screen-xl mx-auto px-14 py-12 grid grid-cols-[1fr_380px] gap-16">
                {/* Collection list */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B6459] mb-8">
                    {t('nav.collections')}
                  </p>
                  <div className="grid grid-cols-2 gap-x-10">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/catalogue/${cat.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group flex items-center justify-between py-4 border-b border-[#E8E2D9]/70"
                      >
                        <span className="font-display text-[22px] font-light text-[#1A1714] group-hover:text-[#8B7355] transition-colors duration-200 leading-none">
                          {getCatLabel(cat)}
                        </span>
                        <span className="w-0 group-hover:w-5 h-px bg-[#8B7355] transition-all duration-300 ml-2 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/catalogue"
                    onClick={() => setMegaOpen(false)}
                    className="inline-flex items-center gap-3 mt-10 font-sans text-[10px] uppercase tracking-[0.28em] text-[#8B7355] hover:text-[#6A5840] transition-colors group"
                  >
                    {t('common.viewAll')}
                    <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
                  </Link>
                </div>

                {/* Atmospheric image panel */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    backgroundImage: "url('/image6.png')",
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
                    <p className="font-display text-white font-light leading-tight mb-5 text-[26px]">
                      {t('hero.title')}
                    </p>
                    <Link
                      to="/catalogue"
                      onClick={() => setMegaOpen(false)}
                      className="inline-flex items-center gap-2 font-sans text-white/70 text-[10px] uppercase tracking-[0.25em] hover:text-white transition-colors group"
                    >
                      {t('common.discover')}
                      <span className="w-4 h-px bg-current group-hover:w-7 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* MOBILE MENU � backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[75] transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* MOBILE MENU � panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-white z-[80] flex flex-col transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E2D9]">
          <img src="/logo.png" alt="ARCADA" className="h-10 w-auto object-contain" />
          <button onClick={() => setMobileOpen(false)} className={`p-1.5 ${iconCls}`}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          {[
            { to: '/', label: t('nav.home') },
            { to: '/catalogue', label: t('nav.catalogue') },
            { to: '/preview', label: t('nav.visualizer') },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="block font-display text-[36px] font-light text-[#1A1714] hover:text-[#8B7355] transition-colors py-3 border-b border-[#E8E2D9]/60 leading-none"
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-8 pb-4">
            <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#6B6459] mb-5">
              {t('nav.collections')}
            </p>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/catalogue/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block font-sans text-sm text-[#2D2926] hover:text-[#8B7355] transition-colors py-2.5 border-b border-[#E8E2D9]/40 tracking-wide"
              >
                {getCatLabel(cat)}
              </Link>
            ))}
          </div>
        </nav>

        <div className="px-6 py-5 border-t border-[#E8E2D9]">
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}

