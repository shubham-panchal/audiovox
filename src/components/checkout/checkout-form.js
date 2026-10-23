"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createDemoOrderAction } from "@/app/orders/actions";
import { useCart } from "@/components/cart/cart-provider";

const initialState = { error: "" };

function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function CheckoutForm() {
  const { items, subtotal } = useCart();
  const [state, formAction] = useActionState(createDemoOrderAction, initialState);

  if (!items.length) {
    return (
      <section className="mx-auto flex min-h-[360px] max-w-xl flex-col items-center justify-center text-center">
        <Image
          src="/3legant/shopping-bag.svg"
          alt=""
          width={40}
          height={40}
        />
        <h1 className="mb-1 mt-4 font-brand text-2xl font-medium text-[#141718]">
          Your cart is empty
        </h1>
        <p className="m-0 text-sm leading-6 text-[#6c7275]">
          Add something to your cart before proceeding to checkout.
        </p>
        <Link
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#141718] px-6 text-sm font-medium text-white"
          href="/#best-sellers"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1000px] gap-10 min-[850px]:grid-cols-[1fr_0.8fr] min-[850px]:gap-16">
      <section>
        <h1 className="m-0 font-brand text-3xl font-medium text-[#141718] min-[700px]:text-4xl">
          Checkout
        </h1>
        <p className="mb-0 mt-2 text-sm leading-6 text-[#6c7275]">
          Step 2 of 2 · Enter your details to place a demo order.
        </p>

        <form action={formAction} className="mt-8 space-y-5">
          <input
            type="hidden"
            name="cartItems"
            value={JSON.stringify(
              items.map(({ slug, variant, quantity }) => ({
                slug,
                variant,
                quantity,
              })),
            )}
          />
          <label className="block text-sm font-medium text-[#141718]">
            Name
            <input
              className="mt-2 h-12 w-full rounded border border-[#b8bec2] px-3 text-sm"
              type="text"
              name="customerName"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
            />
          </label>
          <label className="block text-sm font-medium text-[#141718]">
            Email
            <input
              className="mt-2 h-12 w-full rounded border border-[#b8bec2] px-3 text-sm"
              type="email"
              name="customerEmail"
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>
          <p className="m-0 text-sm leading-6 text-[#6c7275]">
            Demo order only. This will not charge you or ship products. The
            server checks current product prices and options before saving.
          </p>
          {state.error ? (
            <p className="m-0 text-sm text-red-700" role="alert">
              {state.error}
            </p>
          ) : null}
          <SubmitButton />
        </form>

        <Link
          className="mt-5 inline-flex min-h-10 items-center text-sm font-medium text-[#6c7275] underline underline-offset-4 hover:text-[#141718]"
          href="/cart"
        >
          Back to cart
        </Link>
      </section>

      <aside className="h-fit rounded-md bg-[#f3f5f7] p-5 min-[700px]:p-7">
        <h2 className="m-0 font-brand text-xl font-medium text-[#141718]">
          Order summary
        </h2>
        <div className="mt-3 divide-y divide-[#dfe3e6]">
          {items.map((item) => (
            <article
              className="flex items-center gap-3 py-4"
              key={item.id}
            >
              <div className="relative size-16 shrink-0 overflow-hidden bg-white">
                <Image
                  className="object-contain mix-blend-multiply"
                  src={`/3legant/${item.image}`}
                  alt={item.name}
                  fill
                  sizes="64px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="m-0 line-clamp-2 text-sm font-semibold text-[#141718]">
                  {item.name}
                </h3>
                <p className="mb-0 mt-1 text-xs text-[#6c7275]">
                  {item.variant ? `Color: ${item.variant} · ` : ""}
                  Qty {item.quantity}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-[#141718]">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </article>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-[#c9cfd3] pt-4 text-base font-semibold text-[#141718]">
          <span>Estimated total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mb-0 mt-2 text-xs leading-5 text-[#6c7275]">
          The final demo order total is calculated from current catalog prices.
        </p>
      </aside>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex min-h-[52px] w-full items-center justify-center rounded-md border-0 bg-[#141718] px-6 text-base font-medium text-white transition-colors hover:bg-[#30383a] disabled:cursor-wait disabled:opacity-60"
      type="submit"
      disabled={pending}
    >
      {pending ? "Saving order..." : "Place demo order"}
    </button>
  );
}
