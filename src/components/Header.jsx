import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Waves, Globe, ChevronDown, Settings, Bell, User,
  Search, Menu, X, Info, Download, Share2
} from 'lucide-react';

const DropdownWrapper = ({ isOpen, onClose, children, positionClass }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-30" onClick={onClose}></div>

      {/* Dropdown content */}
      <div className={`absolute ${positionClass} z-50`}>
        {children}
      </div>
    </>,
    document.body
  );
};

export const Header = ({ onNavigate }) => {
  const [language, setLanguage] = useState('en');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' }
  ];

  const notifications = [
    { id: 1, text: "New ARGO float data available", time: "2 min ago" },
    { id: 2, text: "Temperature anomaly detected near Chennai", time: "1 hour ago" },
    { id: 3, text: "System maintenance scheduled", time: "3 hours ago" }
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const handleExportData = () => alert('Data export functionality would be implemented here');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SamudraSetu - Ocean Data Explorer',
        text: 'Explore ocean data with AI-powered insights',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const closeAllDropdowns = () => {
    setIsNotificationOpen(false);
    setIsProfileOpen(false);
    setIsLanguageOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-800 text-white shadow-2xl relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 animate-pulse"></div>
        <svg className="absolute bottom-0 left-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.1)"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-4 relative z-40 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Waves className="w-7 h-7 text-white animate-bounce" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-200 to-teal-200 bg-clip-text text-transparent">
              SamudraSetu
            </h1>
            <p className="text-blue-200 text-sm lg:text-base font-medium">
              FloatChat – Where Oceans Speak in Simple Words
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {['Dashboard','Data Explorer','Analytics','About'].map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page.toLowerCase().replace(' ','-'))}
              className="text-blue-200 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              {page}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button className="hidden md:flex items-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
            <Search className="w-4 h-4" />
            <span className="text-sm">Search Data</span>
          </button>

          <button onClick={handleExportData} className="hidden md:flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>

          <button onClick={handleShare} className="hidden md:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
            <Share2 className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setIsNotificationOpen(true);
              }}
              className="relative p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            </button>

            <DropdownWrapper
              isOpen={isNotificationOpen}
              onClose={closeAllDropdowns}
              positionClass="top-16 right-4 w-80 bg-white rounded-lg shadow-xl border"
            >
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 border-b last:border-b-0 hover:bg-gray-50">
                    <p className="text-sm text-gray-800">{n.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </DropdownWrapper>
          </div>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setIsLanguageOpen(true);
              }}
              className="flex items-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">
                {languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.name}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <DropdownWrapper
              isOpen={isLanguageOpen}
              onClose={closeAllDropdowns}
              positionClass="top-16 right-20 w-48 bg-white rounded-lg shadow-xl border"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    language === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : ''
                  }`}
                >
                  <span className="mr-3">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </DropdownWrapper>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setIsProfileOpen(true);
              }}
              className="flex items-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            <DropdownWrapper
              isOpen={isProfileOpen}
              onClose={closeAllDropdowns}
              positionClass="top-16 right-0 w-48 bg-white rounded-lg shadow-xl border"
            >
              <div className="p-4 border-b">
                <p className="font-semibold text-gray-800">Ocean Explorer</p>
                <p className="text-sm text-gray-500">explorer@samudrasetu.in</p>
              </div>
              <button className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>About</span>
              </button>
            </DropdownWrapper>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm relative z-50">
          <div className="space-y-3">
            {['Dashboard','Data Explorer','Analytics','About'].map((page) => (
              <button
                key={page}
                onClick={() => {
                  onNavigate(page.toLowerCase().replace(' ','-'));
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left flex items-center space-x-3 p-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              >
                <span>{page}</span>
              </button>
            ))}
            <button className="w-full text-left flex items-center space-x-3 p-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
              <span>Search Data</span>
            </button>
            <button onClick={handleExportData} className="w-full text-left flex items-center space-x-3 p-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
              <span>Export Data</span>
            </button>
            <button onClick={handleShare} className="w-full text-left flex items-center space-x-3 p-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
