import { cn } from "@/lib/utils";

/** The complete V2.4.1 asset, with original signature paths and viewBox preserved. */
export function Logo({
  className,
  appearance = "light",
}: {
  className?: string;
  appearance?: "light" | "dark";
}) {
  return (
    <img
      src={`/brand/js-businesssuite-v241-${appearance === "dark" ? "reverse" : "primary"}.svg`}
      width={680}
      height={490}
      alt="JS BusinessSuite"
      className={cn("block h-auto", className)}
      decoding="async"
    />
  );
}
