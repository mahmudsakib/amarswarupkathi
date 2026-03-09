import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, ArrowLeft, Phone, MapPin, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ReviewSection from "@/components/ReviewSection";

interface ServiceConfig {
  title: string;
  storageKey: string;
  nameKey: string;
  searchKeys: string[];
  cardFields: { key: string; label: string; icon?: any }[];
  badgeKey?: string;
  badgeColor?: string;
  filterKey?: string;
  filterOptions?: string[];
  filterLabel?: string;
  phoneKey?: string;
}

const serviceConfigs: Record<string, ServiceConfig> = {
  hospitals: {
    title: "Hospitals",
    storageKey: "uims_hospitals",
    nameKey: "name",
    searchKeys: ["name", "address", "type"],
    cardFields: [
      { key: "address", label: "Address", icon: MapPin },
      { key: "phone", label: "Phone", icon: Phone },
      { key: "hours", label: "Hours", icon: Clock },
      { key: "services", label: "Services" },
    ],
    badgeKey: "type",
    badgeColor: "bg-info/10 text-info",
    filterKey: "type",
    filterOptions: ["Government", "Private"],
    filterLabel: "Filter by Type",
    phoneKey: "phone",
  },
  doctors: {
    title: "Doctors",
    storageKey: "uims_doctors",
    nameKey: "name",
    searchKeys: ["name", "specialization", "hospital"],
    cardFields: [
      { key: "specialization", label: "Specialization" },
      { key: "hospital", label: "Hospital", icon: MapPin },
      { key: "visitingHours", label: "Hours", icon: Clock },
      { key: "qualification", label: "Qualification" },
      { key: "experience", label: "Experience" },
    ],
    badgeKey: "specialization",
    badgeColor: "bg-success/10 text-success",
    filterKey: "specialization",
    filterOptions: ["Cardiology", "Gynecology", "Pediatrics", "Medicine", "Orthopedics", "Surgery", "ENT", "Dermatology"],
    filterLabel: "Filter by Specialization",
    phoneKey: "phone",
  },
  schools: {
    title: "Schools",
    storageKey: "uims_schools",
    nameKey: "name",
    searchKeys: ["name", "type", "principal"],
    cardFields: [
      { key: "address", label: "Address", icon: MapPin },
      { key: "contact", label: "Contact", icon: Phone },
      { key: "principal", label: "Principal" },
      { key: "students", label: "Students" },
      { key: "facilities", label: "Facilities" },
    ],
    badgeKey: "type",
    badgeColor: "bg-accent/10 text-accent",
    filterKey: "type",
    filterOptions: ["Government", "Private"],
    filterLabel: "Filter by Type",
    phoneKey: "contact",
  },
  "blood-donors": {
    title: "Blood Donors",
    storageKey: "uims_blood_donors",
    nameKey: "name",
    searchKeys: ["name", "bloodGroup", "address", "phone"],
    cardFields: [
      { key: "bloodGroup", label: "Blood Group" },
      { key: "phone", label: "Phone", icon: Phone },
      { key: "address", label: "Address", icon: MapPin },
      { key: "lastDonation", label: "Last Donation" },
      { key: "availability", label: "Status" },
    ],
    badgeKey: "bloodGroup",
    badgeColor: "bg-destructive/10 text-destructive",
    filterKey: "bloodGroup",
    filterOptions: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    filterLabel: "Filter by Blood Group",
    phoneKey: "phone",
  },
  "govt-offices": {
    title: "Government Offices",
    storageKey: "uims_govt_offices",
    nameKey: "name",
    searchKeys: ["name", "department", "officer"],
    cardFields: [
      { key: "department", label: "Department" },
      { key: "address", label: "Address", icon: MapPin },
      { key: "contact", label: "Contact", icon: Phone },
      { key: "services", label: "Services" },
      { key: "officer", label: "Officer" },
    ],
    badgeKey: "department",
    badgeColor: "bg-primary/10 text-primary",
    phoneKey: "contact",
  },
  businesses: {
    title: "Businesses",
    storageKey: "uims_businesses",
    nameKey: "name",
    searchKeys: ["name", "owner", "category"],
    cardFields: [
      { key: "owner", label: "Owner" },
      { key: "category", label: "Category" },
      { key: "address", label: "Address", icon: MapPin },
      { key: "phone", label: "Phone", icon: Phone },
      { key: "hours", label: "Hours", icon: Clock },
      { key: "description", label: "Description" },
    ],
    badgeKey: "category",
    badgeColor: "bg-warning/10 text-warning",
    filterKey: "category",
    filterOptions: ["Pharmacy", "Grocery", "Restaurant", "Electronics", "Agriculture", "Services"],
    filterLabel: "Filter by Category",
    phoneKey: "phone",
  },
  emergency: {
    title: "Emergency Services",
    storageKey: "uims_emergency",
    nameKey: "name",
    searchKeys: ["name", "category", "phone"],
    cardFields: [
      { key: "category", label: "Category" },
      { key: "phone", label: "Emergency Number", icon: Phone },
      { key: "address", label: "Address", icon: MapPin },
      { key: "contact", label: "Contact Person" },
      { key: "available", label: "Available" },
    ],
    badgeKey: "category",
    badgeColor: "bg-destructive/10 text-destructive",
    phoneKey: "phone",
  },
  jobs: {
    title: "Jobs",
    storageKey: "",
    nameKey: "name",
    searchKeys: [],
    cardFields: [],
  },
};

const ServiceListing = () => {
  const { type } = useParams<{ type: string }>();
  const config = serviceConfigs[type || ""];
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (config?.storageKey) {
      try {
        const stored = localStorage.getItem(config.storageKey);
        if (stored) setData(JSON.parse(stored));
      } catch {}
    }
  }, [config?.storageKey]);

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold font-display text-foreground mb-4">Page Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
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
          <h1 className="text-3xl md:text-4xl font-bold font-display text-primary-foreground">{config.title}</h1>
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
              placeholder={`Search ${config.title.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          {config.filterOptions && (
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">{config.filterLabel || "All"}</option>
              {config.filterOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm mt-1">Try a different search term or filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="gradient-card rounded-2xl p-5 border border-border/50 shadow-card hover:shadow-card-hover transition-all"
              >
                {/* Badge */}
                {config.badgeKey && item[config.badgeKey] && (
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${config.badgeColor} mb-3`}>
                    {item[config.badgeKey]}
                  </span>
                )}

                {/* Name */}
                <h3 className="font-bold text-lg font-display text-foreground mb-3">
                  {item[config.nameKey]}
                </h3>

                {/* Fields */}
                <div className="space-y-2">
                  {config.cardFields.map((field) => {
                    const value = item[field.key];
                    if (!value) return null;
                    const Icon = field.icon;
                    return (
                      <div key={field.key} className="flex items-start gap-2 text-sm text-muted-foreground">
                        {Icon && <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        {!Icon && <span className="text-xs font-medium text-foreground/60 min-w-[80px]">{field.label}:</span>}
                        <span className={field.key === config.phoneKey?.split(".")[0] ? "" : ""}>
                          {value}
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
                  <ReviewSection targetId={item.id} targetType={type === "doctors" ? "doctor" : "hospital"} targetName={item[config.nameKey]} />
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
