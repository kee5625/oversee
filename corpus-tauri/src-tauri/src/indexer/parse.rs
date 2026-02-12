use pdfium_render::prelude::*;

pub fn parse(self, page_num: usize, page: PdfPage<'_> ){
    println!("=============== Page {} ===============", page_num);
    println!("{}", page.text().unwrap().all());
}
