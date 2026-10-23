"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";

const colorValues = {
  Black: "#141718",
  White: "#fefefe",
  Silver: "#b8bec2",
};

function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function ProductDetail({ product }) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || "Black",
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const colorOptions = (product.colors || []).map((name) => ({
    name,
    value: colorValues[name] || "#b8bec2",
  }));

  return (
    <>
      <main className="px-6 pb-16 pt-8 min-[700px]:px-[5vw] min-[700px]:pb-24 min-[700px]:pt-10">
        <div className="mx-auto max-w-[1120px]">
          <nav
            className="mb-6 flex items-center gap-2 text-xs leading-5 text-[#6c7275]"
            aria-label="Breadcrumb"
          >
            <Link className="hover:text-[#141718]" href="/#shop">
              Shop
            </Link>
            <span aria-hidden="true">/</span>
            <span className="truncate text-[#141718]" aria-current="page">
              {product.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 gap-8 min-[800px]:grid-cols-2 min-[800px]:gap-12">
            <div className="relative aspect-square overflow-hidden bg-[#f3f5f7]">
              <Image
                className="object-contain mix-blend-multiply"
                src={`/3legant/${product.image}`}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              {product.badge ? (
                <span className="absolute left-4 top-4 rounded-sm bg-white px-3 py-1 text-xs font-bold uppercase leading-5 text-[#141718]">
                  {product.badge}
                </span>
              ) : null}
            </div>

            <section className="flex flex-col items-start pt-1">
              <div
                className="flex items-center gap-1"
                aria-label="Rated 5 out of 5"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Image
                    key={index}
                    src="/3legant/star.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                ))}
                <span className="ml-2 text-xs leading-5 text-[#6c7275]">
                  5.0 · Customer favorite
                </span>
              </div>

              <h1 className="mb-0 mt-4 max-w-xl font-brand text-[32px] font-medium leading-[1.15] text-[#141718] min-[1100px]:text-[40px]">
                {product.name}
              </h1>
              <p className="mb-0 mt-4 text-2xl font-semibold leading-8 text-[#141718]">
                {formatPrice(product.price)}
              </p>
              <p className="mb-0 mt-5 max-w-xl text-base leading-[26px] text-[#6c7275]">
                {product.description}
              </p>

              <fieldset className="mt-8 w-full border-0 p-0">
                <legend className="mb-3 text-sm font-semibold leading-[22px] text-[#141718]">
                  Color: {selectedColor}
                </legend>
                <div className="flex items-center gap-3">
                  {colorOptions.map((color) => (
                    <button
                      className={`grid size-10 place-items-center rounded-full border bg-white p-1 ${selectedColor === color.name ? "border-[#141718]" : "border-[#e8ecef]"}`}
                      key={color.name}
                      type="button"
                      aria-label={color.name}
                      aria-pressed={selectedColor === color.name}
                      onClick={() => setSelectedColor(color.name)}
                    >
                      <span
                        className="size-full rounded-full border border-black/10"
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 flex w-full flex-col gap-3 min-[500px]:flex-row">
                <div className="flex h-12 w-full items-center justify-between border border-[#6c7275] px-3 min-[500px]:w-36">
                  <button
                    className="grid size-8 place-items-center border-0 bg-transparent p-0 text-[#141718] disabled:cursor-not-allowed disabled:text-[#b8bec2]"
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
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
                  <span className="min-w-6 text-center text-sm font-semibold text-[#141718]">
                    {quantity}
                  </span>
                  <button
                    className="grid size-8 place-items-center border-0 bg-transparent p-0 text-[#141718]"
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((value) => value + 1)}
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
                <button
                  className="flex min-h-12 flex-1 items-center justify-center rounded-md border-0 bg-[#141718] px-6 text-base font-medium text-white transition-colors hover:bg-[#30383a]"
                  type="button"
                  onClick={() =>
                    addItem(
                      {
                        ...product,
                        id: `${product.slug}-${selectedColor}`,
                        variant: selectedColor,
                      },
                      quantity,
                    )
                  }
                >
                  Add to cart
                </button>
              </div>

              <p className="mb-0 mt-5 text-sm leading-[22px] text-[#6c7275]">
                Free shipping on orders over $200 · 30-day returns
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
