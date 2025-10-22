# Changelog - UPNG Photopea Offline

## Version 0.0.1 - 2025-10-22

### Changes
- Added local copy of ext.js (811 KB) to js/ folder for PDFJS support
- Updated index.html to use ALL local libraries (pako.js, UPNG.js, UZIP.js, ext.js)
- Uncommented existing local libraries that were previously disabled
- Created backup file: index.html.backup
- Project now works completely offline without internet dependencies

### Libraries Used
- **pako.js** (46 KB) - Compression library (required by ext.js)
- **UPNG.js** (34 KB) - PNG encoding/decoding
- **UZIP.js** (5.2 KB) - ZIP file creation
- **ext.js** (811 KB) - Contains PDFJS for JPG support + other utilities

### Features
- PNG compression and optimization
- JPG support (via PDFJS in ext.js)
- Quality adjustment slider
- Individual file save
- Batch save as ZIP
- Drag and drop interface
- 100% offline functionality
