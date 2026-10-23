# 3legant

A responsive headphone storefront built with Next.js and React. The project focuses on a complete shopping flow rather than a large set of unfinished pages: browse products, open a product detail page, choose a color and quantity, and add the selection to a persistent cart.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route                  | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `/`                    | Storefront homepage and featured products |
| `/products/product-01` | Example product detail page               |
| `/cart`                | Full cart page                            |

Product details and homepage product sections read from a catalog repository. The default `CATALOG_MODE=mock` uses `src/data/mock-products.json`, so the storefront works without a database. Product pages use each product's stable `slug`.

## Product Catalog and MongoDB

The product schema is defined in `src/models/product.js`. Each record has a unique slug, name, image, numeric USD price, category, description, available colors, and optional ordering/badge fields for the homepage's New Arrivals and Best Seller sections.

To use MongoDB:

1. Copy `.env.example` to `.env.local`.
2. Set `MONGODB_URI` to your MongoDB connection string and set `CATALOG_MODE=mongodb`.
3. Seed or update the catalog with `npm run seed`. The script upserts records by slug and does not delete other records.
4. Start the app with `npm run dev`.

The MongoDB connection and catalog queries run only in server-side code. Keep the connection string private; do not use a `NEXT_PUBLIC_` prefix. The catalog remains on mock data until `CATALOG_MODE=mongodb` is explicitly selected.

The former mock listings repeated some products with conflicting values. The seed data uses one canonical record per slug; for the repeated Beats Studio Pro listing (`product-05`), the New Arrivals price of `$224.99` is retained.

## Shopping Flow

1. Open a product from a homepage product card.
2. Choose a color and set the quantity.
3. Select **Add to cart**. The product, selected color, and quantity appear in the cart drawer.
4. Change quantities or remove items in the drawer or on `/cart`. The header item count and totals update with the cart.
5. Refresh the page. Cart items remain because this demo stores them in the browser's local storage.

## Project Structure

- `src/data/mock-products.json` contains seed/mock product records; `src/data/homepage.js` contains the remaining static homepage content.
- `src/models/product.js` defines the MongoDB product schema; `src/lib/mongodb.js` manages the server-side connection and `src/lib/products.js` selects mock or MongoDB catalog queries.
- `src/app/products/[slug]/page.js` resolves product URLs through the catalog repository.
- `src/components/product/product-detail.js` contains the product options and add-to-cart controls.
- `src/components/cart/cart-provider.js` shares cart state across the app and persists it to local storage.
- `src/components/cart/` contains the drawer, cart contents, and full cart page composition.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run seed
npm run start
```

## Scope

This is a frontend portfolio project. Checkout displays a demo message; it does not process payments. Cart data is stored in the current browser, not a server account. Color selection is saved with the cart item, but does not change the product image because the catalog currently has one image per product. There are no account, order-history, or inventory-management pages.
