use pdfium_render::prelude::*;

pub struct Parse{
    pdfium: Pdfium,
}

impl Parse {
    pub fn new() -> Result<Self, String> {
        let pdfium = Pdfium::default();

        Ok(Parse{ pdfium })
    }
    
    pub fn parse(self, page_num: usize, page: PdfPage<'_> ){
        println!("=============== Page {} ===============", page_num);
        println!("{}", page.text().unwrap().all());
    }
}
