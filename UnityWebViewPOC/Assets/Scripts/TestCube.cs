using UnityEngine;

public class TestCube : MonoBehaviour
{
    [SerializeField] private WebViewBridge webViewBridge;
    private static int clickCount = 0;

    private void Start()
    {
        // Find reference if not set in inspector
        if (webViewBridge == null)
        {
            webViewBridge = FindFirstObjectByType<WebViewBridge>();
            if (webViewBridge == null)
            {
                Debug.LogError("No WebViewBridge found in scene!");
            }
        }
    }

    private void OnMouseDown()
    {
        if (webViewBridge == null) return;

        // Create test data
        var testData = new TestData
        {
            clickCount = ++clickCount,
            position = transform.position,
            timestamp = System.DateTime.Now.ToString("HH:mm:ss")
        };
        
        // Send to bridge
        webViewBridge.SendTestData(testData);
        
        // Visual feedback
        transform.Rotate(0, 45, 0);
    }
}