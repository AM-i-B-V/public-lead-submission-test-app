# Sales Leads Widget Test App

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📋 Environment Variables

### Development (.env)

```
VITE_SITE_KEY=xyxyxyxy
VITE_API_ENDPOINT=http://localhost:56392/api/leads
```

### Production (Cloudflare Pages)

Configured in Cloudflare Pages dashboard:

- `VITE_SITE_KEY`
- `VITE_API_ENDPOINT` (production URL)

## 🏗️ Tech Stack

- **Build Tool:** Vite 7.0.0
- **Language:** Vanilla JavaScript (ES modules)
- **Deployment:** Cloudflare Pages
- **CI/CD:** GitHub Actions

## 📁 Project Structure

```
├── index.html          # Entry point
├── index.js            # Main application logic
├── style.css           # Styles
├── vite.config.js      # Vite configuration
├── wrangler.jsonc      # Cloudflare configuration
└── .github/workflows/  # CI/CD workflows
```

## 📝 Notes

- Custom domain configured in Cloudflare Pages
- Environment variables managed through Cloudflare Pages dashboard
- CI/CD pipeline uses Wrangler for deployment
