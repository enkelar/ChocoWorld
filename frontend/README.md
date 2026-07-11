# ChocoWorld — Frontend

React + Vite frontend for Choco World Kosova, styled to match the provided
design screenshots (chocolate / cream / caramel / gold palette).

## Stack
- React 19 + React Router DOM v7 (client-side routing)
- Plain CSS per component (no Tailwind), matching the project's existing convention
- Fetch-based API client talking to the Express backend via the `/api` Vite proxy

## Structure
```
src/
  App.jsx                 routes
  Choco.css                global theme (colors, typography, buttons)
  context/AuthContext.jsx  admin auth (JWT stored in localStorage)
  hooks/useProducts.js      data-fetching hooks
  lib/api.js               fetch wrapper (auto-attaches JWT)
  lib/categories.js         fixed category list (waffles, pancakes, crêpes, cold drinks)
  components/
    layout/                Nav, Footer, Layout (shared shell)
    sections/               Hero, Featured (Signature Series), Story (About), Contact
    menu/                    CategoryCard, ProductCard, ProductGrid
    shared/                  Loading/Empty states
    routing/ProtectedRoute.jsx
    AdminProductForm.jsx     reused by the admin dashboard (add/edit)
  pages/
    main/                    Home, Menu, CategoryView, ItemView
    admin/                   AdminAuth (login), AdminDashboard (CRUD)
```

## Assumptions / notes
- No real product photography was supplied, so `src/assets/placeholder-*.svg`
  gradient placeholders stand in for the hero and menu images. Swap in real
  photos (or let the backend `image` URL field point at real product photos)
  whenever you have them — components already prefer `product.image` when set.
- Categories are hard-coded to the four shown in the design (waffles, pancakes,
  crêpes, cold drinks) and must match the backend's `Product.category` enum.
- The `/admin` route is protected; unauthenticated visitors are redirected to
  `/admin/login`.

## Setup
```bash
cd frontend
npm install
npm run dev
```

The dev server proxies `/api/*` requests to `http://localhost:5000` (see
`vite.config.js`), so run the backend alongside it (see the backend README).

Build for production:
```bash
npm run build
npm run preview
```
