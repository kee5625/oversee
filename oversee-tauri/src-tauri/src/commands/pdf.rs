use base64::prelude::*;
use once_cell::sync::Lazy;
use pdfium_render::prelude::*;
use serde::{Deserialize, Serialize};
use std::io::Cursor;
use std::path::Path;
use std::sync::{Arc, Mutex};


#[derive(Debug, Serialize)]
pub struct PdfInfo {
    pub path: String,
    pub page_count: usize,
    pub current_page: usize,
}

#[derive(Debug, Serialize)]
pub struct RenderedPage {
    pub image_data: String,
    pub width: u32,
    pub height: u32,
    pub page_num: usize,
}

#[derive(Debug, Deserialize)]
pub struct RenderOptions {
    pub page_num: usize,
    pub dpi: Option<f32>,
}

const DEFAULT_DPI: f32 = 150.0;

pub struct PdfManager {
    pdfium: Pdfium,
}

impl PdfManager {
    pub fn new() -> Result<Self, String> {
        let pdfium = Pdfium::default();

        Ok(PdfManager { pdfium })
    }

    pub fn get_pdf_info(&self, path: &str) -> Result<PdfInfo, String> {
        let document = self
            .pdfium
            .load_pdf_from_file(Path::new(path), None)
            .map_err(|e| format!("Failed to load PDF: {}", e))?;

        Ok(PdfInfo {
            path: path.to_string(),
            page_count: document.pages().len() as usize,
            current_page: 0,
        })
    }

    pub fn render_page(
        &self,
        path: &str,
        page_num: usize,
        dpi: Option<f32>,
    ) -> Result<RenderedPage, String> {
        let document = self
            .pdfium
            .load_pdf_from_file(Path::new(path), None)
            .map_err(|e| format!("Failed to load PDF: {}", e))?;

        let page = document
            .pages()
            .get(page_num as u16)
            .map_err(|e| format!("Failed to get page {}: {}", page_num, e))?;
        
        println!("=============== Page {} ===============", page_num);
        println!("{}", page.text().unwrap().all());

        let scale_factor = dpi.unwrap_or(DEFAULT_DPI) / 72.0;
        let render_config =
            PdfRenderConfig::new().set_target_width((page.width().value * scale_factor) as i32);

        let image = page
            .render_with_config(&render_config)
            .map_err(|e| format!("Failed to render page: {}", e))?
            .as_image();

        let width = image.width();
        let height = image.height();

        let mut buffer = Vec::new();
        image
            .write_to(&mut Cursor::new(&mut buffer), image::ImageFormat::Png)
            .map_err(|e| format!("Failed to encode image: {}", e))?;

        let base64_data = BASE64_STANDARD.encode(&buffer);

        Ok(RenderedPage {
            image_data: format!("data:image/png;base64,{}", base64_data),
            width,
            height,
            page_num,
        })
    }
}

static PDF_MANAGER: Lazy<Mutex<Option<Arc<PdfManager>>>> = Lazy::new(|| Mutex::new(None));

pub fn initialize_pdfium() -> Result<(), String> {
    let manager = Arc::new(PdfManager::new()?);
    let mut guard = PDF_MANAGER
        .lock()
        .map_err(|e| format!("Lock error: {}", e))?;
    *guard = Some(manager);
    Ok(())
}

pub fn get_pdf_manager() -> Result<Arc<PdfManager>, String> {
    let guard = PDF_MANAGER
        .lock()
        .map_err(|e| format!("Lock error: {}", e))?;
    guard
        .clone()
        .ok_or_else(|| "PDFium not initialized".to_string())
}
