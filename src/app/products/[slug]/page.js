import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/product-detail";
import StorefrontHeader from "@/components/layout/storefront-header";
import SiteFooter from "@/components/layout/site-footer";
import {
  getProductBySlug,
  getProductSlugs,
} from "@/lib/products";

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return product
    ? {
        title: `${product.name} | 3legant`,
        description: `Explore ${product.name} at 3legant.`,
      }
    : {};
}

export default function Page({ params }) {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-[60vh] place-items-center px-6 text-sm text-[#6c7275]">
          Loading product...
        </main>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}

async function ProductPageContent({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <StorefrontHeader />
      <ProductDetail product={product} />
      <SiteFooter />
    </>
  );
}
