import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/homepage";
import SectionHeading from "@/components/home/section-heading";

function CollectionCard({ collection }) {
  return (
    <Link
      className={`group relative block min-h-[180px] overflow-hidden bg-[#f3f5f7] after:absolute after:inset-x-0 after:top-[35%] after:bottom-0 after:bg-gradient-to-b after:from-transparent after:to-[#f3f5f7]/85 after:content-[''] ${collection.className === "collection-main" ? "min-h-[377px] min-[700px]:min-h-[520px] min-[700px]:row-span-2" : "min-[700px]:min-h-[248px]"}`}
      href="#best-sellers"
    >
      <Image
        className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.035]"
        src={`/3legant/${collection.image}`}
        alt={`${collection.name} collection`}
        fill
        sizes="(max-width: 700px) 84vw, 40vw"
      />
      <span className="absolute right-6 bottom-6 left-6 z-[1] flex flex-col items-start gap-1.5 min-[700px]:right-8 min-[700px]:bottom-8 min-[700px]:left-8">
        <span className="font-brand text-[28px] font-medium leading-[34px]">
          {collection.name}
        </span>
        <span className="inline-flex items-center gap-1 border-b border-[#141718] text-sm font-medium leading-6">
          Collection
          <Image src="/3legant/arrow-link.svg" alt="" width={16} height={16} />
        </span>
      </span>
    </Link>
  );
}

export default function CollectionSection() {
  return (
    <section
      className="px-8 py-12 min-[700px]:px-[5vw] min-[700px]:py-16"
      id="shop"
    >
      <div className="mb-4 flex justify-center text-center min-[700px]:mb-8">
        <SectionHeading className="justify-center p-0 text-center">
          Shop Collection
        </SectionHeading>
      </div>
      <div className="flex flex-col gap-4 min-[700px]:grid min-[700px]:grid-cols-2 min-[700px]:grid-rows-2 min-[700px]:gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.name} collection={collection} />
        ))}
      </div>
    </section>
  );
}
