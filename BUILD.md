# Build & Run Guide

This repository contains the React component library, a demo app, and the MkDocs documentation site.
Use this guide to set up a local workstation and verify changes before publishing.

## 1. Prerequisites

- Node.js 20.19+ or 22.12+ and npm 10+
- For the documentation site: Python 3.9+ with `pip`

## 2. Install Dependencies

```bash
npm install
```

This installs the library dependencies. The demo app has its own dependency tree under `example/`.

## 3. Build the Library

```bash
npm run build
```

- Runs `microbundle-crl` to build the component library
- Outputs the distributable package under `dist/`
- Add `npm run start` to watch for changes during development

## 4. Run Quality Gates

- **Complete test pipeline:** `npm test`
- **Unit tests only:** `npm run test:unit`
- **Linting only:** `npm run test:lint`
- **Build only:** `npm run build`

These should be clean before submitting changes or publishing.

## 5. Run the Demo Application

The demo showcases three interactive examples:

1. **Address Form** – Complete address collection workflow
2. **Events Showcase** – Real-time event logger with all 14 events
3. **Playground** – Test all configuration options

### Steps:

1. Update the API key in `example/src/config.js`. The checked-in key is for demos only and may be throttled.
2. Start the dev server:
   ```bash
   cd example
   npm install
   npm start      # serves the demo on http://localhost:3000
   ```
3. The demo links to the library in the parent directory. After changing the library source, run `npm run build` from the repository root; Vite will then reload the linked output.

## 6. Preview / Build the Documentation Site

The docs live under `docs-site/` and use MkDocs Material.

```bash
cd docs-site

# Create virtual environment (first time only)
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Live preview at http://127.0.0.1:8000
mkdocs serve

# Or build static site into site/ directory
mkdocs build
```

## 7. Publishing

### Library

1. Ensure `npm run build` output is up to date
2. Update version in `package.json` if needed
3. From the repo root:
   ```bash
   npm publish --access public
   ```
