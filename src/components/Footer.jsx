import React from 'react';
import { Waves, Mail, Phone, MapPin, Github, Twitter, Linkedin, Heart, Globe, Shield, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-800 text-white relative overflow-hidden">
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-0 left-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,0 900,120 1200,60 L1200,0 L0,0 Z" fill="rgba(255,255,255,0.1)"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-200 to-teal-200 bg-clip-text text-transparent">
                  SamudraSetu
                </h3>
                <p className="text-xs text-blue-200">Ocean Intelligence Platform</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Bridging the gap between ocean science and technology through AI-powered data exploration and visualization.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Data Explorer</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Reports</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">About ARGO Floats</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Ocean Data Guide</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-300" />
                <span className="text-blue-200">info@samudrasetu.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-300" />
                <span className="text-blue-200">+91 80 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span className="text-blue-200">Chennai, Tamil Nadu, India</span>
              </div>
            </div>
            
            {/* Certifications */}
            <div className="pt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-blue-200">Certified Ocean Data Provider</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs text-blue-200">ISO 27001 Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-blue-200">
              <span>© 2025 SamudraSetu. All rights reserved.</span>
              <div className="hidden md:flex items-center space-x-1">
                
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          {/* Version Info */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-full">
              <Globe className="w-4 h-4 text-blue-300" />
              <span className="text-xs text-blue-200">Version 1.0.0 | Last Updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};