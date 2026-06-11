import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";

// CONTEXT
import { GlobalContext } from "@/contexts/global.context";

// COMPONENTS
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import FormReservationsComponent from "@/components/reservations/form.reservations.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import RevealOnScrollComponent from "@/components/_shared/motion/reveal-on-scroll.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function ReservationsPage({ seoRestaurantData = null }) {
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
        title="Réserver | L'Esprit Jacasse"
        description="Réservez une table chez Jacasse et choisissez en ligne votre date, votre horaire et votre nombre de convives."
        path="/reservations"
        image="/img/reservations/header.webp"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Réserver", path: "/reservations" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <div className="relative">
        <NavComponent isVisible={!showScrolledNav} scrolled={false} />

        <NavComponent isVisible={showScrolledNav} scrolled={true} />

        <div
          ref={heroRef}
          className="relative min-h-[90svh] overflow-hidden bg-[url('/img/reservations/header.webp')] bg-cover bg-center text-[var(--site-cream)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,7,0.86)_0%,rgba(5,8,7,0.54)_44%,rgba(5,8,7,0.24)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0.14)_0%,rgba(5,8,7,0.48)_100%)]" />

          <div className="relative mx-auto flex min-h-[90svh] w-full max-w-[1720px] items-end px-5 pb-24 pt-[150px] tablet:px-8 tablet:pb-28 desktop:px-12 desktop:pb-32">
            <div className="grid w-full gap-10 desktop:grid-cols-[1fr_0.95fr] desktop:items-end">
              <div className="max-w-[760px]">
                <RevealOnScrollComponent
                  as="h1"
                  className="yeseva-one-regular text-[64px] uppercase leading-[0.92] tracking-[-0.04em] text-white tablet:text-[92px] desktop:text-[110px]"
                >
                  Réservez
                  <br />
                  votre table
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  as="p"
                  delay={80}
                  className="kalam-font mt-10 text-[30px] leading-[1.15] text-white tablet:text-[40px] desktop:text-[48px]"
                >
                  On prépare,{" "}
                  <span className="text-[var(--site-orange)]">vous profitez.</span>
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  delay={160}
                  className="mt-8 max-w-[520px] space-y-1.5 text-[23px] leading-[1.45] text-white tablet:text-[28px]"
                >
                  <p>Que ce soit pour un dîner entre amis,</p>
                  <p>un afterwork ou un événement spécial,</p>
                  <p>on a hâte de vous accueillir</p>
                  <p>chez Jacasse.</p>
                </RevealOnScrollComponent>
              </div>

              <RevealOnScrollComponent
                delay={180}
                variant="zoom"
                className="relative hidden min-h-[520px] desktop:block"
              >
                <div className="absolute bottom-[70px] right-[4%] h-[290px] w-[290px]">
                  <Image
                    src="/img/_shared/badge.webp"
                    alt="Les jeudis qui jacassent"
                    fill
                    sizes="290px"
                    className="object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.28)]"
                  />
                </div>
              </RevealOnScrollComponent>
            </div>
          </div>
        </div>

        <FormReservationsComponent
          apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
          restaurant={restaurantContext.restaurantData}
          dataLoading={restaurantContext.dataLoading}
        />

        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
