import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Compass, Pause, Play, Route, Users } from "lucide-react";
import { workflowStages } from "@/content/landing";
import { cn } from "@/lib/utils";

const CYCLE_MS = 3800;

const nodes = [
  { x: 78, y: 176, Icon: Users },
  { x: 240, y: 76, Icon: Compass },
  { x: 402, y: 176, Icon: Route },
];

const connectors = [
  "M78 176 C 110 100, 170 76, 240 76",
  "M240 76 C 310 76, 370 100, 402 176",
  "M402 176 C 350 250, 130 250, 78 176",
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Illustrative animated workflow for the hero. Not client data. */
export function WorkflowGraphic() {
  const uid = useId().replace(/:/g, "");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reduced motion: start (and stay) paused unless the user explicitly presses play.
  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (playing) svg.unpauseAnimations?.();
    else svg.pauseAnimations?.();
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % workflowStages.length), CYCLE_MS);
    return () => window.clearInterval(t);
  }, [playing]);

  const select = useCallback((i: number, focus = false) => {
    setActive(i);
    setPlaying(false);
    if (focus) tabRefs.current[i]?.focus();
  }, []);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = workflowStages.length;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select((i + 1) % n, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select((i - 1 + n) % n, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      select(n - 1, true);
    }
  };

  const stage = workflowStages[active] ?? workflowStages[0]!;
  const motionOn = playing && !reduced;

  return (
    <div
      className={cn(
        "relative rounded-3xl border border-evergreen/10 bg-paper p-4 shadow-lift sm:p-6",
        !motionOn && "wf-paused",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow text-evergreen-soft">Illustrative workflow</p>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={!playing}
          aria-label={playing ? "Pause workflow animation" : "Play workflow animation"}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-evergreen/20 bg-cream px-3 text-xs font-semibold text-evergreen transition-colors hover:border-evergreen"
        >
          {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <div className="dot-grid relative mt-3 overflow-hidden rounded-2xl bg-cream">
        <svg
          ref={svgRef}
          viewBox="0 0 480 270"
          className="block h-auto w-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id={`${uid}-g`} x1="0" x2="1">
              <stop offset="0%" stopColor="var(--persimmon)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0.95" />
            </linearGradient>
            {connectors.map((d, i) => (
              <path key={i} id={`${uid}-p${i}`} d={d} />
            ))}
          </defs>

          {/* base rails */}
          {connectors.map((d, i) => (
            <path
              key={`rail-${i}`}
              d={d}
              fill="none"
              stroke="var(--evergreen)"
              strokeOpacity={i === 2 ? 0.08 : 0.12}
              strokeWidth={i === 2 ? 1.5 : 6}
              strokeLinecap="round"
            />
          ))}
          {/* moving connectors */}
          {connectors.map((d, i) => {
            const on = i === (active + workflowStages.length - 1) % workflowStages.length;
            return (
              <path
                key={`flow-${i}`}
                d={d}
                fill="none"
                className="wf-connector"
                stroke={on ? `url(#${uid}-g)` : "var(--evergreen)"}
                strokeOpacity={on ? 1 : 0.28}
                strokeWidth={on ? 3 : 2}
                strokeLinecap="round"
                style={{ transition: "stroke-opacity .6s" }}
              />
            );
          })}

          {/* travellers */}
          {connectors.map((_, i) => (
            <circle
              key={`t-${i}`}
              r={i === 2 ? 3 : 4.5}
              fill={i === 2 ? "var(--champagne)" : "var(--persimmon)"}
              opacity={i === 2 ? 0.7 : 0.9}
            >
              <animateMotion
                dur={`${3.4 + i * 0.6}s`}
                repeatCount="indefinite"
                begin={`${i * 0.9}s`}
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.45 0 0.25 1"
              >
                <mpath href={`#${uid}-p${i}`} />
              </animateMotion>
            </circle>
          ))}

          {/* nodes */}
          {nodes.map(({ x, y, Icon }, i) => {
            const on = i === active;
            return (
              <g key={i} style={{ transition: "opacity .5s" }}>
                {on && (
                  <circle cx={x} cy={y} r={34} fill="var(--persimmon)" className="wf-pulse" />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={on ? 32 : 27}
                  fill={on ? "var(--evergreen)" : "var(--paper)"}
                  stroke="var(--evergreen)"
                  strokeOpacity={on ? 1 : 0.25}
                  strokeWidth={1.5}
                  style={{ transition: "r .5s var(--ease-soft), fill .5s" }}
                />
                <Icon
                  x={x - 11}
                  y={y - 11}
                  width={22}
                  height={22}
                  color={on ? "var(--cream)" : "var(--evergreen)"}
                  strokeWidth={1.75}
                />
                <text
                  x={x}
                  y={y + (i === 1 ? -46 : 52)}
                  textAnchor="middle"
                  fill="var(--evergreen)"
                  fillOpacity={on ? 1 : 0.6}
                  style={{ font: "600 13px var(--font-sans)", letterSpacing: "0.02em" }}
                >
                  0{i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div
        role="tablist"
        aria-label="Workflow focus areas"
        className="mt-4 grid grid-cols-3 gap-1.5 rounded-full bg-cream-deep p-1"
      >
        {workflowStages.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${uid}-tab-${s.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "min-h-11 rounded-full px-2 py-1.5 text-[0.78rem] font-semibold leading-tight transition-all sm:text-sm",
                on ? "bg-evergreen text-cream shadow-soft" : "text-evergreen hover:bg-paper",
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${stage.id}`}
        aria-live={playing ? "off" : "polite"}
        className="mt-4 px-1"
      >
        <div key={stage.id} className="wf-panel-enter">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-medium">
            {stage.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-evergreen/15 bg-sage-soft px-3 py-1 text-evergreen">
                  {step}
                </span>
                {i < stage.steps.length - 1 && (
                  <span aria-hidden="true" className="h-px w-4 bg-evergreen/30" />
                )}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-evergreen-soft">{stage.note}</p>
        </div>
      </div>
    </div>
  );
}

