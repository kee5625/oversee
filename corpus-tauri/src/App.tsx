import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { FileSelector, PDFViewer } from "./components";

const INITIAL_WIDTH = 800;
const INITIAL_HEIGHT = 600;
const VIEWER_WIDTH = 1200;
const VIEWER_HEIGHT = 900;

function App() {
  const [filePath, setFilePath] = useState<string | null>(null);

  const handleFileSelected = async (path: string) => {
    setFilePath(path);
    // Resize window when PDF is opened
    try {
      await invoke("resize_window", {
        width: VIEWER_WIDTH,
        height: VIEWER_HEIGHT,
      });
    } catch (error) {
      console.error("Failed to resize window:", error);
    }
  };

  const handleClose = async () => {
    setFilePath(null);
    // Resize window back to initial size
    try {
      await invoke("resize_window", {
        width: INITIAL_WIDTH,
        height: INITIAL_HEIGHT,
      });
    } catch (error) {
      console.error("Failed to resize window:", error);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {filePath ? (
        <PDFViewer filePath={filePath} onClose={handleClose} />
      ) : (
        <FileSelector onFileSelected={handleFileSelected} />
      )}
    </div>
  );
}

export default App;
