import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext, ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";
import { 
  Menu, 
  X, 
  Code, 
  User, 
  LogOut, 
  BookOpen, 
  Target, 
  Plus, 
  Moon, 
  Sun,
  Sparkles,
  Brain,
  Zap,
  Rocket
} from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const history = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  let jwt = localStorage.getItem("jwt");
  if (jwt) {
    state = true;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavLinks = () => {
    if (state) {
      return [
        <Link key="profile" to="/profile" className="nav-link group">
          <User className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
          Profile
        </Link>,
        <Link key="newPost" to="/newPost" className="nav-link group">
          <Plus className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
          New Post
        </Link>,
        <Button
          key="logout"
          variant="outline"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history("/");
          }}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>,
      ];
    } else {
      return [
        <Link key="motivation" to="/motivation" className="nav-link group">
          <Sparkles className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
          Motivation
        </Link>,
        <Link key="slides" to="/slides" className="nav-link group">
          <Brain className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
          Revision
        </Link>,
        <Link key="features" to="/features" className="nav-link group">
          <Zap className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
          Features
        </Link>,
      ];
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkMode 
            ? "bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 shadow-lg"
            : "bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeCam
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {renderNavLinks()}
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex flex-col space-y-3">
              {renderNavLinks().map((link, index) => (
                <div key={index} className="px-2">
                  {link}
                </div>
              ))}
              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                className="w-full justify-start group"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4 mr-2 transition-transform group-hover:rotate-90" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2 transition-transform group-hover:-rotate-12" />
                    Dark Mode
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;