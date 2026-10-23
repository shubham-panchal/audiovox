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

export default function ProductCard({ product, className = "" }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();
  const productHref = `/products/${product.slug}`;

  return (
    <article className={`group min-w-0 ${className}`}>
      <div className="relative aspect-[152/203] overflow-hidden bg-[#f3f5f7] min-[700px]:aspect-[3/4]">
        <Link
          className="absolute inset-0"
          href={productHref}
          aria-label={`View ${product.name}`}
        >
          <Image
            className="object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.035]"
            src={`/3legant/${product.image}`}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 44vw, (max-width: 1100px) 30vw, 22vw"
          />
        </Link>
        {product.badge ? (
          <span
            className={`absolute top-3.5 left-3 z-[1] inline-flex min-h-6 items-center rounded px-2.5 py-1 text-xs font-bold uppercase leading-4 ${product.badge === "-50%" ? "bg-[#38cb89] text-white" : "bg-[#fefefe] text-[#141718]"} min-[700px]:top-4 min-[700px]:left-4 min-[700px]:px-3`}
          >
            {product.badge}
          </span>
        ) : null}
        <button
          className={`absolute top-4 right-4 z-[1] grid size-9 place-items-center rounded-full border-0 bg-[#fefefe] p-0 shadow-[0_4px_12px_rgba(15,15,15,0.12)] ${isFavorite ? "bg-[#fff1f0]" : ""}`}
          type="button"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((favorite) => !favorite)}
        >
          <Image src="/3legant/heart.svg" alt="" width={20} height={20} />
        </button>
        <button
          className="absolute right-3 bottom-3 left-3 min-h-[42px] rounded-md border-0 bg-[#141718] text-sm font-medium text-white transition-all duration-150 hover:bg-[#30383a] min-[700px]:bottom-4 min-[700px]:translate-y-2 min-[700px]:opacity-0 min-[700px]:group-hover:translate-y-0 min-[700px]:group-hover:opacity-100 min-[700px]:group-focus-within:translate-y-0 min-[700px]:group-focus-within:opacity-100"
          type="button"
          onClick={() => addItem(product)}
        >
          Add to cart
        </button>
      </div>
      <div className="pt-3">
        <div className="mb-1 flex gap-0.5" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }, (_, index) => (
            <Image
              key={index}
              src="/3legant/star.svg"
              alt=""
              width={16}
              height={16}
            />
          ))}
        </div>
        <h3 className="mb-0 line-clamp-2 min-h-11 overflow-hidden text-sm font-semibold leading-[22px] text-[#141718] min-[1100px]:text-base min-[1100px]:leading-6">
          <Link
            className="text-inherit no-underline hover:underline"
            href={productHref}
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-[3px] text-sm font-semibold leading-[22px]">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
