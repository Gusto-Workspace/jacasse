import Link from "next/link";
import { Home, PhoneCall, UtensilsCrossed } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import ReservationCtaComponent from "@/components/_shared/reservation-cta/reservation-cta.component";
import RevealOnScrollComponent from "@/components/_shared/motion/reveal-on-scroll.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { GlobalContext } from "@/contexts/global.context";

const quickLinks = [
  {
    href: "/",
    label: "Retour à l’accueil",
    description: "Revenir à l’ambiance Jacasse et aux accès principaux du site.",
    icon: Home,
  },
  {
    href: "/menus",
    label: "Carte & menus",
    description: "Consulter la carte, les tapas, les plats et les suggestions.",
    icon: UtensilsCrossed,
  },
  {
    href: "/contact",
    label: "Nous contacter",
    description: "Retrouver l’adresse, les horaires et les moyens de contact.",
    icon: PhoneCall,
  },
];

function QuickLinkCard({ item, index }) {
  const Icon = item.icon;

  return (
    <RevealOnScrollComponent
      delay={index * 80}
      variant="up"
      className="flex h-full flex-col rounded-[10px] border border-[rgba(20,72,47,0.14)] bg-white/72 p-6 shadow-[0_14px_26px_rgba(11,16,13,0.08)] tablet:p-8"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--site-line)] bg-white text-[var(--site-orange-deep)]">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <h2 className="yeseva-one-regular mt-6 text-[34px] leading-[0.95] text-[var(--site-ink)] tablet:text-[40px]">
        {item.label}
      </h2>

      <p className="mt-4 flex-1 text-[16px] leading-[1.8] text-[var(--site-ink-soft)]">
        {item.description}
      </p>

      <Link
        href={item.href}
        className="mt-6 inline-flex min-h-[52px] items-center justify-center bg-[var(--site-orange)] px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-white"
      >
        Explorer
      </Link>
    </RevealOnScrollComponent>
  );
}

export default function NotFoundPage() {
  const { restaurantContext } = useContext(GlobalContext);
  const heroRef = useRef(null);
  const [showScrolledNav, setShowScrolledNav] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrolledNav(entry.intersectionRatio <= 0.1);
      },
      {
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SeoHeadComponent
        title="Page introuvable | L'Esprit Jacasse"
        description="La page demandée est introuvable. Revenez à l’accueil, consultez la carte ou contactez Jacasse."
        path="/404"
        image="/img/home/header.webp"
        noIndex
      />

      <div className="relative bg-[var(--site-cream)]">
        <NavComponent isVisible={!showScrolledNav} scrolled={false} />
        <NavComponent isVisible={showScrolledNav} scrolled={true} />

        <main>
          <section
            ref={heroRef}
            className="relative min-h-[90svh] overflow-hidden bg-[url('/img/home/header.webp')] bg-cover bg-center text-[var(--site-cream)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,7,0.88)_0%,rgba(5,8,7,0.58)_44%,rgba(5,8,7,0.26)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0.16)_0%,rgba(5,8,7,0.5)_100%)]" />

            <div className="relative mx-auto flex min-h-[90svh] w-full max-w-[1720px] items-center px-5 pb-24 pt-[150px] tablet:px-8 tablet:pb-28 desktop:px-12 desktop:pb-32">
              <div className="max-w-[860px]">
                <RevealOnScrollComponent
                  as="p"
                  className="kalam-font text-[34px] leading-[1.1] text-[var(--site-orange)] tablet:text-[46px]"
                >
                  Oups...
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  as="h1"
                  delay={90}
                  className="yeseva-one-regular mt-4 text-[64px] leading-[0.9] tracking-[-0.04em] text-white tablet:text-[92px] desktop:text-[110px]"
                >
                  Cette page
                  <br />
                  n&apos;est plus
                  <br />
                  à la carte
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  as="p"
                  delay={170}
                  className="mt-8 max-w-[700px] text-[19px] leading-[1.8] text-[var(--site-cream-soft)] tablet:text-[22px]"
                >
                  L&apos;adresse demandée est introuvable ou a changé. Le plus
                  simple est de repartir vers l’accueil, consulter la carte ou
                  reprendre votre visite depuis les accès ci-dessous.
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  delay={240}
                  className="mt-10 flex flex-col gap-4 min-[560px]:flex-row"
                >
                  <Link href="/" className="site-button min-w-[220px]">
                    Retour à l’accueil
                  </Link>
                  <Link
                    href="/menus"
                    className="inline-flex min-h-[54px] min-w-[220px] items-center justify-center border border-white/40 px-7 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white/10"
                  >
                    Voir la carte
                  </Link>
                </RevealOnScrollComponent>
              </div>
            </div>
          </section>

          <section className="bg-[var(--site-cream)] px-5 py-16 tablet:px-8 tablet:py-20 desktop:px-12 desktop:py-24">
            <div className="mx-auto max-w-[1680px]">
              <RevealOnScrollComponent className="flex items-center justify-center gap-3 text-center">
                <div className="relative h-6 w-10 rotate-[215deg]">
                  <img
                    src="/img/_shared/ornement.webp"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <h2 className="yeseva-one-regular text-[42px] uppercase leading-[0.95] text-[var(--site-orange-deep)] tablet:text-[54px] desktop:text-[62px]">
                  Reprendre le bon chemin
                </h2>
                <div className="relative h-6 w-10 rotate-[30deg]">
                  <img
                    src="/img/_shared/ornement.webp"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
              </RevealOnScrollComponent>

              <div className="mt-12 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
                {quickLinks.map((item, index) => (
                  <QuickLinkCard key={item.href} item={item} index={index} />
                ))}
              </div>
            </div>
          </section>

          <ReservationCtaComponent phone={restaurantContext?.restaurantData?.phone} />
          <FooterComponent />
        </main>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
