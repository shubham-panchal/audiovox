import Image from "next/image";
import Link from "next/link";

export default function SectionHeading({
  children,
  href,
  linkText = "More Products",
  className = "",
}) {
  return (
    <div
      className={`mb-8 flex items-end justify-between gap-4 pr-8 min-[700px]:mb-9 min-[700px]:pr-0 ${className}`}
    >
      <h2 className="m-0 font-brand text-[34px] font-medium leading-[1.12] min-[1100px]:text-[40px] min-[1100px]:leading-[44px]">
        {children}
      </h2>
      {href ? (
        <Link
          className="inline-flex shrink-0 items-center gap-1 border-b border-[#141718] pb-1 text-sm font-medium leading-6"
          href={href}
        >
          {linkText}
          <Image src="/3legant/arrow-link.svg" alt="" width={16} height={16} />
        </Link>
      ) : null}
    </div>
  );
}
