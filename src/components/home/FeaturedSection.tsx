import { Star, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const featured = [
  {
    type: "Hospital",
    name: "Upazila Health Complex",
    location: "Sadar, Upazila",
    rating: 4.5,
    hours: "24/7",
    badge: "bg-info/10 text-info",
  },
  {
    type: "Doctor",
    name: "Dr. Aminul Haque",
    location: "Sadar Hospital",
    rating: 4.8,
    hours: "9AM - 5PM",
    badge: "bg-success/10 text-success",
  },
  {
    type: "School",
    name: "Upazila Govt. High School",
    location: "Main Road, Sadar",
    rating: 4.2,
    hours: "8AM - 4PM",
    badge: "bg-accent/10 text-accent",
  },
];

const FeaturedSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-display text-foreground mb-2">
            {t('featured.title')}
          </h2>
          <p className="text-muted-foreground">{t('featured.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featured.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="gradient-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all border border-border/50 cursor-pointer"
            >
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.badge} mb-4`}>
                {item.type}
              </span>
              <h3 className="font-bold text-lg font-display text-foreground mb-3">
                {item.name}
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{item.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-accent fill-accent" />
                  <span className="text-foreground font-medium">{item.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
