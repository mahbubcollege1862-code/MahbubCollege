import { RefObject, useCallback, useEffect, useRef } from 'react';

interface Options {
  /** Scroll speed in pixels per second. */
  speed?: number;
  /** Delay before resuming after a touch/click is released or after arrow navigation. */
  resumeDelay?: number;
}

/**
 * Continuously scrolls a horizontal container. Pauses while the user presses/touches it
 * and resumes after release. Wraps back to the start at the end. Returns `pauseFor`, which
 * callers use to hold off auto-scroll briefly (e.g. after arrow button navigation).
 */
export function useAutoScroll(
  ref: RefObject<HTMLElement | null>,
  { speed = 40, resumeDelay = 800 }: Options = {}
) {
  const pausedUntil = useRef(0);

  const pauseFor = useCallback((ms: number) => {
    pausedUntil.current = Math.max(pausedUntil.current, performance.now() + ms);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('auto-scroll');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let pressed = false;
    let visible = false;
    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;

    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      if (!pressed) return;
      pressed = false;
      pauseFor(resumeDelay);
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const max = el.scrollWidth - el.clientWidth;

      if (visible && !pressed && now >= pausedUntil.current && max > 0) {
        // Resync if something else (swipe, arrows) moved the container.
        if (Math.abs(el.scrollLeft - Math.floor(pos)) > 2) pos = el.scrollLeft;
        pos += (speed * dt) / 1000;
        if (pos >= max - 1) pos = 0;
        // scrollLeft only takes whole pixels on most displays, so move by the integer part
        // and cover the remainder with a sub-pixel transform to keep motion smooth.
        const whole = Math.floor(pos);
        el.scrollLeft = whole;
        el.style.setProperty('--auto-scroll-sub', `${whole - pos}px`);
      } else {
        pos = el.scrollLeft;
        el.style.setProperty('--auto-scroll-sub', '0px');
      }
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchend', onUp);
    window.addEventListener('touchcancel', onUp);

    last = performance.now();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.classList.remove('auto-scroll');
      el.style.removeProperty('--auto-scroll-sub');
      observer.disconnect();
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      el.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('touchcancel', onUp);
    };
  }, [ref, speed, resumeDelay, pauseFor]);

  return { pauseFor };
}
