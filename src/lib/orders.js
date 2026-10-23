import "server-only";
import { randomUUID } from "node:crypto";
import { cache } from "react";
import { connection } from "next/server";
import Order from "@/models/order";
import Product from "@/models/product";
import { connectToDatabase } from "@/lib/mongodb";

const MAX_ORDER_ITEMS = 20;
const MAX_ITEM_QUANTITY = 99;
const MAX_ORDER_TOTAL_CENTS = 100_000_000;

function validateCartItems(cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("Your cart is empty.");
  }
  if (cartItems.length > MAX_ORDER_ITEMS) {
    throw new Error("Your cart has too many different items.");
  }

  return cartItems.map((item) => {
    if (
      !item ||
      typeof item.slug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > MAX_ITEM_QUANTITY ||
      (item.variant !== null &&
        item.variant !== undefined &&
        (typeof item.variant !== "string" || item.variant.length > 40))
    ) {
      throw new Error("Your cart contains an invalid item. Please review it and try again.");
    }

    return {
      slug: item.slug,
      variant: item.variant || null,
      quantity: item.quantity,
    };
  });
}

export async function createDemoOrder({ customerName, customerEmail, cartItems }) {
  const validatedItems = validateCartItems(cartItems);
  await connection();
  await connectToDatabase();

  const products = await Product.find({
    slug: { $in: [...new Set(validatedItems.map((item) => item.slug))] },
  }).lean();
  const productsBySlug = new Map(products.map((product) => [product.slug, product]));

  const orderItems = validatedItems.map((item) => {
    const product = productsBySlug.get(item.slug);
    if (!product) {
      throw new Error("A product in your cart is no longer available. Please review your cart.");
    }
    if (
      item.variant &&
      (!Array.isArray(product.colors) || !product.colors.includes(item.variant))
    ) {
      throw new Error("A selected product option is no longer available. Please review your cart.");
    }

    const unitPriceCents = Math.round(product.price * 100);
    return {
      slug: product.slug,
      name: product.name,
      image: product.image,
      variant: item.variant,
      quantity: item.quantity,
      unitPriceCents,
      lineTotalCents: unitPriceCents * item.quantity,
    };
  });

  const subtotalCents = orderItems.reduce(
    (total, item) => total + item.lineTotalCents,
    0,
  );
  if (
    !Number.isSafeInteger(subtotalCents) ||
    subtotalCents <= 0 ||
    subtotalCents > MAX_ORDER_TOTAL_CENTS
  ) {
    throw new Error("The order total is invalid. Please review your cart.");
  }

  const [order] = await Order.create([
    {
      orderNumber: randomUUID(),
      customerName,
      customerEmail,
      items: orderItems,
      subtotalCents,
      currency: "USD",
      status: "demo",
      paymentStatus: "not_required",
    },
  ]);

  return { orderNumber: order.orderNumber };
}

export const getOrderByNumber = cache(async function getOrderByNumber(orderNumber) {
  if (
    typeof orderNumber !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      orderNumber,
    )
  ) {
    return null;
  }

  await connection();
  await connectToDatabase();
  const order = await Order.findOne({ orderNumber }).lean();
  if (!order) return null;

  return {
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    items: order.items.map((item) => ({
      slug: item.slug,
      name: item.name,
      image: item.image,
      variant: item.variant,
      quantity: item.quantity,
      unitPriceCents: item.unitPriceCents,
      lineTotalCents: item.lineTotalCents,
    })),
    subtotalCents: order.subtotalCents,
    createdAt: order.createdAt.toISOString(),
  };
});
