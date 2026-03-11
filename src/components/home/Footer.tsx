import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { labelKey: 'nav.services', path: '/services' },
    { labelKey: 'nav.bloodBank', path: '/blood-request' },
    { labelKey: 'nav.infoCollect', path: '/info-collect' },
    { labelKey: 'nav.about', path: '/about' },
  ];

  const otherLinks = [
    { labelKey: 'footer.developerDetails', path: '/developer-details' },
    { labelKey: 'footer.announcement', path: '/announcement' },
    { labelKey: 'footer.map', path: '/map' },
  ];

  return (
    <footer className="gradient-hero text-primary-foreground/80 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl font-display text-primary-foreground mb-4">
              {t('common.siteName')}
            </h3>
            <p className="text-sm leading-relaxed">
              {t('footer.about')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 font-display">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    to={link.path}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 font-display">{t('footer.others')}</h4>
            <ul className="space-y-2 text-sm">
              {otherLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    to={link.path}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 font-display">{t('footer.contact')}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>স্বরূপকাঠি, সদর</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+880 1737374654</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>amaderswarupkathi@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-xs">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
