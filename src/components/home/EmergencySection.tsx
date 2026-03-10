import { AlertTriangle, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface EmergencyAlert {
  id: string;
  title: string;
  details: string;
  image?: string;
  location?: string;
  timestamp: string;
}

const EmergencySection = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem("uims_emergency_alerts");
      if (data) {
        setAlerts(JSON.parse(data));
      } else {
        // Sample data for demonstration
        setAlerts([
          {
            id: "1",
            title: "Road Accident on Main Highway",
            details: "A major accident occurred at kilometer 45. Traffic is diverted. Emergency services are on site.",
            image: "/api/placeholder/400/200",
            location: "Main Highway, Km 45",
            timestamp: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Missing Person Alert",
            details: "A child named Rahim (age 8) is missing from Sadar area. Last seen wearing blue shirt.",
            image: "/api/placeholder/400/200",
            location: "Sadar Area",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error loading emergency alerts:", error);
    }
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-display text-foreground mb-2">
            {t('emergency.title')}
          </h2>
          <p className="text-muted-foreground">{t('emergency.subtitle')}</p>
        </div>

        {alerts.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {alerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all border border-border/50"
              >
                {alert.image && (
                  <img
                    src={alert.image}
                    alt={alert.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span className="text-sm font-semibold text-destructive">
                      Emergency Alert
                    </span>
                  </div>
                  <h3 className="font-bold text-lg font-display text-foreground mb-3">
                    {alert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {alert.details}
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    {alert.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{alert.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('emergency.noAlerts')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmergencySection;
