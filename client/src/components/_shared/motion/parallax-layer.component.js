import { useEffect, useRef } from "react";

export default function ParallaxLayerComponent({
  children,
  className = "",
  offset = 24,
  ...props
}) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (!node || typeof window === "undefined") {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    const updatePosition = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const progress = (elementCenter - viewportCenter) / window.innerHeight;
      node.style.transform = `translate3d(0, ${progress * offset * -1}px, 0)`;
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [offset]);

  return (
    <div ref={nodeRef} className={className} {...props}>
      {children}
    </div>
  );
}
