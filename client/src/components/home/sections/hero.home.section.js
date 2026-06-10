import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import RevealOnScrollComponent from "../../_shared/motion/reveal-on-scroll.component";

export default function HeroHomeSection({ heroRef = null }) {
  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-black px-5 pb-14 pt-28 text-[var(--site-cream)] tablet:px-8 tablet:pb-16 tablet:pt-32 desktop:px-12 desktop:pt-36"
    >
      <div className="absolute inset-0">
        <Image
          src="/img/home/header.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72),rgba(0,0,0,0.24)_55%,rgba(0,0,0,0.48))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(57,97,52,0.32),transparent_28%)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-170px)] w-full max-w-[1720px] items-end">
        <div className="grid w-full gap-10 desktop:grid-cols-[1.02fr_0.98fr] desktop:items-end">
          <div className="max-w-[720px]">
            <RevealOnScrollComponent
              as="h1"
              className="yeseva-one-regular text-[66px] leading-[0.88] text-white tablet:text-[96px] desktop:text-[152px]"
            >
              JACASSE
            </RevealOnScrollComponent>

            <RevealOnScrollComponent
              as="p"
              delay={80}
              className="kalam-font mt-12 text-[34px] leading-[1.05] text-white tablet:text-[48px] desktop:text-[48px]"
            >
              <span>Tapas, vins &amp; bonne humeur</span>
              <br />
              au coeur de <span className="text-[var(--site-orange)]">Montauban</span>
            </RevealOnScrollComponent>

            <RevealOnScrollComponent
              as="div"
              delay={160}
              className="mt-10 space-y-1.5 text-[23px] leading-[1.45] text-white tablet:text-[28px]"
            >
              <p>On pousse les tables.</p>
              <p>On partage.</p>
              <p>On refait le monde.</p>
            </RevealOnScrollComponent>

            <RevealOnScrollComponent delay={240} className="mt-10">
              <Link
                href="/reservations"
                className="inline-flex min-h-[60px] items-center justify-center bg-[var(--site-orange)] px-8 text-[14px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(11,16,13,0.22)]"
              >
                Réserver une table
              </Link>
            </RevealOnScrollComponent>

            <RevealOnScrollComponent delay={320} className="mt-10">
              <a
                href="#restaurant"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 text-white"
                aria-label="Descendre"
              >
                <ArrowDown size={24} strokeWidth={1.6} />
              </a>
            </RevealOnScrollComponent>
          </div>

          <RevealOnScrollComponent
            delay={180}
            variant="zoom"
            className="relative hidden min-h-[620px] desktop:block"
          >
            <div className="absolute bottom-[92px] right-[9%] h-[288px] w-[288px]">
              <Image
                src="/img/_shared/badge.webp"
                alt="Les jeudis qui jacassent"
                fill
                sizes="258px"
                className="object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.28)]"
              />
            </div>
          </RevealOnScrollComponent>
        </div>
      </div>
    </section>
  );
}
