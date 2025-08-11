import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Zap,
  Shield,
  Globe,
  Users,
  BookOpen,
  Settings,
  Building,
  FileText,
  Phone
} from "lucide-react";
import { Button } from "./ui/button";
import { ThemeContext } from "../App";

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative overflow-hidden transition-all duration-500 ${
      isDarkMode ? 'footer-dark' : 'footer-light'
    } text-white`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl transition-all duration-500 ${
          isDarkMode ? 'bg-blue-600/10' : 'bg-blue-500/10'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl transition-all duration-500 ${
          isDarkMode ? 'bg-purple-600/10' : 'bg-purple-500/10'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl transition-all duration-500 ${
          isDarkMode ? 'bg-indigo-600/5' : 'bg-indigo-500/10'
        }`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Code className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CodeCam
                </span>
              </Link>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Revolutionizing technical interviews with AI-powered monitoring,
                real-time collaboration, and enterprise-grade security.
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`transition-all duration-300 hover:scale-110 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50 border border-gray-700/50' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`transition-all duration-300 hover:scale-110 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50 border border-gray-700/50' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`transition-all duration-300 hover:scale-110 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50 border border-gray-700/50' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`transition-all duration-300 hover:scale-110 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50 border border-gray-700/50' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className={`footer-section-header ${
                isDarkMode ? 'footer-section-header-light' : 'footer-section-header-light'
              }`}>
                <Zap className="w-5 h-5 mr-2" />
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/features" 
                    className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
                  >
                    <span className="flex items-center">
                      <Shield className="w-4 h-4 mr-2  text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      Features
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pricing" 
                    className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
                  >
                    <span className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      Pricing
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/integrations" 
                    className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
                  >
                    <span className="flex items-center">
                      <Settings className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      Integrations
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/api" 
                    className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
                  >
                    <span className="flex items-center">
                      <Code className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      API
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className={`footer-section-header ${
                isDarkMode ? 'footer-section-header-dark' : 'footer-section-header-dark'
              }`}>
                <Building className="w-5 h-5 mr-2" />
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/about" 
                    className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
                  >
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      About
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/careers" 
                    className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
                  >
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      Careers
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
                  >
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      Blog
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
                  >
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t transition-all duration-300 py-8 ${
          isDarkMode ? 'border-gray-700/50' : 'border-gray-700'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-gray-400 text-sm">
              <span>© 2024 CodeCam. Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current animate-pulse" />
              <span>Aditya.</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link 
                to="/privacy" 
                className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className={`footer-link ${isDarkMode ? '' : 'footer-link-light'}`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        variant="ghost"
        size="sm"
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  );
};

export default Footer;
