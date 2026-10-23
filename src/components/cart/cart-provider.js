"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "3legant-cart";
const CART_CHANGE_EVENT = "3legant-cart-change";

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "[]";
  } catch {
    return "[]";
  }
}

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_CHANGE_EVENT, callback);
  };
}

function readItems() {
  try {
    const storedItems = JSON.parse(getSnapshot());
    if (!Array.isArray(storedItems)) return [];
    return storedItems
      .filter(
        (item) =>
        item.id &&
        item.name &&
        item.image &&
        Number.isFinite(item.unitPrice) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
      )
      .map((item) => ({
        ...item,
        slug: item.slug || item.image.replace(/\.[^.]+$/, ""),
      }));
  } catch {
    return [];
  }
}

function writeItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_CHANGE_EVENT));
  } catch {
    return;
  }
}

export function CartProvider({ children }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  let items;
  try {
    const storedItems = JSON.parse(snapshot);
    items = Array.isArray(storedItems)
      ? storedItems
          .filter(
            (item) =>
            item.id &&
            item.name &&
            item.image &&
            Number.isFinite(item.unitPrice) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0,
          )
          .map((item) => ({
            ...item,
            slug: item.slug || item.image.replace(/\.[^.]+$/, ""),
          }))
      : [];
  } catch {
    items = [];
  }
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addItem(product, quantity = 1) {
    const unitPrice = Number.parseFloat(
      String(product.price).replace(/[^\d.]/g, ""),
    );
    const id = product.id || product.image;
    if (
      !id ||
      !Number.isFinite(unitPrice) ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return;
    }

    const currentItems = readItems();
    const existingItem = currentItems.find((item) => item.id === id);
    writeItems(
      existingItem
        ? currentItems.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [
            ...currentItems,
            {
              id,
              slug:
                product.slug ||
                String(product.image).replace(/\.[^.]+$/, ""),
              name: product.name,
              image: product.image,
              variant: product.variant || null,
              unitPrice,
              quantity,
            },
          ],
    );
    setIsCartOpen(true);
  }

  function updateQuantity(id, quantity) {
    const currentItems = readItems();
    writeItems(
      quantity < 1
        ? currentItems.filter((item) => item.id !== id)
        : currentItems.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
    );
  }

  function removeItem(id) {
    writeItems(readItems().filter((item) => item.id !== id));
  }

  const clearCart = useCallback(() => writeItems([]), []);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce(
    (amount, item) => amount + item.unitPrice * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used within a CartProvider");
  return cart;
}
