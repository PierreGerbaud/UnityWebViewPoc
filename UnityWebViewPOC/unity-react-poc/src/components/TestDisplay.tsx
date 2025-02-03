"use client";

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

interface Position {
  x: number;
  y: number;
  z: number;
}

interface UnityData {
  clickCount: number;
  position: Position;
  timestamp: string;
}

interface CustomEventWithUnityData extends CustomEvent {
  detail: UnityData;
}

const TestDisplay: React.FC = () => {
  const [data, setData] = useState<UnityData | null>(null);

  useEffect(() => {
    const handleUnityData = (event: CustomEventWithUnityData) => {
      console.log('React received data:', event.detail);
      setData(event.detail);
    };

    // Listen for Unity data events
    window.addEventListener('unityData', handleUnityData as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('unityData', handleUnityData as EventListener);
    };
  }, []);

  if (!data) {
    return (
      <Card className="w-64 p-4 text-center">
        <p className="text-gray-500">No interactions yet</p>
      </Card>
    );
  }

  const { clickCount, position, timestamp } = data;

  return (
    <Card className="w-64 p-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Clicks:</span>
          <span className="font-medium">{clickCount}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Position:</span>
          <span className="font-medium">
            ({position.x.toFixed(1)}, {position.y.toFixed(1)}, {position.z.toFixed(1)})
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Time:</span>
          <span className="font-medium">{timestamp}</span>
        </div>
      </div>
    </Card>
  );
};

export default TestDisplay;