import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  Moon,
  Sun,
  Globe,
  User,
  ChevronDown,
  LogOut,
  Settings,
  UserCog,
} from "lucide-react";

const AdminTopbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();

  const authUser = useMemo(() => {
    try {
      const auth = localStorage.getItem("uims_auth");
      return auth ? JSON.parse(auth) : null;
    } catch { return null; }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("uims_auth");
    navigate("/login");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
      {/* Left: Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border/50"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Dark mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Language */}
        <div className="relative">
          <button
            onClick={() => { setLangOpen(!langOpen); setProfileOpen(false); }}
            className="p-2.5 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Globe className="h-5 w-5" />
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-xl shadow-elevated py-1 z-50">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-secondary text-foreground">English</button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-secondary text-foreground">বাংলা</button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="p-2.5 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>

        {/* Profile */}
        <div className="relative ml-2">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setLangOpen(false); }}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:block">{authUser?.role || "Admin"}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-elevated py-1 z-50">
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary text-foreground flex items-center gap-2">
                <UserCog className="h-4 w-4" /> Profile
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary text-foreground flex items-center gap-2">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <div className="border-t border-border my-1" />
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary text-destructive flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
