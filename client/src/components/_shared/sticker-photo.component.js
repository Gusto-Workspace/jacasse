import Image from "next/image";
import { useState } from "react";
import RevealOnScrollComponent from "./motion/reveal-on-scroll.component";

export default function StickerPhotoComponent({
  src,
  alt,
  className = "",
  imageSizes = "220px",
  rotatePatch = "0deg",
  revealDelay = 0,
  disableMotion = false,
  layerClassName = "",
}) {
  const [hidden, setHidden] = useState(false);

  if (!src || hidden) {
    return null;
  }

  const content = (
    <div
      className={`pointer-events-none absolute hidden overflow-hidden rounded-[26px] border border-white/60 bg-white p-3 shadow-[0_24px_60px_rgba(11,16,13,0.16)] desktop:block ${className} ${layerClassName}`.trim()}
    >
      <div
        className="absolute left-1/2 top-3 z-10 h-8 w-28 -translate-x-1/2 rounded-[4px] bg-[rgba(238,229,206,0.92)] shadow-[0_8px_16px_rgba(11,16,13,0.08)]"
        style={{ transform: `translateX(-50%) rotate(${rotatePatch})` }}
      />
      <div className="relative h-full w-full overflow-hidden rounded-[18px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={imageSizes}
          className="object-cover"
          onError={() => setHidden(true)}
        />
      </div>
    </div>
  );

  if (disableMotion) {
    return content;
  }

  return (
    <RevealOnScrollComponent delay={revealDelay} variant="zoom">
      {content}
    </RevealOnScrollComponent>
  );
}
