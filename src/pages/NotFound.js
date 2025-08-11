import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  AlertTriangle,
  Code,
  Users
} from 'lucide-react';
import { Button } from '../components/ui/button';

const NotFound = () => {
  const quickLinks = [
    {
      icon: <Home className="w-5 h-5" />,
      title: "Home",
      description: "Return to the main page",
      href: "/"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Start Interview",
      description: "Begin a coding session",
      href: "/"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Motivation",
      description: "Get inspired and motivated",
      href: "/motivation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <AlertTriangle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              4
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              4
            </div>
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">
          Oops!
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Don't worry, we've got plenty of other great content for you to explore.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
          <Link to="/">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-2 hover:bg-gray-50"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Navigation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.href}
                className="group block p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  {link.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {link.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            Still can't find what you're looking for?
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium">Try searching our site</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;