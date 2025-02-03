"use client";

import { useEffect } from 'react';

interface UnityConfig {
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
}

interface UnityInstance {
  Quit: () => void;
}

declare global {
  interface Window {
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      config: UnityConfig
    ) => Promise<UnityInstance>;
    unityInstance: UnityInstance | null;
    unityDataCallback: (jsonData: string) => void;
  }
}

export default function UnityLoader() {
  useEffect(() => {
    console.log('UnityLoader mounted');
    
    const initUnity = () => {
      console.log('Starting Unity initialization...');
      if (typeof window.createUnityInstance === 'undefined') {
        console.error('createUnityInstance not found');
        return;
      }

      const buildUrl = "/unity/Build";
      const config: UnityConfig = {
        dataUrl: buildUrl + "/unity.data",
        frameworkUrl: buildUrl + "/unity.framework.js",
        codeUrl: buildUrl + "/unity.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "UnityWebViewPOC",
        productVersion: "0.1"
      };

      const container = document.querySelector("#unity-container");
      console.log('Unity container found:', !!container);

      if (!container) {
        console.error('Unity container not found!');
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.id = 'unity-canvas';
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.background = '#888';
      container.appendChild(canvas);

      console.log('Canvas created and added to container');

      window.createUnityInstance(canvas, config)
        .then((instance) => {
          window.unityInstance = instance;
          console.log("Unity initialized successfully");
        })
        .catch((error: Error) => {
          console.error("Unity initialization error:", error);
          console.error("Browser information:", navigator.userAgent);
        });
    };

    // Set up the Unity callback
    window.unityDataCallback = (jsonData: string) => {
      const data = JSON.parse(jsonData);
      const event = new CustomEvent('unityData', { detail: data });
      window.dispatchEvent(event);
      console.log('Data received from Unity:', data);
    };

    // Initialize Unity after the Unity loader script is ready
    const loaderScript = document.createElement('script');
    loaderScript.src = '/unity/Build/unity.loader.js';
    loaderScript.onload = initUnity;
    document.body.appendChild(loaderScript);

    // Cleanup
    return () => {
      if (window.unityInstance) {
        window.unityInstance.Quit();
      }
    };
  }, []);

  return null;
}