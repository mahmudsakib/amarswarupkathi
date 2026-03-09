import {
  Building2,
  Stethoscope,
  GraduationCap,
  Droplets,
  Store,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { icon: Building2, label: "Hospitals", value: 24, change: +3, color: "bg-info/10 text-info", trend: "up" },
  { icon: Stethoscope, label: "Doctors", value: 156, change: +12, color: "bg-success/10 text-success", trend: "up" },
  { icon: GraduationCap, label: "Schools", value: 48, change: +2, color: "bg-accent/10 text-accent", trend: "up" },
  { icon: Droplets, label: "Blood Donors", value: 312, change: +28, color: "bg-destructive/10 text-destructive", trend: "up" },
  { icon: Store, label: "Businesses", value: 205, change: +15, color: "bg-warning/10 text-warning", trend: "up" },
  { icon: Users, label: "Citizens", value: 1847, change: +54, color: "bg-primary/10 text-primary", trend: "up" },
];

const growthData = [
  { month: "Jan", doctors: 120, hospitals: 18, donors: 240 },
  { month: "Feb", doctors: 128, hospitals: 19, donors: 255 },
  { month: "Mar", doctors: 135, hospitals: 20, donors: 268 },
  { month: "Apr", doctors: 140, hospitals: 21, donors: 280 },
  { month: "May", doctors: 148, hospitals: 22, donors: 295 },
  { month: "Jun", doctors: 156, hospitals: 24, donors: 312 },
];

const serviceDistribution = [
  { name: "Hospital", value: 24, color: "hsl(207, 90%, 54%)" },
  { name: "Doctor", value: 156, color: "hsl(158, 64%, 40%)" },
  { name: "School", value: 48, color: "hsl(36, 95%, 54%)" },
  { name: "Business", value: 205, color: "hsl(174, 62%, 32%)" },
  { name: "Blood Donor", value: 312, color: "hsl(0, 72%, 51%)" },
];

const recentActivity = [
  { action: "New doctor added", detail: "Dr. Fatima Rahman — Cardiology", time: "2 min ago" },
  { action: "Blood donor registered", detail: "Kamal Hossain — B+", time: "15 min ago" },
  { action: "Hospital updated", detail: "Upazila Health Complex", time: "1 hour ago" },
  { action: "New business listed", detail: "Green Pharmacy — Sadar", time: "2 hours ago" },
  { action: "Emergency alert sent", detail: "Blood needed — O- at Sadar Hospital", time: "3 hours ago" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's what's happening in your upazila.</p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="gradient-card rounded-2xl p-4 border border-border/50 shadow-card hover:shadow-card-hover transition-all"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold font-display text-foreground">{stat.value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-[10px] text-success font-medium">+{stat.change} this month</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 gradient-card rounded-2xl p-6 border border-border/50 shadow-card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-foreground font-display">Data Growth</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly growth across services</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorDoctors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(158, 64%, 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(158, 64%, 40%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDonors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 46%)" />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(210, 15%, 89%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Area type="monotone" dataKey="doctors" stroke="hsl(158, 64%, 40%)" fill="url(#colorDoctors)" strokeWidth={2} />
              <Area type="monotone" dataKey="donors" stroke="hsl(0, 72%, 51%)" fill="url(#colorDonors)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="gradient-card rounded-2xl p-6 border border-border/50 shadow-card"
        >
          <h3 className="font-bold text-foreground font-display mb-1">Service Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Breakdown by category</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {serviceDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {serviceDistribution.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-medium text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="gradient-card rounded-2xl p-6 border border-border/50 shadow-card"
      >
        <h3 className="font-bold text-foreground font-display mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{a.action}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.detail}</p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
