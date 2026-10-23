import Image from "next/image";
import Link from "next/link";

const countdown = [
  ["02", "Days"],
  ["12", "Hours"],
  ["45", "Minutes"],
  ["05", "Seconds"],
];

export default function PromotionSection() {
  return (
    <section
      className="flex flex-col bg-[#ffab00]/40 min-[700px]:min-h-[520px] min-[700px]:flex-row"
      id="promotion"
    >
      <div className="flex flex-col items-start gap-5 px-8 py-10 min-[700px]:w-1/2 min-[700px]:justify-center min-[700px]:px-[max(5vw,calc((100vw-1240px)/2))] min-[700px]:py-14">
        <div className="flex flex-col gap-3">
          <p className="m-0 text-sm font-bold uppercase leading-[22px] text-[#377dff]">
            Promotion
          </p>
          <h2 className="m-0 font-brand text-[34px] font-medium leading-[1.12] min-[700px]:text-[40px] min-[700px]:leading-[44px]">
            Hurry up! 40% OFF
          </h2>
          <p className="m-0 text-sm leading-[22px]">
            Thousands of high tech are waiting for you
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="m-0 text-base leading-[26px]">Offer expires in:</p>
          <div className="flex gap-2">
            {countdown.map(([value, label]) => (
              <div
                className="flex w-[60px] flex-col items-center gap-0.5"
                key={label}
              >
                <span className="grid size-[60px] place-items-center bg-[#fefefe] font-brand text-[28px] font-medium leading-[38px] text-[#141718]">
                  {value}
                </span>
                <small className="text-[11px] leading-[18px]">{label}</small>
              </div>
            ))}
          </div>
        </div>
        <Link
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#141718] px-10 py-2 text-sm font-medium leading-6 text-white transition-transform hover:-translate-y-0.5"
          href="#best-sellers"
        >
          Shop now
        </Link>
      </div>
      <div className="relative min-h-[367px] overflow-hidden min-[700px]:min-h-[520px] min-[700px]:w-1/2">
        <Image
          className="object-cover"
          src="/3legant/product-12.png"
          alt="Customer wearing wireless headphones"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
