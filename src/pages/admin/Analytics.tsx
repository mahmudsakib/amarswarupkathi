import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const searchData = [
  { term: "Blood Donor B+", searches: 245 },
  { term: "Hospital", searches: 198 },
  { term: "Cardiologist", searches: 156 },
  { term: "Ambulance", searches: 134 },
  { term: "Pharmacy", searches: 112 },
  { term: "School Admission", searches: 89 },
];

const visitorData = [
  { day: "Mon", visitors: 120 }, { day: "Tue", visitors: 180 },
  { day: "Wed", visitors: 150 }, { day: "Thu", visitors: 220 },
  { day: "Fri", visitors: 190 }, { day: "Sat", visitors: 280 },
  { day: "Sun", visitors: 160 },
];

const emergencyRequests = [
  { name: "Blood Request", value: 45, color: "hsl(0, 72%, 51%)" },
  { name: "Ambulance", value: 28, color: "hsl(36, 95%, 54%)" },
  { name: "Fire", value: 8, color: "hsl(207, 90%, 54%)" },
  { name: "Police", value: 19, color: "hsl(174, 62%, 32%)" },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">System usage statistics and insights</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Visitors (This Week)", value: "1,300", change: "+12%" },
          { label: "Total Searches", value: "934", change: "+8%" },
          { label: "Emergency Requests", value: "100", change: "+5%" },
          { label: "New Registrations", value: "47", change: "+15%" },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="gradient-card rounded-2xl p-4 border border-border/50 shadow-card">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold font-display text-foreground mt-1">{s.value}</p>
            <p className="text-xs text-success font-medium mt-1">{s.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Most Searched */}
        <div className="gradient-card rounded-2xl p-6 border border-border/50 shadow-card">
          <h3 className="font-bold text-foreground font-display mb-4">Most Searched Terms</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={searchData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 89%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 46%)" />
              <YAxis dataKey="term" type="category" width={120} tick={{ fontSize: 11 }} stroke="hsl(210, 10%, 46%)" />
              <Tooltip />
              <Bar dataKey="searches" fill="hsl(174, 62%, 32%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Visitors */}
        <div className="gradient-card rounded-2xl p-6 border border-border/50 shadow-card">
          <h3 className="font-bold text-foreground font-display mb-4">Website Visitors (This Week)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 89%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 46%)" />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="hsl(207, 90%, 54%)" strokeWidth={2} dot={{ fill: "hsl(207, 90%, 54%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Emergency Requests */}
      <div className="gradient-card rounded-2xl p-6 border border-border/50 shadow-card max-w-md">
        <h3 className="font-bold text-foreground font-display mb-4">Emergency Requests Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={emergencyRequests} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {emergencyRequests.map((e) => <Cell key={e.name} fill={e.color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-2">
          {emergencyRequests.map((e) => (
            <div key={e.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color }} />
                <span className="text-muted-foreground">{e.name}</span>
              </div>
              <span className="font-medium text-foreground">{e.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
