import { cn } from "@/lib/utils";

/**
 * Editorial partner frame. Approved photos are pending, so the frame shows only the
 * partner's name in plain type — never people imagery, silhouettes or logo-like marks.
 */
export function PortraitPlaceholder({
  name,
  label,
  index,
  className,
}: {
  name: string;
  label: string;
  index: number;
  className?: string;
}) {
  return (
    <figure className={cn("flex min-w-0 flex-col gap-3", className)}>
      <div
        role="img"
        aria-label={label}
        className="portrait-wash relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] border border-evergreen/15 shadow-soft sm:rounded-[1.75rem]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-2 rounded-[0.9rem] border border-evergreen/15 sm:inset-3 sm:rounded-[1.35rem]"
        />
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 size-1.5 rounded-full bg-champagne sm:left-6 sm:top-6"
        />
        <span
          aria-hidden="true"
          className="absolute right-4 top-3 font-sans text-[0.65rem] font-semibold tracking-[0.18em] text-evergreen-soft sm:right-6 sm:top-[1.15rem]"
        >
          0{index}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-x-4 bottom-4 font-display text-[1.65rem] leading-none text-evergreen sm:inset-x-6 sm:bottom-6 sm:text-4xl"
        >
          {name}
        </span>
      </div>
      <figcaption className="flex items-start gap-2 text-xs font-medium leading-snug text-evergreen-soft sm:text-sm">
        <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-champagne sm:w-5" />
        {label}
      </figcaption>
    </figure>
  );
}

