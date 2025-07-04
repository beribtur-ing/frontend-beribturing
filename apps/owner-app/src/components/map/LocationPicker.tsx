import React, { useState, useEffect } from 'react';

interface LocationPickerProps {
  initialLocation?: { latitude: number; longitude: number };
  onLocationChange: (location: { latitude: number; longitude: number }) => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  initialLocation,
  onLocationChange,
}) => {
  const [location, setLocation] = useState(initialLocation || { latitude: 0, longitude: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }
  }, [initialLocation]);

  const handleGetCurrentLocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(newLocation);
        onLocationChange(newLocation);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter coordinates manually.');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleCoordinateChange = (field: 'latitude' | 'longitude', value: string) => {
    const numValue = parseFloat(value) || 0;
    const newLocation = { ...location, [field]: numValue };
    setLocation(newLocation);
    onLocationChange(newLocation);
  };

  const openInMaps = () => {
    if (location.latitude !== 0 || location.longitude !== 0) {
      const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Location Coordinates</h3>
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={isLoading}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Getting Location...' : 'Use Current Location'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={location.latitude}
              onChange={(e) => handleCoordinateChange('latitude', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="41.2995"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={location.longitude}
              onChange={(e) => handleCoordinateChange('longitude', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="69.2401"
            />
          </div>
        </div>
        
        {(location.latitude !== 0 || location.longitude !== 0) && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </span>
            <button
              type="button"
              onClick={openInMaps}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              View on Maps
            </button>
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500">
        <p>• Click "Use Current Location" to automatically get your coordinates</p>
        <p>• Or enter latitude and longitude manually</p>
        <p>• Click "View on Maps" to see the location on Google Maps</p>
      </div>
    </div>
  );
};