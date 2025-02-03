"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

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

interface UnityEvent extends CustomEvent {
  detail: UnityData;
}

declare global {
  interface WindowEventMap {
    'unityData': UnityEvent;
  }
  interface Window {
    sendToUnity: (objectName: string, methodName: string, parameter: string) => void;
  }
}

const TestDisplay = () => {
  const [data, setData] = useState<UnityData | null>(null);

  useEffect(() => {
    const handleUnityData = (event: UnityEvent): void => {
      setData(event.detail);
    };

    window.addEventListener('unityData', handleUnityData);
    return () => {
      window.removeEventListener('unityData', handleUnityData);
    };
  }, []);

  const handleColorChange = (): void => {
    const randomColor = '#' + Math.floor(Math.random()*16777215)
      .toString(16)
      .padStart(6, '0');
    window.sendToUnity('TestCube', 'SetRandomColor', randomColor);
  };

  return (
    <div className="space-y-4">
      <Card className="w-64 p-4">
        <Button 
          onClick={handleColorChange}
          className="w-full mb-4"
          variant="outline"
        >
          Change Cube Color
        </Button>

        {data ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Clicks:</span>
              <span className="font-medium">{data.clickCount}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Position:</span>
              <span className="font-medium">
                ({data.position.x.toFixed(1)}, {data.position.y.toFixed(1)}, {data.position.z.toFixed(1)})
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{data.timestamp}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No interactions yet</p>
        )}
      </Card>
    </div>
  );
};

export default TestDisplay;