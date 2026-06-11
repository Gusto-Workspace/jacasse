import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import { hasVisibleNews } from "@/_assets/utils/news.utils";

const baseMenuItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & menus", href: "/menus" },
  { label: "Actualités", href: "/news", visibilityKey: "news" },
  { label: "Contact", href: "/contact" },
];
let hasAssignedInitialNavReveal = false;

function isCurrentPath(routerPath, href) {
  if (href === "/") {
    return routerPath === "/";
  }

  return routerPath.startsWith(href.split("#")[0]);
}

function Brand({ scrolled = false }) {
  const logoSrc = scrolled ? "/img/logo-green.webp" : "/img/logo-white.webp";

  return (
    <div className="relative h-[76px] w-[60px] tablet:h-[92px] tablet:w-[74px]">
      <Image
        src={logoSrc}
        alt="Jacasse"
        fill
        priority
        sizes="74px"
        className="object-contain"
      />
    </div>
  );
}

export default function NavComponent({ isVisible = true, scrolled = false }) {
  const router = useRouter();
  const { restaurantContext } = useContext(GlobalContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shouldAnimateInitialReveal] = useState(!hasAssignedInitialNavReveal);
  const [hasStartedNewsVisibilityCheck, setHasStartedNewsVisibilityCheck] =
    useState(false);
  const [newsVisibilityResolved, setNewsVisibilityResolved] = useState(
    hasAssignedInitialNavReveal,
  );
  const [navReady, setNavReady] = useState(hasAssignedInitialNavReveal);
  const [animateOnMount, setAnimateOnMount] = useState(false);
  const [mountReady, setMountReady] = useState(hasAssignedInitialNavReveal);
  const [visibilityTransitionsEnabled, setVisibilityTransitionsEnabled] =
    useState(hasAssignedInitialNavReveal);
  const restaurantData = restaurantContext?.restaurantData;
  const restaurantDataLoading = restaurantContext?.dataLoading;

  const menuItems = useMemo(
    () =>
      baseMenuItems.filter((item) => {
        if (item.visibilityKey === "news") {
          return newsVisibilityResolved && hasVisibleNews(restaurantData);
        }

        return true;
      }),
    [newsVisibilityResolved, restaurantData],
  );

  useEffect(() => {
    if (isVisible && !hasAssignedInitialNavReveal) {
      hasAssignedInitialNavReveal = true;
      setAnimateOnMount(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (restaurantDataLoading || restaurantData) {
      setHasStartedNewsVisibilityCheck(true);
    }
  }, [restaurantData, restaurantDataLoading]);

  useEffect(() => {
    if (newsVisibilityResolved) {
      return;
    }

    if (restaurantData) {
      const frame = window.requestAnimationFrame(() => {
        setNewsVisibilityResolved(true);
        setNavReady(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (hasStartedNewsVisibilityCheck && !restaurantDataLoading) {
      const frame = window.requestAnimationFrame(() => {
        setNewsVisibilityResolved(true);
        setNavReady(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const fallback = window.setTimeout(() => {
      setNewsVisibilityResolved(true);
      setNavReady(true);
    }, 500);

    return () => window.clearTimeout(fallback);
  }, [
    hasStartedNewsVisibilityCheck,
    newsVisibilityResolved,
    restaurantData,
    restaurantDataLoading,
  ]);

  useEffect(() => {
    if (!shouldAnimateInitialReveal) {
      return;
    }

    if (!navReady) {
      return;
    }

    let firstFrame = null;
    let secondFrame = null;

    if (animateOnMount) {
      setVisibilityTransitionsEnabled(true);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          setMountReady(true);
        });
      });
    } else {
      setMountReady(true);
      firstFrame = window.requestAnimationFrame(() => {
        setVisibilityTransitionsEnabled(true);
      });
    }

    return () => {
      if (firstFrame) window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [animateOnMount, navReady, shouldAnimateInitialReveal]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const desktopTextClass = scrolled
    ? "text-[var(--site-ink)]"
    : "text-[var(--site-cream)]";
  const navIsDisplayed = navReady && mountReady && isVisible;

  return (
    <>
      <div
        className={`fixed inset-0 z-[59] bg-[rgba(12,12,11,0.62)] transition duration-300 min-[1180px]:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-[60] flex h-screen w-[90%] max-w-[380px] flex-col bg-[var(--site-cream)] px-7 pb-10 pt-6 text-[var(--site-ink)] shadow-[0_24px_80px_rgba(11,16,13,0.22)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] min-[1180px]:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Accueil">
            <Brand scrolled />
          </Link>

          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--site-line)]"
          >
            <X size={21} strokeWidth={1.7} />
          </button>
        </div>

        <nav className="mt-16 flex flex-1 flex-col justify-center gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-4 ${
                isCurrentPath(router.pathname, item.href) ? "opacity-100" : "opacity-78"
              }`}
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--site-orange-deep)]">
                0{index + 1}
              </span>
              <span className="nav-font text-[25px] leading-none">{item.label}</span>
            </Link>
          ))}
        </nav>

        <Link
          href="/reservations"
          onClick={() => setMenuOpen(false)}
          className="inline-flex min-h-[52px] items-center justify-center border border-[var(--site-orange)] bg-[var(--site-orange)] px-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
        >
          Réserver
        </Link>
      </aside>

      <nav
        className={`fixed left-0 top-0 z-[50] w-full ${
          visibilityTransitionsEnabled
            ? "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : "transition-none"
        } ${
          navIsDisplayed
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } ${
          scrolled
            ? "bg-[rgba(246,241,232,0.95)] shadow-[0_14px_40px_rgba(11,16,13,0.08)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[96px] w-full max-w-[1720px] items-center justify-between px-5 tablet:px-8 desktop:px-12">
          <Link href="/" aria-label="Accueil" className="shrink-0">
            <Brand scrolled={scrolled} />
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-7 pr-5 min-[1180px]:flex min-[1440px]:gap-9 min-[1440px]:pr-7">
            {menuItems.map((item) => {
              const active = isCurrentPath(router.pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative pb-[3px] text-[13px] font-semibold uppercase tracking-[0.12em] transition ${
                    active
                      ? `${desktopTextClass}`
                      : `${desktopTextClass} opacity-82 hover:opacity-100`
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--site-orange)] transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden min-[1180px]:block">
            <Link
              href="/reservations"
              className={`inline-flex min-h-[56px] min-w-[158px] items-center justify-center border px-7 text-[12px] font-semibold uppercase tracking-[0.18em] transition ${
                scrolled
                  ? "border-[var(--site-orange)] bg-[var(--site-orange)] text-white"
                  : "border-[rgba(103,155,102,0.72)] bg-[rgba(0,0,0,0.08)] text-white hover:bg-[var(--site-orange)] hover:border-[var(--site-orange)]"
              }`}
            >
              Réserver
            </Link>
          </div>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen(true)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border min-[1180px]:hidden ${
              scrolled
                ? "border-[var(--site-line)] bg-white/80 text-[var(--site-ink)]"
                : "border-white/30 bg-white/10 text-[var(--site-cream)]"
            }`}
          >
            <Menu size={20} strokeWidth={1.7} />
          </button>
        </div>
      </nav>
    </>
  );
}
