import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import SectionHeadingComponent from "@/components/_shared/section-heading.component";
import RevealOnScrollComponent from "@/components/_shared/motion/reveal-on-scroll.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

function LegalSection({ title, children, last = false }) {
  return (
    <section
      className={`py-6 tablet:py-7 desktop:py-8 ${
        last ? "" : "border-b border-[var(--site-line)]"
      }`}
    >
      <h2 className="yeseva-one-regular text-[24px] leading-[1.04] text-[var(--site-ink)] tablet:text-[30px]">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-[15px] leading-[1.85] text-[var(--site-ink-soft)] tablet:text-[16px] desktop:text-[17px]">
        {children}
      </div>
    </section>
  );
}

export default function LegalesPage({ seoRestaurantData = null }) {
  const heroRef = useRef(null);
  const [showScrolledNav, setShowScrolledNav] = useState(false);
  const title = "Mentions légales - L'Esprit Jacasse";
  const description = "Consultez les mentions légales du site Jacasse.";

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrolledNav(entry.intersectionRatio <= 0.1);
      },
      { threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SeoHeadComponent
        title={title}
        description={description}
        path="/legales"
        image="/img/home/art.webp"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Mentions légales", path: "/legales" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <div className="relative">
        <NavComponent isVisible={!showScrolledNav} scrolled={false} />

        <NavComponent isVisible={showScrolledNav} scrolled={true} />

        <div
          ref={heroRef}
          className="relative min-h-[90svh] overflow-hidden bg-[url('/img/home/art.webp')] bg-cover bg-center text-[var(--site-cream)]"
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
                  Mentions
                  <br />
                  légales
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  as="p"
                  delay={80}
                  className="kalam-font mt-10 text-[30px] leading-[1.15] text-white tablet:text-[40px] desktop:text-[48px]"
                >
                  Informations,{" "}
                  <span className="text-[var(--site-orange)]">cadre & usage.</span>
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  delay={160}
                  className="mt-8 max-w-[560px] space-y-1.5 text-[23px] leading-[1.45] text-white tablet:text-[28px]"
                >
                  <p>Les informations d’identification du site,</p>
                  <p>de son hébergement et du cadre général</p>
                  <p>d’utilisation sont regroupées ici.</p>
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

        <section className="relative overflow-hidden bg-[var(--site-cream)] px-5 py-20 tablet:px-8 tablet:py-24 desktop:px-[90px] desktop:py-[110px]">
          <div className="relative z-10 mx-auto max-w-[1400px]">
            <SectionHeadingComponent
              eyebrow="Cadre légal"
              title="Mentions légales"
              description="Cette page présente les principales informations administratives, techniques et juridiques liées au site."
            />

            <div className="site-card mx-auto mt-14 max-w-[980px] rounded-[34px] p-6 tablet:p-8 desktop:p-12">
              <div className="mt-8">
                <LegalSection title="Éditeur du site">
                  <p>
                    Le présent site internet est édité pour le restaurant{" "}
                    <strong className="text-[var(--site-ink)]">
                      Jacasse
                    </strong>
                    .
                  </p>
                  <p>
                    Les éléments d’identification complets de l’exploitant
                    tels que la raison sociale, le SIRET, le RCS, le numéro de
                    TVA, l’adresse juridique et les coordonnées administratives
                    doivent être validés et complétés par l’établissement.
                  </p>
                </LegalSection>

                <LegalSection title="Direction de la publication">
                  <p>
                    La direction de la publication est assurée par la personne
                    ou la société en charge de l’exploitation du restaurant,
                    sous réserve d’une désignation interne différente au moment
                    de la publication définitive.
                  </p>
                </LegalSection>

                <LegalSection title="Hébergement">
                  <p>
                    Le site est hébergé par{" "}
                    <strong className="text-[var(--site-ink)]">
                      Vercel Inc.
                    </strong>
                    .
                  </p>
                  <ul className="ml-5 list-disc space-y-2">
                    <li>
                      Adresse : 440 N Barranca Avenue #4133, Covina, CA 91723,
                      États-Unis
                    </li>
                    <li>
                      Site web :{" "}
                      <Link
                        href="https://vercel.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--site-orange-deep)] underline underline-offset-4 transition hover:text-[var(--site-ink)]"
                      >
                        vercel.com
                      </Link>
                    </li>
                  </ul>
                </LegalSection>

                <LegalSection title="Objet du site">
                  <p>
                    Le site a pour objet de présenter le restaurant Jacasse,
                    sa carte, ses menus, ses informations
                    pratiques, ses actualités lorsqu’elles sont publiées, son
                    service de réservation ainsi que sa page de contact.
                  </p>
                </LegalSection>

                <LegalSection title="Propriété intellectuelle">
                  <p>
                    L’ensemble des contenus présents sur le site, notamment les
                    textes, photographies, graphismes, logos, éléments
                    d’identité visuelle, structure des pages et développements,
                    est protégé par les règles applicables en matière de
                    propriété intellectuelle.
                  </p>
                  <p>
                    Toute reproduction, adaptation, diffusion ou exploitation,
                    totale ou partielle, sans autorisation préalable écrite,
                    est interdite sauf disposition légale impérative contraire.
                  </p>
                </LegalSection>

                <LegalSection title="Responsabilité">
                  <p>
                    Malgré le soin apporté à la mise à jour des contenus,
                    certaines informations peuvent évoluer, devenir inexactes
                    ou nécessiter une validation complémentaire. L’utilisateur
                    reste responsable de l’usage qu’il fait des informations
                    consultées sur le site.
                  </p>
                  <p>
                    L’éditeur ne peut être tenu responsable des indisponibilités
                    temporaires du service, d’un dysfonctionnement technique ou
                    du contenu des sites tiers accessibles via des liens
                    externes.
                  </p>
                </LegalSection>

                <LegalSection title="Données personnelles">
                  <p>
                    Les modalités de collecte, d’utilisation et de conservation
                    des données personnelles éventuellement traitées via le site
                    sont décrites dans la{" "}
                    <Link
                      href="/policy"
                      className="text-[var(--site-orange-deep)] underline underline-offset-4 transition hover:text-[var(--site-ink)]"
                    >
                      politique de confidentialité
                    </Link>
                    .
                  </p>
                </LegalSection>

                <LegalSection title="Droit applicable" last>
                  <p>
                    Les présentes mentions légales sont soumises au droit
                    français. Sous réserve des règles d’ordre public
                    applicables, tout litige relatif au site relève des
                    juridictions territorialement compétentes du ressort de
                    l’exploitant.
                  </p>
                </LegalSection>
              </div>
            </div>
          </div>
        </section>

        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
