import { Phone, Siren, Flame, Zap, Car } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const emergencyServices = [
  { icon: Siren, labelKey: "emergencyContacts.police", number: "999", color: "bg-info text-info-foreground" },
  { icon: Flame, labelKey: "emergencyContacts.fireService", number: "199", color: "bg-destructive text-destructive-foreground" },
  { icon: Car, labelKey: "emergencyContacts.ambulance", number: "199", color: "bg-success text-success-foreground" },
  { icon: Zap, labelKey: "emergencyContacts.electricity", number: "16116", color: "bg-warning text-warning-foreground" },
];

const EmergencyContacts = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-display text-foreground mb-2">
            {t('emergencyContacts.title')}
          </h2>
          <p className="text-muted-foreground">{t('emergencyContacts.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {emergencyServices.map((service, i) => (
            <motion.a
              key={service.labelKey}
              href={`tel:${service.number}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${service.color} rounded-2xl p-5 text-center shadow-card hover:shadow-card-hover transition-all cursor-pointer`}
            >
              <service.icon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold text-sm font-display">{t(service.labelKey)}</h3>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs opacity-90">
                <Phone className="h-3 w-3" />
                <span>{service.number}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmergencyContacts;
