# 🛒 QuickCart — Modern eCommerce Platform

A fully responsive, production-ready eCommerce frontend inspired by Amazon, built with React, TypeScript, and Tailwind CSS.

![QuickCart](https://img.shields.io/badge/QuickCart-eCommerce-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)

---

## ✨ Features

### 🏠 Home Page
- **Hero Banner** — Animated promotional carousel with category badges
- **Category Cards** — Amazon-style 4-up grid cards for quick browsing
- **Today's Deals** — Highlighted discounted products
- **Best Sellers** — Top-rated products section
- **Featured Products** — Curated product listings

### 🔍 Search & Navigation
- **Smart Search Bar** — Real-time suggestions with product thumbnails, prices, and keyboard navigation (Arrow keys + Enter)
- **Category Filtering** — Browse by Electronics, Fashion, Home & Kitchen, Sports, Beauty, Books, Grocery, and Toys
- **Breadcrumb Navigation** — Contextual breadcrumbs on product detail pages
- **Category Strip** — Quick-access category links in the navigation bar

### 📦 Product Catalog
- **24 Unique Products** — Realistic listings with brands like boAt, Nike, Samsung, Sony, JBL, and more
- **Product Cards** — Image, title, rating stars, price, discount badge, and "Add to Cart" button
- **Wishlist Toggle** — Heart icon on each product card
- **Advanced Filtering** — Filter by category, price range, and customer rating
- **Sorting Options** — Price (low/high), top rated, most reviewed

### 🛍️ Product Detail Page
- **Image Gallery** — Multiple product images with thumbnail selector
- **Detailed Info** — Brand, title, rating, reviews count, price with discount calculation
- **Key Features List** — Bullet-pointed product highlights
- **Delivery Info** — FREE delivery, return policy, secure transaction badges
- **Buy Box** — Sticky sidebar with stock status, "Add to Cart" and "Buy Now" buttons
- **Related Products** — Recommendations from the same category (no duplicates)

### 🛒 Cart & Checkout
- **Cart Drawer** — Slide-in cart panel with quantity controls and item removal
- **Multi-Step Checkout** — 4-step flow: Address → Payment → Review → Confirmation
- **Order Summary** — Real-time price calculation with subtotal and total
- **Form Validation** — Required field validation with user feedback via toasts

### 🔐 Authentication
- **Sign In / Sign Up Tabs** — Animated tab interface with smooth transitions
- **Social Login UI** — Google sign-in button (UI only)
- **Input Validation** — Email format and password length checks
- **Session Persistence** — User session stored in localStorage

### 🌗 Theme Support
- **Light & Dark Mode** — Full theme toggle with system preference detection
- **Semantic Tokens** — All colors use CSS custom properties for consistent theming
- **Amazon-Inspired Palette** — Navy (#131921) navigation, Amber (#FF9900) accents

### 📱 Responsive Design
- **Mobile-First** — Optimized layouts for all screen sizes
- **Collapsible Filters** — Mobile-friendly filter panel with overlay
- **Hamburger Menu** — Mobile navigation with slide-in menu
- **Adaptive Grid** — 1-column (mobile), 2-column (tablet), 3-4 column (desktop)

### 📄 Additional Pages
- **About** — Company information page
- **Contact** — Contact form and details
- **FAQ** — Categorized accordion-style questions and answers
- **404 Page** — Custom "Not Found" page with navigation back

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework with hooks and context |
| **TypeScript** | Type-safe development |
| **Vite 5** | Fast build tool and dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **React Router 6** | Client-side routing |
| **Radix UI** | Accessible UI primitives (via shadcn/ui) |
| **Lucide React** | Icon library |
| **TanStack Query** | Data fetching and caching |
| **Vitest** | Unit testing framework |

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── Navbar.tsx        # Main navigation with search
│   ├── Footer.tsx        # Site footer
│   ├── ProductCard.tsx   # Product display card
│   ├── CartDrawer.tsx    # Shopping cart drawer
│   └── AuthModal.tsx     # Login/signup modal
├── context/             # React contexts
│   ├── AuthContext.tsx   # Authentication state
│   ├── CartContext.tsx   # Shopping cart state
│   └── ThemeContext.tsx  # Light/dark theme state
├── data/
│   └── products.ts      # Product catalog data
├── hooks/               # Custom React hooks
├── pages/               # Route page components
│   ├── Index.tsx         # Home page
│   ├── Products.tsx      # Product listing with filters
│   ├── ProductDetail.tsx # Single product view
│   ├── Checkout.tsx      # Checkout flow
│   ├── About.tsx         # About page
│   ├── Contact.tsx       # Contact page
│   ├── FAQ.tsx           # FAQ page
│   └── NotFound.tsx      # 404 page
└── lib/
    └── utils.ts          # Utility functions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd quickcart

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

### Run Tests

```bash
npm run test
```

---

## 📜 Routes

| Route | Page |
|---|---|
| `/` | Home page |
| `/products` | Product listing |
| `/products?category=electronics` | Filtered by category |
| `/products?search=query` | Search results |
| `/product/:id` | Product detail |
| `/checkout` | Checkout flow |
| `/about` | About page |
| `/contact` | Contact page |
| `/faq` | FAQ page |

---

## 👤 Owner

**This website is owned by Madhuri Sontakke**

---

