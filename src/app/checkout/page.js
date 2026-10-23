import StorefrontHeader from "@/components/layout/storefront-header";
import SiteFooter from "@/components/layout/site-footer";
import CheckoutForm from "@/components/checkout/checkout-form";

export default function Page() {
  return (
    <>
      <StorefrontHeader />
      <main className="px-6 py-10 min-[700px]:px-[5vw] min-[700px]:py-16">
        <CheckoutForm />
      </main>
      <SiteFooter />
    </>
  );
}
