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

// labels will be resolved via translations
export const services = [
  { icon: Building2, labelKey: "serviceCategories.hospitals", storageKey: "uims_hospitals", path: "/services/hospitals", color: "bg-info/10 text-info" },
  { icon: Stethoscope, labelKey: "serviceCategories.doctors", storageKey: "uims_doctors", path: "/services/doctors", color: "bg-success/10 text-success" },
  { icon: GraduationCap, labelKey: "serviceCategories.schools", storageKey: "uims_schools", path: "/services/schools", color: "bg-accent/10 text-accent" },
  { icon: Droplets, labelKey: "serviceCategories.bloodDonors", storageKey: "uims_blood_donors", path: "/services/blood-donors", color: "bg-destructive/10 text-destructive" },
  { icon: Landmark, labelKey: "serviceCategories.govtOffices", storageKey: "uims_govt_offices", path: "/services/govt-offices", color: "bg-primary/10 text-primary" },
  { icon: Store, labelKey: "serviceCategories.businesses", storageKey: "uims_businesses", path: "/services/businesses", color: "bg-warning/10 text-warning" },
  { icon: Briefcase, labelKey: "serviceCategories.jobs", storageKey: "", path: "/services/jobs", color: "bg-info/10 text-info" },
  { icon: Siren, labelKey: "serviceCategories.emergency", storageKey: "uims_emergency", path: "/services/emergency", color: "bg-destructive/10 text-destructive" },
];
