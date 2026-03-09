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

const services = [
  { icon: Building2, label: "Hospitals", count: 24, color: "bg-info/10 text-info" },
  { icon: Stethoscope, label: "Doctors", count: 156, color: "bg-success/10 text-success" },
  { icon: GraduationCap, label: "Schools", count: 48, color: "bg-accent/10 text-accent" },
  { icon: Droplets, label: "Blood Donors", count: 312, color: "bg-destructive/10 text-destructive" },
  { icon: Landmark, label: "Govt Offices", count: 18, color: "bg-primary/10 text-primary" },
  { icon: Store, label: "Businesses", count: 205, color: "bg-warning/10 text-warning" },
  { icon: Briefcase, label: "Jobs", count: 37, color: "bg-info/10 text-info" },
  { icon: Siren, label: "Emergency", count: 12, color: "bg-destructive/10 text-destructive" },
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
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display text-foreground mb-2">
            Explore Services
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Quick access to all essential services in your upazila
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.label}
              variants={item}
              whileHover={{ y: -4, scale: 1.02 }}
              className="gradient-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer border border-border/50 group"
            >
              <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground font-display text-sm">
                {service.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {service.count} listed
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCategories;
