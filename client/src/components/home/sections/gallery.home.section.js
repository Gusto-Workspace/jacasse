import Image from "next/image";
import RevealOnScrollComponent from "../../_shared/motion/reveal-on-scroll.component";

const images = [
  "/img/home/carousel-4.webp",
  "/img/home/carousel-1.webp",
  "/img/home/carousel-2.webp",
  "/img/home/carousel-5.webp",
  "/img/home/carousel-6.webp",
  "/img/home/carousel-3.webp",
];

export default function GalleryHomeSection() {
  return (
    <section className="bg-[var(--site-cream)] px-1 pb-6 pt-10 tablet:px-2 desktop:px-0 desktop:py-24">
      <RevealOnScrollComponent className="flex items-center justify-center gap-3 px-5 text-center tablet:px-8 desktop:px-12">
        <div className="relative h-6 w-10 rotate-[215deg]">
          <Image src="/img/_shared/ornement.webp" alt="" fill sizes="40px" className="object-contain" />
        </div>
        <h2 className="yeseva-one-regular text-[34px] uppercase leading-[0.95] text-[var(--site-ink)] tablet:text-[48px] desktop:text-[56px]">
          Jacasse en images
        </h2>
        <div className="relative h-6 w-10 rotate-[30deg]">
          <Image src="/img/_shared/ornement.webp" alt="" fill sizes="40px" className="object-contain" />
        </div>
      </RevealOnScrollComponent>

      <div className="mt-7 grid grid-cols-2 gap-2 min-[900px]:grid-cols-3 desktop:grid-cols-6">
        {images.map((src, index) => (
          <RevealOnScrollComponent
            key={src}
            delay={index * 55}
            variant="zoom"
            className="relative aspect-[1.04] overflow-hidden rounded-[4px] bg-black"
          >
            <Image
              src={src}
              alt="Jacasse en images"
              fill
              sizes="(min-width: 1024px) 16vw, 50vw"
              className="object-cover"
            />
          </RevealOnScrollComponent>
        ))}
      </div>
    </section>
  );
}
