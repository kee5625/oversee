# Corpus PDF Viewer - TODO List

## Current Implementation (v0.1.0)
- [x] Basic PDF viewing with Rust-based rendering (PDFium)
- [x] File dialog to open PDFs
- [x] Page navigation (Previous/Next)
- [x] Window resizing on open/close
- [x] Clean minimal UI

---

## Phase 1: Enhanced Viewer Features

### Navigation & Display
- [ ] **Zoom Controls**
  - Zoom in/out buttons
  - Zoom percentage display
  - Fit to width/height/page options
  - Mouse wheel zoom support
  - Pinch-to-zoom gesture support
  - Keyboard shortcuts (Ctrl++, Ctrl+-, Ctrl+0)

- [ ] **Page Navigation Enhancements**
  - Jump to specific page input
  - First/Last page buttons
  - Page thumbnails sidebar
  - Continuous scroll mode (infinite scroll)
  - Bookmarks/quick navigation

- [ ] **Rotation**
  - Rotate 90° clockwise/counter-clockwise
  - Auto-rotate based on page orientation
  - Persistent rotation per page

- [ ] **Presentation Mode**
  - Full-screen viewing
  - Slideshow mode with auto-advance
  - Presenter notes support (if available in PDF)

### Search & Text
- [ ] **Search Functionality**
  - Search bar with find/replace UI
  - Highlight all search results
  - Navigate between results (next/previous)
  - Case-sensitive search option
  - Whole word search option
  - Search history

- [ ] **Text Selection**
  - Select and copy text
  - Select text across pages
  - Text-to-speech integration

### Annotations & Markup (Viewer Mode)
- [ ] **Highlighting**
  - Highlight text with colors
  - Underline text
  - Strikethrough text
  - Save/load annotations

- [ ] **Comments & Notes**
  - Add sticky notes to pages
  - Add comments to specific locations
  - Reply to comments
  - Comment threading

- [ ] **Drawing Tools**
  - Freehand drawing
  - Shapes (rectangle, circle, line, arrow)
  - Text boxes
  - Stamps (Approved, Review, etc.)

---

## Phase 2: PDF Editor Features

### Page Manipulation
- [ ] **Page Operations**
  - Delete pages
  - Reorder pages (drag & drop)
  - Rotate pages permanently
  - Crop pages
  - Insert blank pages
  - Duplicate pages

- [ ] **Merge & Split**
  - Merge multiple PDFs
  - Split PDF by pages
  - Split PDF by bookmarks
  - Extract specific pages as new PDF

### Content Editing
- [ ] **Text Editing**
  - Edit existing text
  - Add new text boxes
  - Change font properties (family, size, color)
  - Paragraph formatting

- [ ] **Image Editing**
  - Add images to PDF
  - Resize/move images
  - Replace images
  - Image optimization/compression

- [ ] **Link Editing**
  - Add hyperlinks
  - Edit existing links
  - Add internal page links
  - Add web links

### Advanced Editing
- [ ] **Form Creation & Editing**
  - Create fillable forms
  - Add form fields (text, checkbox, radio, dropdown)
  - Form field properties
  - JavaScript actions for forms

- [ ] **PDF Properties**
  - Edit metadata (title, author, subject, keywords)
  - Set initial view
  - Page layout settings
  - Add security/permissions

- [ ] **Digital Signatures**
  - Add digital signatures
  - Verify signatures
  - Signature appearance customization
  - Certificate management

---

## Phase 3: Advanced Features

### Performance & Optimization
- [ ] **Lazy Loading**
  - Load pages on demand
  - Preload adjacent pages
  - Memory management for large PDFs

- [ ] **Rendering Quality Options**
  - DPI selection (currently 150, make configurable)
  - Anti-aliasing options
  - Color space options (RGB, CMYK)
  - GPU acceleration

### Import/Export
- [ ] **Export Options**
  - Export as images (PNG, JPEG, TIFF)
  - Export specific pages
  - Export text only
  - OCR for scanned PDFs

- [ ] **Import/Convert**
  - Convert images to PDF
  - Convert Office documents to PDF
  - HTML to PDF
  - Markdown to PDF

### Organization & Management
- [ ] **File Management**
  - Recent files list
  - Favorites/bookmarks for files
  - File tagging system
  - Quick access sidebar

- [ ] **Batch Operations**
  - Batch convert files
  - Batch merge PDFs
  - Batch add watermarks
  - Batch compress

### Security
- [ ] **Encryption & Passwords**
  - Password protect PDFs
  - Remove passwords
  - Check password strength
  - Permission settings (print, copy, edit)

- [ ] **Redaction**
  - Permanent redaction tools
  - Redact text, images, or areas
  - Redaction patterns (SSN, email, phone)

---

## Phase 4: Professional Features

### Collaboration
- [ ] **Cloud Integration**
  - Save to cloud storage (Google Drive, Dropbox, OneDrive)
  - Sync annotations across devices
  - Share PDFs with links
  - Collaborative commenting

- [ ] **Version Control**
  - Track document versions
  - Compare PDF versions
  - Show differences between versions
  - Revert to previous version

### Specialized Tools
- [ ] **Measurement Tools**
  - Distance measurement
  - Area measurement
  - Perimeter measurement
  - Calibrate scale

- [ ] **Architectural/Engineering Features**
  - Layer management
  - CAD drawing support
  - 3D model viewing (if supported by PDF)

- [ ] **Accessibility**
  - Screen reader support
  - Tagged PDF support
  - Alt text for images
  - Reading order settings
  - High contrast mode

### Automation
- [ ] **Macros & Scripts**
  - Record and replay actions
  - Batch processing scripts
  - Plugin system
  - API for external tools

- [ ] **AI Integration**
  - Smart text extraction
  - Auto-generate summaries
  - Content classification
  - Auto-tagging

---

## Phase 5: Platform Integration

### Desktop Integration
- [ ] **System Integration**
  - Set as default PDF viewer
  - Shell extensions (right-click menu)
  - Print integration
  - Drag & drop files
  - Command line interface

- [ ] **Multi-Monitor Support**
  - Multi-window viewing
  - Split view (side-by-side comparison)
  - Presenter view on secondary monitor

### Mobile/Tablet Support
- [ ] **Touch Optimization**
  - Touch gestures (swipe to navigate)
  - Touch-friendly UI
  - Stylus support
  - iOS/Android apps (via Tauri mobile)

### Browser Extension
- [ ] **Web Integration**
  - Browser extension for opening PDFs
  - View PDFs from URLs
  - Web annotation sync

---

## Technical Improvements

### Architecture
- [ ] **Plugin System**
  - Plugin API
  - Plugin marketplace
  - Custom renderer plugins

- [ ] **Settings Management**
  - User preferences
  - Customizable keyboard shortcuts
  - Theme customization
  - Layout presets

### Performance
- [ ] **Optimization**
  - WebAssembly for rendering
  - Worker threads for heavy operations
  - Caching system
  - Progressive loading

### Testing & Quality
- [ ] **Testing**
  - Unit tests
  - Integration tests
  - E2E tests
  - Performance benchmarks
  - Accessibility audits

---

## Notes

### Priority Guidelines
- **High**: Core functionality, stability, performance
- **Medium**: User experience improvements, common features
- **Low**: Nice-to-have, advanced features, platform extensions

### Current Technical Stack
- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Rust, Tauri 2
- **PDF Engine**: PDFium (Google Chrome's PDF engine)
- **Build**: Cargo, npm

### Next Steps (Immediate)
1. Add zoom controls
2. Add search functionality
3. Add thumbnail sidebar
4. Add text selection and copying
5. Add save/load recent files

### Future Considerations
- Consider using multiple PDF engines for different use cases
- Evaluate need for server-side processing for heavy operations
- Consider WebGPU for rendering acceleration
- Plan for mobile deployment with Tauri v2 mobile support