# Technical Assessment — Pillar 2: Functional Logic & Engineering

A production-ready e-commerce dashboard application built for the **React Frontend Engineer (Junior – Mid Level)** Technical Assessment. This repository contains the complete implementation for **Pillar 2: Functional Logic Test** (50% evaluation weight).

---

## Links and Resources

* **Live Demo**: [https://pillar2-logic.gausalmunir.site](https://pillar2-logic.gausalmunir.site)
* **Figma Design File**: [Technical Assessment — React Frontend Engineer](https://www.figma.com/design/u7igaLnSo9mN025vX9IJ35/Technical-Assessment--React-Frontend-Engineer?node-id=0-1&t=BL5fQeWY942FnYn4-1)
* **Design Repository (Pillar 1)**: [Pillar 1 Design Implementation](../technical-assessment-design-pillar1)
* **Logic Repository (Pillar 2)**: [Pillar 2 Functional Logic](../technical-assessment-functional-pillar2)

---

## Technical Stack Overview

* **Framework**: Next.js 14+ (v16.3.0 App Router)
* **Language**: TypeScript (Strict Mode, Zero `any` types used)
* **Styling**: Tailwind CSS (v4) with custom Figma design tokens
* **Authentication**: NextAuth.js v5 (`@auth/core` / `next-auth` v5.0.0-beta) with Google OAuth and Credentials support
* **State Management**: Zustand v5 (Global store with `persist` middleware)
* **Toast Notifications**: Sonner
* **Icons**: Lucide React
* **Deployment Target**: Vercel

---

## Application Architecture and Data Flow

The diagram below outlines the overall authentication flow, middleware protection layer, internal API integration, and global state management structure.

```
                   +----------------------------------+
                   |           User Access            |
                   +----------------------------------+
                                    |
                                    v
                     +------------------------------+
                     |         /login Page          |
                     |  (Google OAuth / Credentials)|
                     +------------------------------+
                                    |
                                    v
                     +------------------------------+
                     |    NextAuth.js v5 Session    |
                     +------------------------------+
                                    |
                                    v
                     +------------------------------+
                     |    middleware.ts (Edge)      |
                     +------------------------------+
                        /                        \
                       /                          \
                      v                            v
        +---------------------------+    +--------------------------+
        | Unauthenticated (Denied)  |    | Authenticated (Allowed)  |
        | Redirects -> /login       |    | Route -> /dashboard      |
        +---------------------------+    +--------------------------+
                                                   |
                                                   v
                                   +--------------------------------+
                                   |       Dashboard Container      |
                                   | (Consumes /api/products)       |
                                   +--------------------------------+
                                       /           |            \
                                      /            |             \
                                     v             v              v
                              +------------+ +------------+ +------------+
                              | Loading    | | Error State| | Empty State|
                              | Skeleton   | | + Retry    | | + Reload   |
                              +------------+ +------------+ +------------+
                                                   |
                                                   v
                                   +--------------------------------+
                                   |      Product Grid Rendering    |
                                   | Stock State Rules (OOS/Low/Norm)|
                                   +--------------------------------+
                                                   |
                                                   v
                                   +--------------------------------+
                                   |   Zustand Cart Store (Global)  |
                                   | - Optimistic Navbar Counter   |
                                   | - LocalStorage Persistence     |
                                   +--------------------------------+
                                                   |
                                                   v
                                   +--------------------------------+
                                   |         Checkout Flow          |
                                   | 1. Session Check               |
                                   | 2. Processing (1500ms API)     |
                                   | 3. Success Toast & Clear Cart  |
                                   | 4. Error Toast & Retry Option  |
                                   +--------------------------------+
```

---

## Features and Specification Checklist

### Module A: Authentication & Security

* **Google OAuth Sign-In**: Integrated via NextAuth.js v5. The `/login` route features a dedicated "Sign in with Google" action handler.
* **Edge Route Protection**: Implemented via `middleware.ts` at the Next.js Edge layer. Unauthenticated access attempts to `/dashboard` or any sub-routes are intercepted server-side and redirected to `/login`.
* **Session Persistence**: Configured using JWT session strategy (`strategy: "jwt"`). Authentication state remains persistent across page reloads and browser sessions.
* **User Profile & Navigation**: Header displays active user profile avatar, display name, RBAC badge, and a functional Logout button that terminates the session and returns the user to `/login`.

### Module B: Inventory & State Management

* **Internal Mock API (`/api/products`)**: Serves the required mock product dataset with realistic network latency simulation (400ms delay).
  1. `MacBook Pro M2` (Laptops | $2,499 | Stock: 8)
  2. `Logitech MX Master 3` (Accessories | $99 | Stock: 0)
  3. `Dell XPS 15` (Laptops | $1,899 | Stock: 3)
* **Stock State Rules**:
  * `stock === 0`: Displays a red "Out of Stock" badge. The purchase button is disabled with text changed to `"Out of Stock"`.
  * `0 < stock < 5`: Displays an amber "Low Stock ({n} left)" badge. Button remains enabled.
  * `stock >= 5`: Standard product presentation with no stock badge.
* **Optimistic UI Updates**: Clicking "Add to Cart" immediately mutates the global Zustand store, updating the Navbar cart counter badge in real time without awaiting API confirmation.

### Module C: Checkout Flow

* **Session Validation**: Verifies authentication status before checkout initialization. If unauthenticated, prompts the user and redirects to `/login`.
* **Loading UI**: Disables the action button and displays a "Processing..." spinner state.
* **Network Delay Simulation**: Calls `/api/checkout` with a mandatory 1500ms delay to simulate payment processing.
* **Success Handling**: Triggers a success toast with a transaction ID and clears the global cart.
* **Error Handling & Retry**: Displays an error toast notification with an interactive "Retry" trigger if a transaction fails.

### Module D & E: UX Polish & Edge Cases

* **Skeleton Loaders**: Displays structural skeleton placeholders while products load, avoiding spinner-only fallback layouts.
* **Error Recovery**: Displays a user-friendly error card with a functional **Retry** button that re-executes the API fetch handler.
* **Empty State**: Renders a dedicated empty state UI when no inventory items are returned.
* **Toast Notifications**: Managed using `sonner` for non-blocking feedback on cart operations and checkout status.

---

## Bonus Challenges Implemented

All **4 Bonus Challenges** outlined in the technical assessment specification have been implemented:

1. **Edge Middleware (`middleware.ts`)**: Edge-level route guard checking NextAuth session tokens prior to rendering protected routes.
2. **Role-Based Access Control (RBAC)**: Session extended with typed `role: 'admin' | 'manager'`. Displays role badges in the header and conditionally renders Admin management controls (Settings & Delete icons) on inventory cards.
3. **Cart Persistence**: Integrated Zustand `persist` middleware using `localStorage` key `shopping-cart-storage`. Cart state persists seamlessly across browser reloads.
4. **Code Splitting & Dynamic Imports**: Utilized `next/dynamic` in `src/app/dashboard/page.tsx` for heavy client components (`ProductGrid` and `CartDrawer`) to optimize initial JavaScript bundle size.

---

## Setup and Installation Instructions

### Prerequisites

* Node.js v18.17.0 or higher
* `pnpm` (recommended), `npm`, or `yarn`

### Local Development Setup

1. **Clone the repository and enter the project directory:**
   ```bash
   git clone <repository-url>
   cd technical-assessment-functional-pillar2
   ```

2. **Install project dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the project root directory. You can copy `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Populate `.env.local` with your credentials:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-32-character-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```
   *Note: For local development without Google Cloud Console credentials, a credentials-based authentication fallback is built into the login interface.*

4. **Run the local development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Verify Production Build:**
   ```bash
   pnpm build
   pnpm start
   ```

---

## Environment Variables Reference

| Variable | Description | Required Location |
| :--- | :--- | :--- |
| `NEXTAUTH_URL` | Canonical URL of the application (`http://localhost:3000` in dev, Vercel domain in production). | `.env.local` / Vercel Settings |
| `NEXTAUTH_SECRET` | Secret key used to encrypt NextAuth JWT session tokens (generate with `openssl rand -base64 32`). | `.env.local` / Vercel Settings |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID obtained from Google Cloud Console -> APIs & Services -> OAuth 2.0. | `.env.local` / Vercel Settings |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret obtained from Google Cloud Console. | `.env.local` / Vercel Settings |

*`.env.local` is listed in `.gitignore` and is never committed to source control.*

---

## Technical Decisions and Architectural Rationale

### Why Zustand over Redux?
Zustand was selected for global state management for several architectural reasons:
* **Minimal Boilerplate**: Zustand provides a lightweight API without slice definitions, action creators, or complex dispatch setups required by Redux Toolkit.
* **Native Middleware Integration**: Zustand features built-in `persist` middleware that makes `localStorage` synchronization straightforward.
* **Performance**: Zustand allows components to subscribe to granular state slices, preventing unnecessary re-renders when unrelated store properties change.

### NextAuth.js v5 (Auth.js) App Router Integration
Auth.js v5 was selected to provide unified authentication across Next.js App Router API endpoints, Server Components, and Edge Middleware. Integrating NextAuth session handlers into `middleware.ts` ensures that access control runs at the edge before any route rendering begins.

### Internal Mock API Architecture
Instead of hardcoding product state within React components, dedicated Next.js App Router API endpoints (`/api/products` and `/api/checkout`) were built. This models a real client-server architecture, allowing the application to demonstrate asynchronous loading, error states, network delay simulations, and HTTP status handling.

---

## Evaluator Test Controls

To facilitate thorough testing by technical reviewers, interactive state toggles have been included in the user interface:

1. **Simulate API Error**: Checkbox located above the dashboard grid forces `/api/products?error=true`, triggering the `ProductError` component with an active **Retry** button.
2. **Simulate Empty State**: Checkbox located above the dashboard grid forces `/api/products?empty=true`, displaying the `ProductEmpty` UI component.
3. **Simulate Checkout Failure**: Link located at the bottom of the Cart Drawer triggers a simulated payment decline response from `/api/checkout`, demonstrating error toast notifications with an interactive **Retry** action.

---

---

## Bonus Challenges

- [x] Edge Middleware
- [x] Role-Based Access Control (RBAC)
- [x] Performance — Code Splitting
- [x] Cart Persistence

### Implementation Details

1. **Edge Middleware (`middleware.ts`)**:
   - Implemented route protection at the Edge using Next.js `middleware.ts` targeting `/dashboard` and `/dashboard/*`.
   - Automatically redirects unauthenticated users to `/login` and allows authenticated users access to `/dashboard`.

2. **Role-Based Access Control (RBAC)**:
   - Added support for `admin` and `manager` roles in NextAuth session JWT tokens.
   - Built a pill-shaped segmented toggle component (`RoleToggle.tsx`) inside the Navbar allowing dynamic switching between `Admin` and `Manager` roles via `useSession().update()`.
   - **Role-based UI**: Admin renders the "Delete Product" action button on product cards, while Manager completely hides it from the DOM.
   - **Server-side Security**: Implemented a `DELETE /api/products` route handler with server-side role verification, returning HTTP 403 Forbidden for non-admin attempts.

3. **Performance — Code Splitting**:
   - Utilized `next/dynamic` code-splitting for heavy dashboard components (`ProductGrid` and `CartDrawer`) with loading skeleton fallbacks.
   - Verified via production build (`pnpm build`). Lighthouse performance audit screenshot location: `docs/lighthouse-performance.png`.

4. **Cart Persistence**:
   - Configured Zustand's `persist` middleware on `useCartStore` under storage key `"shopping-cart-storage"`.
   - Cart state, items, quantities, and optimistic counters persist across browser refreshes.

