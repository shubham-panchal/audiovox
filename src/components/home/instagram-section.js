import Image from "next/image";
import { instagramImages } from "@/data/homepage";

export default function InstagramSection() {
  return (
    <section
      className="px-8 pt-10 pb-12 min-[700px]:px-[5vw] min-[700px]:pt-14 min-[700px]:pb-[72px]"
      id="instagram"
    >
      <div className="mx-auto mb-8 flex flex-col items-center gap-3 text-center">
        <p className="m-0 text-base font-bold uppercase leading-5 text-[#6c7275]">
          Newsfeed
        </p>
        <h2 className="m-0 font-brand text-[34px] font-medium leading-[1.12] min-[1100px]:text-[40px] min-[1100px]:leading-[44px]">
          Instagram
        </h2>
        <p className="m-0 max-w-[350px] text-sm leading-[22px]">
          Follow us on social media for more discount &amp; promotions
        </p>
        <a
          className="font-brand text-xl font-medium leading-7 text-[#6c7275]"
          href="https://www.instagram.com/"
        >
          @3legant_official
        </a>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-4 min-[700px]:grid-cols-4">
        {instagramImages.map((image, index) => (
          <Image
            key={image}
            src={`/3legant/${image}`}
            alt={`3legant community photo ${index + 1}`}
            width={312}
            height={312}
            sizes="(max-width: 700px) 84vw, 22vw"
            className="aspect-square w-full max-w-[420px] object-cover min-[700px]:max-w-none"
          />
        ))}
      </div>
    </section>
  );
}
