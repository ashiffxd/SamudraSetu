import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { Visualization } from './Visualization';
import { BarChart3, MessageSquare, Maximize2, Minimize2, Activity, Thermometer, Droplets, Wind, MapPin, TrendingUp } from 'lucide-react';

export const Dashboard = ({ onNavigate }) => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentQueryType, setCurrentQueryType] = useState('general');
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const handleQuery = (query, queryType) => {
    setCurrentQuery(query);
    setCurrentQueryType(queryType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Ocean Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-teal-900/20"></div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-xl font-bold text-blue-600">24.5°C</p>
              </div>
              <Thermometer className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-teal-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Salinity</p>
                <p className="text-xl font-bold text-teal-600">34.7 PSU</p>
              </div>
              <Droplets className="w-8 h-8 text-teal-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Oxygen</p>
                <p className="text-xl font-bold text-green-600">156 μmol</p>
              </div>
              <Wind className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Floats</p>
                <p className="text-xl font-bold text-red-600">5</p>
              </div>
              <MapPin className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Data Points</p>
                <p className="text-xl font-bold text-purple-600">1,247</p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trend</p>
                <p className="text-xl font-bold text-orange-600">↗ +2.3%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
          {/* Chat Panel */}
          <div className={`${isChatExpanded ? 'lg:col-span-2' : 'lg:col-span-1'} transition-all duration-300 relative z-10`}>
            <div className="relative h-full bg-white rounded-xl shadow-xl overflow-hidden">
              <button
                onClick={() => setIsChatExpanded(!isChatExpanded)}
                className="absolute top-2 right-2 z-10 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg shadow-sm transition-all"
                title={isChatExpanded ? 'Minimize Chat' : 'Expand Chat'}
              >
                {isChatExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <div className="h-full rounded-xl overflow-hidden">
                <ChatInterface onQuery={handleQuery} />
              </div>
            </div>
          </div>

          {/* Visualization Panel */}
          <div className={`${isChatExpanded ? 'lg:col-span-1' : 'lg:col-span-2'} transition-all duration-300 relative z-10`}>
            <div className="h-full bg-white rounded-xl shadow-xl overflow-hidden border">
              <div className="h-full">
                <Visualization queryType={currentQueryType} query={currentQuery} />
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-4 border relative z-10">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">System Online</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <BarChart3 className="w-4 h-4" />
                <span className="text-blue-700">Updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <button
                onClick={() => onNavigate('data-explorer')}
                className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                <span className="text-blue-700">Explore Data</span>
              </button>
              <button
                onClick={() => onNavigate('analytics')}
                className="flex items-center space-x-2 bg-teal-50 px-3 py-1 rounded-full hover:bg-teal-100 transition-colors"
              >
                <span className="text-teal-700">View Analytics</span>
              </button>
              <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
                <MessageSquare className="w-4 h-4" />
                <span className="text-purple-700">Queries: {currentQueryType !== 'general' ? '1' : '0'}</span>
              </div>
              <span className="text-xs bg-gradient-to-r from-blue-500 to-teal-500 text-white px-3 py-1 rounded-full font-medium">
                Prototype v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};