import Image from "next/image";
import RevealOnScrollComponent from "../_shared/motion/reveal-on-scroll.component";
import ReservationCtaComponent from "../_shared/reservation-cta/reservation-cta.component";
import {
  buildMenuBlocks,
  getMenuPriceLabel,
  getMenuTitle,
  getVisibleMenus,
  isMenuBlankLine,
  isMenuSeparatorLabel,
} from "../../_assets/utils/menu-display.utils";
import {
  getVisibleDishCategories,
  getVisibleMenuCategories,
} from "../../_assets/utils/site-display.utils";

const categoryImages = [
  {
    src: "/img/menu/plate-1.webp",
    alt: "Panisses marseillaises",
    caption: "Panisses\nmarseillaises",
  },
  {
    src: "/img/menu/plate-2.webp",
    alt: "Porc croustillant",
    caption: "Porc\ncroustillant",
  },
  {
    src: "/img/menu/plate-3.webp",
    alt: "Foie gras maison",
    caption: "Foie gras\nmaison",
  },
];

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function makeAnchorId(label) {
  return normalizeKey(label)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatPhoneNumber(value) {
  const digits = String(value || "").replace(/[^\d+]/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("+")) {
    return digits;
  }

  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

function buildOrderedCategories(categories) {
  return (categories || []).map((category, index) => ({
    ...category,
    anchorId: makeAnchorId(category?.title || `category-${index + 1}`),
    image: categoryImages[index % categoryImages.length],
  }));
}

function MenuLine({ item }) {
  if (item.isSubCategoryHeading) {
    return (
      <h3
        className="border-b border-[rgba(20,72,47,0.2)] pb-3 pt-7 text-[15px] font-semibold uppercase tracking-[0.18em] text-[var(--site-orange-deep)] first:pt-3"
        data-print-subcategory-title
      >
        {item.name}
      </h3>
    );
  }

  return (
    <div
      className="border-b border-[rgba(20,72,47,0.16)] py-4 last:border-b-0"
      data-print-dish
    >
      <div className="flex items-start gap-4">
        <h4 className="min-w-0 flex-1 text-[17px] font-extrabold uppercase leading-[1.18] tracking-[0.02em] text-[var(--site-ink)] tablet:text-[18px]">
          {item.name}
        </h4>
        {item.price ? (
          <span className="shrink-0 text-[19px] font-medium leading-none text-[var(--site-ink)]">
            {item.price}
          </span>
        ) : null}
      </div>
      {item.description ? (
        <p className="mt-2 max-w-[92%] text-[15px] leading-[1.5] text-[rgba(19,24,20,0.64)]">
          {item.description}
        </p>
      ) : null}
    </div>
  );
}

function getCategoryEntries(category) {
  return [
    ...(category?.items || []),
    ...(category?.subCategories || []).flatMap((subCategory) => [
      {
        id: `subcategory-${subCategory.id}`,
        name: subCategory.title,
        isSubCategoryHeading: true,
      },
      ...subCategory.items,
    ]),
  ];
}

function getFirstChunkEndIndex(entries) {
  let dishCount = 0;

  for (let index = 0; index < entries.length; index += 1) {
    if (!entries[index].isSubCategoryHeading) dishCount += 1;
    if (dishCount === 2) return index + 1;
  }

  return entries.length;
}

function MenuLines({ entries }) {
  const content = [];

  for (let index = 0; index < entries.length; index += 1) {
    const item = entries[index];

    if (item.isSubCategoryHeading) {
      const firstItem = entries[index + 1];
      const hasFirstItem = firstItem && !firstItem.isSubCategoryHeading;

      content.push(
        <div key={item.id} data-print-subcategory-first-chunk>
          <MenuLine item={item} />
          {hasFirstItem ? <MenuLine item={firstItem} /> : null}
        </div>,
      );
      if (hasFirstItem) index += 1;
    } else {
      content.push(<MenuLine key={item.id} item={item} />);
    }
  }

  return content;
}

function CategoryList({ category }) {
  const entries = getCategoryEntries(category);
  if (!entries.length) {
    return null;
  }
  const firstChunkEndIndex = getFirstChunkEndIndex(entries);
  const firstEntries = entries.slice(0, firstChunkEndIndex);
  const remainingEntries = entries.slice(firstChunkEndIndex);

  return (
    <div id={category.anchorId} className="scroll-mt-[130px]">
      <div data-print-category-first-chunk>
        <div className="mb-8 flex items-center gap-4">
          <h2
            data-print-category-title
            className="yeseva-one-regular text-[44px] uppercase leading-[0.94] tracking-[-0.04em] text-[var(--site-orange-deep)] tablet:text-[58px]"
          >
            {category.title}
          </h2>
          <Image
            src="/img/_shared/ornement.webp"
            alt=""
            width={46}
            height={22}
            className="h-auto w-[42px] object-contain"
          />
        </div>

        {category.description ? (
          <p className="mb-6 max-w-[680px] text-[16px] leading-[1.6] text-[rgba(19,24,20,0.64)]">
            {category.description}
          </p>
        ) : null}

        <div className="border-t border-[rgba(20,72,47,0.2)]">
          <MenuLines entries={firstEntries} />
        </div>
      </div>
      {remainingEntries.length ? (
        <MenuLines entries={remainingEntries} />
      ) : null}
    </div>
  );
}

function MediaCard({ image }) {
  if (!image) {
    return null;
  }

  return (
    <div className="site-hover-lift site-media-zoom relative overflow-hidden rounded-[10px] border border-[rgba(20,72,47,0.12)] bg-[rgba(12,16,13,0.04)]">
      <div className="relative aspect-[1/1] w-full">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 620px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function renderMenuBlockLine(line, key) {
  if (isMenuBlankLine(line)) {
    return <div key={key} className="h-2" aria-hidden="true" />;
  }

  if (isMenuSeparatorLabel(line)) {
    return (
      <p
        key={key}
        className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70"
      >
        {line}
      </p>
    );
  }

  return (
    <p key={key} className="text-[14px] leading-[1.45] text-white/88">
      {line}
    </p>
  );
}

function MenusPanel({ menus, menuCategories }) {
  const hasMenus = menus.length > 0 || menuCategories.length > 0;

  if (!hasMenus) {
    return null;
  }

  return (
    <aside className="rounded-[10px] bg-[var(--site-orange)] p-6 text-white shadow-[0_22px_60px_rgba(20,72,47,0.22)] tablet:p-8">
      <div className="mb-8 flex items-start justify-between gap-5">
        <div>
          <h2 className="yeseva-one-regular text-[42px] uppercase leading-[0.94] tracking-[-0.04em] text-[var(--site-cream)] tablet:text-[54px]">
            Menus
          </h2>
          <p className="mt-2 text-[12px] uppercase tracking-[0.22em] text-white/72">
            Formules & suggestions
          </p>
        </div>
        <Image
          src="/img/_shared/explose-1.webp"
          alt=""
          width={34}
          height={34}
          className="h-auto w-[30px]"
        />
      </div>

      <div className="space-y-7">
        {menuCategories.map((category) => (
          <div
            key={category.id}
            className="border-b border-white/18 pb-6 last:border-b-0 last:pb-0"
          >
            <h3 className="text-[23px] font-medium uppercase tracking-[0.03em]">
              {category.title}
            </h3>
            {category.description ? (
              <p className="kalam-font mt-1 text-[20px] leading-[1.2] text-white/80">
                {category.description}
              </p>
            ) : null}
            <div className="mt-4 space-y-4">
              {getCategoryEntries(category).map((item) =>
                item.isSubCategoryHeading ? (
                  <h4
                    key={item.id}
                    className="border-t border-white/18 pt-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/72"
                  >
                    {item.name}
                  </h4>
                ) : (
                  <div
                    key={item.id}
                    className="border-t border-white/12 pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[16px] font-semibold uppercase leading-[1.25]">
                        {item.name}
                      </p>
                      {item.price ? (
                        <span className="shrink-0 text-[18px] text-nowrap">
                          {item.price}
                        </span>
                      ) : null}
                    </div>
                    {item.description ? (
                      <p className="mt-1 text-[14px] leading-[1.45] text-white/74">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                ),
              )}
            </div>
          </div>
        ))}

        {menus.map((menu, index) => {
          const blocks = buildMenuBlocks(menu);
          const priceLabel = getMenuPriceLabel(menu);

          return (
            <div
              key={menu?._id || `menu-${index}`}
              className="border-b border-white/18 pb-6 last:border-b-0 last:pb-0"
            >
              <div
                className="flex items-center justify-between gap-4"
                data-print-title-price-row
              >
                <h3
                  className="text-[24px] font-medium uppercase tracking-[0.03em]"
                  data-print-title
                >
                  {getMenuTitle(menu, index)}
                </h3>
                {priceLabel ? (
                  <span
                    className="shrink-0 text-[23px] leading-none text-nowrap"
                    data-print-price
                  >
                    {priceLabel}
                  </span>
                ) : null}
              </div>
              {menu?.description ? (
                <p className="kalam-font mt-2 text-[21px] leading-[1.2] text-white/82">
                  {menu.description}
                </p>
              ) : null}

              <div className="mt-4 space-y-4">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className="border-t border-white/12 pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[15px] font-semibold uppercase tracking-[0.12em] text-white/76">
                        {block.title}
                      </p>
                      {block.price ? (
                        <span className="text-[16px] text-white/86 text-nowrap">
                          {block.price}
                        </span>
                      ) : null}
                    </div>
                    {block.lines?.length ? (
                      <div className="mt-2 space-y-1">
                        {block.lines.map((line, lineIndex) =>
                          renderMenuBlockLine(line, `${block.id}-${lineIndex}`),
                        )}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function SuggestionCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[10px] border border-[rgba(20,72,47,0.16)] bg-white/72 p-6 tablet:p-8">
      <div>
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3 className="text-[32px] font-extrabold uppercase leading-[0.98] tracking-[0.02em] text-[var(--site-ink)]">
              Suggestion du chef
            </h3>
            <p className="kalam-font mt-2 text-[24px] leading-[1.18] text-[var(--site-ink)]">
              A l&apos;ardoise selon l&apos;arrivage
            </p>
          </div>
          <Image
            src="/img/_shared/explose-2.webp"
            alt=""
            width={32}
            height={32}
            className="h-auto w-[28px]"
          />
        </div>

        <p className="mt-8 max-w-[300px] text-[16px] leading-[1.6] text-[rgba(19,24,20,0.7)]">
          Demandez notre ardoise pour découvrir les créations du moment.
        </p>
      </div>

      <div className="mt-10">
        <Image
          src="/img/menu/line.webp"
          alt=""
          width={96}
          height={30}
          className="h-auto w-[90px]"
        />
      </div>
    </div>
  );
}

function CocktailSignatureCard() {
  return (
    <div
      id="cocktails"
      className="scroll-mt-[130px] h-full overflow-hidden rounded-[10px] border border-[rgba(20,72,47,0.12)] bg-[var(--site-orange)] text-white"
    >
      <div className="grid h-full gap-0 min-[700px]:grid-cols-[0.72fr_1fr]">
        <div className="relative min-h-[300px]">
          <Image
            src="/img/home/unavoidable-3.webp"
            alt="Cocktail signature"
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover"
          />
        </div>
        <div className="flex h-full flex-col justify-center px-6 py-8 tablet:px-8 tablet:py-10">
          <div>
            <h2 className="text-[34px] font-extrabold uppercase leading-[0.96] tracking-[0.03em]">
              Cocktail signature
            </h2>
            <p className="mt-2 text-[13px] uppercase tracking-[0.22em] text-white/72">
              L&apos;apero sur verre
            </p>

            <div className="mt-8">
              <p className="text-[16px] leading-[1.6] text-white/84">
                Une sélection de cocktails, vins et boissons visible selon la
                carte active du restaurant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryBand({ categories }) {
  if (!categories.length) {
    return null;
  }

  return (
    <div className="relative z-20 px-2 pt-8 tablet:pt-10 desktop:pt-12">
      <div className="mx-auto max-w-[1500px] rounded-[16px] border border-[rgba(20,72,47,0.14)] bg-[var(--site-cream)] px-6 py-5 shadow-[0_24px_70px_rgba(19,24,20,0.16)] backdrop-blur desktop:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 desktop:gap-x-6">
          {categories.map((category, index) => (
            <div key={category.anchorId} className="contents">
              <a
                href={`#${category.anchorId}`}
                className={`inline-flex min-h-[38px] items-center justify-center px-5 text-[12px] font-semibold uppercase tracking-[0.22em] transition ${
                  index === 0
                    ? "rounded-full bg-[var(--site-orange)] text-white shadow-[0_10px_24px_rgba(20,72,47,0.18)]"
                    : "text-[var(--site-ink)] hover:text-[var(--site-orange)]"
                }`}
              >
                {category.title}
              </a>
              {index < categories.length - 1 ? (
                <span className="hidden text-[rgba(20,72,47,0.22)] desktop:inline">
                  •
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ListMenusComponent({
  restaurantData,
  printMode = false,
}) {
  const orderedCategories = buildOrderedCategories(
    getVisibleDishCategories(restaurantData),
  );
  const visibleMenus = getVisibleMenus(restaurantData);
  const visibleMenuCategories = getVisibleMenuCategories(restaurantData);
  const phoneLabel = formatPhoneNumber(restaurantData?.phone);
  const firstCategory = orderedCategories[0] || null;
  const remainingCategories = orderedCategories.slice(1);

  return (
    <section
      id="menu-content"
      className="site-shell relative overflow-visible px-5 pb-14 pt-0 tablet:px-8 tablet:pb-16 desktop:px-[44px] desktop:pb-20"
    >
      <div className="mx-auto max-w-[1730px]">
        {!printMode ? <CategoryBand categories={orderedCategories} /> : null}

        <div className="mt-8 space-y-6 tablet:mt-10 tablet:space-y-8">
          {firstCategory ? (
            <div
              className={`grid gap-6 ${printMode ? "" : "desktop:grid-cols-[1.05fr_0.9fr_0.72fr]"}`}
            >
              <RevealOnScrollComponent
                variant="up"
                className="rounded-[10px] border border-[rgba(20,72,47,0.14)] bg-white/62 p-6 tablet:p-8"
              >
                <CategoryList category={firstCategory} />
              </RevealOnScrollComponent>

              {!printMode ? (
                <RevealOnScrollComponent variant="zoom">
                  <MediaCard image={firstCategory.image} />
                </RevealOnScrollComponent>
              ) : null}

              {!printMode ? (
                <div className="relative hidden self-start desktop:block desktop:sticky desktop:top-[104px]">
                  <RevealOnScrollComponent variant="up">
                    <MenusPanel
                      menus={visibleMenus}
                      menuCategories={visibleMenuCategories}
                    />
                  </RevealOnScrollComponent>
                </div>
              ) : null}
            </div>
          ) : null}

          {remainingCategories.map((category, index) => {
            const isTextLeft = index % 2 === 1;

            return (
              <div
                key={category.anchorId}
                className={`grid gap-6 ${
                  printMode
                    ? ""
                    : isTextLeft
                      ? "desktop:grid-cols-[2fr_1fr]"
                      : "desktop:grid-cols-[1fr_2fr]"
                }`}
              >
                <RevealOnScrollComponent
                  variant="up"
                  className={`rounded-[10px] border border-[rgba(20,72,47,0.14)] bg-white/62 p-6 tablet:p-8 ${
                    isTextLeft ? "desktop:order-1" : "desktop:order-2"
                  }`}
                >
                  <CategoryList category={category} />
                </RevealOnScrollComponent>

                {!printMode ? (
                  <RevealOnScrollComponent
                    variant="zoom"
                    className={
                      isTextLeft ? "desktop:order-2" : "desktop:order-1"
                    }
                  >
                    <MediaCard image={category.image} />
                  </RevealOnScrollComponent>
                ) : null}
              </div>
            );
          })}

          <div className={printMode ? "" : "desktop:hidden"}>
            <RevealOnScrollComponent variant="up">
              <MenusPanel
                menus={visibleMenus}
                menuCategories={visibleMenuCategories}
              />
            </RevealOnScrollComponent>
          </div>

          {!printMode ? (
            <div className="grid items-stretch gap-6 desktop:grid-cols-[0.72fr_1.28fr]">
              <RevealOnScrollComponent variant="up" className="h-full">
                <SuggestionCard />
              </RevealOnScrollComponent>

              <RevealOnScrollComponent variant="up" className="h-full">
                <CocktailSignatureCard />
              </RevealOnScrollComponent>
            </div>
          ) : null}
        </div>

        {!printMode ? (
          <ReservationCtaComponent
            phone={restaurantData?.phone}
            phoneLabel={phoneLabel}
            className="mt-10 rounded-[8px]"
          />
        ) : null}
      </div>
    </section>
  );
}
