"use client";

import { useEffect } from "react";
import CartContents from "@/components/cart/cart-contents";
import { useCart } from "@/components/cart/cart-provider";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen } = useCart();

  useEffect(() => {
    if (!isCartOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsCartOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex min-h-dvh justify-end">
      <button
        className="absolute inset-0 h-full w-full border-0 bg-black/32"
        type="button"
        aria-label="Close cart"
        onClick={() => setIsCartOpen(false)}
      />
      <aside
        className="relative flex h-dvh min-h-dvh w-[calc(100vw-32px)] max-w-[413px] flex-col bg-white px-6 py-6 motion-safe:animate-[drawer-enter_180ms_ease-out_both] min-[700px]:py-10"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <CartContents onClose={() => setIsCartOpen(false)} />
      </aside>
    </div>
  );
}
