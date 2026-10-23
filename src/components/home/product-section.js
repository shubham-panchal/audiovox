import ProductCard from "@/components/product/product-card";
import SectionHeading from "@/components/home/section-heading";

export default function ProductSection({
  id,
  title,
  products,
  variant,
  linkText = "More Products",
}) {
  const isBestSeller = variant === "best-sellers";
  const sectionClassName = isBestSeller
    ? "px-8 py-10 min-[700px]:px-[5vw] min-[700px]:py-[72px]"
    : "overflow-hidden py-10 pl-8 pr-0 min-[700px]:px-[5vw] min-[700px]:py-[72px]";

  return (
    <section className={sectionClassName} id={id}>
      {isBestSeller ? (
        <SectionHeading
          className="justify-center p-0 text-center min-[700px]:justify-between min-[700px]:text-left"
          href="#best-sellers"
          linkText={linkText}
        >
          {title}
        </SectionHeading>
      ) : (
        <SectionHeading href="#best-sellers">{title}</SectionHeading>
      )}
      <div
        className={
          isBestSeller
            ? "grid grid-cols-2 gap-x-2 gap-y-7 min-[700px]:grid-cols-4 min-[700px]:gap-x-6 min-[700px]:gap-y-10"
            : "flex gap-4 overflow-x-auto pr-8 pb-2 scrollbar-thin [scrollbar-color:#b8bec2_transparent] min-[700px]:grid min-[700px]:grid-cols-4 min-[700px]:gap-6 min-[700px]:overflow-visible min-[700px]:p-0"
        }
      >
        {products.map((product, index) => (
          <ProductCard
            key={`${product.image}-${index}`}
            product={product}
            className={
              isBestSeller
                ? ""
                : "w-[calc((100vw-80px)/2)] shrink-0 min-[700px]:w-auto min-[700px]:shrink"
            }
          />
        ))}
      </div>
    </section>
  );
}
