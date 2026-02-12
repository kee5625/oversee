import React from "react";
import { invoke } from "@tauri-apps/api/core";

interface FileSelectorProps {
  onFileSelected: (path: string) => void;
}

export const FileSelector: React.FC<FileSelectorProps> = ({
  onFileSelected,
}) => {
  const handleOpenFile = async () => {
    try {
      const result = await invoke<string | null>("open_pdf_dialog");
      if (result) {
        onFileSelected(result);
      }
    } catch (error) {
      console.error("Error opening file dialog:", error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-neutral-800">
      <button
        className="px-12 py-4 text-lg font-medium text-white bg-blue-600 border-none rounded-lg cursor-pointer shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md active:shadow-blue-600/20"
        onClick={handleOpenFile}
      >
        Open File
      </button>
    </div>
  );
};
