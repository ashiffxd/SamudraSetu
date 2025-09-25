import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, BarChart3, PieChart, Activity, Calendar, Download, Filter } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { argoData } from '../data/argoData';

export const Analytics = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  // Process data for analytics
  const processAnalyticsData = () => {
    const now = new Date();
    const daysBack = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
    const cutoffDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    
    return argoData.filter(d => new Date(d.timestamp) >= cutoffDate);
  };

  const analyticsData = processAnalyticsData();

  // Temperature trend data
  const temperatureTrendData = {
    labels: analyticsData.slice(0, 20).map(d => new Date(d.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Temperature',
        data: analyticsData.slice(0, 20).map(d => d.temperature),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      }
    ]
  };

  // Location distribution data
  const locationData = analyticsData.reduce((acc, item) => {
    acc[item.location] = (acc[item.location] || 0) + 1;
    return acc;
  }, {});

  const locationDistributionData = {
    labels: Object.keys(locationData),
    datasets: [
      {
        data: Object.values(locationData),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      }
    ]
  };

  // Depth analysis data
  const depthAnalysisData = {
    labels: ['10m', '50m', '100m', '200m', '500m', '1000m'],
    datasets: [
      {
        label: 'Temperature',
        data: [10, 50, 100, 200, 500, 1000].map(depth => {
          const depthData = analyticsData.filter(d => d.depth === depth);
          return depthData.length > 0 ? depthData.reduce((acc, d) => acc + d.temperature, 0) / depthData.length : 0;
        }),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Salinity',
        data: [10, 50, 100, 200, 500, 1000].map(depth => {
          const depthData = analyticsData.filter(d => d.depth === depth);
          return depthData.length > 0 ? depthData.reduce((acc, d) => acc + d.salinity, 0) / depthData.length : 0;
        }),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      }
    ]
  };

  const stats = {
    avgTemperature: (analyticsData.reduce((acc, d) => acc + d.temperature, 0) / analyticsData.length).toFixed(1),
    avgSalinity: (analyticsData.reduce((acc, d) => acc + d.salinity, 0) / analyticsData.length).toFixed(1),
    avgOxygen: (analyticsData.reduce((acc, d) => acc + d.oxygen, 0) / analyticsData.length).toFixed(0),
    totalReadings: analyticsData.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Ocean Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50c25-25 75 25 100 0v50H0z' fill='%23000000' fill-opacity='0.1'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Ocean Analytics
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Temperature</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgTemperature}°C</p>
                <p className="text-xs text-green-600 mt-1">↗ +2.3% from last period</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Salinity</p>
                <p className="text-2xl font-bold text-teal-600">{stats.avgSalinity} PSU</p>
                <p className="text-xs text-red-600 mt-1">↘ -0.8% from last period</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Oxygen</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgOxygen} μmol</p>
                <p className="text-xs text-green-600 mt-1">↗ +5.2% from last period</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Readings</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalReadings.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">↗ +12.5% from last period</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Temperature Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Temperature Trend</h3>
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>
            <Line data={temperatureTrendData} options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
              },
              scales: {
                y: { beginAtZero: false }
              }
            }} />
          </div>

          {/* Location Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Data Distribution by Location</h3>
              <Filter className="w-5 h-5 text-gray-500" />
            </div>
            <Doughnut data={locationDistributionData} options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
              }
            }} />
          </div>
        </div>

        {/* Depth Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Parameter Analysis by Depth</h3>
            <BarChart3 className="w-5 h-5 text-gray-500" />
          </div>
          <Bar data={depthAnalysisData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
            },
            scales: {
              y: { beginAtZero: false }
            }
          }} />
        </div>

        {/* Insights Panel */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Temperature Patterns</h4>
              <p className="text-sm opacity-90">Surface temperatures show seasonal variation with Chennai region recording highest averages.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Salinity Trends</h4>
              <p className="text-sm opacity-90">Salinity levels remain stable across depths with minor regional variations observed.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Oxygen Distribution</h4>
              <p className="text-sm opacity-90">Oxygen levels decrease with depth as expected, with some low-oxygen zones identified.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};