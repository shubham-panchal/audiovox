import Image from "next/image";
import { benefits } from "@/data/homepage";

export default function BenefitsSection() {
  return (
    <section
      className="grid grid-cols-2 gap-2 p-8 min-[700px]:grid-cols-4 min-[700px]:gap-6 min-[700px]:px-[5vw] min-[700px]:py-[72px]"
      aria-label="Shopping benefits"
    >
      {benefits.map((benefit) => (
        <article
          className="min-h-[190px] bg-[#f3f5f7] px-4 py-6 min-[700px]:min-h-[205px] min-[700px]:px-6 min-[700px]:py-8"
          key={benefit.title}
        >
          <Image
            src={`/3legant/${benefit.image}`}
            alt=""
            width={48}
            height={48}
            className="mb-[14px]"
          />
          <h3 className="mb-1 text-sm font-semibold leading-[22px] text-[#141718]">
            {benefit.title}
          </h3>
          <p className="m-0 text-sm leading-[22px] text-[#6c7275]">
            {benefit.detail}
          </p>
        </article>
      ))}
    </section>
  );
}
