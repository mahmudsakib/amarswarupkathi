export const defaultHospitals = [
  { id: "h1", name: "Upazila Health Complex", address: "Sadar, Main Road", phone: "01711-000001", email: "uhc@health.gov.bd", type: "Government", services: "Emergency, Surgery, ICU, Pharmacy", emergency: "Yes", hours: "24/7" },
  { id: "h2", name: "Popular Diagnostic Center", address: "Station Road, Sadar", phone: "01711-000002", email: "popular@clinic.com", type: "Private", services: "Pathology, X-Ray, Ultrasound", emergency: "No", hours: "8AM - 10PM" },
  { id: "h3", name: "Al-Madinah Hospital", address: "College Road", phone: "01711-000003", email: "almadinah@hospital.com", type: "Private", services: "Surgery, Gynecology, Pediatrics", emergency: "Yes", hours: "24/7" },
  { id: "h4", name: "Community Clinic Purbo Para", address: "Purbo Para, Ward 5", phone: "01711-000004", email: "", type: "Government", services: "Primary Care, Vaccination", emergency: "No", hours: "9AM - 5PM" },
];

export const defaultDoctors = [
  { id: "d1", name: "Dr. Aminul Haque", specialization: "Cardiology", hospital: "Upazila Health Complex", phone: "01811-000001", visitingHours: "9AM - 1PM", chamber: "Room 201, UHC", qualification: "MBBS, MD (Cardiology)", experience: "15 years" },
  { id: "d2", name: "Dr. Fatima Rahman", specialization: "Gynecology", hospital: "Al-Madinah Hospital", phone: "01811-000002", visitingHours: "10AM - 2PM", chamber: "2nd Floor, Al-Madinah", qualification: "MBBS, MS (Obs & Gyn)", experience: "12 years" },
  { id: "d3", name: "Dr. Rezaul Karim", specialization: "Pediatrics", hospital: "Upazila Health Complex", phone: "01811-000003", visitingHours: "2PM - 6PM", chamber: "Room 105, UHC", qualification: "MBBS, DCH", experience: "10 years" },
  { id: "d4", name: "Dr. Nasreen Akter", specialization: "Medicine", hospital: "Popular Diagnostic", phone: "01811-000004", visitingHours: "4PM - 8PM", chamber: "Popular DC, Room 3", qualification: "MBBS, FCPS (Medicine)", experience: "18 years" },
  { id: "d5", name: "Dr. Shahidul Islam", specialization: "Orthopedics", hospital: "Al-Madinah Hospital", phone: "01811-000005", visitingHours: "9AM - 12PM", chamber: "3rd Floor, Al-Madinah", qualification: "MBBS, MS (Ortho)", experience: "8 years" },
];

export const defaultSchools = [
  { id: "s1", name: "Upazila Govt. High School", type: "Government", address: "Main Road, Sadar", contact: "01911-000001", principal: "Md. Abdul Kadir", students: "1200", facilities: "Library, Lab, Playground, Computer Lab" },
  { id: "s2", name: "Ideal Academy", type: "Private", address: "College Road", contact: "01911-000002", principal: "Shahana Begum", students: "800", facilities: "AC Classrooms, Lab, Library" },
  { id: "s3", name: "Upazila Girls High School", type: "Government", address: "Station Road", contact: "01911-000003", principal: "Rahima Khatun", students: "950", facilities: "Library, Science Lab, Hostel" },
  { id: "s4", name: "Darul Ulum Madrasa", type: "Private", address: "Purbo Para", contact: "01911-000004", principal: "Maulana Habibur Rahman", students: "650", facilities: "Library, Mosque, Hostel" },
];

export const defaultBloodDonors = [
  { id: "b1", name: "Kamal Hossain", bloodGroup: "B+", phone: "01711-100001", address: "Ward 3, Sadar", lastDonation: "2025-12-15", availability: "Available", gender: "Male", age: "28" },
  { id: "b2", name: "Rina Begum", bloodGroup: "A+", phone: "01711-100002", address: "Ward 5, Purbo Para", lastDonation: "2025-11-20", availability: "Available", gender: "Female", age: "25" },
  { id: "b3", name: "Jamal Uddin", bloodGroup: "O+", phone: "01711-100003", address: "Ward 1, Sadar", lastDonation: "2026-01-10", availability: "Available", gender: "Male", age: "32" },
  { id: "b4", name: "Shirin Akter", bloodGroup: "AB+", phone: "01711-100004", address: "Ward 7, Paschim Para", lastDonation: "2025-10-05", availability: "Unavailable", gender: "Female", age: "30" },
  { id: "b5", name: "Rafiq Ahmed", bloodGroup: "O-", phone: "01711-100005", address: "Ward 2, Sadar", lastDonation: "2026-02-01", availability: "Available", gender: "Male", age: "35" },
  { id: "b6", name: "Nasima Khatun", bloodGroup: "B-", phone: "01711-100006", address: "Ward 4", lastDonation: "2025-09-15", availability: "Available", gender: "Female", age: "27" },
  { id: "b7", name: "Habib Mia", bloodGroup: "A-", phone: "01711-100007", address: "Ward 6", lastDonation: "2025-08-20", availability: "Available", gender: "Male", age: "40" },
  { id: "b8", name: "Sumon Das", bloodGroup: "AB-", phone: "01711-100008", address: "Ward 9", lastDonation: "2026-01-25", availability: "Available", gender: "Male", age: "22" },
];

export const defaultGovtOffices = [
  { id: "g1", name: "Upazila Nirbahi Officer (UNO)", department: "Administration", address: "Upazila Parishad", contact: "01611-000001", services: "Land, Certificate, Administration", officer: "Md. Fazlul Haque" },
  { id: "g2", name: "Upazila Land Office", department: "Land", address: "Sadar, Main Road", contact: "01611-000002", services: "Land Registry, Mutation, Record", officer: "Md. Rezaul Islam" },
  { id: "g3", name: "Upazila Education Office", department: "Education", address: "College Road", contact: "01611-000003", services: "School Management, Teacher Posting", officer: "Shahida Parveen" },
  { id: "g4", name: "Police Station", department: "Law & Order", address: "Station Road", contact: "01611-000004", services: "FIR, GD, Security", officer: "OC Md. Anwar Hossain" },
];

export const defaultBusinesses = [
  { id: "bz1", name: "Green Pharmacy", owner: "Md. Rahim", category: "Pharmacy", phone: "01511-000001", address: "Main Road, Sadar", description: "Complete medicine store with home delivery", hours: "8AM - 11PM" },
  { id: "bz2", name: "Bismillah Restaurant", owner: "Abdul Hamid", category: "Restaurant", phone: "01511-000002", address: "Station Road", description: "Traditional Bangladeshi cuisine", hours: "7AM - 10PM" },
  { id: "bz3", name: "Digital Electronics", owner: "Sumon Ahmed", category: "Electronics", phone: "01511-000003", address: "College Road", description: "Mobile, computer, and electronics repair", hours: "9AM - 9PM" },
  { id: "bz4", name: "Krishi Bhandar", owner: "Fazlur Rahman", category: "Agriculture", phone: "01511-000004", address: "Bazar Road", description: "Seeds, fertilizers, farming equipment", hours: "8AM - 6PM" },
  { id: "bz5", name: "Hasina Grocery", owner: "Hasina Begum", category: "Grocery", phone: "01511-000005", address: "Ward 3, Sadar", description: "Daily essentials and grocery items", hours: "6AM - 10PM" },
];

export const defaultCitizens = [
  { id: "c1", name: "Md. Abdul Karim", fatherName: "Late Md. Hanif", motherName: "Amena Begum", occupation: "Farmer", phone: "01311-000001", address: "Ward 1, Sadar", bloodGroup: "B+", education: "HSC", profession: "Agriculture" },
  { id: "c2", name: "Fatema Begum", fatherName: "Md. Ismail", motherName: "Kulsum Begum", occupation: "Teacher", phone: "01311-000002", address: "Ward 3, Sadar", bloodGroup: "A+", education: "Masters", profession: "Education" },
  { id: "c3", name: "Rashed Khan", fatherName: "Md. Shamsul Haque", motherName: "Rahima Khatun", occupation: "Business", phone: "01311-000003", address: "Ward 5, Purbo Para", bloodGroup: "O+", education: "BSc", profession: "Business" },
];

export const defaultEmergencyServices = [
  { id: "e1", name: "Sadar Police Station", category: "Police", phone: "999", address: "Station Road, Sadar", contact: "OC Md. Anwar", available: "24/7" },
  { id: "e2", name: "Fire Service & Civil Defence", category: "Fire Service", phone: "199", address: "Main Road, Sadar", contact: "Station Officer", available: "24/7" },
  { id: "e3", name: "UHC Ambulance", category: "Ambulance", phone: "01711-999999", address: "Upazila Health Complex", contact: "Duty Doctor", available: "24/7" },
  { id: "e4", name: "Electricity Office", category: "Electricity", phone: "16116", address: "College Road", contact: "Junior Engineer", available: "9AM - 5PM" },
  { id: "e5", name: "Gas Service", category: "Gas", phone: "16223", address: "Industrial Area", contact: "Duty Engineer", available: "9AM - 5PM" },
  { id: "e6", name: "UNO Office (Emergency)", category: "Local Administration", phone: "01611-000001", address: "Upazila Parishad", contact: "UNO", available: "Office Hours" },
];

export const defaultCategories = [
  { id: "cat1", name: "Hospital", type: "Service", description: "Healthcare facilities" },
  { id: "cat2", name: "Doctor", type: "Service", description: "Medical practitioners" },
  { id: "cat3", name: "School", type: "Service", description: "Educational institutions" },
  { id: "cat4", name: "Blood Donor", type: "Service", description: "Blood donation database" },
  { id: "cat5", name: "Government Office", type: "Service", description: "Government departments" },
  { id: "cat6", name: "Pharmacy", type: "Business", description: "Medicine stores" },
  { id: "cat7", name: "Restaurant", type: "Business", description: "Food establishments" },
  { id: "cat8", name: "Grocery", type: "Business", description: "Daily essentials" },
  { id: "cat9", name: "Electronics", type: "Business", description: "Electronics and repair" },
  { id: "cat10", name: "Agriculture", type: "Business", description: "Farming supplies" },
];

export const defaultUsers = [
  { id: "u1", name: "Super Admin", email: "admin@amarupazila.gov.bd", role: "Super Admin", status: "Active", lastLogin: "2026-03-09" },
  { id: "u2", name: "Upazila Admin", email: "upadmin@amarupazila.gov.bd", role: "Upazila Admin", status: "Active", lastLogin: "2026-03-08" },
  { id: "u3", name: "Data Entry 1", email: "entry1@amarupazila.gov.bd", role: "Data Entry Operator", status: "Active", lastLogin: "2026-03-07" },
  { id: "u4", name: "Data Entry 2", email: "entry2@amarupazila.gov.bd", role: "Data Entry Operator", status: "Blocked", lastLogin: "2026-02-15" },
];
