import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#141718] px-8 py-12 pb-8 text-[#fefefe] min-[700px]:px-[5vw] min-[700px]:pt-16">
      <div className="flex flex-col items-center gap-8 min-[700px]:flex-row min-[700px]:justify-between min-[700px]:gap-10">
        <div className="flex flex-col items-center gap-4 min-[700px]:flex-row min-[700px]:gap-6">
          <Link
            className="font-brand text-2xl font-medium leading-none"
            href="/#home"
          >
            3legant<span className="text-[#6c7275]">.</span>
          </Link>
          <span className="h-6 w-px bg-[#6c7275]" />
          <p className="m-0 text-sm leading-[22px] text-[#e8ecef]">
            Headphone Store
          </p>
        </div>
        <nav
          className="flex flex-col items-center gap-[18px] text-sm leading-[22px] min-[700px]:flex-row min-[700px]:gap-7"
          aria-label="Footer navigation"
        >
          <Link href="/#home">Home</Link>
          <Link href="/#shop">Shop</Link>
          <Link href="/#best-sellers">Product</Link>
          <Link href="/#instagram">Blog</Link>
          <Link href="/#newsletter">Contact Us</Link>
        </nav>
      </div>
      <div className="mt-10 flex flex-col items-center gap-6 border-t border-[#6c7275] pt-6 min-[700px]:flex-row-reverse min-[700px]:justify-between">
        <div className="flex gap-6">
          <a
            className="grid size-6 place-items-center"
            href="https://www.instagram.com/"
            aria-label="Instagram"
          >
            <Image
              src="/3legant/social-instagram.svg"
              alt=""
              width={24}
              height={24}
            />
          </a>
          <a
            className="grid size-6 place-items-center"
            href="https://www.facebook.com/"
            aria-label="Facebook"
          >
            <Image
              src="/3legant/social-facebook.svg"
              alt=""
              width={24}
              height={24}
            />
          </a>
          <a
            className="grid size-6 place-items-center"
            href="https://www.youtube.com/"
            aria-label="YouTube"
          >
            <Image
              src="/3legant/social-youtube.svg"
              alt=""
              width={24}
              height={24}
            />
          </a>
        </div>
        <div className="flex flex-col items-center gap-[18px] text-center text-xs leading-5 text-[#e8ecef] min-[700px]:flex-row min-[700px]:gap-7">
          <div className="flex gap-6 font-semibold text-[#fefefe]">
            <Link href="#footer">Privacy Policy</Link>
            <Link href="#footer">Terms of Use</Link>
          </div>
          <p className="m-0">Copyright © 2023 3legant. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
