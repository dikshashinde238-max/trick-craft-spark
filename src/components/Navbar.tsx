import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, BookOpen } from "lucide-react";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-foreground tracking-tight">
          <img src={logo} alt="MagicMind logo" className="w-8 h-8" />
          MagicMind
        </Link>
        <div className="flex gap-1">
          {[
            { to: "/", label: "Create", icon: Sparkles },
            { to: "/discover", label: "Discover", icon: BookOpen },
          ].map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? "bg-surface text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
