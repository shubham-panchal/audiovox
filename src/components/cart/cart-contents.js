"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";

function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function CartContents({ isPage = false, onClose }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState("");

  return (
    <div
      className={`flex min-h-0 flex-col ${isPage ? "min-h-[620px]" : "h-full"}`}
    >
      <div className="flex min-h-[34px] items-center justify-between gap-4">
        <h1 className="m-0 font-brand text-[28px] font-medium leading-[34px] tracking-[-0.6px] text-[#121212]">
          Cart
        </h1>
        {!isPage ? (
          <button
            className="grid size-6 shrink-0 place-items-center border-0 bg-transparent p-0 text-[#6c7275] hover:text-[#141718]"
            type="button"
            aria-label="Close cart"
            onClick={onClose}
          >
            <Image src="/3legant/close.svg" alt="" width={24} height={24} />
          </button>
        ) : null}
      </div>

      {items.length ? (
        <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-y-auto">
          {items.map((item) => (
            <article
              className="flex items-center border-b border-[#e8ecef] py-6"
              key={item.id}
            >
              <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-[#f3f5f7]">
                <Image
                  className="object-contain mix-blend-multiply"
                  src={`/3legant/${item.image}`}
                  alt={item.name}
                  fill
                  sizes="80px"
                />
              </div>
              <div className="ml-4 flex min-w-0 flex-1 items-start justify-between gap-2 self-stretch">
                <div className="flex min-w-0 flex-col items-start justify-center gap-2">
                  <h2 className="m-0 line-clamp-2 text-sm font-semibold leading-[22px] text-[#141718]">
                    {item.name}
                  </h2>
                  <p className="m-0 text-xs leading-5 text-[#6c7275]">
                    {item.variant ? `Color: ${item.variant}` : "Wireless audio"}
                  </p>
                  <div
                    className="flex h-8 w-20 items-center justify-between rounded border border-[#6c7275] px-2"
                    aria-label={`Quantity: ${item.quantity}`}
                  >
                    <button
                      className="grid size-4 place-items-center border-0 bg-transparent p-0 text-[#141718]"
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <svg
                        className="size-4"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8h10" />
                      </svg>
                    </button>
                    <span className="text-xs font-semibold leading-5 text-[#121212]">
                      {item.quantity}
                    </span>
                    <button
                      className="grid size-4 place-items-center border-0 bg-transparent p-0 text-[#141718]"
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <svg
                        className="size-4"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8h10M8 3v10" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end justify-center gap-2">
                  <span className="text-sm font-semibold leading-[22px] text-[#121212]">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                  <button
                    className="grid size-6 place-items-center border-0 bg-transparent p-0 text-[#6c7275] hover:text-[#141718]"
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => removeItem(item.id)}
                  >
                    <Image
                      src="/3legant/close.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
          <Image
            src="/3legant/shopping-bag.svg"
            alt=""
            width={40}
            height={40}
          />
          <h2 className="mb-1 mt-4 font-brand text-xl font-medium text-[#141718]">
            Your cart is empty
          </h2>
          <p className="m-0 max-w-56 text-sm leading-6 text-[#6c7275]">
            Find something you love and it will show up here.
          </p>
          <Link
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#141718] px-6 text-sm font-medium text-white"
            href="/#best-sellers"
            onClick={onClose}
          >
            Continue shopping
          </Link>
        </div>
      )}

      {items.length ? (
        <div className="mt-4 shrink-0">
          <div className="flex items-center justify-between border-b border-[#e8ecef] py-3 text-base leading-[26px]">
            <span>Subtotal</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between py-3 font-brand text-xl font-medium leading-7 text-[#141718]">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button
            className="flex min-h-[52px] w-full items-center justify-center rounded-md border-0 bg-[#141718] px-6 text-lg font-medium leading-8 tracking-[-0.4px] text-white transition-colors hover:bg-[#30383a]"
            type="button"
            onClick={() =>
              setCheckoutMessage("Checkout is not connected in this demo yet.")
            }
          >
            Checkout
          </button>
          {checkoutMessage ? (
            <p
              className="mb-0 mt-2 text-center text-xs leading-5 text-[#6c7275]"
              role="status"
            >
              {checkoutMessage}
            </p>
          ) : null}
          {!isPage ? (
            <div className="mt-3 text-center">
              <Link
                className="border-b border-[#121212] pb-0.5 text-sm font-semibold leading-[22px] text-[#121212]"
                href="/cart"
                onClick={onClose}
              >
                View Cart
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
