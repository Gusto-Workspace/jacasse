import Image from "next/image";
import { useContext, useEffect, useMemo, useState } from "react";
import { ArrowRight, Mail, X } from "lucide-react";
import RevealOnScrollComponent from "../_shared/motion/reveal-on-scroll.component";
import { formatNewsDate, getVisibleNews } from "../../_assets/utils/news.utils";
import ReservationCtaComponent from "../_shared/reservation-cta/reservation-cta.component";
import { GlobalContext } from "@/contexts/global.context";

const richTextClass =
  "[&_p]:mt-4 [&_p:first-child]:mt-0 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-2 [&_li>p]:mt-0 [&_strong]:font-semibold [&_em]:italic [&_a]:text-[var(--site-orange-deep)] [&_a]:underline [&_a]:underline-offset-4";
const fallbackLabels = [
  "Nouveauté",
  "Événement",
  "Coulisses",
  "Sélection",
  "Recette",
  "Ambiance",
];

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getNewsLabel(item, index) {
  const explicit =
    item?.label ||
    item?.category ||
    item?.tag ||
    item?.type ||
    item?.theme ||
    item?.newsType;

  if (explicit) {
    return String(explicit);
  }

  return fallbackLabels[index % fallbackLabels.length];
}

function NewsImage({ item, className = "" }) {
  if (item?.image) {
    return (
      <img
        src={item.image}
        alt={item?.title || "Actualité"}
        className={`h-full w-full object-cover ${className}`.trim()}
      />
    );
  }

  return (
    <div
      className={`flex h-full min-h-[240px] w-full items-center justify-center bg-[rgba(246,229,218,0.92)] text-center text-[var(--site-ink-soft)] ${className}`.trim()}
    >
      <div className="flex flex-col items-center px-8">
        <div className="relative h-[96px] w-[96px] tablet:h-[118px] tablet:w-[118px]">
          <Image
            src="/img/logo-green.webp"
            alt="Logo Jacasse"
            fill
            sizes="118px"
            className="object-contain"
          />
        </div>
        <p className="yeseva-one-regular mt-5 text-[28px] leading-[0.92] text-[var(--site-ink)] tablet:text-[34px]">
          Jacasse
        </p>
      </div>
    </div>
  );
}

function LoadingSection() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-5 min-[820px]:grid-cols-2 desktop:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`news-skeleton-${index}`}
          className="overflow-hidden rounded-[10px] border border-[rgba(20,72,47,0.12)] bg-white shadow-[0_14px_26px_rgba(11,16,13,0.08)]"
        >
          <div className="h-[320px] animate-pulse bg-[rgba(223,160,132,0.18)]" />
          <div className="px-5 py-5">
            <div className="h-5 w-24 animate-pulse rounded bg-[rgba(29,99,63,0.16)]" />
            <div className="mt-5 h-4 w-28 animate-pulse rounded bg-black/8" />
            <div className="mt-4 h-12 w-[72%] animate-pulse rounded bg-black/8" />
            <div className="mt-5 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-black/6" />
              <div className="h-4 w-[92%] animate-pulse rounded bg-black/6" />
              <div className="h-4 w-[66%] animate-pulse rounded bg-black/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NewsCard({ item, onOpen, index }) {
  const excerpt = stripHtml(item?.description).slice(0, 120).trim();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-[rgba(20,72,47,0.1)] bg-white shadow-[0_14px_26px_rgba(11,16,13,0.08)] transition-transform duration-300 hover:-translate-y-[2px]">
      <div className="site-media-zoom relative h-[320px] overflow-hidden">
        <NewsImage item={item} />
        <span className="absolute bottom-4 left-4 inline-flex min-h-[28px] items-center bg-[var(--site-orange)] px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
          {getNewsLabel(item, index)}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 py-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--site-ink)]">
          {String(formatNewsDate(item?.published_at) || "Actualité").toUpperCase()}
        </p>

        <h3 className="yeseva-one-regular mt-4 text-[28px] leading-[1.02] text-[var(--site-ink)] tablet:text-[34px]">
          {item?.title}
        </h3>

        {excerpt ? (
          <p className="mt-4 flex-1 text-[16px] leading-[1.7] text-[var(--site-ink)]">
            {excerpt}
            {stripHtml(item?.description).length > 120 ? "..." : ""}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => onOpen(item)}
          className="mt-6 inline-flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--site-orange)] transition hover:opacity-70"
        >
          Lire l&apos;article
          <ArrowRight size={16} strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}

function NewsModal({ item, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(6,10,8,0.7)] px-4 py-8 backdrop-blur-[6px]"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-[20px] border border-[rgba(20,72,47,0.16)] bg-[var(--site-cream)] shadow-[0_30px_90px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--site-line)] px-6 py-5 tablet:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--site-orange-deep)]">
              {String(formatNewsDate(item?.published_at) || "Actualité").toUpperCase()}
            </p>
            <h2 className="yeseva-one-regular mt-3 text-[46px] leading-[0.9] text-[var(--site-ink)] tablet:text-[58px]">
              {item?.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--site-line)] bg-white/75 text-[var(--site-ink)] transition hover:text-[var(--site-orange-deep)]"
            aria-label="Fermer l’actualité"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 tablet:px-8">
          <div className="overflow-hidden rounded-[26px]">
            <NewsImage item={item} className="max-h-[420px]" />
          </div>

          {item?.description ? (
            <div
              className={`mt-8 text-[17px] leading-[1.9] text-[var(--site-ink-soft)] ${richTextClass} [&_h1]:yeseva-one-regular [&_h1]:text-[42px] [&_h1]:leading-[0.95] [&_h1]:text-[var(--site-ink)] [&_h2]:yeseva-one-regular [&_h2]:text-[34px] [&_h2]:leading-[0.95] [&_h2]:text-[var(--site-ink)] [&_h3]:yeseva-one-regular [&_h3]:text-[28px] [&_h3]:leading-[0.98] [&_h3]:text-[var(--site-ink)]`}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ListNewsComponent({
  restaurantData,
  dataLoading = false,
}) {
  const { restaurantContext } = useContext(GlobalContext);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const visibleNews = getVisibleNews(restaurantData);
  const displayedNews = useMemo(
    () => (showAll ? visibleNews : visibleNews.slice(0, 6)),
    [showAll, visibleNews],
  );
  const phoneLabel = String(restaurantContext?.restaurantData?.phone || "");
  const hasMoreNews = visibleNews.length > 6;
  const newsletterTarget = restaurantContext?.restaurantData?.email
    ? `mailto:${restaurantContext.restaurantData.email}?subject=${encodeURIComponent(
        "Newsletter Jacasse",
      )}&body=${encodeURIComponent(
        `Bonjour,\n\nJe souhaite recevoir les actualités de Jacasse.\n\nEmail: ${newsletterEmail}`,
      )}`
    : "/contact";

  useEffect(() => {
    if (!selectedNews) {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [selectedNews]);

  return (
    <>
      <section className="site-shell px-5 py-12 tablet:px-8 tablet:py-14 desktop:px-12 desktop:py-16">
        <div className="mx-auto max-w-[1680px]">
          <RevealOnScrollComponent className="flex items-center justify-center gap-3 text-center">
            <div className="relative h-6 w-10 rotate-[215deg]">
              <Image
                src="/img/_shared/ornement.webp"
                alt=""
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <h2 className="yeseva-one-regular text-[42px] uppercase leading-[0.95] text-[var(--site-orange-deep)] tablet:text-[54px] desktop:text-[62px]">
              Toutes nos actualités
            </h2>
            <div className="relative h-6 w-10 rotate-[30deg]">
              <Image
                src="/img/_shared/ornement.webp"
                alt=""
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
          </RevealOnScrollComponent>

          {dataLoading && !restaurantData ? (
            <LoadingSection />
          ) : !visibleNews.length ? (
            <div className="mx-auto mt-12 max-w-[760px] rounded-[16px] border border-[rgba(20,72,47,0.14)] bg-white px-8 py-12 text-center shadow-[0_20px_56px_rgba(19,24,20,0.08)]">
              <p className="script-font text-[38px] leading-none text-[var(--site-orange-deep)]">
                Bientôt
              </p>
              <p className="mt-4 text-[17px] leading-[1.85] text-[var(--site-ink-soft)]">
                Aucune actualité n’est publiée pour le moment. Revenez bientôt
                pour découvrir les prochains temps forts du restaurant.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-12 grid grid-cols-1 gap-5 min-[820px]:grid-cols-2 desktop:grid-cols-3">
                {displayedNews.map((item, index) => (
                  <RevealOnScrollComponent
                    key={item?._id || `news-${index}`}
                    delay={index * 70}
                    variant="up"
                  >
                    <NewsCard item={item} index={index} onOpen={setSelectedNews} />
                  </RevealOnScrollComponent>
                ))}
              </div>

              {hasMoreNews && !showAll ? (
                <RevealOnScrollComponent
                  delay={220}
                  className="mt-10 flex justify-center"
                >
                  <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="inline-flex min-h-[54px] items-center justify-center bg-[var(--site-orange)] px-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-white"
                  >
                    Voir toutes les actualités
                  </button>
                </RevealOnScrollComponent>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="bg-[var(--site-orange)] px-5 py-8 text-white tablet:px-8 desktop:px-12 desktop:py-10">
        <div className="mx-auto flex max-w-[1680px] flex-col gap-6 desktop:flex-row desktop:items-center desktop:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/45">
              <Mail size={22} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[20px] font-semibold uppercase tracking-[0.04em]">
                Ne manquez rien de l&apos;actu Jacasse
              </p>
              <p className="mt-1 text-[15px] leading-[1.7] text-white/84">
                Recevez nos nouveautés, événements et offres spéciales.
              </p>
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              window.location.href = newsletterTarget;
            }}
            className="flex w-full flex-col gap-3 min-[560px]:flex-row desktop:max-w-[640px]"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              placeholder="Votre email"
              className="min-h-[56px] flex-1 border border-white/45 bg-transparent px-5 text-[15px] text-white placeholder:text-white/68 outline-none"
            />
            <button
              type="submit"
              className="inline-flex min-h-[56px] items-center justify-center border border-white/65 px-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </section>

      <ReservationCtaComponent
        phone={restaurantContext?.restaurantData?.phone}
        phoneLabel={phoneLabel}
      />

      {selectedNews ? (
        <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      ) : null}
    </>
  );
}
