# Elijah Farewell Services

Production Next.js 14 website for a Nairobi funeral-services provider.

## Local setup

1. Use Node 20.11.0 (`nvm use`).
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and provide service credentials.
4. Run `npm run dev`.

Forms use Google reCAPTCHA server verification, Nodemailer, Vercel KV, and (for memorial images) Vercel Blob. During local development, CAPTCHA and outbound email are safely bypassed when credentials are absent. Production requests fail closed if CAPTCHA or storage is not configured.

## Routes

Public pages: `/`, `/services/[slug]`, `/pre-planning`, `/memorials`, `/memorials/[id]`, `/grief-support`, `/about`, `/contact`, `/legal/privacy-policy`, `/legal/terms`, and `/legal/cookie-policy`.

APIs: `/api/enquiry`, `/api/pre-plan`, `/api/memorial`, `/api/memorials/[id]`, `/api/candle`, `/api/grief-resources`, `/api/newsletter`, `/api/contact`, and `/api/captcha`.

Private memorial detail URLs are intentionally excluded from the sitemap and blocked in `robots.txt`.
