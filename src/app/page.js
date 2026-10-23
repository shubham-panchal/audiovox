import { Suspense } from "react";
import {
  getBestSellers,
  getCatalogMode,
  getMockBestSellers,
  getMockNewArrivals,
  getNewArrivals,
} from "@/lib/products";
import HomePage from "@/components/home/home-page";

export default function Page() {
  if (getCatalogMode() === "mock") {
    return (
      <HomePage
        newArrivals={getMockNewArrivals()}
        bestSellers={getMockBestSellers()}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <main className="grid min-h-[60vh] place-items-center px-6 text-sm text-[#6c7275]">
          Loading products...
        </main>
      }
    >
      <MongoCatalogHomePage />
    </Suspense>
  );
}

async function MongoCatalogHomePage() {
  const [newArrivals, bestSellers] = await Promise.all([
    getNewArrivals(),
    getBestSellers(),
  ]);

  return <HomePage newArrivals={newArrivals} bestSellers={bestSellers} />;
}
