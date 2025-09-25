import React, { useState } from 'react';
import { Waves, Globe, ChevronDown } from 'lucide-react';

export const Header = () => {
  const [language, setLanguage] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsDropdownOpen(false);
    // In a real app, this would trigger translation
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SamudraSetu</h1>
              <p className="text-blue-100 text-sm">Ocean Data Intelligence Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6 text-sm">
              <span className="text-blue-100">Real-time Ocean Analytics</span>
              <span className="text-blue-200">•</span>
              <span className="text-blue-100">AI-Powered Insights</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-2 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">
                  {languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.name}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg ${
                        language === lang.code ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};