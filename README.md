# Technical Assessment — Pillar 2: Functional Logic & Engineering

A production-ready e-commerce web application built for the **React Frontend Engineer (Junior – Mid Level)** Technical Assessment. This repository contains the complete implementation for **Pillar 2: Functional Logic Test**, featuring robust state management, NextAuth.js authentication, edge route guards, RBAC controls, and dynamic API flows.

---

## Links & Resources

* **Live Demo**: [https://pillar2-logic.gausalmunir.site](https://pillar2-logic.gausalmunir.site)
* **Figma Design File**: [Pillar 2 UI](https://www.figma.com/design/8UsytMp6ZZ3sPy3dxVVQww/Pillar-2-Funtional-Test?node-id=0-1&t=GVldSPvS8dHMOXo3-1)

---

## Technical Stack

* **Framework**: Next.js 16 (v16.3.0 App Router)
* **Library**: React 19 (v19.2.8)
* **Language**: TypeScript (Strict Mode, 100% type safety)
* **Styling**: Tailwind CSS (v4) with custom Figma tokens
* **Authentication**: NextAuth.js v5 (`@auth/core` / `next-auth` v5.0.0-beta.32) with Google OAuth and Credentials fallback
* **State Management**: Zustand v5 (Global store with `persist` middleware)
* **Notifications**: Sonner (v2.0.8)
* **Icons**: Lucide React & React Icons
* **Deployment Target**: Vercel

---


## Features & Specification Checklist

### Authentication & Security

* **Google OAuth & Credentials Sign-In**: Integrated via NextAuth.js v5. The `/login` route features a "Sign in with Google" OAuth flow and a credentials fallback for testing without external keys.
* **Edge Route Protection**: Implemented via `middleware.ts` at the Next.js Edge layer. Unauthenticated attempts to access protected routes (`/dashboard/*`) are intercepted server-side and redirected to `/login`.
* **Session Persistence**: JWT session strategy (`strategy: "jwt"`) ensures auth state remains intact across page reloads and browser sessions.
* **User Profile & Header Navigation**: Header displays active user profile avatar, display name, dynamic RBAC badge, and a functional logout trigger that terminates the session and redirects to `/login`.

### Inventory & State Management

* **Internal Mock API (`/api/products`)**: Custom REST endpoints serving mock inventory data with simulated network latency (400ms delay):
  1. `MacBook Pro M2` (Laptops | $2,499 | Stock: 8)
  2. `Logitech MX Master 3` (Accessories | $99 | Stock: 0)
  3. `Dell XPS 15` (Laptops | $1,899 | Stock: 3)
* **Stock State Rules**:
  * **Out of Stock (`stock === 0`)**: Red "Out of Stock" badge. Button is disabled with `"Out of Stock"` label.
  * **Low Stock (`0 < stock < 5`)**: Amber "Low Stock ({n} left)" badge. Button remains enabled.
  * **Normal Stock (`stock >= 5`)**: Standard product card presentation with no stock alert badge.
* **Optimistic UI Updates**: Clicking "Add to Cart" instantly updates the global Zustand cart state and header badge counter without waiting for API confirmation.

### Checkout Flow

* **Session Validation**: Verifies active session before initializing checkout. Prompts user and redirects to `/login` if unauthenticated.
* **Loading & Processing UI**: Disables checkout triggers and displays a "Processing..." loading spinner state.
* **Network Latency Simulation**: Interacts with `/api/checkout` using a 1500ms artificial delay to simulate payment gateway execution.
* **Success & Clear Cart**: Displays a success toast notification with a unique transaction ID and clears all cart items.
* **Error Handling & Retry**: Displays an actionable error toast notification featuring an interactive "Retry" button on payment failure.

### UX & Edge Cases

* **Skeleton Loaders**: Renders animated structural skeletons while products are being fetched to prevent visual layout shifts.
* **Error Recovery**: Displays an error alert card with an interactive **Retry** button that re-fetches product data.
* **Empty Inventory State**: Renders a dedicated empty state UI when no inventory items are returned from the API.
* **Toast Notifications**: Powered by `sonner` for crisp, non-blocking feedback during cart modifications and checkout operations.

---

## Evaluator Testing Guide

Interactive UI controls are available on the Dashboard to allow technical reviewers to evaluate state handlings easily:

1. **Simulate API Error**: Toggle the checkbox in the dashboard header to force `/api/products?error=true`, rendering the `ProductError` component with an active **Retry** button.
2. **Simulate Empty State**: Toggle the checkbox in the dashboard header to force `/api/products?empty=true`, rendering the dedicated `ProductEmpty` state UI.
3. **Simulate Checkout Failure**: Click the "Simulate Decline" link at the bottom of the Cart Drawer to trigger a payment decline from `/api/checkout`, demonstrating failure toasts and retry triggers.
4. **Role Switching (RBAC)**: Use the dynamic Role Switcher pill in the top Navbar to seamlessly toggle between `Admin` and `Manager` roles via `useSession().update()`.

---

## Bonus Challenges

### Edge Middleware
Implemented route guard protection at the Next.js Edge layer via `middleware.ts`. Intercepts incoming requests to `/dashboard` and sub-routes, verifying NextAuth tokens server-side before rendering.

### RBAC
Extended NextAuth JWT session to store user roles (`admin` | `manager`). 
* **UI Controls**: Admin users see "Delete Product" action buttons on inventory cards, while Manager users have deletion controls hidden.
* **Server Security**: The `DELETE /api/products` API endpoint validates caller roles and returns `403 Forbidden` for non-admin requests.
* **Dynamic Switcher**: Interactive `RoleToggle.tsx` in the Navbar allows dynamic role switching for testing purposes.

### Code Splitting
Utilized Next.js `next/dynamic` dynamic imports in `src/app/dashboard/page.tsx` for heavy client components (`ProductGrid` and `CartDrawer`) paired with skeleton fallbacks, optimizing initial bundle delivery.

### Cart Persistence
Configured Zustand `persist` middleware on `useCartStore` with storage key `"shopping-cart-storage"`. Cart items, quantities, and counter badges persist seamlessly across browser refreshes and session restarts.

---

## Setup & Installation

### Prerequisites

* Node.js v18.17.0 or higher
* `pnpm` (recommended), `npm`, or `yarn`

### Environment Variables

Create a `.env.local` file in the root directory (or copy from `.env.example`): or update .env file. I have provided .env file Attached on Email.

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=secret-key
GOOGLE_CLIENT_ID=google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=google-client-secret
```

| Variable | Description | Required Location |
| :--- | :--- | :--- |
| `NEXTAUTH_URL` | Canonical URL of the application (`http://localhost:3000` in dev). | `.env.local` / Vercel |
| `NEXTAUTH_SECRET` | Secret key used to encrypt NextAuth JWT session tokens (`openssl rand -base64 32`). | `.env.local` / Vercel |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID from Google Cloud Console. | `.env.local` / Vercel |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret from Google Cloud Console. | `.env.local` / Vercel |

### Local Development

1. **Clone the repository and navigate to Pillar 2:**
   ```bash
   git clone <repository-url>
   cd technical-assessment-functional-pillar2
   ```

2. **Install project dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the local development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To build and verify the application for production:

```bash
pnpm build
pnpm start
```

---

## Technical Decisions

### Why Zustand over Redux?

* **Minimal Boilerplate**: Zustand provides an intuitive store pattern without action creators, complex reducers, or slice boilerplate required by Redux Toolkit.
* **Native Middleware Support**: Built-in `persist` middleware simplifies `localStorage` synchronization out of the box.
* **Selector Performance**: Enables components to subscribe to granular state slices, preventing unnecessary re-renders across unrelated state changes.

### Why Next.js App Router?

* **Unified Server & Client Architecture**: Seamless combination of React Server Components, client state, and internal API route handlers (`/api/products`, `/api/checkout`).
* **Edge Middleware**: Native `middleware.ts` allows lightweight, serverless session checks at the Edge before route evaluation.
* **Automatic Code Splitting**: Built-in dynamic imports (`next/dynamic`) optimize page delivery and initial payload size.
