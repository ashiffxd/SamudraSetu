import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { Visualization } from './Visualization';
import { BarChart3, MessageSquare, Maximize2, Minimize2 } from 'lucide-react';

export const Dashboard = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentQueryType, setCurrentQueryType] = useState('general');
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const handleQuery = (query, queryType) => {
    setCurrentQuery(query);
    setCurrentQueryType(queryType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
          {/* Chat Panel */}
          <div className={`${isChatExpanded ? 'lg:col-span-2' : 'lg:col-span-1'} transition-all duration-300`}>
            <div className="relative h-full">
              <button
                onClick={() => setIsChatExpanded(!isChatExpanded)}
                className="absolute top-2 right-2 z-10 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg shadow-sm transition-all"
                title={isChatExpanded ? 'Minimize Chat' : 'Expand Chat'}
              >
                {isChatExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <div className="h-full">
                <ChatInterface onQuery={handleQuery} />
              </div>
            </div>
          </div>

          {/* Visualization Panel */}
          <div className={`${isChatExpanded ? 'lg:col-span-1' : 'lg:col-span-2'} transition-all duration-300`}>
            <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-full">
                <Visualization queryType={currentQueryType} query={currentQuery} />
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Data Updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Active Queries: {currentQueryType !== 'general' ? '1' : '0'}</span>
              </div>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                Prototype v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};