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
  SendMessage: (objectName: string, methodName: string, parameter: string) => void;
}

declare global {
  interface Window {
    createUnityInstance: (canvas: HTMLCanvasElement, config: UnityConfig) => Promise<UnityInstance>;
    unityInstance: UnityInstance | null;
    sendToUnity: (objectName: string, methodName: string, parameter: string) => void;
    unityDataCallback?: (jsonData: string) => void;  // Make it optional
  }
}

window.sendToUnity = (objectName: string, methodName: string, parameter: string): void => {
  console.log('Sending to Unity:', { objectName, methodName, parameter });
  if (!window.unityInstance) {
    console.error('Unity instance not ready');
    return;
  }
  try {
    window.unityInstance.SendMessage(objectName, methodName, parameter);
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message to Unity:', error);
  }
};

const UnityLoader = () => {
  useEffect(() => {
    window.unityDataCallback = (jsonData: string): void => {
      const data = JSON.parse(jsonData);
      const event = new CustomEvent('unityData', { detail: data });
      window.dispatchEvent(event);
      console.log('Data received from Unity:', data);
    };

    const initUnity = (): void => {
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

      window.createUnityInstance(canvas, config)
        .then((unityInstance) => {
          window.unityInstance = unityInstance;
          console.log("Unity initialized successfully");
        })
        .catch((error: Error) => {
          console.error("Unity initialization error:", error);
        });
    };

    const loaderScript = document.createElement('script');
    loaderScript.src = '/unity/Build/unity.loader.js';
    loaderScript.onload = initUnity;
    document.body.appendChild(loaderScript);

    return () => {
      if (window.unityInstance) {
        window.unityInstance.Quit();
        window.unityInstance = null;
      }
      window.unityDataCallback = undefined;
    };
  }, 
[]);

  return null;
};

export default UnityLoader;