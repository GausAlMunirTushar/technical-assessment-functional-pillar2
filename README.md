# Technical Assessment - Pillar 2

Functional e-commerce dashboard built with Next.js App Router, Auth.js v5, Zustand, Tailwind CSS, and an internal mock API.

## Setup

Install dependencies:

```bash
pnpm install
```

Run the local development server:

```bash
pnpm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=nextauth-secret
GOOGLE_CLIENT_ID=google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=google-client-secret
```

`.env.local` is intentionally ignored by git. For local testing, create Google OAuth credentials and add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

## Live Demo

https://pillar2-logic.gausalmunir.site


## Features Implemented

- Google OAuth authentication through Auth.js v5 / NextAuth.js v5.
- JWT session persistence.
- Protected `/dashboard` routes through edge middleware.
- User profile and logout controls in the navbar.
- Internal `GET /api/products` endpoint with the three required mock products.
- Internal `POST /api/checkout` endpoint with a 1500ms simulated processing delay.
- Inventory rules for normal, low stock, and out-of-stock products.
- Zustand cart store with optimistic navbar count updates.
- Cart drawer with add, remove, quantity update, subtotal, clear cart, and persisted local storage.
- Checkout success and failure toasts, including retry action on failure.
- Skeleton loading, error with retry, and empty product states.

## Bonus Features

- Edge middleware route protection for `/dashboard`.
- RBAC session role support with typed `session.user.role`.
- Role-aware UI in the navbar and admin-only product management actions.
- Code splitting with `next/dynamic` for dashboard product grid and cart drawer.
- Cart persistence using Zustand `persist` middleware.

## Tech Decisions

Zustand is used instead of Redux because the cart state is compact, local to the frontend, and benefits from a small API with built-in persistence middleware. Auth.js v5 is used directly with the App Router so the same auth configuration supports route handlers, middleware, and session access.

The product and checkout APIs are implemented as internal Next.js route handlers to keep the assessment self-contained while still exercising realistic loading, error, empty, and mutation flows.

## Design Notes

The UI is intentionally dashboard-first rather than a marketing landing page. It emphasizes product inventory visibility, clear stock badges, immediate cart feedback, and predictable checkout states. The evaluator controls are visible so loading, error, empty, and checkout failure states can be tested quickly.

## Known Limitations

- Product data is mocked and stored in source code.
- Checkout is simulated and does not call a real payment provider.
- Admin management buttons are conditional UI actions only; edit and delete mutations are outside the assessment scope.
- All authenticated demo users receive the `admin` role unless a custom provider/user role is added later.
