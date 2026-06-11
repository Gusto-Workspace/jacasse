import { useEffect, useRef, useState, useContext } from "react";
import Image from "next/image";

// COMPONENTS
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import ListNewsComponent from "@/components/news/list.news.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import RevealOnScrollComponent from "@/components/_shared/motion/reveal-on-scroll.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

// CONTEXT
import { GlobalContext } from "@/contexts/global.context";

export default function NewsPage({ seoRestaurantData = null }) {
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
        title="Actualités | L'Esprit Jacasse"
        description="Retrouvez les actualités, nouveautés et temps forts de Jacasse."
        path="/news"
        image="/img/news/header.webp"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Actualités", path: "/news" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <div className="relative">
        <NavComponent isVisible={!showScrolledNav} scrolled={false} />

        <NavComponent isVisible={showScrolledNav} scrolled={true} />

        <div
          ref={heroRef}
          className="relative min-h-[90svh] overflow-hidden bg-[url('/img/news/header.webp')] bg-cover bg-center text-[var(--site-cream)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,7,0.88)_0%,rgba(5,8,7,0.58)_44%,rgba(5,8,7,0.26)_100%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0.14)_0%,rgba(5,8,7,0.5)_100%)]" />

          <div className="relative mx-auto flex min-h-[90svh] w-full max-w-[1720px] items-center px-5 pb-24 pt-[150px] tablet:px-8 tablet:pb-28 desktop:px-12 desktop:pb-32">
            <div className="max-w-[760px]">
              <RevealOnScrollComponent
                as="h1"
                className="uppercase yeseva-one-regular text-[64px] leading-[0.9] tracking-[-0.04em] text-white tablet:text-[92px] desktop:text-[110px]"
              >
                Actualités
              </RevealOnScrollComponent>

              <RevealOnScrollComponent
                as="p"
                delay={140}
                className="kalam-font mt-8 text-[28px] leading-[1.28] text-white tablet:text-[38px] desktop:text-[44px]"
              >
                Ici, on partage plus que des assiettes :
                <br />
                des <span className="text-[var(--site-orange)]">moments</span>,
                des <span className="text-[var(--site-orange)]">idées</span> et
                des <span className="text-[var(--site-orange)]">envies</span>.
              </RevealOnScrollComponent>
            </div>
          </div>
        </div>

        <ListNewsComponent
          restaurantData={restaurantContext?.restaurantData}
          dataLoading={restaurantContext?.dataLoading}
        />

        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
