import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import mockProducts from "@/data/mock-products.json";
import Product from "@/models/product";
import { connectToDatabase } from "@/lib/mongodb";

export function getCatalogMode() {
  const mode = process.env.CATALOG_MODE || "mock";
  if (mode !== "mock" && mode !== "mongodb") {
    throw new Error(`Unsupported CATALOG_MODE "${mode}". Use "mock" or "mongodb".`);
  }
  return mode;
}

function serializeProduct(product, badge) {
  if (!product) return null;

  return {
    slug: product.slug,
    name: product.name,
    image: product.image,
    price: product.price,
    category: product.category,
    description: product.description,
    colors: Array.isArray(product.colors) ? product.colors : [],
    badge: badge || product.newArrivalBadge || product.bestSellerBadge || "",
  };
}

function sortProducts(products, orderField, badgeField) {
  return products
    .filter((product) => Number.isInteger(product[orderField]))
    .sort((a, b) => a[orderField] - b[orderField])
    .map((product) => serializeProduct(product, product[badgeField]));
}

export function getMockNewArrivals() {
  return sortProducts(mockProducts, "newArrivalOrder", "newArrivalBadge");
}

export function getMockBestSellers() {
  return sortProducts(mockProducts, "bestSellerOrder", "bestSellerBadge");
}

export function getProductSlugs() {
  return mockProducts.map((product) => product.slug);
}

async function findFeaturedProducts(orderField, badgeField) {
  if (getCatalogMode() === "mock") {
    return sortProducts(mockProducts, orderField, badgeField);
  }

  await connection();
  await connectToDatabase();
  const products = await Product.find({ [orderField]: { $exists: true } })
    .sort({ [orderField]: 1 })
    .lean();

  return products.map((product) =>
    serializeProduct(product, product[badgeField]),
  );
}

export function getNewArrivals() {
  return findFeaturedProducts("newArrivalOrder", "newArrivalBadge");
}

export function getBestSellers() {
  return findFeaturedProducts("bestSellerOrder", "bestSellerBadge");
}

export const getProductBySlug = cache(async function getProductBySlug(slug) {
  if (getCatalogMode() === "mock") {
    return serializeProduct(
      mockProducts.find((product) => product.slug === slug),
    );
  }

  await connection();
  await connectToDatabase();
  const product = await Product.findOne({ slug }).lean();
  return serializeProduct(product);
});
