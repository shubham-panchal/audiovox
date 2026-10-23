"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";

export default function MobileMenuDrawer({ onClose }) {
  const { itemCount } = useCart();
  const [shopExpanded, setShopExpanded] = useState(false);
  const [productExpanded, setProductExpanded] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex min-h-dvh items-stretch min-[700px]:hidden">
      <button
        className="absolute inset-0 h-full w-full cursor-default border-0 bg-black/32"
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <aside
        className="relative flex h-dvh min-h-dvh w-full flex-col justify-between overflow-y-auto bg-white p-6 motion-safe:animate-[drawer-enter_180ms_ease-out_both]"
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-4">
          <div className="flex min-h-6 items-center justify-between">
            <Link
              className="font-brand text-base font-medium leading-6 text-black"
              href="/#home"
              onClick={onClose}
            >
              3legant<span className="text-[#6c7275]">.</span>
            </Link>
            <button
              ref={closeButtonRef}
              className="grid size-6 place-items-center border-0 bg-transparent p-0"
              type="button"
              aria-label="Close navigation"
              onClick={onClose}
            >
              <Image
                src="/3legant/drawer-close.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>

          <nav
            className="flex flex-col gap-4"
            aria-label="Mobile navigation links"
          >
            <Link
              className="flex h-10 w-full items-center border-b border-solid border-[#e8ecef] pb-2 text-sm font-medium leading-6 text-[#141718]"
              href="/#home"
              onClick={onClose}
            >
              Home
            </Link>
            <div>
              <button
                className="flex h-10 w-full items-center justify-between border-0 border-b border-solid border-[#e8ecef] bg-transparent p-0 pb-2 text-left text-sm font-medium leading-6 text-[#141718]"
                type="button"
                aria-expanded={shopExpanded}
                onClick={() => setShopExpanded((expanded) => !expanded)}
              >
                Shop
                <Image
                  className={`transition-transform duration-150 ${shopExpanded ? "rotate-180" : ""}`}
                  src="/3legant/drawer-chevron.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              {shopExpanded ? (
                <div className="flex flex-col gap-1 border-b border-solid border-[#e8ecef] py-2 pl-4 text-sm leading-5.5 text-[#6c7275]">
                  <Link className="py-1" href="/#shop" onClick={onClose}>
                    Shop All
                  </Link>
                  <Link className="py-1" href="/#shop" onClick={onClose}>
                    Headphones
                  </Link>
                  <Link className="py-1" href="/#shop" onClick={onClose}>
                    Earbuds
                  </Link>
                </div>
              ) : null}
            </div>
            <div>
              <button
                className="flex h-10 w-full items-center justify-between border-0 border-b border-solid border-[#e8ecef] bg-transparent p-0 pb-2 text-left text-sm font-medium leading-6 text-[#141718]"
                type="button"
                aria-expanded={productExpanded}
                onClick={() => setProductExpanded((expanded) => !expanded)}
              >
                Product
                <Image
                  className={`transition-transform duration-150 ${productExpanded ? "rotate-180" : ""}`}
                  src="/3legant/drawer-chevron.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              {productExpanded ? (
                <div className="flex flex-col gap-1 border-b border-solid border-[#e8ecef] py-2 pl-4 text-sm leading-5.5 text-[#6c7275]">
                  <Link
                    className="py-1"
                    href="/#new-arrivals"
                    onClick={onClose}
                  >
                    New Arrivals
                  </Link>
                  <Link
                    className="py-1"
                    href="/#best-sellers"
                    onClick={onClose}
                  >
                    Best Sellers
                  </Link>
                </div>
              ) : null}
            </div>
            <Link
              className="flex h-10 w-full items-center border-b border-solid border-[#e8ecef] pb-2 text-sm font-medium leading-6 text-[#141718]"
              href="/#newsletter"
              onClick={onClose}
            >
              Contact Us
            </Link>
          </nav>
        </div>

        <div className="mt-6 flex w-full shrink-0 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Link
              className="flex h-10 items-center justify-between border-b border-solid border-[#e8ecef] pb-2 text-[18px] font-medium leading-8 text-[#6c7275]"
              href="/cart"
            >
              <span>Cart</span>
              <span className="flex items-center gap-1.5">
                <Image
                  src="/3legant/drawer-bag.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="relative grid size-5 place-items-center text-[12px] font-bold leading-none text-white">
                  <Image
                    className="absolute inset-0"
                    src="/3legant/drawer-count.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span className="relative">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                </span>
              </span>
            </Link>
            <Link
              className="flex h-10 items-center justify-between border-b border-solid border-[#e8ecef] pb-2 text-[18px] font-medium leading-8 text-[#6c7275]"
              href="/wishlist"
            >
              <span>Wishlist</span>
              <span className="flex items-center gap-1.5">
                <Image
                  src="/3legant/drawer-heart.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="relative grid size-5 place-items-center text-[12px] font-bold leading-none text-white">
                  <Image
                    className="absolute inset-0"
                    src="/3legant/drawer-count.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span className="relative">2</span>
                </span>
              </span>
            </Link>
          </div>
          <Link
            className="flex min-h-13 w-full items-center justify-center rounded-md bg-[#141718] px-6.5 py-2.5 text-[18px] font-medium leading-8 text-white"
            href="/sign-in"
          >
            Sign In
          </Link>
        </div>
      </aside>
    </div>
  );
}
