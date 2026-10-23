import StorefrontHeader from "@/components/layout/storefront-header";
import SiteFooter from "@/components/layout/site-footer";
import BrandStrip from "@/components/home/brand-strip";
import BenefitsSection from "@/components/home/benefits-section";
import CollectionSection from "@/components/home/collection-section";
import HeroSection from "@/components/home/hero-section";
import InstagramSection from "@/components/home/instagram-section";
import NewsletterSection from "@/components/home/newsletter-section";
import ProductSection from "@/components/home/product-section";
import PromotionSection from "@/components/home/promotion-section";

export default function HomePage({ bestSellers, newArrivals }) {
  return (
    <>
      <StorefrontHeader />
      <main>
        <HeroSection />
        <BrandStrip />
        <ProductSection
          id="new-arrivals"
          title="New Arrivals"
          products={newArrivals}
          variant="arrivals"
        />
        <CollectionSection />
        <ProductSection
          id="best-sellers"
          title="Best Seller"
          products={bestSellers}
          variant="best-sellers"
          linkText="Shop All"
        />
        <PromotionSection />
        <BenefitsSection />
        <InstagramSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
