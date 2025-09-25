import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, BarElement, RadialLinearScale } from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { argoData, getDataByLocation, getRecentData } from '../data/argoData';
import { TrendingUp, Droplets, Wind, MapPin } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export const Visualization = ({ queryType, query }) => {
  const mapRef = useRef(null);

  const getLocationFromQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('chennai')) return 'Chennai';
    if (lowerQuery.includes('mumbai')) return 'Mumbai';
    if (lowerQuery.includes('kochi')) return 'Kochi';
    if (lowerQuery.includes('visakhapatnam')) return 'Visakhapatnam';
    if (lowerQuery.includes('goa')) return 'Goa';
    return '';
  };

  const renderTemperatureChart = () => {
    const location = getLocationFromQuery(query);
    const data = location ? getDataByLocation(location) : getRecentData(7);
    
    const chartData = {
      labels: data.slice(0, 20).map(d => new Date(d.timestamp).toLocaleDateString()),
      datasets: [
        {
          label: 'Temperature (°C)',
          data: data.slice(0, 20).map(d => d.temperature),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        }
      ]
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Temperature Analysis</h3>
        </div>
        <Line data={chartData} options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: location ? `Temperature in ${location}` : 'Temperature Trend (Last 7 Days)' }
          },
          scales: {
            y: { beginAtZero: false, title: { display: true, text: 'Temperature (°C)' } }
          }
        }} />
      </div>
    );
  };

  const renderSalinityChart = () => {
    const data = argoData.slice(0, 30);
    
    const chartData = {
      labels: ['10m', '50m', '100m', '200m', '500m', '1000m'],
      datasets: [
        {
          label: 'Salinity (PSU)',
          data: [10, 50, 100, 200, 500, 1000].map(depth => {
            const depthData = data.filter(d => d.depth === depth);
            return depthData.length > 0 ? depthData.reduce((acc, d) => acc + d.salinity, 0) / depthData.length : 0;
          }),
          backgroundColor: 'rgba(20, 184, 166, 0.8)',
          borderColor: 'rgb(20, 184, 166)',
          borderWidth: 1,
        }
      ]
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-5 h-5 text-teal-500" />
          <h3 className="text-lg font-semibold">Salinity Profile</h3>
        </div>
        <Bar data={chartData} options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Salinity vs Depth' }
          },
          scales: {
            y: { beginAtZero: false, title: { display: true, text: 'Salinity (PSU)' } }
          }
        }} />
      </div>
    );
  };

  const renderOxygenChart = () => {
    const data = argoData.slice(0, 50);
    
    const scatterData = {
      datasets: [
        {
          label: 'Oxygen Concentration',
          data: data.map(d => ({ x: d.depth, y: d.oxygen })),
          backgroundColor: data.map(d => d.oxygen < 100 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(34, 197, 94, 0.8)'),
          borderColor: data.map(d => d.oxygen < 100 ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'),
        }
      ]
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Wind className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold">Oxygen Distribution</h3>
        </div>
        <Scatter data={scatterData} options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Oxygen vs Depth (Red = Low Oxygen Zones)' }
          },
          scales: {
            x: { title: { display: true, text: 'Depth (m)' } },
            y: { title: { display: true, text: 'Oxygen (μmol/kg)' } }
          }
        }} />
      </div>
    );
  };

  const renderLocationMap = () => {
    const uniqueLocations = Array.from(new Set(argoData.map(d => d.location)))
      .map(location => {
        const locationData = argoData.filter(d => d.location === location);
        const avgLat = locationData.reduce((acc, d) => acc + d.latitude, 0) / locationData.length;
        const avgLng = locationData.reduce((acc, d) => acc + d.longitude, 0) / locationData.length;
        return { location, lat: avgLat, lng: avgLng, count: locationData.length };
      });

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold">ARGO Float Locations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uniqueLocations.map((loc, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">{loc.location}</h4>
              <p className="text-sm text-blue-600">
                Coordinates: {loc.lat.toFixed(2)}°N, {loc.lng.toFixed(2)}°E
              </p>
              <p className="text-sm text-blue-600">Data Points: {loc.count}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Interactive map visualization would show real-time float positions with color-coded data points based on temperature, salinity, or oxygen levels.
          </p>
        </div>
      </div>
    );
  };

  const renderDepthProfile = () => {
    const depths = [10, 50, 100, 200, 500, 1000];
    const avgTemp = depths.map(depth => {
      const depthData = argoData.filter(d => d.depth === depth);
      return depthData.length > 0 ? depthData.reduce((acc, d) => acc + d.temperature, 0) / depthData.length : 0;
    });

    const chartData = {
      labels: depths.map(d => `${d}m`),
      datasets: [
        {
          label: 'Average Temperature (°C)',
          data: avgTemp,
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4,
        }
      ]
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-semibold">Depth Profile</h3>
        </div>
        <Line data={chartData} options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Temperature vs Depth Profile' }
          },
          scales: {
            y: { beginAtZero: false, title: { display: true, text: 'Temperature (°C)' } }
          }
        }} />
      </div>
    );
  };

  const renderDefaultView = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Ocean Data Visualizations</h3>
        <p className="text-gray-600 mb-4">
          Ask me about temperature, salinity, oxygen levels, or float locations to see interactive visualizations.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-blue-600 font-semibold">Temperature</div>
            <div className="text-gray-600">15-30°C range</div>
          </div>
          <div className="p-3 bg-teal-50 rounded-lg">
            <div className="text-teal-600 font-semibold">Salinity</div>
            <div className="text-gray-600">34-35 PSU</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-green-600 font-semibold">Oxygen</div>
            <div className="text-gray-600">80-200 μmol/kg</div>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="text-red-600 font-semibold">Active Floats</div>
            <div className="text-gray-600">5 locations</div>
          </div>
        </div>
      </div>
    </div>
  );

  const getVisualization = () => {
    switch (queryType) {
      case 'temperature':
      case 'temperature-trend':
        return renderTemperatureChart();
      case 'salinity':
        return renderSalinityChart();
      case 'oxygen':
        return renderOxygenChart();
      case 'locations':
        return renderLocationMap();
      case 'depth-profile':
        return renderDepthProfile();
      default:
        return renderDefaultView();
    }
  };

  return (
    <div className="h-full">
      {getVisualization()}
    </div>
  );
};