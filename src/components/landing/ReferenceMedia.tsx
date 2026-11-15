/** Exact approved mockup rendered as a CSS window. It is illustrative, never a partner photograph. */
export function ReferenceMedia({ index, className = "" }: { index: number; className?: string }) {
  return (
    <div
      className={`reference-media reference-media-${index} ${className}`}
      role="img"
      aria-label="Illustrative scene from the approved design reference; not a photograph of JCA or Salvi"
    />
  );
}
