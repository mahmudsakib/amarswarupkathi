import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { services } from "@/lib/services";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">আ</span>
            </div>
            <span className="font-bold text-lg font-display text-foreground">{t('common.siteName')}</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <div className="relative group">
              <Link to="/services" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                {t('nav.services')} <ChevronDown className="h-4 w-4" />
              </Link>

              {/* dropdown on hover */}
              <div className="absolute left-0 mt-2 w-48 bg-card shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
                {services.map((s) => (
                  <Link
                    key={s.labelKey}
                    to={s.path}
                    className="block px-4 py-2 text-sm hover:bg-border/50"
                  >
                    {t(s.labelKey!)}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/blood-request" className="hover:text-foreground transition-colors">{t('nav.bloodBank')}</Link>
            <Link to="/info-collect" className="hover:text-foreground transition-colors">{t('nav.infoCollect')}</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">{t('nav.about')}</Link>
            <LanguageSwitcher />
            <Link
              to="/login"
              className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t('nav.adminPanel')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/50 bg-card overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3 text-sm font-medium text-muted-foreground">
              <Link to="/services" className="block hover:text-foreground">{t('nav.services')}</Link>
              <div className="pl-4 space-y-1">
                {services.map((s) => (
                  <Link key={s.labelKey} to={s.path} className="block text-xs hover:text-foreground">
                    {t(s.labelKey!)}
                  </Link>
                ))}
              </div>
              <Link to="/blood-request" className="block hover:text-foreground">{t('nav.bloodBank')}</Link>
              <Link to="/info-collect" className="block hover:text-foreground">{t('nav.infoCollect')}</Link>
              <Link to="/about" className="block hover:text-foreground">{t('nav.about')}</Link>
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <Link to="/login" className="block gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-center font-semibold">
                {t('nav.adminPanel')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
