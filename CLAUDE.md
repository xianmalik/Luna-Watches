# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Luna Watches is a luxury watch e-commerce website template built with Next.js 15, using DummyJSON as the product and cart data source. The project uses shadcn/ui components (New York style) built on Radix UI primitives, styled with Tailwind CSS v4, and managed with Bun as the package manager.

## Development Commands

```bash
# Install dependencies
bun install

# Run development server (uses Turbopack)
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Run linter
bun run lint
```

## Architecture

### Directory Structure

- `app/` - Next.js 15 App Router pages and API routes
  - `app/page.tsx` - Homepage with hero slider
  - `app/layout.tsx` - Root layout with Header/Footer and Poppins font
  - `app/api/products/` - API routes wrapping DummyJSON product endpoints
  - `app/api/cart/` - API routes wrapping DummyJSON cart endpoints
- `blocks/` - Page-level composite components (e.g., HeroSlider, ProductsGrid)
- `components/` - Reusable React components
  - `components/ui/` - shadcn/ui primitives (button, badge, carousel, input, navigation-menu)
  - `components/common/` - Shared application components (header, footer, SearchBar)
  - `components/products/` - Product-specific components (ProductCard)
- `lib/` - Utility functions and configuration
  - `lib/dummyjson.ts` - Server-side DummyJSON API fetch utility
  - `lib/api-client.ts` - Frontend API client for calling internal API routes
  - `lib/app.settings.ts` - Application settings (navigation items, etc.)
  - `lib/utils.ts` - Utility functions (includes cn() for class merging)
- `types/` - TypeScript type definitions
  - `types/products.ts` - Product and category types (matches DummyJSON schema)
  - `types/cart.ts` - Cart types (matches DummyJSON schema)
- `services/` - Frontend service functions
  - `services/products.ts` - Product API service (uses apiClient)
  - `services/cart.ts` - Cart API service (uses apiClient)
- `public/` - Static assets (images, fonts, etc.)

### Key Architectural Patterns

**DummyJSON Integration**: The app uses DummyJSON (https://dummyjson.com) as its data source. Server-side API routes in `app/api/` act as wrappers around DummyJSON endpoints. The server-side fetch utility is in `lib/dummyjson.ts`. Frontend components call our internal API routes via `lib/api-client.ts` and the service functions in `services/`.

**API Route Pattern**: Each API route in `app/api/` is a thin wrapper that forwards requests to DummyJSON server-side. This keeps the external API URL hidden from the client and allows future middleware (auth, caching, transformation).

**Component Organization**:
- `blocks/` contains large, page-specific components (e.g., HeroSlider)
- `components/common/` contains shared application components used across multiple pages
- `components/ui/` contains shadcn/ui primitives (do not modify these directly; regenerate using `npx shadcn@latest add`)

**Styling**: Uses Tailwind CSS v4 with CSS variables for theming. The shadcn/ui config (`components.json`) uses the "new-york" style with neutral base color and CSS variables enabled.

**Path Aliases**: `@/*` maps to the root directory (configured in `tsconfig.json`)

## API Routes

### Products
- `GET /api/products` - List products (query: `limit`, `skip`, `select`)
- `GET /api/products/[id]` - Get single product
- `GET /api/products/search` - Search products (query: `q`)
- `GET /api/products/categories` - List all categories
- `GET /api/products/category/[category]` - Get products by category

### Cart
- `GET /api/cart` - Get all carts (query: `userId` for user-specific)
- `POST /api/cart` - Create a new cart
- `GET /api/cart/[id]` - Get a single cart
- `PUT /api/cart/[id]` - Update a cart
- `DELETE /api/cart/[id]` - Delete a cart

## shadcn/ui Components

This project uses shadcn/ui with the following configuration:
- Style: `new-york`
- Base color: `neutral`
- Icon library: `lucide-react`
- CSS: `app/globals.css`

To add new shadcn/ui components:
```bash
npx shadcn@latest add <component-name>
```

Installed components: badge, button, carousel (embla-carousel-react), input, navigation-menu

## Navigation Configuration

Primary navigation items are centrally configured in `lib/app.settings.ts` using the `NAVBAR_PRIMARY_ITEMS` constant. Update this array to modify navigation links throughout the app.

## Next.js Configuration

- Images from `images.unsplash.com`, `placehold.co`, and `cdn.dummyjson.com` are whitelisted in `next.config.ts`
- React Strict Mode is enabled
- Development server uses Turbopack (Next.js 15 feature)

## Development Rules

**CRITICAL: Follow these rules strictly when working on this project:**

1. **Always check shadcn/ui first** - Before adding any block or component, verify if shadcn/ui has that component available. If it exists, use the shadcn/ui component instead of building from scratch.

2. **Follow Tailwind CSS structure** - All styling must use Tailwind CSS utility classes. Do not add custom CSS unless absolutely necessary.

3. **Component organization and SSR strategy**:
   - Always create separate components when working with pages
   - Create client-side subcomponents only when needed (e.g., interactive features, hooks, event handlers)
   - Use `"use client"` directive sparingly - only when necessary for interactivity
   - Default to Next.js Server Components (SSR) for most components to maximize performance

4. **No comments unless requested** - Do not add code comments unless explicitly asked. However, JSDoc comments are encouraged for utility functions and helper functions in `lib/` directory.

5. **Always check for null/undefined props** - Perform null or undefined checks for all prop variables before using them in components.
