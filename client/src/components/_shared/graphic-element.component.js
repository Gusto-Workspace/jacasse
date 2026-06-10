import Image from "next/image";
import { useState } from "react";

export default function GraphicElementComponent({
  src,
  className = "",
  sizes = "180px",
  disableMotion = false,
}) {
  const [hidden, setHidden] = useState(false);

  if (!src || hidden) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${disableMotion ? "" : "site-float"} ${className}`.trim()}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className="object-contain"
        onError={() => setHidden(true)}
      />
    </div>
  );
}
