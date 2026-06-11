import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";

// COMPONENTS
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import MapContactComponent from "@/components/contact/map.contact.component";
import InfosContactComponent from "@/components/contact/infos.contact.component";
import HighlightsContactComponent from "@/components/contact/highlights.contact.component";
import ReservationCtaComponent from "@/components/_shared/reservation-cta/reservation-cta.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import RevealOnScrollComponent from "@/components/_shared/motion/reveal-on-scroll.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";
import { GlobalContext } from "@/contexts/global.context";

function buildTelHref(phone) {
  const formatted = String(phone || "").replace(/[^\d+]/g, "");
  return formatted ? `tel:${formatted}` : "/contact";
}

export default function ContactPage({ seoRestaurantData = null }) {
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
        title="Contact | L'Esprit Jacasse"
        description="Adresse, téléphone, horaires et formulaire de contact du restaurant Jacasse."
        path="/contact"
        image="/img/contact/header.webp"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <div className="relative">
        <NavComponent isVisible={!showScrolledNav} scrolled={false} />

        <NavComponent isVisible={showScrolledNav} scrolled={true} />

        <div
          ref={heroRef}
          className="relative min-h-[90svh] overflow-hidden bg-[url('/img/contact/header.webp')] bg-cover bg-center text-[var(--site-cream)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,7,0.86)_0%,rgba(5,8,7,0.54)_44%,rgba(5,8,7,0.24)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0.14)_0%,rgba(5,8,7,0.5)_100%)]" />

          <div className="relative mx-auto flex min-h-[90svh] w-full max-w-[1720px] items-center px-5 pb-24 pt-[150px] tablet:px-8 tablet:pb-28 desktop:px-12 desktop:pb-32">
            <div className="grid w-full gap-10 desktop:grid-cols-[1fr_0.72fr] desktop:items-end">
              <div className="max-w-[760px]">
                <RevealOnScrollComponent
                  as="h1"
                  className="yeseva-one-regular text-[64px] uppercase leading-[0.92] tracking-[-0.04em] text-white tablet:text-[92px] desktop:text-[110px]"
                >
                  Contact
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  as="p"
                  delay={80}
                  className="kalam-font mt-8 text-[30px] leading-[1.18] text-white tablet:text-[40px] desktop:text-[46px]"
                >
                  Réserver, nous appeler ou
                  <br />
                  nous rendre visite à{" "}
                  <span className="text-[var(--site-orange)]">Montauban.</span>
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  delay={160}
                  className="mt-10 flex flex-col gap-4 min-[560px]:flex-row"
                >
                  <Link href="/reservations" className="site-button min-w-[250px]">
                    Réserver une table
                  </Link>
                  <a
                    href={buildTelHref(restaurantContext?.restaurantData?.phone)}
                    className="inline-flex min-h-[54px] min-w-[220px] items-center justify-center border border-[var(--site-orange)] bg-[rgba(0,0,0,0.12)] px-7 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--site-orange)]"
                  >
                    Nous appeler
                  </a>
                </RevealOnScrollComponent>
              </div>
            </div>
          </div>
        </div>

        <HighlightsContactComponent />
        <InfosContactComponent />
        <MapContactComponent />
        <ReservationCtaComponent phone={restaurantContext?.restaurantData?.phone} />
        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
