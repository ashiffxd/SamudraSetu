import React from 'react';
import { ArrowLeft, Waves, Target, Users, Award, Globe, Heart, Lightbulb, Shield, Zap } from 'lucide-react';

export const About = ({ onNavigate }) => {
  const features = [
    {
      icon: <Waves className="w-8 h-8 text-blue-500" />,
      title: "Real-time Ocean Data",
      description: "Access live data from ARGO floats across Indian Ocean regions with real-time updates and monitoring."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms analyze ocean patterns and provide intelligent insights."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-500" />,
      title: "Global Coverage",
      description: "Comprehensive coverage of Indian coastal regions with plans for global expansion."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Data Security",
      description: "Enterprise-grade security ensuring your data is protected with ISO 27001 compliance."
    }
  ];

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Chief Ocean Scientist",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      bio: "15+ years in oceanography and marine data analysis"
    },
    {
      name: "Rajesh Kumar",
      role: "Lead AI Engineer",
      image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      bio: "Expert in machine learning and ocean data processing"
    },
    {
      name: "Anita Patel",
      role: "Data Visualization Lead",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      bio: "Specialist in interactive data visualization and UX design"
    },
    {
      name: "Vikram Singh",
      role: "Platform Architect",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      bio: "Full-stack developer with expertise in scalable systems"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Ocean Wave Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              About SamudraSetu
            </h1>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-10 transform translate-x-16 -translate-y-16"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Ocean Intelligence Platform</h2>
                <p className="text-gray-600">Bridging Science and Technology</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              SamudraSetu is an innovative AI-powered platform that democratizes access to ocean data and insights. 
              We combine cutting-edge artificial intelligence with comprehensive oceanographic data to provide 
              researchers, policymakers, and marine enthusiasts with powerful tools for understanding our oceans.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span>Founded in 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green-500" />
                <span>50+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              To make ocean data accessible, understandable, and actionable for everyone. We believe that by 
              democratizing access to marine information, we can accelerate ocean research, improve marine 
              conservation efforts, and support sustainable blue economy initiatives.
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-teal-100 leading-relaxed">
              To become the leading platform for ocean intelligence, fostering a global community of ocean 
              data users and contributors. We envision a future where ocean data drives informed decisions 
              for marine conservation, climate research, and sustainable development.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-all">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200"
                />
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <p className="text-sm">React.js</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <p className="text-sm">Node.js</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <p className="text-sm">Python</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <p className="text-sm">Machine Learning</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
            <Heart className="w-12 h-12 mx-auto mb-4 text-red-300" />
            <h3 className="text-2xl font-bold mb-4">Join Our Ocean Community</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Be part of the revolution in ocean data accessibility. Whether you're a researcher, student, 
              or ocean enthusiast, SamudraSetu provides the tools you need to explore and understand our oceans.
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};