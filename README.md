## What is this about?

After working with Unity, I've quickly ran into painful work when working on the UI part of my games. Unity is great to handle 3D and actual gameplay, but the menus, shops, upgrade menus, currency flows... don't really require it. 

This is a proof of concept of including a Unity scene inside of a Webview, and ensuring both can properly communicate.

This could be modified to also work for mobile apps using Unity iOS/Android builds instead of WebGL. 


# Unity-React Integration POC Summary

## Overview
This POC demonstrates bidirectional communication between a Unity WebGL game and a React application. The Unity side contains a simple interactive cube that can be clicked to rotate, and the React side displays game state and can change the cube's color.

## Key Takeaways
- Bidirectional communication is possible
- Unity WebGL works well with React
- TypeScript ensures type safety
- Event-based communication is reliable
- Good foundation for more complex features

## Project Structure

### Unity Project Setup
1. Create a new Unity project

2. Create a basic scene with:
   - A cube in the center
   - Camera positioned to view the cube

3. Required scripts:
TestData.cs - Shared data structure

4. Scene setup:
   - Create an empty GameObject named "WebViewBridge"
   - Attach WebViewBridge script to it
   - Attach TestCube script to the cube
   - Reference WebViewBridge in TestCube's inspector

5. Create JavaScript plugin:
Assets/Plugins/WebGL/unityBridge.jslib

6. Build settings:
   - Switch platform to WebGL
   - Set Compression Format to "Disabled"
   - Build to public/unity/Build/ in React project

### React Project Setup
1. Create new Next.js project:
```bash
npx create-next-app@latest unity-react-poc
cd unity-react-poc
```

2. Install required components:
```bash
npx shadcn@latest init
npx shadcn@latest add card
npx shadcn@latest add button
```

3. Required components:
src/components/UnityLoader.tsx

## Communication Flow
1. Unity to React:
   - Click cube → TestCube.OnMouseDown
   - WebViewBridge.SendTestData → jslib SendDataToReact
   - window.unityDataCallback → CustomEvent
   - React TestDisplay updates state

2. React to Unity:
   - Click button → handleColorChange
   - window.sendToUnity → Unity SendMessage
   - TestCube.SetRandomColor updates material

## Running the POC
1. Build Unity project to `public/unity/Build/`

2. Start Next.js development server:
```bash
npm run dev
```
3. Open http://localhost:3000
4. Test:
   - Click cube to see it rotate and update stats
   - Click "Change Cube Color" to randomize cube color
