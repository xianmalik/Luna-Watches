# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Luna Watches is a luxury watch e-commerce website template built with Next.js 15, integrating with Shopify's Storefront API for product data. The project uses shadcn/ui components (New York style) built on Radix UI primitives, styled with Tailwind CSS v4, and managed with Bun as the package manager.

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
  - `app/api/products/route.ts` - API endpoint for fetching Shopify products
- `blocks/` - Page-level composite components (e.g., HeroSlider)
- `components/` - Reusable React components
  - `components/ui/` - shadcn/ui primitives (button, badge, carousel, input, navigation-menu)
  - `components/common/` - Shared application components (header, footer, SearchBar)
- `lib/` - Utility functions and configuration
  - `lib/shopify.ts` - Shopify Storefront API client
  - `lib/app.settings.ts` - Application settings (navigation items, etc.)
  - `lib/utils.ts` - Utility functions (includes cn() for class merging)
- `public/` - Static assets (images, fonts, etc.)

### Key Architectural Patterns

**Shopify Integration**: The app uses Shopify's Storefront API (GraphQL) through a custom client in `lib/shopify.ts`. The `shopifyFetch()` function dynamically constructs the API endpoint using the current year and month (e.g., `/api/2025-12/graphql.json`). Products are fetched via the `/api/products` route handler.

**Component Organization**:
- `blocks/` contains large, page-specific components (e.g., HeroSlider)
- `components/common/` contains shared application components used across multiple pages
- `components/ui/` contains shadcn/ui primitives (do not modify these directly; regenerate using `npx shadcn@latest add`)

**Styling**: Uses Tailwind CSS v4 with CSS variables for theming. The shadcn/ui config (`components.json`) uses the "new-york" style with neutral base color and CSS variables enabled.

**Path Aliases**: `@/*` maps to the root directory (configured in `tsconfig.json`)

**Environment Variables**: Required variables are documented in `.env.example`:
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain (e.g., `your-store.myshopify.com`)
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Shopify Storefront API access token

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

- Images from `images.unsplash.com` are whitelisted in `next.config.ts`
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
