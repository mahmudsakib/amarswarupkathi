import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";

const DEMO_USERS = [
  { email: "admin@amarupazila.gov.bd", password: "admin123", role: "Super Admin" },
  { email: "upadmin@amarupazila.gov.bd", password: "admin123", role: "Upazila Admin" },
  { email: "entry1@amarupazila.gov.bd", password: "admin123", role: "Data Entry Operator" },
];

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user = DEMO_USERS.find(
        (u) => u.email === email.trim().toLowerCase() && u.password === password
      );
      if (user) {
        localStorage.setItem("uims_auth", JSON.stringify({ email: user.email, role: user.role, loggedIn: true }));
        toast.success(`Welcome back, ${user.role}!`);
        navigate("/admin");
      } else {
        toast.error("Invalid email or password");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <span className="text-primary-foreground font-bold text-xl">আ</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-primary-foreground">Amar Upazila</h1>
          <p className="text-primary-foreground/60 text-sm mt-1">Admin Panel Login</p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border/50">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                placeholder="admin@amarupazila.gov.bd"
                className="w-full px-4 py-3 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength={100}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-background text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-border/50">
            <p className="text-xs font-semibold text-foreground mb-2">Demo Credentials:</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.email}
                  onClick={() => { setEmail(u.email); setPassword(u.password); }}
                  className="w-full text-left hover:bg-secondary rounded-lg px-2 py-1 transition-colors"
                >
                  <span className="font-medium text-foreground">{u.role}</span>: {u.email}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
