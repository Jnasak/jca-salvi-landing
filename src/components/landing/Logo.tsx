import { cn } from "@/lib/utils";

/** The supplied JCA × Salvi SVG, rendered unmodified (full viewBox, no cropping). */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/jca-salvi-logo.svg"
      width={1000}
      height={220}
      alt="JCA × Salvi — Business, Product & Operations Delivery Partners"
      className={cn("block h-auto", className)}
      decoding="async"
    />
  );
}
