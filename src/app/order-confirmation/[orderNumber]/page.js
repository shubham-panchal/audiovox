import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClearCart from "@/app/order-confirmation/[orderNumber]/clear-cart";
import SiteFooter from "@/components/layout/site-footer";
import StorefrontHeader from "@/components/layout/storefront-header";
import { getOrderByNumber } from "@/lib/orders";

function formatPrice(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function Page({ params }) {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-[60vh] place-items-center px-6 text-sm text-[#6c7275]">
          Loading order...
        </main>
      }
    >
      <OrderConfirmation params={params} />
    </Suspense>
  );
}

async function OrderConfirmation({ params }) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);
  if (!order) notFound();

  return (
    <>
      <StorefrontHeader />
      <main className="px-6 py-12 min-[700px]:px-[5vw] min-[700px]:py-20">
        <ClearCart />
        <section className="mx-auto max-w-[720px]">
          <div className="mb-8 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#e8f8f0] text-3xl text-[#16804a]">
              ✓
            </div>
            <p className="mb-1 mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-[#16804a]">
              Demo order placed
            </p>
            <h1 className="m-0 font-brand text-3xl font-medium text-[#141718] min-[700px]:text-4xl">
              Thank you, {order.customerName}
            </h1>
            <p className="mb-0 mt-3 text-sm leading-6 text-[#6c7275]">
              Order number: <span className="font-semibold text-[#141718]">{order.orderNumber}</span>
            </p>
            <p className="mb-0 mt-2 text-sm leading-6 text-[#6c7275]">
              This portfolio demo records orders only. No payment was collected
              and no items will be shipped.
            </p>
          </div>

          <div className="border-y border-[#e8ecef]">
            {order.items.map((item, index) => (
              <article
                className="flex items-center gap-4 border-b border-[#e8ecef] py-5 last:border-b-0"
                key={`${item.slug}-${item.variant || "default"}-${index}`}
              >
                <div className="relative size-20 shrink-0 overflow-hidden bg-[#f3f5f7]">
                  <Image
                    className="object-contain mix-blend-multiply"
                    src={`/3legant/${item.image}`}
                    alt={item.name}
                    fill
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="m-0 text-sm font-semibold text-[#141718]">
                    {item.name}
                  </h2>
                  <p className="mb-0 mt-1 text-xs text-[#6c7275]">
                    {item.variant ? `Color: ${item.variant} · ` : ""}
                    Quantity: {item.quantity}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-[#141718]">
                  {formatPrice(item.lineTotalCents)}
                </span>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-between py-5 text-lg font-semibold text-[#141718]">
            <span>Demo order total</span>
            <span>{formatPrice(order.subtotalCents)}</span>
          </div>

          <div className="text-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#141718] px-7 text-sm font-medium text-white hover:bg-[#30383a]"
              href="/#shop"
            >
              Continue shopping
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
