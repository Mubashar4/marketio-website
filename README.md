# Marketio Website

**marketio.net** — AI-native revenue platform for BDR & SDR teams.

Built as a pure static site: HTML + CSS + vanilla JS. No frameworks. No build step required. Designed for GitHub Pages + Cloudflare CDN.

---

## File Structure

```
├── index.html              → Homepage
├── ai-agents/index.html    → AI Agents product page
├── gtm-services/index.html → GTM Services page
├── pricing/index.html      → Pricing page
├── about/index.html        → About page
├── demo/index.html         → Book a Demo page
├── contact/index.html      → Contact page
├── blog/index.html         → Blog (placeholder)
├── careers/index.html      → Careers (placeholder)
├── privacy/index.html      → Privacy Policy
├── terms/index.html        → Terms of Service
├── cookies/index.html      → Cookie Policy
├── acceptable-use/index.html → Acceptable Use Policy
├── security/index.html     → Security page
├── 404.html                → Custom 404 page
│
├── assets/
│   ├── css/main.css        → Full stylesheet (~30KB)
│   ├── js/main.js          → Vanilla JS (~8KB)
│   └── img/favicon.svg     → SVG favicon
│
├── CNAME                   → Custom domain: marketio.net
├── _headers                → Cloudflare/GitHub Pages headers
├── robots.txt              → SEO robots
└── sitemap.xml             → XML sitemap
```

---

## GitHub Pages Deployment

### Step 1: Create GitHub Repository
1. Create a new repo at github.com (e.g. `marketio-website` or `marketio.github.io`)
2. Push all files to the `main` branch

### Step 2: Enable GitHub Pages
1. Go to repo → Settings → Pages
2. Source: Deploy from branch → `main` branch → `/ (root)`
3. Custom domain: `marketio.net`
4. ✅ Check "Enforce HTTPS"

### Step 3: Configure Cloudflare DNS
1. Add your site to Cloudflare
2. Set DNS records:
   ```
   A     @     185.199.108.153   (Proxy: ON ☁️)
   A     @     185.199.109.153   (Proxy: ON ☁️)
   A     @     185.199.110.153   (Proxy: ON ☁️)
   A     @     185.199.111.153   (Proxy: ON ☁️)
   CNAME www   marketio.net      (Proxy: ON ☁️)
   ```
3. SSL/TLS → Full (Strict)
4. Speed → Auto Minify → HTML + CSS + JS ✅
5. Speed → Brotli ✅
6. Speed → HTTP/3 ✅
7. Caching → Cache Rules → Cache Everything for `/assets/*`

---

## Before Going Live: Checklist

- [ ] Replace `YOUR_WEB3FORMS_KEY` in `contact/index.html` with your [Web3Forms](https://web3forms.com) key
- [ ] Update Calendly URL in `assets/js/main.js` (`calendly.com/marketio/demo` → your actual link)
- [ ] Add Google Analytics ID where GTM script loads
- [ ] Replace logo in footer (currently using inline SVG from your brand file)
- [ ] Add real testimonials when available
- [ ] Create `assets/img/og-image.webp` (1200×630px) for social sharing

---

## Brand
- **Primary:** `#f15e18` (orange — logo dot)
- **Dark:** `#1c1c1d` (near-black)
- **Background:** `#0a0a0a`
- **Fonts:** Syne (headings) + Outfit (body) via Google Fonts

## Contact
- support@marketio.net
- privacy@marketio.net
- © 2026 Marketio LLC, Delaware, USA
