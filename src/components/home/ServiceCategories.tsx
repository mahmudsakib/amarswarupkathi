import {
  Building2,
  Stethoscope,
  GraduationCap,
  Droplets,
  Landmark,
  Store,
  Briefcase,
  Siren,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const services = [
  { icon: Building2, label: "Hospitals", storageKey: "uims_hospitals", path: "/services/hospitals", color: "bg-info/10 text-info" },
  { icon: Stethoscope, label: "Doctors", storageKey: "uims_doctors", path: "/services/doctors", color: "bg-success/10 text-success" },
  { icon: GraduationCap, label: "Schools", storageKey: "uims_schools", path: "/services/schools", color: "bg-accent/10 text-accent" },
  { icon: Droplets, label: "Blood Donors", storageKey: "uims_blood_donors", path: "/services/blood-donors", color: "bg-destructive/10 text-destructive" },
  { icon: Landmark, label: "Govt Offices", storageKey: "uims_govt_offices", path: "/services/govt-offices", color: "bg-primary/10 text-primary" },
  { icon: Store, label: "Businesses", storageKey: "uims_businesses", path: "/services/businesses", color: "bg-warning/10 text-warning" },
  { icon: Briefcase, label: "Jobs", storageKey: "", path: "/services/jobs", color: "bg-info/10 text-info" },
  { icon: Siren, label: "Emergency", storageKey: "uims_emergency", path: "/services/emergency", color: "bg-destructive/10 text-destructive" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ServiceCategories = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const c: Record<string, number> = {};
    services.forEach((s) => {
      if (s.storageKey) {
        try {
          const data = localStorage.getItem(s.storageKey);
          c[s.label] = data ? JSON.parse(data).length : 0;
        } catch { c[s.label] = 0; }
      } else { c[s.label] = 0; }
    });
    setCounts(c);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display text-foreground mb-2">Explore Services</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Quick access to all essential services in your upazila</p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {services.map((service) => (
            <Link key={service.label} to={service.path}>
              <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }}
                className="gradient-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer border border-border/50 group h-full">
                <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground font-display text-sm">{service.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{counts[service.label] || 0} listed</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCategories;
