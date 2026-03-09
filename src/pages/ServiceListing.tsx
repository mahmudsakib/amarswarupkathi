import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, ArrowLeft, Phone, MapPin, Clock, Star, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ReviewSection from "@/components/ReviewSection";
import { useTranslation } from "react-i18next";

interface ServiceConfig {
  titleKey: string; // translation key for title
  storageKey: string;
  nameKey: string;
  searchKeys: string[];
  cardFields: { key: string; labelKey: string; icon?: LucideIcon }[];
  badgeKey?: string;
  badgeColor?: string;
  filterKey?: string;
  filterOptions?: { value: string; labelKey: string }[];
  filterLabelKey?: string;
  phoneKey?: string;
}

const serviceConfigs: Record<string, ServiceConfig> = {
  hospitals: {
    titleKey: "serviceCategories.hospitals",
    storageKey: "uims_hospitals",
    nameKey: "name",
    searchKeys: ["name", "address", "type"],
    cardFields: [
      { key: "address", labelKey: "common.address", icon: MapPin },
      { key: "phone", labelKey: "common.phone", icon: Phone },
      { key: "hours", labelKey: "common.hours", icon: Clock },
      { key: "services", labelKey: "common.services" },
    ],
    badgeKey: "type",
    badgeColor: "bg-info/10 text-info",
    filterKey: "type",
    filterOptions: [
      { value: "Government", labelKey: "filters.government" },
      { value: "Private", labelKey: "filters.private" },
    ],
    filterLabelKey: "filters.type",
    phoneKey: "phone",
  },
  doctors: {
    titleKey: "serviceCategories.doctors",
    storageKey: "uims_doctors",
    nameKey: "name",
    searchKeys: ["name", "specialization", "hospital"],
    cardFields: [
      { key: "specialization", labelKey: "fields.specialization" },
      { key: "hospital", labelKey: "common.hospital", icon: MapPin },
      { key: "visitingHours", labelKey: "common.hours", icon: Clock },
      { key: "qualification", labelKey: "fields.qualification" },
      { key: "experience", labelKey: "fields.experience" },
    ],
    badgeKey: "specialization",
    badgeColor: "bg-success/10 text-success",
    filterKey: "specialization",
    filterOptions: [
      { value: "Cardiology", labelKey: "filters.cardiology" },
      { value: "Gynecology", labelKey: "filters.gynecology" },
      { value: "Pediatrics", labelKey: "filters.pediatrics" },
      { value: "Medicine", labelKey: "filters.medicine" },
      { value: "Orthopedics", labelKey: "filters.orthopedics" },
      { value: "Surgery", labelKey: "filters.surgery" },
      { value: "ENT", labelKey: "filters.ent" },
      { value: "Dermatology", labelKey: "filters.dermatology" },
    ],
    filterLabelKey: "filters.specialization",
    phoneKey: "phone",
  },
  schools: {
    titleKey: "serviceCategories.schools",
    storageKey: "uims_schools",
    nameKey: "name",
    searchKeys: ["name", "type", "principal"],
    cardFields: [
      { key: "address", labelKey: "common.address", icon: MapPin },
      { key: "contact", labelKey: "common.phone", icon: Phone },
      { key: "principal", labelKey: "fields.principal" },
      { key: "students", labelKey: "fields.students" },
      { key: "facilities", labelKey: "fields.facilities" },
    ],
    badgeKey: "type",
    badgeColor: "bg-accent/10 text-accent",
    filterKey: "type",
    filterOptions: [
      { value: "Government", labelKey: "filters.government" },
      { value: "Private", labelKey: "filters.private" },
    ],
    filterLabelKey: "filters.type",
    phoneKey: "contact",
  },
  "blood-donors": {
    titleKey: "serviceCategories.bloodDonors",
    storageKey: "uims_blood_donors",
    nameKey: "name",
    searchKeys: ["name", "bloodGroup", "address", "phone"],
    cardFields: [
      { key: "bloodGroup", labelKey: "fields.bloodGroup" },
      { key: "phone", labelKey: "common.phone", icon: Phone },
      { key: "address", labelKey: "common.address", icon: MapPin },
      { key: "lastDonation", labelKey: "fields.lastDonation" },
      { key: "availability", labelKey: "common.status" },
    ],
    badgeKey: "bloodGroup",
    badgeColor: "bg-destructive/10 text-destructive",
    filterKey: "bloodGroup",
    filterOptions: [
      { value: "A+", labelKey: "A+" },
      { value: "A-", labelKey: "A-" },
      { value: "B+", labelKey: "B+" },
      { value: "B-", labelKey: "B-" },
      { value: "AB+", labelKey: "AB+" },
      { value: "AB-", labelKey: "AB-" },
      { value: "O+", labelKey: "O+" },
      { value: "O-", labelKey: "O-" },
    ],
    filterLabelKey: "filters.bloodGroup",
    phoneKey: "phone",
  },
  "govt-offices": {
    titleKey: "serviceCategories.govtOffices",
    storageKey: "uims_govt_offices",
    nameKey: "name",
    searchKeys: ["name", "department", "officer"],
    cardFields: [
      { key: "department", labelKey: "fields.department" },
      { key: "address", labelKey: "common.address", icon: MapPin },
      { key: "contact", labelKey: "common.phone", icon: Phone },
      { key: "services", labelKey: "common.services" },
      { key: "officer", labelKey: "fields.officer" },
    ],
    badgeKey: "department",
    badgeColor: "bg-primary/10 text-primary",
    phoneKey: "contact",
  },
  businesses: {
    titleKey: "serviceCategories.businesses",
    storageKey: "uims_businesses",
    nameKey: "name",
    searchKeys: ["name", "owner", "category"],
    cardFields: [
      { key: "owner", labelKey: "fields.owner" },
      { key: "category", labelKey: "fields.category" },
      { key: "address", labelKey: "common.address", icon: MapPin },
      { key: "phone", labelKey: "common.phone", icon: Phone },
      { key: "hours", labelKey: "common.hours", icon: Clock },
      { key: "description", labelKey: "common.description" },
    ],
    badgeKey: "category",
    badgeColor: "bg-warning/10 text-warning",
    filterKey: "category",
    filterOptions: [
      { value: "Pharmacy", labelKey: "filters.pharmacy" },
      { value: "Grocery", labelKey: "filters.grocery" },
      { value: "Restaurant", labelKey: "filters.restaurant" },
      { value: "Electronics", labelKey: "filters.electronics" },
      { value: "Agriculture", labelKey: "filters.agriculture" },
      { value: "Services", labelKey: "filters.services" },
    ],
    filterLabelKey: "filters.category",
    phoneKey: "phone",
  },
  emergency: {
    titleKey: "serviceCategories.emergency",
    storageKey: "uims_emergency",
    nameKey: "name",
    searchKeys: ["name", "category", "phone"],
    cardFields: [
      { key: "category", labelKey: "fields.category" },
      { key: "phone", labelKey: "fields.emergencyNumber", icon: Phone },
      { key: "address", labelKey: "common.address", icon: MapPin },
      { key: "contact", labelKey: "fields.contactPerson" },
      { key: "available", labelKey: "fields.available" },
    ],
    badgeKey: "category",
    badgeColor: "bg-destructive/10 text-destructive",
    phoneKey: "phone",
  },
  jobs: {
    titleKey: "serviceCategories.jobs",
    storageKey: "",
    nameKey: "name",
    searchKeys: [],
    cardFields: [],
  },
};

const ServiceListing = () => {
  const { t } = useTranslation();
  const { type } = useParams<{ type: string }>();
  const config = serviceConfigs[type || ""];
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (config?.storageKey) {
      try {
        const stored = localStorage.getItem(config.storageKey);
        if (stored) setData(JSON.parse(stored));
      } catch (error) {
        // Silently fail if JSON parsing fails
      }
    }
  }, [config?.storageKey]);

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold font-display text-foreground mb-4">{t('common.pageNotFound')}</h1>
          <Link to="/" className="text-primary hover:underline">← {t('common.back')}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const filtered = data.filter((item) => {
    const matchesSearch = !search || config.searchKeys.some((k) => {
      const val = item[k];
      return val && String(val).toLowerCase().includes(search.toLowerCase());
    });
    const matchesFilter = !filter || !config.filterKey || item[config.filterKey] === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-primary-foreground">{t(config.titleKey)}</h1>
          <p className="text-primary-foreground/70 mt-2">{filtered.length} results found</p>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="gradient-card rounded-2xl p-4 shadow-elevated border border-border/50 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('serviceListing.searchPlaceholder', { title: t(config.titleKey) })}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          {config.filterOptions && (
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label={t('serviceListing.filterOptions')}
              className="px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
                <option value="">{t('common.all')}</option>
              {config.filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">{t('serviceListing.noResults')}</p>
            <p className="text-sm mt-1">{t('serviceListing.tryDifferent')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={(item.id as string) || i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="gradient-card rounded-2xl p-5 border border-border/50 shadow-card hover:shadow-card-hover transition-all"
              >
                {/* Badge */}
                {config.badgeKey && item[config.badgeKey] && (
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${config.badgeColor} mb-3`}>
                    {String(item[config.badgeKey])}
                  </span>
                )}

                {/* Name */}
                <h3 className="font-bold text-lg font-display text-foreground mb-3">
                  {String(item[config.nameKey])}
                </h3>

                {/* Fields */}
                <div className="space-y-2">
                  {config.cardFields.map((field) => {
                    const value = item[field.key] as unknown;
                    if (!value) return null;
                    const Icon = field.icon;
                    return (
                      <div key={field.key} className="flex items-start gap-2 text-sm text-muted-foreground">
                        {Icon && <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        {!Icon && <span className="text-xs font-medium text-foreground/60 min-w-[80px]">{t(field.labelKey)}:</span>}
                        <span className={field.key === config.phoneKey?.split(".")[0] ? "" : ""}>
                          {String(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Call button */}
                {config.phoneKey && item[config.phoneKey] && (
                  <a
                    href={`tel:${item[config.phoneKey]}`}
                    className="mt-4 w-full flex items-center justify-center gap-2 gradient-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                )}

                {/* Reviews for doctors and hospitals */}
                {(type === "doctors" || type === "hospitals") && item.id && (
                  <ReviewSection targetId={String(item.id)} targetType={type === "doctors" ? "doctor" : "hospital"} targetName={String(item[config.nameKey])} />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ServiceListing;
