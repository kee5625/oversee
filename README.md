# Corpus
The fastest pdf-analyzer tool.

# How to setup:

## Building:
- cd corpus-tauri/src-tauri
- cargo build

## Downloading pdfium.dll:
- go to https://github.com/bblanchon/pdfium-binaries/releases/tag/chromium%2F7665
- download "pdfium-win-x64.tgz"
- extract to downloads
- go to Downloads\pdfium-win-x64\bin
- copy "pdfium.dll"
- paste the file into (wherever corpus is) Corpus\corpus-tauri\src-tauri\target\debug

## Running it locally

- cd corpus-tauri
- npm i
- npm run tauri dev
