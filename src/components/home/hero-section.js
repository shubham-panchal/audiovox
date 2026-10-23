import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[690px] overflow-hidden bg-[#ffc95c] min-[700px]:grid min-[700px]:min-h-[610px] min-[700px]:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] min-[700px]:items-center min-[1100px]:min-h-[680px]"
      id="home"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[30%] bg-gradient-to-b from-[#ffc95c]/[0.98] to-transparent min-[700px]:hidden" />
      <div className="relative z-[2] mx-auto flex max-w-[440px] flex-col items-center gap-[14px] px-8 pt-12 text-center min-[700px]:ml-[max(5vw,calc((100vw-1240px)/2))] min-[700px]:mr-0 min-[700px]:max-w-[600px] min-[700px]:items-start min-[700px]:gap-5 min-[700px]:py-12 min-[700px]:pr-6 min-[700px]:pl-0 min-[700px]:text-left">
        <p className="m-0 hidden text-sm font-semibold uppercase leading-[22px] text-[#141718] min-[700px]:block">
          Sound that moves with you
        </p>
        <h1 className="m-0 font-brand text-[40px] font-medium leading-[1.1] min-[700px]:max-w-[560px] min-[700px]:text-[56px] min-[700px]:leading-[1.08] min-[1100px]:text-[64px]">
          Listen to the <span className="text-[#377dff]">amazing</span> music
          sound.
        </h1>
        <p className="m-0 text-base leading-[26px]">
          Experience music like never before
        </p>
        <Link
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#141718] px-10 py-3 text-sm font-medium leading-6 text-white transition-transform duration-150 hover:-translate-y-0.5"
          href="#new-arrivals"
        >
          Shopping Now
        </Link>
      </div>
      <div className="absolute right-[-61%] bottom-0 h-[55%] w-[190%] overflow-hidden min-[700px]:relative min-[700px]:right-auto min-[700px]:bottom-auto min-[700px]:h-full min-[700px]:min-h-[610px] min-[700px]:w-full min-[1100px]:min-h-[680px]">
        <Image
          className="object-cover object-[66%_50%] min-[700px]:object-[63%_center]"
          src="/3legant/hero-model.png"
          alt="Music fan enjoying a pair of headphones"
          fill
          priority
          sizes="(max-width: 700px) 100vw, 54vw"
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-5 z-[2] flex justify-center gap-2 min-[700px]:right-[5vw] min-[700px]:bottom-6 min-[700px]:left-auto"
        aria-label="Slide 1 of 3"
      >
        <span className="h-2 w-6 rounded-full bg-[#141718]" />
        <span className="size-2 rounded-full bg-[#141718]/35" />
        <span className="size-2 rounded-full bg-[#141718]/35" />
      </div>
    </section>
  );
}
