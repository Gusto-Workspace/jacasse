import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Facebook, Instagram, Linkedin, Music2, Youtube } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import {
  getRestaurantBrandParts,
  getSocialLinks,
} from "@/_assets/utils/site-display.utils";
import {
  buildContactInfos,
  buildContactSchedules,
} from "@/_assets/utils/contact.utils";

function getPrimarySocialLinks(socialLinks) {
  return socialLinks.filter(
    (item) => item.icon === "facebook" || item.icon === "instagram",
  );
}

function groupSchedules(scheduleItems) {
  const usableItems = (scheduleItems || []).filter(
    (item) => item?.hours && item.hours !== "-" && item.hours !== "Fermé",
  );

  return usableItems.reduce((groups, item) => {
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.hours === item.hours) {
      lastGroup.days.push(item.day);
      return groups;
    }

    groups.push({ days: [item.day], hours: item.hours });
    return groups;
  }, []);
}

function formatDayRange(days) {
  if (!days.length) {
    return "";
  }

  if (days.length === 1) {
    return days[0];
  }

  return `${days[0]} - ${days[days.length - 1]}`;
}

export default function FooterComponent() {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const brand = getRestaurantBrandParts(restaurantData);
  const socialLinks = getSocialLinks(restaurantData);
  const primarySocialLinks = getPrimarySocialLinks(socialLinks);
  const contactInfos = buildContactInfos(restaurantData);
  const scheduleGroups = groupSchedules(buildContactSchedules(restaurantData));
  const addressInfo = contactInfos.find((item) => item.key === "address");
  const phoneInfo = contactInfos.find((item) => item.key === "phone");
  const emailInfo = contactInfos.find((item) => item.key === "email");
  const iconByPlatform = {
    facebook: Facebook,
    instagram: Instagram,
    tiktok: Music2,
    youtube: Youtube,
    linkedin: Linkedin,
  };

  return (
    <footer className="border-t border-[rgba(20,72,47,0.08)] bg-[var(--site-cream)] text-[var(--site-ink)]">
      <div className="mx-auto max-w-[1730px] px-5 py-10 tablet:px-8 tablet:py-12 desktop:px-[44px]">
        <div className="grid gap-8 desktop:grid-cols-[0.5fr_0.9fr_1fr_1fr_1.15fr] desktop:gap-0">
          <div className="flex justify-center desktop:pr-4">
            <Link href="/" className="inline-flex ">
              <div className="relative h-[96px] w-[78px]">
                <Image
                  src="/img/logo-green.webp"
                  alt={brand.full}
                  fill
                  sizes="78px"
                  className="object-contain object-center"
                />
              </div>
            </Link>
          </div>

          <div className="desktop:border-l desktop:border-[rgba(20,72,47,0.16)] desktop:px-8">
            <p className="kalam-font max-w-[220px] text-[30px] leading-[1.24] text-[var(--site-ink)]">
              Tapas, vins & bons moments à Montauban.
            </p>
          </div>

          <div className="desktop:border-l desktop:border-[rgba(20,72,47,0.16)] desktop:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgba(19,24,20,0.62)]">
              Adresse
            </p>
            <p className="mt-3 whitespace-pre-line text-[15px] font-medium uppercase leading-[1.55] tracking-[0.03em]">
              {String(addressInfo?.value || "-").replace(/,\s*/g, "\n")}
            </p>
          </div>

          <div className="desktop:border-l desktop:border-[rgba(20,72,47,0.16)] desktop:px-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgba(19,24,20,0.62)]">
              Horaires
            </p>
            <div className="mt-3 space-y-3">
              {scheduleGroups.length ? (
                scheduleGroups.slice(0, 3).map((group) => (
                  <div key={`${group.days[0]}-${group.hours}`}>
                    <p className="text-[13px] font-semibold uppercase tracking-[0.08em]">
                      {formatDayRange(group.days)}
                    </p>
                    <p className="mt-1 text-[15px] uppercase tracking-[0.03em]">
                      {group.hours}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[15px] uppercase tracking-[0.03em]">-</p>
              )}
            </div>
          </div>

          <div className="desktop:border-l desktop:border-[rgba(20,72,47,0.16)] desktop:pl-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgba(19,24,20,0.62)]">
              Contact
            </p>
            <div className="mt-3 space-y-2 text-[15px] uppercase tracking-[0.03em]">
              {phoneInfo?.href ? (
                <a
                  href={phoneInfo.href}
                  className="block transition hover:text-[var(--site-orange)]"
                >
                  {phoneInfo.value}
                </a>
              ) : (
                <p>{phoneInfo?.value || "-"}</p>
              )}
              {emailInfo?.href ? (
                <a
                  href={emailInfo.href}
                  className="block break-words transition hover:text-[var(--site-orange)]"
                >
                  {emailInfo.value}
                </a>
              ) : (
                <p>{emailInfo?.value || "-"}</p>
              )}
            </div>

            {primarySocialLinks.length ? (
              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgba(19,24,20,0.62)]">
                  Suivez-nous
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {primarySocialLinks.map((item) => {
                    const Icon = iconByPlatform[item.icon] || Music2;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--site-orange)] text-white transition hover:translate-y-[-1px] hover:bg-[var(--site-orange-deep)]"
                      >
                        <Icon size={18} strokeWidth={2} />
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-[var(--site-orange-deep)] text-white">
        <div className="mx-auto flex max-w-[1730px] flex-col gap-4 px-5 py-5 text-[12px] font-medium uppercase tracking-[0.14em] tablet:px-8 desktop:flex-row desktop:items-center desktop:justify-between desktop:px-[44px]">
          <div className="flex flex-col desktop:flex-row gap-2">
            <p>© {new Date().getFullYear()} Jacasse</p>•
            <p>Tous droits réservés</p>•
            <a
              href="https://gusto-manager.com"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white underline underline-offset-4"
            >
              Propulsé par Gusto Manager
            </a>
          </div>
          <div className="flex flex-col gap-3 desktop:flex-row desktop:items-center desktop:gap-2">
            <Link href="/legales" className="transition hover:text-white/72">
              Mentions légales
            </Link>•
            <Link href="/policy" className="transition hover:text-white/72">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
