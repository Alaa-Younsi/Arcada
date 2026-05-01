import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook } from "lucide-react";
import { CATEGORIES } from "@/data/catalogue";

export function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "fr" | "ar";

  return (
    <footer className="bg-dark text-white/70">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/logo.png" alt="ARCADA" className="h-12 w-auto object-contain mb-6 brightness-0 invert" />
            <p className="font-sans text-sm text-white/50 leading-relaxed mb-3 tracking-wide">
              {t("footer.tagline")}
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent/80 mb-6">
              {lang === 'fr' ? 'Fabricant & créateur exclusif' : lang === 'ar' ? 'المصنّع الحصري الوحيد' : 'Exclusive manufacturer'}
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/arcada_original_tile/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#8B7355] hover:text-[#8B7355] transition-colors">
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61562889557376" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#8B7355] hover:text-[#8B7355] transition-colors">
                <Facebook size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white mb-5">{t("nav.collections")}</h4>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/catalogue/${cat.slug}`}
                    className="font-sans text-sm text-white/50 hover:text-[#8B7355] transition-colors"
                  >
                    {lang === "fr" ? cat.name.fr : lang === "ar" ? cat.name.ar : cat.name.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white mb-5">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: t("nav.home") },
                { to: "/catalogue", label: t("nav.catalogue") },
                { to: "/preview", label: t("nav.visualizer") },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="font-sans text-sm text-white/50 hover:text-[#8B7355] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white mb-5">Contact</h4>
            <address className="not-italic space-y-3">
              <p className="font-sans text-sm text-white/50 leading-relaxed">{t("contact.address")}</p>
              <a href={`tel:${t("contact.phone")}`} className="block font-sans text-sm text-white/50 hover:text-[#8B7355] transition-colors">
                {t("contact.phone")}
              </a>
              <a href={`mailto:${t("contact.email")}`} className="block font-sans text-sm text-white/50 hover:text-[#8B7355] transition-colors">
                {t("contact.email")}
              </a>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-xs text-white/30 tracking-wide">{t("footer.rights")}</p>
          <p className="font-sans text-xs text-white/20 uppercase tracking-[0.2em]">
            Fait en Algérie
          </p>
        </div>
      </div>
    </footer>
  );
}
