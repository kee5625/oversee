import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

interface PdfInfo {
  path: string;
  page_count: number;
  current_page: number;
}

interface RenderedPage {
  image_data: string;
  width: number;
  height: number;
  page_num: number;
}

interface PDFViewerProps {
  filePath: string;
  onClose: () => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ filePath, onClose }) => {
  const [pdfInfo, setPdfInfo] = useState<PdfInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [renderedPage, setRenderedPage] = useState<RenderedPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPdfInfo();
  }, [filePath]);

  useEffect(() => {
    if (pdfInfo) {
      renderPage(currentPage);
    }
  }, [currentPage, pdfInfo]);

  const loadPdfInfo = async () => {
    try {
      const info = await invoke<PdfInfo>("get_pdf_info", { path: filePath });
      setPdfInfo(info);
    } catch (err) {
      setError("Failed to load PDF information");
      console.error(err);
    }
  };

  const renderPage = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const page = await invoke<RenderedPage>("render_pdf_page", {
        path: filePath,
        options: { page_num: pageNum, dpi: null },
      });
      setRenderedPage(page);
    } catch (err) {
      setError(`Failed to render page ${pageNum + 1}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (pdfInfo && currentPage < pdfInfo.page_count - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-200 dark:bg-neutral-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-neutral-800 border-b border-gray-300 dark:border-neutral-700 shadow-sm">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-neutral-600 rounded-md cursor-pointer transition-all duration-150 hover:bg-gray-100 dark:hover:bg-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500"
          onClick={onClose}
        >
          Close
        </button>

        {/* Page Navigation */}
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border-none rounded-md cursor-pointer transition-all duration-150 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-neutral-600 disabled:cursor-not-allowed"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[120px] text-center">
            Page {currentPage + 1} of {pdfInfo?.page_count || 0}
          </span>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border-none rounded-md cursor-pointer transition-all duration-150 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-neutral-600 disabled:cursor-not-allowed"
            onClick={goToNextPage}
            disabled={!pdfInfo || currentPage >= pdfInfo.page_count - 1}
          >
            Next
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        {loading && (
          <div className="text-base text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-base text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
            {error}
          </div>
        )}
        {renderedPage && !loading && (
          <img
            src={renderedPage.image_data}
            alt={`Page ${currentPage + 1}`}
            className="max-w-full max-h-full shadow-lg bg-white"
          />
        )}
      </div>
    </div>
  );
};
