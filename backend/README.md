# ChocoWorld — Backend

Express + MongoDB (Mongoose) API for Choco World Kosova.

## Stack
- Express 5
- Mongoose 9 (MongoDB)
- JWT auth (`jsonwebtoken`) + bcrypt password hashing (`bcryptjs`)
- `cors`, `dotenv`

## Structure
```
server.js              app entry point
db.js                   Mongoose connection
models/
  User.js               name, email, hashed password, role (admin/staff)
  Product.js             name, slug, category, price, description, ingredients,
                          allergens, image, featured, available
middleware/
  auth.js                protect (JWT) + adminOnly (role check)
  errorHandler.js         centralized error handling (validation/cast/duplicate key)
controllers/
  authController.js       login, me
  productController.js    CRUD + featured + by-slug
routes/
  authRoutes.js
  productRoutes.js
utils/
  asyncHandler.js         wraps async route handlers
  slugify.js              name -> slug
seed.js                   seeds demo products + first admin user
```

## API

| Method | Path                    | Auth        | Description                          |
|--------|-------------------------|-------------|--------------------------------------|
| GET    | `/api/health`            | none        | Health check                         |
| POST   | `/api/auth/login`        | none        | `{ email, password }` -> `{ token, user }` |
| GET    | `/api/auth/me`           | Bearer JWT  | Current user                         |
| GET    | `/api/products`          | none        | List products, optional `?category=` |
| GET    | `/api/products/featured` | none        | Featured products (homepage)         |
| GET    | `/api/products/:slug`    | none        | Single product by slug               |
| POST   | `/api/products`          | admin       | Create product                       |
| PUT    | `/api/products/:id`      | admin       | Update product                       |
| DELETE | `/api/products/:id`      | admin       | Delete product                       |

`category` must be one of: `waffles`, `pancakes`, `crepes`, `cold-drinks`
(matches `frontend/src/lib/categories.js` — keep both in sync if you add
categories).

## Assumptions
- No cart/checkout flow was in the screenshots (it's a view-only digital
  menu), so there are no Order/Cart models — only Users (for admin auth) and
  Products. Easy to extend later if online ordering is needed.
- Two roles exist on `User` (`admin`, `staff`) but only `admin` is currently
  used/enforced; `staff` is reserved for a future read-only admin view.

## Setup
```bash
cd backend
cp .env.example .env      # then edit MONGO_URI / JWT_SECRET / admin creds
npm install
```

Make sure MongoDB is running locally (or point `MONGO_URI` at Atlas/another
instance), then seed demo data + the first admin account:
```bash
npm run seed
```
This creates the products shown in the design and one admin user using
`ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env` (defaults:
`admin@chocoworld.com` / `ChangeMe123!` — change this in `.env` before
seeding in anything beyond local dev).

Run the API:
```bash
npm run dev     # nodemon, auto-restarts
# or
npm start
```

The server listens on `PORT` (default `5000`), matching the frontend's Vite
proxy (`vite.config.js` forwards `/api/*` to `http://localhost:5000`).

## Security notes
- Passwords are hashed with bcrypt (10 salt rounds), never stored/returned in
  plaintext (`toJSON` strips the `password` field).
- JWTs expire after 7 days; `protect` middleware verifies the signature and
  loads the current user on every request.
- `adminOnly` middleware gates all product mutation routes.
- Set a long, random `JWT_SECRET` in production — never commit `.env`.
