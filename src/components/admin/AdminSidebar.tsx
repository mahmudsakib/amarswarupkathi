import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  GraduationCap,
  Droplets,
  Landmark,
  Store,
  Users,
  Siren,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  FolderTree,
  UserCog,
  Bell,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Building2, label: "Hospitals", path: "/admin/hospitals" },
  { icon: Stethoscope, label: "Doctors", path: "/admin/doctors" },
  { icon: GraduationCap, label: "Schools", path: "/admin/schools" },
  { icon: Droplets, label: "Blood Donors", path: "/admin/blood-donors" },
  { icon: Landmark, label: "Govt Offices", path: "/admin/govt-offices" },
  { icon: Store, label: "Businesses", path: "/admin/businesses" },
  { icon: Users, label: "Citizens", path: "/admin/citizens" },
  { icon: Siren, label: "Emergency", path: "/admin/emergency" },
];

const bottomItems = [
  { icon: FolderTree, label: "Categories", path: "/admin/categories" },
  { icon: UserCog, label: "Users", path: "/admin/users" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ item }: { item: typeof menuItems[0] }) => (
    <Link
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
        isActive(item.path)
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "mx-auto")} />
      {!collapsed && (
        <span className="truncate">{item.label}</span>
      )}
    </Link>
  );

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 sticky top-0",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <span className="text-sidebar-primary-foreground font-bold text-sm">আ</span>
        </div>
        {!collapsed && (
          <span className="ml-3 font-bold text-base font-display text-sidebar-accent-foreground truncate">
            {t('common.siteName')}
          </span>
        )}
      </div>

      {/* Back to site */}
      <div className="px-3 pt-4 pb-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Home className={cn("h-4 w-4 flex-shrink-0", collapsed && "mx-auto")} />
          {!collapsed && <span>Back to Website</span>}
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 px-3 mb-2 font-semibold">
            Main
          </p>
        )}
        {menuItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}

        <div className="my-4 border-t border-sidebar-border" />

        {!collapsed && (
          <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 px-3 mb-2 font-semibold">
            System
          </p>
        )}
        {bottomItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-xs"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
