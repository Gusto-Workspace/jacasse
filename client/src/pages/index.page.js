import { useEffect, useRef, useState } from "react";

// COMPONENTS
import NavComponent from "@/components/_shared/nav/nav.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import HomePageComponent from "@/components/home/home.page.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function HomePage({ seoRestaurantData = null }) {
  const heroRef = useRef(null);

  const [showScrolledNav, setShowScrolledNav] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // quand le hero est visible à moins de 5%
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
        title="L'Esprit Jacasse | Table vivante, assiettes à partager & réservation"
        description="Découvrez l'univers Jacasse: une table de caractère, des assiettes généreuses, une ambiance vivante et la réservation en ligne."
        path="/"
        image="/img/home/art.webp"
        breadcrumbs={[{ name: "Accueil", path: "/" }]}
        restaurantData={seoRestaurantData}
      />

      <div className="relative">
        <NavComponent
          isVisible={!showScrolledNav}
          scrolled={false}
        />

        <NavComponent isVisible={showScrolledNav} scrolled />

        <HomePageComponent heroRef={heroRef} />
        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
