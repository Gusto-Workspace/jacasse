import Link from "next/link";
import Image from "next/image";
import RevealOnScrollComponent from "../../_shared/motion/reveal-on-scroll.component";

const items = [
  {
    src: "/img/home/unavoidable-1.webp",
    title: "FOIE GRAS MAISON",
    text: "Et sa compotée d'oignons rouges",
  },
  {
    src: "/img/home/unavoidable-2.webp",
    title: "TATAKI DE THON",
    text: "Et sa vinaigrette Thaï",
  },
  {
    src: "/img/home/unavoidable-3.webp",
    title: "APÉRO SUR VERRE",
    text: "Le combo parfait pour lancer la soirée",
  },
  {
    src: "/img/home/unavoidable-4.webp",
    title: "PANISSES MARSEILLAISES",
    text: "Et son aioli maison",
  },
];

function UnavoidableCard({ item, index }) {
  return (
    <RevealOnScrollComponent
      delay={80 + index * 70}
      variant="up"
      className="overflow-hidden rounded-[10px] border border-[rgba(19,24,20,0.08)] bg-white shadow-[0_14px_26px_rgba(11,16,13,0.08)]"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="px-5 py-4">
        <div>
          <h3 className="text-[17px] font-extrabold uppercase leading-[1.1] text-[var(--site-ink)] tablet:text-[19px]">
            {item.title}
          </h3>
          <p className="mt-2 whitespace-nowrap text-[15px] leading-[1.35] text-[var(--site-ink-soft)]">
            {item.text}
          </p>
        </div>
      </div>
    </RevealOnScrollComponent>
  );
}

export default function UnavoidablesHomeSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--site-cream)] px-5 py-12 tablet:px-8 tablet:py-14 desktop:px-12 desktop:py-16">
      <div className="absolute left-6 top-10 hidden h-10 w-10 tablet:block desktop:left-12">
        <Image src="/img/_shared/explose-1.webp" alt="" fill sizes="40px" className="object-contain" />
      </div>
      <div className="absolute bottom-10 right-6 hidden h-12 w-12 tablet:block desktop:right-12">
        <Image src="/img/_shared/explose-1.webp" alt="" fill sizes="48px" className="object-contain" />
      </div>

      <div className="mx-auto max-w-[1680px]">
        <RevealOnScrollComponent className="flex items-center justify-center gap-3 text-center">
          <div className="relative h-6 w-10 rotate-[215deg]">
            <Image src="/img/_shared/ornement.webp" alt="" fill sizes="40px" className="object-contain" />
          </div>
          <h2 className="yeseva-one-regular text-[42px] uppercase leading-[0.95] text-[var(--site-ink)] tablet:text-[54px] desktop:text-[62px]">
            Nos incontournables
          </h2>
          <div className="relative h-6 w-10 rotate-[30deg]">
            <Image src="/img/_shared/ornement.webp" alt="" fill sizes="40px" className="object-contain" />
          </div>
        </RevealOnScrollComponent>

        <div className="mt-10 grid gap-4 min-[900px]:grid-cols-2 desktop:grid-cols-4">
          {items.map((item, index) => (
            <UnavoidableCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <RevealOnScrollComponent delay={220} className="mt-8 flex justify-center">
          <Link
            href="/menus"
            className="inline-flex min-h-[54px] items-center justify-center bg-[var(--site-orange)] px-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-white"
          >
            Voir toute la carte
          </Link>
        </RevealOnScrollComponent>
      </div>
    </section>
  );
}
