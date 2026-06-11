import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import SectionHeadingComponent from "@/components/_shared/section-heading.component";
import RevealOnScrollComponent from "@/components/_shared/motion/reveal-on-scroll.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

function PolicySection({ title, children, last = false }) {
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

export default function PolicyPage({ seoRestaurantData = null }) {
  const heroRef = useRef(null);
  const [showScrolledNav, setShowScrolledNav] = useState(false);
  const title = "Politique de confidentialité - L'Esprit Jacasse";
  const description =
    "Consultez la politique de confidentialité du site Jacasse.";

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
        path="/policy"
        image="/img/home/art.webp"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Politique de confidentialité", path: "/policy" },
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
              <div className="max-w-[860px]">
                <RevealOnScrollComponent
                  as="h1"
                  className="yeseva-one-regular text-[64px] uppercase leading-[0.92] tracking-[-0.04em] text-white tablet:text-[92px] desktop:text-[110px]"
                >
                  Politique de
                  <br />
                  confidentialité
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  as="p"
                  delay={80}
                  className="kalam-font mt-10 text-[30px] leading-[1.15] text-white tablet:text-[40px] desktop:text-[48px]"
                >
                  Données,{" "}
                  <span className="text-[var(--site-orange)]">transparence & droits.</span>
                </RevealOnScrollComponent>

                <RevealOnScrollComponent
                  delay={160}
                  className="mt-8 max-w-[620px] space-y-1.5 text-[23px] leading-[1.45] text-white tablet:text-[28px]"
                >
                  <p>Cette page résume les données pouvant être</p>
                  <p>traitées via le site, leurs finalités</p>
                  <p>et les droits associés.</p>
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
              eyebrow="Protection"
              title="Politique de confidentialité"
              description="Les traitements décrits ci-dessous correspondent aux fonctionnalités visibles sur le site à ce jour."
            />

            <div className="site-card mx-auto mt-14 max-w-[980px] rounded-[34px] p-6 tablet:p-8 desktop:p-12">
              <div className="mt-8">
                <PolicySection title="Responsable du traitement">
                  <p>
                    Le responsable du traitement des données personnelles
                    collectées via le site correspond à l’exploitant du
                    restaurant{" "}
                    <strong className="text-[var(--site-ink)]">
                      Jacasse
                    </strong>
                    .
                  </p>
                  <p>
                    Pour toute demande relative à vos données, vous pouvez
                    utiliser la{" "}
                    <Link
                      href="/contact"
                      className="text-[var(--site-orange-deep)] underline underline-offset-4 transition hover:text-[var(--site-ink)]"
                    >
                      page contact
                    </Link>
                    .
                  </p>
                </PolicySection>

                <PolicySection title="Données susceptibles d’être collectées">
                  <ul className="ml-5 list-disc space-y-2">
                    <li>
                      Formulaire de contact : nom, e-mail, téléphone et contenu
                      du message.
                    </li>
                    <li>
                      Réservation : identité de contact, nombre de convives,
                      date, horaire et commentaire éventuel.
                    </li>
                    <li>
                      Données techniques strictement nécessaires au bon
                      fonctionnement du site et à la continuité de certaines
                      étapes de réservation.
                    </li>
                  </ul>
                </PolicySection>

                <PolicySection title="Finalités du traitement">
                  <ul className="ml-5 list-disc space-y-2">
                    <li>Répondre aux demandes envoyées via le formulaire.</li>
                    <li>
                      Gérer, confirmer et suivre les réservations effectuées sur
                      le site.
                    </li>
                    <li>
                      Sécuriser certaines réservations lorsqu’un prestataire
                      spécialisé intervient dans le parcours.
                    </li>
                    <li>
                      Assurer le fonctionnement technique du site et conserver
                      les éléments utiles au suivi des échanges.
                    </li>
                  </ul>
                </PolicySection>

                <PolicySection title="Bases juridiques">
                  <p>
                    Les traitements sont réalisés selon les cas sur la base de
                    l’exécution de mesures précontractuelles ou contractuelles,
                    du respect d’obligations légales ou de l’intérêt légitime
                    de l’exploitant à administrer son activité et ses
                    réservations.
                  </p>
                </PolicySection>

                <PolicySection title="Destinataires des données">
                  <p>
                    Les données sont accessibles uniquement aux personnes
                    habilitées et aux prestataires techniques nécessaires au
                    service.
                  </p>
                  <ul className="ml-5 list-disc space-y-2">
                    <li>
                      Prestataire d’e-mail transactionnel pour l’envoi des
                      messages de contact.
                    </li>
                    <li>
                      Prestataire de paiement ou de sécurisation de réservation
                      lorsqu’un parcours spécifique est activé.
                    </li>
                    <li>
                      Prestataires techniques liés à l’hébergement, à
                      l’infrastructure et à la maintenance du site.
                    </li>
                  </ul>
                </PolicySection>

                <PolicySection title="Durée de conservation">
                  <p>
                    Les données sont conservées pendant la durée strictement
                    nécessaire à la finalité poursuivie, puis archivées lorsque
                    cela est nécessaire au respect des obligations légales ou à
                    la gestion d’un éventuel litige.
                  </p>
                  <ul className="ml-5 list-disc space-y-2">
                    <li>
                      Les messages de contact sont conservés le temps utile au
                      traitement de la demande.
                    </li>
                    <li>
                      Les données de réservation sont conservées pour la
                      gestion opérationnelle du service et son suivi
                      administratif.
                    </li>
                    <li>
                      Les stockages locaux techniques sont supprimés ou expirent
                      automatiquement selon leur usage.
                    </li>
                  </ul>
                </PolicySection>

                <PolicySection title="Cookies et stockages techniques">
                  <p>
                    Le site n’intègre pas, à notre connaissance, de suivi
                    publicitaire tiers dans sa version actuelle. En revanche,
                    certains stockages techniques du navigateur peuvent être
                    utilisés pour le bon fonctionnement du site, notamment pour
                    conserver un état temporaire lié à la navigation ou à une
                    réservation en cours.
                  </p>
                </PolicySection>

                <PolicySection title="Transferts hors Union européenne">
                  <p>
                    Certains prestataires techniques peuvent traiter certaines
                    données en dehors de l’Union européenne. Le cas échéant,
                    ces transferts doivent être encadrés par les garanties
                    juridiques appropriées prévues par la réglementation
                    applicable.
                  </p>
                </PolicySection>

                <PolicySection title="Vos droits">
                  <p>
                    Vous pouvez demander l’accès à vos données, leur
                    rectification, leur effacement, la limitation de certains
                    traitements ou vous opposer à un traitement lorsque la loi
                    le permet.
                  </p>
                  <p>
                    Si vous estimez que vos droits ne sont pas respectés, vous
                    pouvez également introduire une réclamation auprès de la
                    CNIL.
                  </p>
                </PolicySection>

                <PolicySection title="Mise à jour de la politique" last>
                  <p>
                    Cette politique peut être mise à jour pour refléter une
                    évolution du site, des outils utilisés ou du cadre légal.
                    La version publiée sur cette page est celle applicable à la
                    date de consultation.
                  </p>
                </PolicySection>
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
