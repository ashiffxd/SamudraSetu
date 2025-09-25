// Sample ARGO float data for demonstration

// Generate sample data for different locations
const generateSampleData = () => {
  const locations = [
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    { name: "Kochi", lat: 9.9312, lng: 76.2673 },
    { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185 },
    { name: "Goa", lat: 15.2993, lng: 74.1240 }
  ];

  const data = [];
  
  locations.forEach((location, locIndex) => {
    // Generate data for last 30 days
    for (let day = 0; day < 30; day++) {
      const date = new Date();
      date.setDate(date.getDate() - day);
      
      // Generate data at different depths
      [10, 50, 100, 200, 500, 1000].forEach((depth, depthIndex) => {
        const id = `${locIndex}-${day}-${depthIndex}`;
        
        // Add some realistic variation
        const tempVariation = Math.sin(day * 0.2) * 2 + Math.random() * 1;
        const salinityVariation = Math.random() * 0.5;
        const oxygenVariation = Math.random() * 20;
        
        data.push({
          id,
          timestamp: date.toISOString(),
          latitude: location.lat + (Math.random() - 0.5) * 0.5,
          longitude: location.lng + (Math.random() - 0.5) * 0.5,
          depth,
          temperature: 28 - (depth * 0.02) + tempVariation,
          salinity: 34.5 + salinityVariation,
          oxygen: Math.max(0, 180 - (depth * 0.15) + oxygenVariation),
          location: location.name
        });
      });
    }
  });
  
  return data;
};

export const argoData = generateSampleData();

// Helper functions for data filtering
export const getDataByLocation = (location) => 
  argoData.filter(d => d.location.toLowerCase().includes(location.toLowerCase()));

export const getDataByDepthRange = (minDepth, maxDepth) =>
  argoData.filter(d => d.depth >= minDepth && d.depth <= maxDepth);

export const getRecentData = (days) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return argoData.filter(d => new Date(d.timestamp) >= cutoff);
};