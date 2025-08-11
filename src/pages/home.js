import React, { useState, useEffect, useContext } from "react";
import "../styles/globals.css";
import { useNavigate } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";
import { 
  Info, 
  Video, 
  Code, 
  Users, 
  Shield, 
  Zap, 
  ArrowRight,
  Copy,
  CheckCircle,
  Star,
  Play
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Card, CardHeader, CardContent, CardFooter } from "../components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { ThemeContext } from "../App";

const features = [
  {
    icon: <Video className="w-6 h-6" />,
    title: "Face Motion Detection",
    description: "Advanced AI-powered monitoring to ensure interview integrity",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Live Code Editor",
    description: "Real-time collaborative coding with syntax highlighting",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Live Chat & Video",
    description: "Seamless communication during coding sessions",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Sessions",
    description: "End-to-end encrypted interviews with unique session IDs",
    color: "from-orange-500 to-red-500"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "TechCorp",
    content: "CodeCam revolutionized our interview process. The face detection and live coding features are game-changers.",
    rating: 5
  },
  {
    name: "Mike Rodriguez",
    role: "Engineering Manager",
    company: "StartupXYZ",
    content: "Finally, a platform that makes remote technical interviews feel personal and secure.",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "HR Director",
    company: "InnovateTech",
    content: "The session management is flawless. Our candidates love the seamless experience.",
    rating: 5
  }
];

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const Suid = new ShortUniqueId();
  const history = useNavigate();
  const [uname, setuname] = useState("");
  const [fclick, setFclick] = useState(false);
  const [sid, setSid] = useState("");
  const [sid1, setSid1] = useState("");
  const [validText, setvalidText] = useState("Enter the Session ID");
  const [copied, setCopied] = useState(false);
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  const [interviewer, setInterviewer] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleChange1 = (e) => {
    const input = e.target.value;
    if (input && !alphanumericRegex.test(input)) {
      setvalidText("Invalid Session ID");
      setSid1("");
      return;
    }
    setvalidText("Enter only 10 characters Session ID");
    if (input.length > 10) {
      setSid1("");
      return;
    }
    setSid1(input);
  };

  const handleNameChange = (e) => {
    setuname(e.target.value);
  };

  const generateCode = (e) => {
    e.preventDefault();
    setFclick(true);
    let code = Suid(10);
    setSid(code);
    setSid1(code);
    if (copy(code)) {
      toast.success("Session ID copied to clipboard!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Cannot copy to clipboard");
    }
  };

  const handleSwitch = () => {
    setInterviewer((prev) => !prev);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (sid.length === 0 && sid1.length === 0) {
      toast("Please generate or fill the Session ID", {
        icon: "❕",
      });
      return;
    }
    if (uname.length === 0) {
      toast.error("Name field is empty");
      return;
    }
    const roomId = sid.length > 0 ? sid : sid1;
    if (sid.length > 0) {
      localStorage.setItem("init", "true");
    }
    toast.success("Joining new Call");
    history(`/call/${roomId}`, {
      state: {
        username: uname,
        interviewer: !interviewer,
      },
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl transition-all duration-500 ${
            isDarkMode 
              ? 'bg-blue-600/20 animate-pulse' 
              : 'bg-blue-400/20'
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl transition-all duration-500 ${
            isDarkMode 
              ? 'bg-purple-600/20 animate-pulse' 
              : 'bg-cyan-400/20'
          }`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl transition-all duration-500 ${
            isDarkMode 
              ? 'bg-indigo-600/10' 
              : 'bg-indigo-300/10'
          }`}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-blue-900/50 border border-blue-700/50 text-blue-300 shadow-lg shadow-blue-900/25' 
              : 'bg-blue-50 border border-blue-200 text-blue-700 shadow-lg'
          }`}>
            <Star className="w-4 h-4 mr-2 fill-current" />
            Learn . Code . Interview . Repeat
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            The Future of
            <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
              Technical Interviews
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Coding interviews with AI-powered face detection, 
            real-time collaboration, and enterprise-grade security.
            <br />
            Ask your cp teammates to join and grill you :D
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              onClick={() => document.getElementById('session-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Start Interview Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className={`px-8 py-4 text-lg border-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 shadow-lg shadow-gray-900/25' 
                  : 'hover:bg-gray-50 hover:border-gray-400 shadow-lg'
              }`}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className={`text-center p-6 rounded-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg shadow-gray-900/25' 
                : 'bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-lg'
            }`}>
              <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>50K+</div>
              <div className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Interviews Conducted</div>
            </div>
            <div className={`text-center p-6 rounded-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg shadow-gray-900/25' 
                : 'bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-lg'
            }`}>
              <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>99.9%</div>
              <div className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Uptime Guarantee</div>
            </div>
            <div className={`text-center p-6 rounded-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg shadow-gray-900/25' 
                : 'bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-lg'
            }`}>
              <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>24/7</div>
              <div className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-black' 
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Everything you need for
              <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                perfect interviews
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              From AI-powered monitoring to real-time collaboration, 
              CodeCam provides the complete interview experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                  activeFeature === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                } ${
                  isDarkMode 
                    ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg shadow-gray-900/25' 
                    : 'bg-white shadow-lg'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 transition-opacity duration-300 ${
                  activeFeature === index ? 'opacity-20' : ''
                }`}></div>
                <CardContent className="relative p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg transition-transform duration-300 ${
                    activeFeature === index ? 'scale-110' : ''
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{feature.title}</h3>
                  <p className={`leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Session Management Section */}
      <section id="session-section" className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to start?
            </h2>
            <p className={`text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Create a new session or join an existing one in seconds.
            </p>
          </div>

          <Card className={`shadow-2xl border-0 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/90 backdrop-blur-md border border-gray-700/50 shadow-2xl shadow-gray-900/50' 
              : 'bg-white/90 backdrop-blur-md shadow-2xl'
          }`}>
            <CardHeader className="text-center pb-6">
              <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Join Your Interview Session
              </h3>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Enter your details and get started immediately
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleJoin} className="space-y-6">
                {/* Generate Session */}
                <div className="space-y-3">
                  <label className={`block text-sm font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Start a New Session
                  </label>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Session ID will appear here"
                      disabled
                      value={sid}
                      className={`flex-1 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50'
                      }`}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={generateCode}
                      className="px-6 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-all duration-300"
                    >
                      {fclick ? "Generate Again" : "Generate"}
                    </Button>
                  </div>
                  {copied && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Session ID copied to clipboard!
                    </div>
                  )}
                </div>

                <div className="text-center text-gray-500 text-sm">or</div>

                {/* Join with Code */}
                <div className="space-y-3">
                  <label className={`block text-sm font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Join with Code
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Session ID"
                    value={sid1}
                    onChange={handleChange1}
                    maxLength={10}
                    autoComplete="off"
                    className={`text-center text-lg font-mono tracking-wider transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-400' 
                        : ''
                    }`}
                  />
                  <span className="text-sm text-gray-500">{validText}</span>
                </div>

                {/* Name */}
                <div className="space-y-3">
                  <label className={`block text-sm font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={uname}
                    onChange={handleNameChange}
                    autoComplete="off"
                    className={`text-lg transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-400' 
                        : ''
                    }`}
                  />
                </div>

                {/* Interviewer Switch */}
                <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700/80 border border-gray-600/50' 
                    : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="interviewer-switch"
                      checked={interviewer}
                      onCheckedChange={handleSwitch}
                    />
                    <label htmlFor="interviewer-switch" className={`text-sm font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Join as Interviewer
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Info className="w-4 h-4" />
                    <span>Disables face monitoring</span>
                  </div>
                </div>

                {/* Join Button */}
                <Button 
                  type="submit" 
                  className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Join Call
                </Button>
              </form>
            </CardContent>

            <CardFooter className="pt-0">
              <Alert variant="destructive" className={`w-full transition-all duration-300 ${
                isDarkMode 
                  ? 'border-red-800/50 bg-red-900/20 text-red-300 shadow-lg shadow-red-900/25' 
                  : 'border-red-200 bg-red-50'
              }`}>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>
                  Malpractice will be considered seriously and may result in penalties. 
                  Please ensure you follow all interview guidelines.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-black to-gray-900' 
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Loved by developers worldwide
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              See what our users are saying about their CodeCam experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                isDarkMode 
                  ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg shadow-gray-900/25' 
                  : 'bg-white shadow-lg'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className={`mb-4 italic transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>"{testimonial.content}"</p>
                  <div>
                    <div className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;