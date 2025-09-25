import React from 'react';
import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { DataExplorer } from './pages/DataExplorer';
import { Analytics } from './pages/Analytics';
import { About } from './pages/About';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'data-explorer':
        return <DataExplorer onNavigate={handleNavigation} />;
      case 'analytics':
        return <Analytics onNavigate={handleNavigation} />;
      case 'about':
        return <About onNavigate={handleNavigation} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onNavigate={handleNavigation} />
      {renderCurrentPage()}
      <Footer />
    </div>
  );
}

export default App;