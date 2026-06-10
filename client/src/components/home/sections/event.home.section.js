import Image from "next/image";
import RevealOnScrollComponent from "../../_shared/motion/reveal-on-scroll.component";

function EventCheck({ children }) {
  return (
    <p className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-[18px] w-[18px] items-center justify-center rounded-[2px] border border-white bg-white text-[var(--site-orange)]">
        <span className="text-[12px] leading-none">✓</span>
      </span>
      <span>{children}</span>
    </p>
  );
}

export default function EventHomeSection() {
  return (
    <section
      id="evenements"
      className="grid overflow-hidden min-[980px]:grid-cols-2"
    >
      <RevealOnScrollComponent
        variant="left"
        className="relative flex min-h-[480px] items-stretch bg-[#14110f]"
      >
        <div className="relative min-h-[480px] w-full">
          <Image
            src="/img/home/art.webp"
            alt="L'art de l'apéro"
            fill
            sizes="(min-width: 980px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-y-0 left-0 z-10 flex  flex-col justify-center px-8 text-white tablet:px-10 desktop:px-12">
          <h2 className="yeseva-one-regular text-[54px] uppercase leading-[0.92] text-white tablet:text-[72px] desktop:text-[66px]">
            L&apos;art
            <br />
            de l&apos;apéro
          </h2>
          <svg
            className="h-[22px] w-[240px] tablet:w-[280px]"
            viewBox="0 0 280 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 18C73 9 146 7 276 12"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
         

          <div className="kalam-font mt-8 space-y-1 text-[27px] leading-[1.22] text-white tablet:text-[24px]">
            <p>Un verre.</p>
            <p>Quelques tapas.</p>
            <p>Et la soirée peut</p>
            <p>commencer.</p>
          </div>

          <div className="mt-8 space-y-3 text-[16px] font-extrabold uppercase tracking-[0.04em] text-white tablet:text-[18px]">
            <p>COCKTAILS</p>
            <p>VINS SÉLECTIONNÉS</p>
            <p>SPIRITUEUX</p>
            <p>PRODUITS À PARTAGER</p>        
          </div>
        </div>
      </RevealOnScrollComponent>

      <RevealOnScrollComponent
        variant="right"
        className="relative overflow-hidden bg-[var(--site-orange)] px-7 py-10 text-white tablet:px-10 desktop:px-12 desktop:py-12"
      >
        <div className="absolute right-5 top-5 h-[190px] w-[250px] rotate-[3deg] tablet:right-8 tablet:top-6 tablet:h-[230px] tablet:w-[300px] -z-10">
          <Image
            src="/img/home/thursday-1.webp"
            alt="Les jeudis qui jacassent"
            fill
            sizes="300px"
            className="object-contain"
          />
        </div>

        <div className="py-12">
          <h2 className="text-[56px] uppercase leading-[0.92] text-white tablet:text-[74px] desktop:text-[68px]">
            <span className="block font-black tracking-[-0.04em]">LES JEUDIS</span>
            <span className="block font-extrabold tracking-[-0.04em]">
              QUI JACASSENT
            </span>
          </h2>

          <div className="mt-8 space-y-3 text-[18px] font-bold uppercase leading-[1.25] tablet:text-[22px]">
            <EventCheck>TOUS LES JEUDIS SOIRS</EventCheck>
            <EventCheck>TAPAS JUSQU&apos;À 22H</EventCheck>
            <EventCheck>HAPPY HOUR 18H - 20H</EventCheck>
          </div>

          <div className="mt-9 text-[18px] font-extrabold uppercase leading-[1.18] text-white tablet:text-[23px]">
            <p className="mb-1 text-[22px] font-medium normal-case tracking-[0.02em]">
              Et après...
            </p>
            <p>On pousse les tables</p>
            <p>et oui on danse !</p>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 h-[220px] w-[290px] rotate-[-4deg] tablet:bottom-3 tablet:right-3 tablet:h-[270px] tablet:w-[350px] -z-10">
          <Image
            src="/img/home/thursday-2.webp"
            alt="Apéro Jacasse"
            fill
            sizes="350px"
            className="object-contain"
          />
        </div>
      </RevealOnScrollComponent>
    </section>
  );
}
