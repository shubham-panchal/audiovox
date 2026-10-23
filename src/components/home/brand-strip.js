import Image from "next/image";
import { brands } from "@/data/homepage";

export default function BrandStrip() {
  return (
    <section
      className="overflow-hidden bg-[#fefefe] px-8 pt-[26px] pb-[22px] min-[700px]:px-[5vw] min-[700px]:py-7"
      aria-label="Featured brands"
    >
      <div className="flex w-max items-center gap-5 min-[700px]:w-full min-[700px]:justify-between min-[700px]:gap-6">
        {brands.map((brand, index) => (
          <div
            className="grid h-[42px] w-[120px] shrink-0 place-items-center opacity-50"
            key={brand}
          >
            <Image
              src={`/3legant/${brand}`}
              alt={`Featured audio brand ${index + 1}`}
              width={120}
              height={40}
              sizes="120px"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
