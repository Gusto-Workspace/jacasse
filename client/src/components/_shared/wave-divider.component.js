export default function WaveDividerComponent({
  position = "top",
  fill = "var(--site-cream)",
  detail = "rgba(255,255,255,0.65)",
  secondaryDetail = "rgba(171,144,88,0.18)",
  height = 90,
  overlap = 0,
  flipX = false,
  flipY = false,
  scaleY = 1,
}) {
  const verticalClass = position === "bottom" ? "bottom-0" : "top-0";
  const transforms = [
    flipX ? "scaleX(-1)" : "",
    flipY ? "scaleY(-1)" : "",
    scaleY !== 1 ? `scaleY(${scaleY})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 z-[2] w-full overflow-hidden ${verticalClass}`}
      style={{
        height: `${height}px`,
        transform: transforms || undefined,
        transformOrigin: "center center",
        marginTop: position === "top" ? `-${overlap}px` : undefined,
        marginBottom: position === "bottom" ? `-${overlap}px` : undefined,
      }}
    >
      <svg viewBox="0 0 1440 120" className="h-full w-full" preserveAspectRatio="none">
        <path
          d="M0 54C157 86 290 95 432 83C581 70 649 23 788 18C940 13 1051 62 1188 70C1286 76 1378 59 1440 42V120H0Z"
          fill={fill}
        />
        <path
          d="M0 47C158 74 291 82 432 70C579 58 646 16 787 12C941 8 1054 47 1191 56C1287 62 1379 48 1440 34"
          fill="none"
          stroke={detail}
          strokeWidth="2"
        />
        <path
          d="M0 61C158 94 296 101 440 89C584 78 668 37 803 34C948 31 1056 74 1189 82C1286 88 1378 73 1440 58"
          fill="none"
          stroke={secondaryDetail}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
