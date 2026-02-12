use tauri::{AppHandle, Manager};
use tauri_plugin_dialog::DialogExt;

mod commands;
mod indexer;

use commands::pdf::{get_pdf_manager, initialize_pdfium};
use commands::pdf::{PdfInfo, RenderOptions, RenderedPage};

#[tauri::command]
async fn open_pdf_dialog(app: AppHandle) -> Result<Option<String>, String> {
    let file_path = app
        .dialog()
        .file()
        .add_filter("PDF Files", &["pdf"])
        .blocking_pick_file();

    Ok(file_path.map(|p| p.to_string()))
}

#[tauri::command]
async fn get_pdf_info(path: String) -> Result<PdfInfo, String> {
    let manager = get_pdf_manager()?;
    manager.get_pdf_info(&path)
}

#[tauri::command]
async fn render_pdf_page(path: String, options: RenderOptions) -> Result<RenderedPage, String> {
    let manager = get_pdf_manager()?;
    manager.render_page(&path, options.page_num, options.dpi)
}

#[tauri::command]
async fn resize_window(app: AppHandle, width: u32, height: u32) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("main") {
        window
            .set_size(tauri::Size::Logical(tauri::LogicalSize {
                width: width as f64,
                height: height as f64,
            }))
            .map_err(|e| format!("Failed to resize window: {}", e))?;
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Initialize PDFium before starting the app
    if let Err(e) = initialize_pdfium() {
        eprintln!("Warning: Failed to initialize PDFium: {}", e);
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            open_pdf_dialog,
            get_pdf_info,
            render_pdf_page,
            resize_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
