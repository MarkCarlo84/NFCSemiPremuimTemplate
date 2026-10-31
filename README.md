# Premium NFC Digital Identity Website

> A bespoke, luxury digital business card and editorial identity website engineered for physical NFC business cards, high-profile executives, architects, creative directors, founders, and personal brands.

![Theme](https://img.shields.io/badge/Themes-5%20Art--Directed%20Presets-c5a059)
![Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind%20CSS-blue)
![Deployment](https://img.shields.io/badge/Deploy-Vercel%20Ready-black)
![NFC](https://img.shields.io/badge/NFC-Physical%20Card%20Compatible-emerald)

---

## 🌟 Visual & Architectural Highlights

- **Luxury Editorial Direction**: Inspired by Architectural Digest, Vogue, and Swiss high horology monographs. Built with generous whitespace, crisp typography, and cinematic lighting treatments.
- **5 Art-Directed Themes**:
  1. **Obsidian Luxury**: Deep black, crisp white, and muted metallic champagne accents.
  2. **Ivory Editorial**: Warm cream parchment, rich espresso text, and refined serif typography.
  3. **Modern Executive**: Prestige navy, slate tones, and electric sapphire accents for boardroom leaders.
  4. **Creative Atelier**: Avant-garde dark slate, sculptural terracotta accents, and modern sans typography.
  5. **Signature Brand**: 100% custom hex colors, border styling, and font pairings.
- **Real-Time Interactive Theme Switcher**: A floating preview dock allows instant switching between all 5 themes without page reload.
- **RFC-Compliant vCard (.vcf) Generator**: Generates clean, downloadable contact cards with name, organization, title, telephone, email, address, and notes that sync straight into iOS Contacts and Android Google Contacts.
- **QR Code & Native Share Suite**: Integrated high-resolution QR generator (`qrcode.react`), native smartphone Web Share API, and one-tap PNG download for physical NFC card printing.
- **Fullscreen Portfolio Lightbox**: Interactive gallery modal with keyboard navigation (`Esc`, `←`, `→`), zoom states, project categories, and commission metadata.
- **Subtle Haptics & Audio Synthesis**: Zero-dependency Web Audio API harmonic chimes on user actions (Save Contact, Copy, Share) with an ambient mute toggle.
- **Confetti Micro-Celebration**: Elegant champagne-gold burst (`canvas-confetti`) when contacts are downloaded.
- **Dynamic Studio Clock**: Displays the live operating time of the client's headquarters (e.g. Zurich / Paris CET).
- **Mobile-First NFC Optimization**: Art-directed specifically for 390px+ smartphone screens with zero horizontal overflow and ergonomic tap zones.

---

## 📁 Project Architecture

```
c:/NFCPremiumTemplate/
├── public/
│   └── images/
│       ├── portrait.jpg         # Primary editorial portrait
│       ├── villa.jpg            # Architectural project 1
│       ├── penthouse.jpg        # Architectural project 2
│       └── monograph.jpg        # Brand identity project 3
├── src/
│   ├── config/
│   │   └── profile.config.ts    # ⭐ SINGLE SOURCE OF TRUTH for client personalization
│   ├── types/
│   │   └── profile.ts           # Strict TypeScript contracts & theme interfaces
│   ├── utils/
│   │   ├── vcard.ts             # RFC 2426/6350 vCard generation & download engine
│   │   └── audio.ts             # Web Audio API luxury synthesizer
│   ├── components/
│   │   ├── HeaderNav.tsx        # Minimal top bar (sound toggle, share, sticky save)
│   │   ├── HeroSection.tsx      # High-impact editorial hero with status badge
│   │   ├── QuickContactActions.tsx # Direct phone, email, WhatsApp, and copy buttons
│   │   ├── AboutSection.tsx     # Pull quote, dual-column bio, milestones, expertise
│   │   ├── ServicesSection.tsx  # Bespoke commission offerings and pricing
│   │   ├── PortfolioSection.tsx # Filterable masonry gallery
│   │   ├── LightboxModal.tsx    # Fullscreen image viewer with keyboard navigation
│   │   ├── ContactDetailsSection.tsx # Studio clock, address, and Cal.com appointment booking
│   │   ├── SocialMediaSection.tsx # Verified social channels with custom SVG icons
│   │   ├── ShareModal.tsx       # QR code generator, native share, copy URL
│   │   ├── ToastNotification.tsx # Sleek floating feedback toast
│   │   ├── ThemeSwitcher.tsx    # Floating dock for switching the 5 luxury themes
│   │   └── Footer.tsx           # Copyright, NFC emulation badge, back-to-top
│   ├── styles/
│   │   └── themes.css           # CSS custom properties for all 5 color themes
│   ├── App.tsx                  # Master application container
│   ├── index.css                # Tailwind CSS v4 directives & custom utilities
│   └── main.tsx                 # React DOM bootstrap
├── vercel.json                  # One-click Vercel routing & caching configuration
├── package.json
└── vite.config.ts
```

---

## 🛠️ How to Customize for a New Client

To customize the website for any executive, architect, consultant, or brand, edit only:
👉 **`src/config/profile.config.ts`**

### 1. Identity & Biography
```typescript
name: 'Elena Vance',
credentials: 'M.Arch, RIBA, SIA',
title: 'Principal Architect & Creative Director',
company: 'VANCE & ATELIER',
tagline: 'Sculpting timeless spatial environments and bespoke luxury identities.',
shortBio: 'Your concise 2-sentence introduction...',
fullBio: 'Your detailed background, philosophy, and history...',
brandStatement: '“True luxury is not excess; it is the absolute mastery of proportion...”',
```

### 2. Images
Place high-resolution images in `public/images/` and reference them:
```typescript
avatarUrl: '/images/portrait.jpg',
coverUrl: '/images/villa.jpg',
location: 'Zurich, Switzerland · Paris, France',
```

### 3. Contact & Direct Touchpoints
```typescript
contact: {
  phone: '+41 44 215 8890',
  email: 'elena@vance-atelier.ch',
  whatsapp: '+41442158890',
  website: 'https://vance-atelier.ch',
  address: 'Gotthardstrasse 26, 8002 Zürich',
  cityCountry: 'Zürich, Switzerland',
  timezone: 'CET (UTC+1)',
  calendarUrl: 'https://cal.com/elena-vance/private-consultation',
}
```
*Note: Any field left empty or omitted will automatically be excluded from the contact buttons and vCard.*

### 4. Choosing the Default Theme
Set `defaultTheme` to any of the 5 art-directed presets:
```typescript
defaultTheme: 'obsidian', // 'obsidian' | 'ivory' | 'executive' | 'atelier' | 'signature'
```

### 5. Services & Pricing Tiers
Add, update, or remove services:
```typescript
services: [
  {
    id: 'service-1',
    title: 'Architectural Master Design & Commission',
    description: 'End-to-end principal architectural design for bespoke private estates...',
    startingPrice: 'From €120,000 / project',
    ctaText: 'Inquire Commission',
    ctaUrl: 'mailto:elena@vance-atelier.ch?subject=Architectural%20Commission',
    featured: true,
  },
]
```

### 6. Portfolio Showcase
```typescript
portfolio: [
  {
    id: 'proj-1',
    title: 'Villa Cap-Ferrat Cantilever',
    category: 'Residential Architecture',
    description: 'Monolithic concrete and glass residence perched on the Saint-Jean-Cap-Ferrat cliffs...',
    image: '/images/villa.jpg',
    year: '2025',
    client: 'Private Family Trust',
  },
]
```

### 7. Section Visibility
Toggle any section off if the client doesn't need it:
```typescript
sectionVisibility: {
  hero: true,
  quickContact: true,
  about: true,
  services: true,
  portfolio: true,
  contactDetails: true,
  socialMedia: true,
}
```

---

## 📡 Physical NFC Card Setup

1. **Deploy the website** to Vercel (e.g. `https://elena-vance.vercel.app` or your custom domain `https://card.vance-atelier.ch`).
2. Purchase an **NTAG213, NTAG215, or NTAG216** blank physical card (PVC, bamboo, matte metal, or wood).
3. On your smartphone, install a free NFC programming utility such as:
   - **NFC Tools** (iOS App Store / Google Play)
   - **TagWriter by NXP**
4. Open the app → Tap **Write** → **Add a record** → **URL / URI**.
5. Paste your deployed Vercel URL (e.g. `https://card.vance-atelier.ch`).
6. Tap **Write** and touch the physical card to the top-back of your smartphone.
7. Lock the card write protection if you wish to prevent accidental overwriting.
8. **Test**: Tap the physical card to any modern iPhone (iPhone XS or newer) or Android device — the digital profile will launch instantly in the browser without installing any app!

---

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI (Fastest)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy immediately
vercel
```

### Option 2: GitHub Integration
1. Push this repository to GitHub.
2. Log into [vercel.com](https://vercel.com).
3. Click **Add New Project** and import the repository.
4. Vercel automatically detects the Vite framework and applies the settings from `vercel.json`:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your luxury NFC profile is live with automatic SSL in under 60 seconds!

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ⚖️ License & Ownership
Created for premium private commissions, luxury personal brands, and enterprise client deployments.
