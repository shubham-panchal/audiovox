"use server";

import { redirect } from "next/navigation";
import { getCatalogMode } from "@/lib/products";
import { createDemoOrder } from "@/lib/orders";

export async function createDemoOrderAction(_previousState, formData) {
  if (getCatalogMode() !== "mongodb") {
    return {
      error: "Demo orders require MongoDB catalog mode to be enabled.",
    };
  }

  const customerName = String(formData.get("customerName") || "").trim();
  const customerEmail = String(formData.get("customerEmail") || "")
    .trim()
    .toLowerCase();
  if (customerName.length < 2 || customerName.length > 100) {
    return { error: "Enter a name between 2 and 100 characters." };
  }
  if (
    customerEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
  ) {
    return { error: "Enter a valid email address." };
  }

  const cartValue = formData.get("cartItems");
  if (typeof cartValue !== "string" || cartValue.length > 10_000) {
    return { error: "Your cart could not be validated. Please refresh and try again." };
  }

  let cartItems;
  try {
    cartItems = JSON.parse(cartValue);
  } catch {
    return { error: "Your cart could not be validated. Please refresh and try again." };
  }

  let order;
  try {
    order = await createDemoOrder({
      customerName,
      customerEmail,
      cartItems,
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Your cart")) {
      return { error: error.message };
    }
    if (
      error instanceof Error &&
      (error.message.startsWith("A product") ||
        error.message.startsWith("A selected") ||
        error.message.startsWith("The order"))
    ) {
      return { error: error.message };
    }

    console.error("Could not save demo order:", error);
    return {
      error: "We couldn't save your order. Please try again in a moment.",
    };
  }

  redirect(`/order-confirmation/${order.orderNumber}`);
}
