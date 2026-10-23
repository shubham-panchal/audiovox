"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import MobileMenuDrawer from "@/components/layout/mobile-menu-drawer";
import CartDrawer from "@/components/cart/cart-drawer";

export default function StorefrontHeader() {
  const [showPromotion, setShowPromotion] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();

  return (
    <header className="relative z-[5]">
      {showPromotion ? (
        <div className="relative flex min-h-10 items-center justify-center bg-[#141718] px-11 py-2 text-[#fefefe]">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold leading-5">
            <Image
              src="/3legant/ticket-percent.svg"
              alt=""
              width={16}
              height={16}
            />
            <p className="m-0">30% off storewide — Limited time!</p>
            <Link
              className="hidden text-[#ffab00] underline underline-offset-4 min-[700px]:inline"
              href="/#promotion"
            >
              Shop now
            </Link>
          </div>
          <button
            className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center border-0 bg-transparent p-0"
            type="button"
            aria-label="Dismiss promotion"
            onClick={() => setShowPromotion(false)}
          >
            <Image src="/3legant/close.svg" alt="" width={16} height={16} />
          </button>
        </div>
      ) : null}
      <div className="flex h-[60px] items-center justify-between bg-[linear-gradient(90deg,rgba(255,171,0,0.64),rgba(255,255,255,0.64))] px-8 min-[700px]:h-[72px] min-[700px]:px-[5vw]">
        <div className="flex items-center gap-1 min-[700px]:flex-1">
          <button
            className="grid h-8 w-7 place-items-center border-0 bg-transparent p-0 min-[700px]:hidden"
            type="button"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Image src="/3legant/menu.svg" alt="" width={24} height={24} />
          </button>
          <Link
            className="font-brand text-xl font-medium leading-none min-[700px]:text-2xl"
            href="/#home"
          >
            3legant<span className="text-[#6c7275]">.</span>
          </Link>
        </div>
        <nav
          className="hidden items-center gap-9 min-[700px]:flex"
          aria-label="Main navigation"
        >
          <Link
            className="py-2 text-sm font-medium text-[#141718] transition-colors hover:text-[#141718]"
            href="/#home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="py-2 text-sm font-medium text-[#6c7275] transition-colors hover:text-[#141718]"
            href="/#shop"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            className="py-2 text-sm font-medium text-[#6c7275] transition-colors hover:text-[#141718]"
            href="/#best-sellers"
            onClick={() => setMenuOpen(false)}
          >
            Product
          </Link>
          <Link
            className="py-2 text-sm font-medium text-[#6c7275] transition-colors hover:text-[#141718]"
            href="/#instagram"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            className="py-2 text-sm font-medium text-[#6c7275] transition-colors hover:text-[#141718]"
            href="/#newsletter"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center gap-2 min-[700px]:flex-1 min-[700px]:justify-end min-[700px]:gap-4">
          <button
            className="hidden size-10 place-items-center border-0 bg-transparent p-0 min-[700px]:inline-grid"
            type="button"
            aria-label="Search"
          >
            <svg
              className="size-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.6]"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </button>
          <button
            className="hidden size-10 place-items-center border-0 bg-transparent p-0 min-[700px]:inline-grid"
            type="button"
            aria-label="Account"
          >
            <svg
              className="size-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.6]"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.3" />
              <path d="M5 20c.6-3.5 3.1-5.3 7-5.3s6.4 1.8 7 5.3" />
            </svg>
          </button>
          <button
            className="relative grid size-9 place-items-center border-0 bg-transparent p-0"
            type="button"
            aria-label={`Shopping bag, ${itemCount} items`}
            onClick={() => setIsCartOpen(true)}
          >
            <Image
              src="/3legant/shopping-bag.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="absolute right-0 top-px grid size-[18px] place-items-center rounded-full border-2 border-[#ffd584] bg-[#141718] text-[10px] font-bold leading-none text-[#ffab00]">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <MobileMenuDrawer onClose={() => setMenuOpen(false)} />
      ) : null}
      <CartDrawer />
    </header>
  );
}
