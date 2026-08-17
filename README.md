# Technical Assessment — Pillar 2: Functional Logic

A production-quality Next.js e-commerce dashboard application built for the **React Frontend Engineer (Junior – Mid Level)** UI & Logic Challenge (Pillar 2: 50% Evaluation Weight).

---

## 🔗 Live Demo & Links

- **Live Demo**: [https://pillar2-logic.gausalmunir.site](https://pillar2-logic.gausalmunir.site)
- **Design Challenge (Pillar 1)**: `technical-assessment-design-pillar1`
- **Functional Challenge (Pillar 2)**: `technical-assessment-functional-pillar2`

---

## 💻 Setup Instructions

### Prerequisites
- Node.js 18.x or later
- `pnpm` (or `npm` / `yarn`)

### Installation & Run

1. **Clone & Navigate:**
   ```bash
   cd technical-assessment-functional-pillar2
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory (refer to `.env.example`):
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-random-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run Development Server:**
   ```bash
   pnpm dev
   ```
   Access the app at [http://localhost:3000](http://localhost:3000).

5. **Production Build Verification:**
   ```bash
   pnpm build
   ```

---

## 🏆 Bonus Features Completed

All **4 Bonus Challenges** from Section 5 of the specification have been completed:

1. **Edge Middleware (`middleware.ts`)**: Implemented Edge-level route protection that inspects NextAuth sessions and redirects unauthenticated users trying to access `/dashboard` or its sub-routes directly to `/login`.
2. **Role-Based Access Control (RBAC)**: Added typed `role: 'admin' | 'manager'` to the session. Displayed role badges in the Navbar and conditionally rendered Admin management controls (Settings & Delete icons) on product cards based on the user's role.
3. **Performance — Code Splitting**: Applied dynamic imports (`next/dynamic`) in `src/app/dashboard/page.tsx` for heavy client components (`ProductGrid` and `CartDrawer`) to optimize initial bundle load time.
4. **Cart Persistence**: Configured Zustand `persist` middleware with `localStorage` storage key (`shopping-cart-storage`) so cart items survive page refreshes and browser restarts.

---

## 💡 Tech Decisions

- **Zustand vs Redux**: Zustand was chosen over Redux because the cart state is lightweight and frontend-focused. Zustand provides a minimal hook API, zero boilerplate, effortless state updates, and native `persist` middleware support without the heavy overhead of Redux Toolkit slices and reducers.
- **Auth.js v5 (NextAuth.js)**: Integrated Auth.js v5 directly within the App Router architecture, enabling unified session configuration (`src/lib/auth.ts`) across Edge Middleware, Server Components, and Route Handlers.
- **Internal Route Handlers (`/api/products` & `/api/checkout`)**: Built internal Next.js App Router API endpoints to serve mock inventory data and simulate realistic HTTP network delays (400ms for fetching, 1500ms for checkout) and status codes (200, 400, 500) while keeping the application self-contained.

---

## 🎨 Design Notes & Evaluator Features

- **Figma Tokens & Design Alignment**: Built with Tailwind CSS matching design tokens, custom font variables (`Urbanist`), stock status badges (`Out of Stock` red badge when stock = 0, `Low Stock` amber badge when stock < 5, and standard layout when stock ≥ 5).
- **Optimistic UI Updates**: Clicking "Add to Cart" synchronously mutates local Zustand store state, updating the cart counter badge in the Navbar immediately without waiting for API response.
- **Interactive Evaluator Toggles**:
  - **API Error Simulation**: Top dashboard checkbox `[ ] Simulate API Error` forces `/api/products?error=true` to demonstrate `ProductError` state with a functional **Retry** button.
  - **Empty State Simulation**: Top dashboard checkbox `[ ] Simulate Empty State` forces `/api/products?empty=true` to demonstrate `ProductEmpty` UI state.
  - **Checkout Failure Simulation**: Cart Drawer link `[Evaluator Test] Simulate Checkout Failure` triggers simulated transaction failure to demonstrate error toast with interactive **Retry** option.

---

## 📝 Known Limitations

- **Mock Inventory Data**: Products are served from an internal mock array (`mock-products.ts`) rather than a persistent database system.
- **Simulated Payment Gateway**: The checkout process executes a 1500ms simulated timeout and generates a random transaction ID without connecting to a real payment processor (e.g. Stripe).
- **Admin Action Scope**: Admin management buttons (Settings & Delete) demonstrate RBAC UI visibility logic; actual backend mutations for editing/deleting products were outside the UI & Logic challenge scope.
