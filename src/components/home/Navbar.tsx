import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">আ</span>
            </div>
            <span className="font-bold text-lg font-display text-foreground">Amar Upazila</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Services</a>
            <a href="#" className="hover:text-foreground transition-colors">Blood Bank</a>
            <a href="#" className="hover:text-foreground transition-colors">Emergency</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <Link
              to="/login"
              className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Admin Panel
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/50 bg-card overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3 text-sm font-medium text-muted-foreground">
              <a href="#" className="block hover:text-foreground">Services</a>
              <a href="#" className="block hover:text-foreground">Blood Bank</a>
              <a href="#" className="block hover:text-foreground">Emergency</a>
              <a href="#" className="block hover:text-foreground">About</a>
              <Link to="/admin" className="block gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-center font-semibold">
                Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
