import { useState } from "react";
import { Save, Globe, Bell, Shield, Database } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [siteName, setSiteName] = useState("Amar Upazila");
  const [siteDesc, setSiteDesc] = useState("Your Digital Upazila Portal");
  const [contactEmail, setContactEmail] = useState("info@amarupazila.gov.bd");
  const [contactPhone, setContactPhone] = useState("+880 1XXXXXXXXX");
  const [notifications, setNotifications] = useState({ email: true, sms: false, web: true });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleExport = () => {
    const allData: Record<string, unknown> = {};
    ["uims_hospitals", "uims_doctors", "uims_schools", "uims_blood_donors", "uims_govt_offices", "uims_businesses", "uims_citizens", "uims_emergency", "uims_categories", "uims_users"].forEach((key) => {
      const val = localStorage.getItem(key);
      if (val) allData[key] = JSON.parse(val);
    });
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uims_data_export.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">System configuration and preferences</p>
      </div>

      {/* General */}
      <div className="gradient-card rounded-2xl p-6 border border-border/50 shadow-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground font-display">General Settings</h3>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Site Name</label>
          <input value={siteName} onChange={e => setSiteName(e.target.value)} maxLength={100}
            className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Site Description</label>
          <input value={siteDesc} onChange={e => setSiteDesc(e.target.value)} maxLength={200}
            className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Contact Email</label>
            <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} type="email" maxLength={255}
              className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Contact Phone</label>
            <input value={contactPhone} onChange={e => setContactPhone(e.target.value)} type="tel" maxLength={20}
              className="w-full px-3 py-2.5 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="gradient-card rounded-2xl p-6 border border-border/50 shadow-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground font-display">Notification Settings</h3>
        </div>
        {[
          { key: "email", label: "Email Notifications" },
          { key: "sms", label: "SMS Notifications" },
          { key: "web", label: "Web Notifications" },
        ].map((n) => (
          <div key={n.key} className="flex items-center justify-between">
            <span className="text-sm text-foreground">{n.label}</span>
            <button
              onClick={() => setNotifications({ ...notifications, [n.key]: !(notifications as any)[n.key] })}
              className={`w-11 h-6 rounded-full transition-colors relative ${(notifications as any)[n.key] ? "bg-primary" : "bg-muted"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-primary-foreground shadow-sm absolute top-0.5 transition-transform ${(notifications as any)[n.key] ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Data */}
      <div className="gradient-card rounded-2xl p-6 border border-border/50 shadow-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground font-display">Data Management</h3>
        </div>
        <button onClick={handleExport}
          className="px-4 py-2.5 rounded-xl text-sm font-medium bg-info/10 text-info hover:bg-info/20 transition-colors">
          Export All Data (JSON)
        </button>
      </div>

      {/* Save */}
      <button onClick={handleSave}
        className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
        <Save className="h-4 w-4" /> Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;
