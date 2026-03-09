import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Droplets, Phone, MapPin, Clock, AlertTriangle, ArrowLeft, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  units: string;
  hospital: string;
  location: string;
  contactName: string;
  contactPhone: string;
  urgency: string;
  details: string;
  createdAt: string;
  status: string;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BloodRequestPage = () => {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [filterGroup, setFilterGroup] = useState("");
  const [form, setForm] = useState({
    patientName: "", bloodGroup: "", units: "1", hospital: "",
    location: "", contactName: "", contactPhone: "", urgency: "Urgent", details: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("uims_blood_requests");
      if (stored) setRequests(JSON.parse(stored));
      else {
        const seed: BloodRequest[] = [
          { id: "br1", patientName: "Rahima Begum", bloodGroup: "O-", units: "2", hospital: "Upazila Health Complex", location: "Sadar", contactName: "Kamal Hossain", contactPhone: "01711-999001", urgency: "Critical", details: "Emergency surgery needed. Please contact ASAP.", createdAt: new Date(Date.now() - 3600000).toISOString(), status: "Active" },
          { id: "br2", patientName: "Abdul Karim", bloodGroup: "B+", units: "1", hospital: "Al-Madinah Hospital", location: "College Road", contactName: "Jamal Uddin", contactPhone: "01711-999002", urgency: "Urgent", details: "Needed for scheduled surgery tomorrow.", createdAt: new Date(Date.now() - 7200000).toISOString(), status: "Active" },
        ];
        localStorage.setItem("uims_blood_requests", JSON.stringify(seed));
        setRequests(seed);
      }
    } catch {}
  }, []);

  const saveRequests = (data: BloodRequest[]) => {
    setRequests(data);
    localStorage.setItem("uims_blood_requests", JSON.stringify(data));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: BloodRequest = {
      ...form,
      id: crypto.randomUUID?.() || Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "Active",
    };
    saveRequests([newRequest, ...requests]);
    setFormOpen(false);
    setForm({ patientName: "", bloodGroup: "", units: "1", hospital: "", location: "", contactName: "", contactPhone: "", urgency: "Urgent", details: "" });
    toast.success("Blood request submitted! Donors will be notified.");
  };

  const filtered = filterGroup ? requests.filter((r) => r.bloodGroup === filterGroup) : requests;
  const active = filtered.filter((r) => r.status === "Active");

  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return `${Math.floor(diff / 60000)} min ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-destructive/5 border-b border-destructive/10 py-10">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-7 w-7 text-destructive" />
                <h1 className="text-3xl font-bold font-display text-foreground">Emergency Blood Requests</h1>
              </div>
              <p className="text-muted-foreground">Help save lives — respond to blood requests or submit your own</p>
            </div>
            <button
              onClick={() => setFormOpen(true)}
              className="bg-destructive text-destructive-foreground px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity self-start"
            >
              <Plus className="h-4 w-4" /> Request Blood
            </button>
          </div>
        </div>
      </section>

      {/* Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterGroup("")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!filterGroup ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
          >
            All Groups
          </button>
          {bloodGroups.map((g) => (
            <button
              key={g}
              onClick={() => setFilterGroup(g)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterGroup === g ? "bg-destructive text-destructive-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Active Requests */}
        {active.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Droplets className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No active blood requests</p>
            <p className="text-sm mt-1">Submit a request if you need blood urgently</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl p-5 border shadow-card hover:shadow-card-hover transition-all ${req.urgency === "Critical" ? "border-destructive/30 bg-destructive/5" : "border-border/50 gradient-card"}`}
              >
                {/* Urgency badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${req.urgency === "Critical" ? "bg-destructive text-destructive-foreground" : "bg-warning text-warning-foreground"}`}>
                    {req.urgency === "Critical" && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                    {req.urgency}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />{getTimeAgo(req.createdAt)}
                  </span>
                </div>

                {/* Blood group */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                    <span className="text-destructive font-extrabold text-xl font-display">{req.bloodGroup}</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground font-display">{req.patientName}</p>
                    <p className="text-xs text-muted-foreground">{req.units} unit(s) needed</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{req.hospital}, {req.location}</div>
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{req.contactName}: {req.contactPhone}</div>
                  {req.details && <p className="text-xs mt-2 italic">{req.details}</p>}
                </div>

                {/* Call button */}
                <a
                  href={`tel:${req.contactPhone}`}
                  className="w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Phone className="h-4 w-4" /> Call to Donate
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Form Modal */}
      <AnimatePresence>
        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setFormOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-card rounded-2xl shadow-elevated border border-border w-full max-w-lg mx-4 max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-destructive" /> Request Blood
                </h2>
                <button onClick={() => setFormOpen(false)} aria-label="Close form" className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"><X className="h-4 w-4" /></button>
              </div>
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Patient Name <span className="text-destructive">*</span></label>
                    <input required maxLength={100} value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                      placeholder="Enter patient name"
                      className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Blood Group <span className="text-destructive">*</span></label>
                    <select required value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                      aria-label="Select blood group"
                      className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
                      <option value="">Select...</option>
                      {bloodGroups.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Units Needed</label>
                    <input type="number" min="1" max="10" value={form.units} onChange={(e) => setForm({ ...form, units: e.target.value })}
                      placeholder="Number of units"
                      className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Urgency <span className="text-destructive">*</span></label>
                    <select required value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                      aria-label="Select urgency level"
                      className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
                      <option value="Urgent">Urgent</option>
                      <option value="Critical">Critical</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Hospital <span className="text-destructive">*</span></label>
                  <input required maxLength={200} value={form.hospital} onChange={(e) => setForm({ ...form, hospital: e.target.value })}
                    placeholder="Enter hospital name"
                    className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                  <input maxLength={200} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Enter location"
                    className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Contact Name <span className="text-destructive">*</span></label>
                    <input required maxLength={100} value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="Enter contact name"
                      className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Contact Phone <span className="text-destructive">*</span></label>
                    <input required type="tel" maxLength={20} value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                      placeholder="Enter contact phone"
                      className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Additional Details</label>
                  <textarea maxLength={500} rows={3} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })}
                    placeholder="Any additional information for donors..."
                    className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-destructive text-destructive-foreground py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                  Submit Blood Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default BloodRequestPage;
