import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext, ThemeContext } from "../App";
import {
  Menu,
  X,
  Code,
  User as UserIcon,
  LogOut,
  Plus,
  Moon,
  Sun,
  Sparkles,
  Brain,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";


// Shared class for all nav links
const pillBase =
  "group relative inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70";

const pillIdle =
  "text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white bg-zinc-50/60 dark:bg-zinc-900/60 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70 border border-zinc-200/70 dark:border-zinc-800/70 backdrop-blur shadow-sm hover:shadow";

const pillActive =
  "text-zinc-900 dark:text-white bg-gradient-to-br from-indigo-50/80 to-fuchsia-50/60 dark:from-indigo-500/10 dark:to-transparent ring-1 ring-inset ring-indigo-500/50";

function NavPill({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [pillBase, isActive ? pillActive : pillIdle].join(" ")
      }
    >
      {/* subtle hover glow */}
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-sky-500/10 blur" />
      </span>
      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
      <span className="relative z-10">{label}</span>
    </NavLink>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  // Do not mutate context state. Derive auth from context OR jwt separately.
  const isAuthenticated = useMemo(() => {
    if (state) return true; // if your context already tracks auth
    const jwt = localStorage.getItem("jwt");
    return Boolean(jwt);
  }, [state]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  const guestLinks = [
    { to: "/motivation", label: "Motivation", icon: Sparkles },
    { to: "/slides", label: "Revision", icon: Brain },
    { to: "/features", label: "Features", icon: Zap },
  ];

  const authedLinks = [
    { to: "/profile", label: "Profile", icon: UserIcon },
    { to: "/newPost", label: "New Post", icon: Plus },
  ];

  const links = isAuthenticated ? authedLinks : guestLinks;

  const logout = () => {
    localStorage.clear();
    dispatch?.({ type: "CLEAR" });
    navigate("/");
  };

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-sm"
          : "bg-transparent",
      ].join(" ")}
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-sm">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              CodeCam
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3">
            {links.map((l) => (
              <NavPill key={l.to} {...l} />
            ))}

            {isAuthenticated ? (
              <Button
                onClick={logout}
                variant="outline"
                className="rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            ) : null}

            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="sm"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="w-10 h-10 p-0 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 transition-transform group-hover:rotate-90" />
              ) : (
                <Moon className="w-5 h-5 transition-transform group-hover:-rotate-12" />
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        <div
          id="mobile-nav"
          className={[
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300",
            isOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0",
          ].join(" ")}
        >
          <div className="py-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <NavPill key={l.to} {...l} onClick={() => setIsOpen(false)} />
              ))}

              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              ) : null}

              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                className="justify-start"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4 mr-2" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2" /> Dark Mode
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
