import NewsletterForm from "@/components/forms/newsletter-form";

export default function NewsletterSection() {
  return (
    <section
      className="bg-[#f3f5f7] px-8 py-18 min-[700px]:px-[5vw] min-[700px]:py-22"
      id="newsletter"
    >
      <div className="mx-auto flex max-w-117.5 flex-col items-center gap-2 text-center">
        <h2 className="m-0 font-brand text-[28px] font-medium leading-8.5">
          Join Our Newsletter
        </h2>
        <p className="m-0 text-sm leading-5.5">
          Sign up for deals, new products and promotions
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
