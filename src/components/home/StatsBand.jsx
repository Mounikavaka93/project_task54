import { useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";

function useCountUp(target, active, decimals) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      const next = target * eased;
      setValue(decimals ? Number(next.toFixed(decimals)) : Math.round(next));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, decimals]);

  return value;
}

function Stat({ item, active, light }) {
  const value = useCountUp(item.value, active, item.decimals);
  const shown = item.decimals ? value.toFixed(item.decimals) : value.toLocaleString("en-US");

  return (
    <div>
      <dt className={cx("font-display text-4xl sm:text-5xl", light ? "text-cream" : "text-ink")}>{shown}</dt>
      <dd className={cx("mt-2 text-sm", light ? "text-cream/70" : "text-muted")}>{item.label}</dd>
    </div>
  );
}

export default function StatsBand({ items, light = false, className = "" }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <dl ref={ref} className={cx("grid grid-cols-2 gap-8 lg:grid-cols-4", className)}>
      {items.map((item) => (
        <Stat key={item.label} item={item} active={active} light={light} />
      ))}
    </dl>
  );
}
