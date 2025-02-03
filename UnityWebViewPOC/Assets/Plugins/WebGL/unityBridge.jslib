mergeInto(LibraryManager.library, {
    SendDataToReact: function(jsonPtr) {
        var jsonStr = UTF8ToString(jsonPtr);
        // Call the global callback function we defined in index.html
        window.unityDataCallback(jsonStr);
    }
});