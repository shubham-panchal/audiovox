import StorefrontHeader from "@/components/layout/storefront-header";
import SiteFooter from "@/components/layout/site-footer";
import CartContents from "@/components/cart/cart-contents";

export default function CartPage() {
  return (
    <>
      <StorefrontHeader />
      <main className="px-6 py-10 min-[700px]:px-[5vw] min-[700px]:py-16">
        <div className="mx-auto min-h-[620px] max-w-[1120px]">
          <CartContents isPage />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
