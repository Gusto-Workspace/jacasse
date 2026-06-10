import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";

// COMPONENTS
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import ListMenusComponent from "@/components/menus/list.menus.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

// CONTEXT
import { GlobalContext } from "@/contexts/global.context";

export default function MenusPage({ seoRestaurantData = null }) {
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
        title="Carte & menus | L'Esprit Jacasse"
        description="Consultez la carte Jacasse, les suggestions de la maison et les formats pensés pour le partage."
        path="/menus"
        image="/img/home/pork.webp"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Carte & menus", path: "/menus" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <div className="relative">
        <NavComponent isVisible={!showScrolledNav} scrolled={false} />

        <NavComponent isVisible={showScrolledNav} scrolled={true} />

        <div
          ref={heroRef}
          className="relative min-h-[720px] overflow-hidden bg-[url('/img/menu/header.webp')] bg-cover bg-center text-[var(--site-cream)] tablet:min-h-[780px] desktop:min-h-[820px]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,8,0.84)_0%,rgba(6,10,8,0.5)_44%,rgba(6,10,8,0.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,8,0.2)_0%,rgba(6,10,8,0.46)_100%)]" />

          <div className="relative mx-auto flex min-h-[720px] w-full max-w-[1720px] items-center px-5 pb-24 pt-[150px] tablet:min-h-[780px] tablet:px-8 tablet:pb-28 desktop:min-h-[820px] desktop:px-12 desktop:pb-32">
            <div className="">
              <h1 className="yeseva-one-regular text-[64px] uppercase leading-[0.92] tracking-[-0.04em] text-white tablet:text-[92px] desktop:text-[110px]">
                Carte & Menus
              </h1>

              <p className="kalam-font mt-7 text-[30px] leading-[1.18] text-white tablet:text-[40px] desktop:text-[46px]">
                Cuisine de partage, tapas, vins et produits
                <br />
                de saison, <span className="text-[var(--site-orange)]">à Montauban.</span>
              </p>

              <div className="mt-12 flex flex-col gap-4 min-[560px]:flex-row">
                <Link href="/reservations" className="site-button min-w-[250px]">
                  Réserver une table
                </Link>
                <a
                  href="#menu-content"
                  className="inline-flex min-h-[54px] min-w-[220px] items-center justify-center border border-white/45 px-7 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white/10"
                >
                  Voir les tapas
                </a>
              </div>
            </div>
          </div>
        </div>

        <ListMenusComponent restaurantData={restaurantContext.restaurantData} />

        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
