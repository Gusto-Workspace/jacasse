import Link from "next/link";
import Image from "next/image";
import RevealOnScrollComponent from "../../_shared/motion/reveal-on-scroll.component";
import SectionHeadingComponent from "../../_shared/section-heading.component";

export default function MenuCtaHomeSection() {
  return (
    <section className="site-noise relative overflow-hidden bg-[var(--site-forest-soft)] px-5 py-20 text-[var(--site-cream)] tablet:px-8 tablet:py-24 desktop:px-[90px] desktop:py-[110px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(171,144,88,0.22),transparent_36%)]" />
      <div className="relative mx-auto grid max-w-[1480px] gap-8 overflow-hidden rounded-[36px] border border-white/10 bg-[rgba(7,10,8,0.24)] p-6 tablet:p-8 desktop:grid-cols-[0.9fr_1.1fr] desktop:items-center desktop:p-10">
        <RevealOnScrollComponent variant="left" className="relative min-h-[280px] overflow-hidden rounded-[28px]">
          <Image
            src="/img/home/pork.webp"
            alt="Assiette Jacasse"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </RevealOnScrollComponent>

        <div className="desktop:px-6">
          <SectionHeadingComponent
            eyebrow="Carte & menus"
            title="Voir l'ensemble de la proposition."
            align="left"
            light
            description="La home donne le ton. La carte détaille ensuite les assiettes, les menus et les formats pensés pour la table Jacasse."
            titleClassName="max-w-[10ch]"
          />

          <RevealOnScrollComponent
            delay={120}
            variant="soft"
            className="mt-8 flex flex-col gap-4 tablet:flex-row"
          >
            <Link href="/menus" className="site-button">
              Explorer la carte
            </Link>
            <Link href="/contact" className="site-button site-button--secondary">
              Une question ?
            </Link>
          </RevealOnScrollComponent>
        </div>
      </div>
    </section>
  );
}
