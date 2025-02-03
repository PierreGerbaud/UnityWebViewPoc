using UnityEngine;
using System.Runtime.InteropServices;

public class WebViewBridge : MonoBehaviour
{
    private static WebViewBridge instance;
    public static WebViewBridge Instance
    {
        get
        {
            if (instance == null)
            {
                // First try to find an existing instance
                instance = FindFirstObjectByType<WebViewBridge>();
                
                // Only create if none exists
                if (instance == null)
                {
                    Debug.Log("Creating new WebViewBridge instance");
                    var go = new GameObject("WebViewBridge");
                    instance = go.AddComponent<WebViewBridge>();
                    DontDestroyOnLoad(go);
                }
            }
            return instance;
        }
    }

    // Import JavaScript function for WebGL
    [DllImport("__Internal")]
    private static extern void SendDataToReact(string jsonData);

    public void SendTestData(TestData data)
    {
        if (data == null) return;
        
        string json = JsonUtility.ToJson(data);
        
        #if UNITY_WEBGL && !UNITY_EDITOR
            // In WebGL build, send to browser
            SendDataToReact(json);
        #else
            // In editor or other platforms, just log
            Debug.Log($"Would send to WebView: {json}");
        #endif
    }
}