using UnityEngine;

public class TestCube : MonoBehaviour
{
    [SerializeField] private WebViewBridge webViewBridge;
    private static int clickCount = 0;
    private MeshRenderer meshRenderer;

    private void Start()
    {
        meshRenderer = GetComponent<MeshRenderer>();
        
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

        var testData = new TestData
        {
            clickCount = ++clickCount,
            position = transform.position,
            timestamp = System.DateTime.Now.ToString("HH:mm:ss")
        };
        
        webViewBridge.SendTestData(testData);
        transform.Rotate(0, 45, 0);
    }

    public void SetRandomColor(string colorHex)
    {
        Debug.Log($"Received color change request: {colorHex}");
        if (meshRenderer == null)
        {
            Debug.LogError("MeshRenderer not found");
            return;
        }

        if (ColorUtility.TryParseHtmlString(colorHex, out Color newColor))
        {
            meshRenderer.material.color = newColor;
            Debug.Log($"Changed cube color to {colorHex}");
        }
        else
        {
            Debug.LogError($"Invalid color format: {colorHex}");
        }
    }
}