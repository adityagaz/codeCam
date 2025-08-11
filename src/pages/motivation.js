import React from 'react';
import { 
  Target, 
  Zap, 
  Users, 
  Code, 
  TrendingUp, 
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Lightbulb,
  Rocket
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Motivation = () => {
  const benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Clear Goals",
      description: "Set specific objectives and track your progress systematically"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Rapid Growth",
      description: "Accelerate your learning with focused practice and feedback"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Connect with like-minded developers and mentors"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Practical Skills",
      description: "Build real-world projects and solve actual problems"
    }
  ];

  const successStories = [
    {
      name: "Alex Chen",
      role: "Frontend Developer",
      company: "TechCorp",
      story: "Started with basic HTML/CSS, now leading React development teams",
      achievement: "3x salary increase in 2 years"
    },
    {
      name: "Sarah Johnson",
      role: "Full Stack Engineer",
      company: "StartupXYZ",
      story: "Transitioned from non-tech background to senior developer role",
      achievement: "Career pivot success in 18 months"
    },
    {
      name: "Mike Rodriguez",
      role: "DevOps Engineer",
      company: "Enterprise Inc",
      story: "Self-taught developer who now manages cloud infrastructure",
      achievement: "Certified AWS Solutions Architect"
    }
  ];

  const motivationalQuotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-sm font-medium text-yellow-700 mb-8">
            <Lightbulb className="w-4 h-4 mr-2 fill-current" />
            Your Journey Starts Here
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Coding Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Every expert was once a beginner. Your dedication to learning, practicing, and growing 
            will open doors to opportunities you never thought possible. Start your journey today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Start Learning Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-2 hover:bg-gray-50"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Explore Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Why CodeCam Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose
              <span className="block text-blue-600">CodeCam?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another coding platform. We're your partner in success, 
              providing everything you need to excel in technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-200">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real people, real results. See how others have transformed their careers 
              through dedication and the right tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{story.name}</div>
                      <div className="text-sm text-gray-500">{story.role} at {story.company}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">"{story.story}"</p>
                  <div className="flex items-center text-green-600 font-medium">
                    <Award className="w-4 h-4 mr-2" />
                    {story.achievement}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational Quotes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Words of Wisdom
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let these timeless quotes inspire you on your coding journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {motivationalQuotes.map((quote, index) => (
              <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-8 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                  <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                    "{quote.split(' - ')[0]}"
                  </blockquote>
                  <cite className="block mt-4 text-sm text-gray-500">
                    — {quote.split(' - ')[1]}
                  </cite>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have already transformed their careers. 
            Your success story starts with the first step.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Motivation;