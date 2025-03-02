// src/components/LoadingSpinner.tsx
'use client';

import React, { useEffect, useState } from 'react';

const LoadingSpinner: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center">
        <div className="border-4 border-blue-200 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <span className="ml-2 text-gray-600">
          Loading data... {time}
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;