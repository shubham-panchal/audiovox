"use client";

import Image from "next/image";
import { useState } from "react";

export default function NewsletterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <form
      className="mt-4 flex min-h-[52px] w-full items-center gap-2 border-b border-[#6c7275]/50 text-left"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <Image src="/3legant/email.svg" alt="" width={24} height={24} />
      <input
        id="newsletter-email"
        type="email"
        name="email"
        placeholder="Email address"
        autoComplete="email"
        required
        className="min-w-0 flex-1 border-0 bg-transparent text-base leading-7 text-[#141718] outline-none placeholder:text-[#6c7275]"
      />
      <button
        className="shrink-0 border-0 bg-transparent py-2 pl-2 text-sm font-medium text-[#6c7275]"
        type="submit"
      >
        {isSubmitted ? "Subscribed" : "Signup"}
      </button>
    </form>
  );
}
