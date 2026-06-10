import Image from "next/image";
import RevealOnScrollComponent from "../../_shared/motion/reveal-on-scroll.component";

export default function SpiritHomeSection() {
  return (
    <section
      id="restaurant"
      className="grid bg-[var(--site-cream)] min-[980px]:grid-cols-2"
    >
      <RevealOnScrollComponent variant="left" className="relative min-h-[460px]">
        <Image
          src="/img/home/pork.webp"
          alt="Porc croustillant"
          fill
          sizes="(min-width: 980px) 50vw, 100vw"
          className="object-cover"
        />
      </RevealOnScrollComponent>

      <div className="relative flex items-center justify-center px-7 py-12 tablet:px-10 desktop:px-16 desktop:py-16">
        <div className="absolute bottom-10 right-8 hidden h-10 w-10 tablet:block">
          <Image src="/img/_shared/explose-2.webp" alt="" fill sizes="40px" className="object-contain" />
        </div>
        <RevealOnScrollComponent variant="right" className="max-w-[560px] ">
          <div className="relative  h-[120px] w-[330px] max-w-full tablet:h-[180px] tablet:w-[420px]">
            <Image
              src="/img/home/jacasse-spirit.webp"
              alt="L'esprit Jacasse"
              fill
              sizes="420px"
              className="object-contain object-center"
            />
          </div>

          <div className="mx-auto mt-10 max-w-[470px] space-y-5 text-[18px] leading-[1.58] text-[var(--site-ink-soft)] tablet:text-[20px]">
            <p>
              Chez Jacasse, on aime les assiettes qui se partagent
              et les soirées qui s&apos;éternisent.
            </p>
            <p>
              Une cuisine méditerranéenne généreuse,
              des produits soigneusement sélectionnés
              et une carte pensée pour accompagner chaque verre.
            </p>
          </div>

          <p className="kalam-font mt-10 text-[34px] leading-[1.25] text-[var(--site-orange)] tablet:text-[46px]">
            Ici, on vient pour manger.
            <br />
            On reste pour l&apos;ambiance.
          </p>
        </RevealOnScrollComponent>
      </div>
    </section>
  );
}
