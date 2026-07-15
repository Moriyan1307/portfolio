"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { taglines } from "./taglines/taglines";

const INTRO_MS = 1000;
const INTRO_SEEN_KEY = "aa-intro-seen";
// DEBUG: true = intro plays on every reload (for tuning). Set false before deploy.
const INTRO_EVERY_LOAD = true;

/* public/logo.svg inlined with fill=currentColor so it follows the palette */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 747 432"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Aaryan Mori"
    >
      <path
        d="M592.012 283.844H633.114L656.894 432H747L677.208 0H617.062L491.562 247.598H492.085H393.155L382.013 283.844H473.091L397.991 432H446.57L521.871 283.985L521.671 283.844H592.012V247.598H540.217L540.416 247.513L606.519 117.579L627.332 247.598H627.257H592.012V283.844Z"
        fill="currentColor"
      />
      <path
        d="M208.188 283.844H239.388L262.011 432H347.962L281.425 0H224.109L104.367 247.598H104.914H10.5272L0 283.844H86.8537L15.1608 432H61.4985L133.31 283.985L133.144 283.844H208.188L202.675 247.598H150.8L150.99 247.513L214.009 117.579L233.852 247.598H202.675L208.188 283.844Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Intro({ onDone }: { onDone: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [leaving, setLeaving] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(
        100,
        Math.round(((Date.now() - start) / INTRO_MS) * 100)
      );
      setPct(p);
      if (p >= 100) {
        clearInterval(tick);
        setLeaving(true);
      }
    }, 50);
    const skip = () => setLeaving(true);
    window.addEventListener("keydown", skip);
    return () => {
      clearInterval(tick);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  // The mark flies into the header logo's exact position, then hands off.
  useEffect(() => {
    if (!leaving) return;
    const overlay = overlayRef.current;
    const wrapper = overlay?.querySelector<HTMLElement>(".qd-intro-mark");
    const src = overlay?.querySelector<SVGSVGElement>(".qd-intro-logo");
    const dst = document.querySelector<SVGSVGElement>(".qd-logo-svg");
    if (wrapper && src && dst) {
      // cancel the entrance animation so measurements are of the resting mark
      wrapper.style.animation = "none";
      void wrapper.offsetWidth;
      const a = src.getBoundingClientRect();
      const b = dst.getBoundingClientRect();
      const dx = b.left + b.width / 2 - (a.left + a.width / 2);
      const dy = b.top + b.height / 2 - (a.top + a.height / 2);
      const scale = b.width / a.width;
      src.style.transition = "transform 0.4s cubic-bezier(0.5, 0, 0.15, 1)";
      src.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    }
    const t = setTimeout(onDone, 450);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  return (
    <div
      ref={overlayRef}
      className={"qd-intro" + (leaving ? " qd-intro-out" : "")}
      onClick={() => setLeaving(true)}
      role="presentation"
    >
      <span className="qd-intro-bg" aria-hidden="true" />
      <span className="qd-intro-mark">
        <LogoMark className="qd-intro-logo" />
      </span>
      <span className="qd-intro-loading">
        <span className="qd-intro-pct">{pct}%</span>
        <span className="qd-intro-bar">
          <span className="qd-intro-fill" style={{ width: pct + "%" }} />
        </span>
      </span>
    </div>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="qd-clock">
      <span className="qd-clock-dot" aria-hidden="true" />
      {time
        ? time.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        : "--:--:--"}
    </span>
  );
}

function Typewriter({ reduced }: { reduced: boolean }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = taglines[index];

    if (waiting) {
      const waitTimer = setTimeout(() => {
        setWaiting(false);
        setDeleting(true);
      }, 2600);
      return () => clearTimeout(waitTimer);
    }

    const speed = deleting ? 45 : 65;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setWaiting(true);
        }
      } else if (text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % taglines.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, waiting, index, reduced]);

  if (reduced) {
    return <p className="qd-tagline">{taglines[0]}</p>;
  }
  return (
    <p className="qd-tagline">
      {text}
      <span className="qd-cursor" aria-hidden="true" />
    </p>
  );
}

const calendarLink = "https://calendar.app.google/AzbtoyNQaMngZgXa8";

const socialLinks = [
  { href: "mailto:aaryanmori@gmail.com", label: "Email" },
  { href: "https://github.com/Moriyan1307", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/aaryan-mori-334098192/",
    label: "LinkedIn",
  },
  {
    href: "https://drive.google.com/file/d/1DA33d0jJJq3F6mWG9zhgxn731DYb-Yov/view?usp=sharing",
    label: "Resume",
  },
];

const heroStats = [
  { label: "Products shipped", value: "15+" },
  { label: "Years building", value: "5+" },
  { label: "Founding engineer", value: "2x" },
  { label: "Founder", value: "1x" },
];

const spotlight = {
  title: "Stealth Startup · Revenue system for independent hotels",
  headline: "Rebuilding hotel revenue management as an agentic system.",
  copy: [
    "Owning product and engineering end to end: the architecture, the infrastructure, and everything between.",
    "Architecting the multi-agent core: agents for dynamic pricing, search engine marketing, and operations, each with its own loop and tools, orchestrated into one revenue system.",
  ],
  highlights: [
    "Multi-agent systems and the orchestration behind them",
    "Real-time pricing and data pipelines that scale",
    "Clean architecture, reliability, shipping speed",
  ],
};

const journeyHighlights = [
  {
    role: "Founding Software Engineer",
    company: "Stealth Startup",
    period: "Jan 2026 – Present · New York City",
    summary:
      "Building an agentic revenue system for independent hotels: the infrastructure, the orchestration layer, and the agents on top.",
    stack: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "Anthropic Agent SDK",
      "PostgreSQL",
      "AWS",
    ],
  },
  {
    role: "Founding Software Engineer",
    company: "Misprint Inc. (YC W25)",
    period: "Aug 2025 – Oct 2025 · New York City",
    summary:
      "Built real-time valuation infrastructure for collectibles trading: millions of prices, sub-minute freshness, and a schema redesign that cut data latency 60% on key endpoints.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Edge Functions",
      "Vercel",
    ],
  },
  {
    role: "Lead Full-stack Developer",
    company: "FabLab",
    period: "Oct 2023 – Aug 2025 · Arlington, TX",
    summary:
      "Led FabApp’s migration from PHP to React and Node, scaling the ticketing and payments platform to 15K users with Azure AD SSO and role-based access.",
    stack: ["React.js", "Node.js", "MySQL", "Redux", "Azure"],
  },
  {
    role: "Software Developer",
    company: "HealthTick",
    period: "Jan 2023 – Aug 2023 · Bangalore, India",
    summary:
      "Built a real-time psychological assessment platform on Next.js and Firebase.",
    stack: ["Next.js", "TypeScript", "Firebase", "Redux", "Strapi"],
  },
  {
    role: "Founder",
    company: "Privilon Technologies",
    period: "May 2021 – Aug 2025 · Bangalore, India",
    summary:
      "Founded a dev studio: 15+ projects shipped for 8+ clients and startups.",
    stack: ["React.js", "Next.js", "Node.js", "TypeScript", "AWS"],
  },
];

export default function Page() {
  const reduced = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Theme: stored preference wins, else system; toggle persists.
  useEffect(() => {
    const stored = window.localStorage.getItem("qd-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    setTheme(
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"
    );
  }, []);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      window.localStorage.setItem("qd-theme", next);
      return next;
    });
  };

  // Intro plays once per session (unless the debug flag forces every load).
  useEffect(() => {
    if (INTRO_EVERY_LOAD) return;
    if (window.sessionStorage.getItem(INTRO_SEEN_KEY)) {
      setIntroDone(true);
    }
  }, []);

  const finishIntro = () => {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    setIntroDone(true);
  };

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  // Cursor light: a soft lamp follows the pointer. Fine pointers only.
  useEffect(() => {
    if (reduced || !finePointer) return;
    const lamp = lampRef.current;
    if (!lamp) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        lamp.style.setProperty("--qd-mx", e.clientX + "px");
        lamp.style.setProperty("--qd-my", e.clientY + "px");
        lamp.style.opacity = "1";
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, finePointer]);

  // Header hides on scroll down, returns on scroll up.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last + 6 && y > 120) el.classList.add("qd-header-hidden");
      else if (y < last - 6) el.classList.remove("qd-header-hidden");
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ink settling: sections reveal once on first scroll-into-view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll(".qd-section"));
    if (reduced || !("IntersectionObserver" in window)) {
      sections.forEach((s) => s.classList.add("qd-in"));
      root.classList.add("qd-ready");
      return;
    }
    root.classList.add("qd-anim");
    if (!introDone) return;
    root.classList.add("qd-ready");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("qd-in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [reduced, introDone]);

  const year = new Date().getFullYear();

  return (
    <div ref={rootRef} data-theme={theme} className="qd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap');

        .qd-root {
          --qd-bg: #17181a;
          --qd-bg-trans: rgba(23, 24, 26, 0.92);
          --qd-bright: #e9e8e4;
          --qd-body: #b9b8b2;
          --qd-muted: #85847e;
          --qd-line: rgba(233, 232, 228, 0.08);
          --qd-line-strong: rgba(233, 232, 228, 0.14);
          --qd-accent: #86b58a;
          --qd-lamp-color: rgba(134, 181, 138, 0.06);
          background: var(--qd-bg);
          color: var(--qd-body);
          min-height: 100vh;
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 16px;
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
        }
        .qd-root[data-theme='light'] {
          --qd-bg: #f6f5f1;
          --qd-bg-trans: rgba(246, 245, 241, 0.92);
          --qd-bright: #1a1b1d;
          --qd-body: #43443f;
          --qd-muted: #75746e;
          --qd-line: rgba(26, 27, 29, 0.1);
          --qd-line-strong: rgba(26, 27, 29, 0.18);
          --qd-accent: #47764d;
          --qd-lamp-color: rgba(71, 118, 77, 0.07);
        }
        .qd-shell {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 1.5rem 8rem;
          position: relative;
          z-index: 2;
        }
        .qd-section { margin-top: 7rem; }
        @media (min-width: 768px) {
          .qd-section { margin-top: 12rem; }
        }

        .qd-h { font-family: 'Space Grotesk', sans-serif; font-weight: 500; color: var(--qd-bright); }
        .qd-hdot { color: var(--qd-accent); }
        .qd-mono { font-family: 'IBM Plex Mono', monospace; }
        .qd-muted { color: var(--qd-muted); }

        .qd-topline {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.78rem;
          color: var(--qd-muted);
          padding-top: 5rem;
        }
        @media (min-width: 768px) {
          .qd-topline { padding-top: 6rem; }
        }
        .qd-clock { display: inline-flex; align-items: center; gap: 0.5rem; }
        .qd-clock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--qd-accent);
          animation: qd-pulse 2s ease-in-out infinite;
        }
        @keyframes qd-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .qd-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--qd-muted);
          margin: 2.5rem 0 1.25rem;
        }
        .qd-h1 {
          font-size: clamp(2.6rem, 7.5vw, 5rem);
          line-height: 1.05;
          letter-spacing: -0.035em;
          margin: 0 0 2rem;
        }
        .qd-bio { max-width: 58ch; margin: 0 0 2.5rem; }

        .qd-tagline {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.85rem;
          color: var(--qd-muted);
          min-height: 1.6em;
          margin: 0 0 2.5rem;
        }
        .qd-cursor {
          display: inline-block;
          width: 8px;
          height: 1.05em;
          margin-left: 2px;
          vertical-align: text-bottom;
          background: var(--qd-accent);
          animation: qd-blink 1.1s step-end infinite;
        }
        @keyframes qd-blink { 50% { opacity: 0; } }

        .qd-links { display: flex; flex-wrap: wrap; gap: 2rem; margin-bottom: 3rem; }
        .qd-link {
          font-size: 0.9rem;
          color: var(--qd-bright);
          text-decoration: none;
          border-bottom: 1px solid var(--qd-accent);
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .qd-link:hover { opacity: 0.7; }

        .qd-stats { display: flex; flex-wrap: wrap; gap: 3rem 4rem; }
        .qd-stat-value { font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 1.6rem; color: var(--qd-bright); line-height: 1; }
        .qd-stat-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--qd-muted);
          margin-top: 0.6rem;
        }

        .qd-spotlight {
          border: 1px solid var(--qd-line);
          padding: 2.5rem 1.5rem;
        }
        @media (min-width: 768px) {
          .qd-spotlight { padding: 3.5rem 3rem; }
        }
        .qd-spotlight-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          color: var(--qd-muted);
          margin: 0 0 1.5rem;
        }
        .qd-h2 { font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 1.25; letter-spacing: -0.01em; margin: 0 0 1.5rem; }
        .qd-spotlight p.qd-body { margin: 0 0 1.25rem; }
        .qd-eyebrow-tight { margin: 0 0 1.25rem; }
        .qd-gh-row { margin: 2rem 0 0; }
        .qd-links-last { margin-bottom: 0; }
        .qd-hl-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--qd-muted);
          margin: 2.5rem 0 1rem;
        }
        .qd-hl-list { list-style: none; margin: 0; padding: 0; }
        .qd-hl-list li {
          padding: 0.65rem 0;
          border-top: 1px solid var(--qd-line);
          font-size: 0.92rem;
        }

        .qd-career-title { font-size: clamp(2rem, 4.5vw, 3.2rem); line-height: 1.25; margin: 0 0 4rem; }
        .qd-job { padding: 2.5rem 0; border-top: 1px solid var(--qd-line); position: relative; }
        .qd-job:last-child { border-bottom: 1px solid var(--qd-line); }
        .qd-job::before {
          content: '';
          position: absolute;
          left: -1.5rem;
          top: 0.85em;
          width: 0.75rem;
          height: 1px;
          background: var(--qd-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .qd-job:hover::before,
        .qd-job:focus-within::before { transform: scaleX(1); }
        .qd-job-company { font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 1.15rem; color: var(--qd-bright); margin: 0; }
        .qd-job-role { font-size: 0.9rem; color: var(--qd-body); margin: 0.2rem 0 0; }
        .qd-job-period {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          color: var(--qd-muted);
          margin: 0.75rem 0 1rem;
        }
        .qd-job-summary { color: var(--qd-muted); font-size: 0.95rem; margin: 0 0 1rem; max-width: 60ch; }
        .qd-job-stack { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: var(--qd-muted); margin: 0; }

        .qd-cta p.qd-body { max-width: 56ch; margin: 0 0 2.5rem; }
        .qd-cta .qd-h2 { margin-bottom: 1.5rem; }

        .qd-header {
          position: sticky;
          top: 0;
          transition: transform 0.35s ease;
          z-index: 6;
          background: var(--qd-bg-trans);
          border-bottom: 1px solid var(--qd-line);
        }
        .qd-header-hidden { transform: translateY(-100%); }
        .qd-header-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 0.9rem 1.5rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }
        .qd-header-inner > .qd-logo { justify-self: start; }
        .qd-header-inner > .qd-header-links { justify-self: end; }
        .qd-logo {
          display: inline-flex;
          align-items: center;
          color: var(--qd-bright);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .qd-logo:hover { color: var(--qd-accent); }
        .qd-logo-svg { height: 19px; width: auto; display: block; }
        .qd-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--qd-muted);
          white-space: nowrap;
        }
        @media (max-width: 560px) {
          .qd-header-badge { display: none; }
        }
        .qd-header-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .qd-header-links a {
          color: var(--qd-muted);
          text-decoration: none;
          background-image: linear-gradient(var(--qd-accent), var(--qd-accent));
          background-repeat: no-repeat;
          background-position: left bottom;
          background-size: 0% 1px;
          padding-bottom: 3px;
          transition: background-size 0.3s ease, color 0.2s ease;
        }
        .qd-header-links a:hover {
          color: var(--qd-bright);
          background-size: 100% 1px;
        }
        .qd-theme-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          /* links carry 3px padding-bottom for the underline draw; offset to match their optical center */
          margin-bottom: 3px;
          color: var(--qd-muted);
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .qd-theme-btn svg { width: 17px; height: 17px; }
        .qd-theme-btn:hover { color: var(--qd-bright); }

        .qd-intro {
          position: fixed;
          inset: 0;
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.2rem;
          cursor: pointer;
        }
        .qd-intro-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: var(--qd-bg);
          transition: opacity 0.35s ease;
        }
        .qd-intro-out { pointer-events: none; }
        .qd-intro-out .qd-intro-bg,
        .qd-intro-out .qd-intro-loading {
          opacity: 0;
        }
        .qd-intro-loading { transition: opacity 0.3s ease; }
        .qd-intro-mark {
          color: var(--qd-bright);
          animation: qdIntroMark 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
        }
        .qd-intro-logo {
          width: 34px;
          height: auto;
          display: block;
          /* optical centering: the slanted letterforms carry more ink on the
             left, so the geometric center reads as sitting left of true */
          margin-left: 15px;
        }
        @keyframes qdIntroMark {
          0% { transform: scale(10); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .qd-intro-loading {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 180px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
        }
        .qd-intro-pct {
          color: var(--qd-bright);
          min-width: 4ch;
          text-align: left;
        }
        .qd-intro-bar {
          flex: 1;
          height: 1px;
          background: var(--qd-line-strong);
        }
        .qd-intro-fill {
          display: block;
          height: 100%;
          background: var(--qd-accent);
          transition: width 60ms linear;
        }

        .qd-grain {
          position: fixed;
          z-index: 1;
        }
        .qd-lamp {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.6s ease;
          background: radial-gradient(
            340px circle at var(--qd-mx, 50vw) var(--qd-my, 40vh),
            var(--qd-lamp-color),
            transparent 70%
          );
        }

        .qd-anim .qd-shell > header {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .qd-ready.qd-anim .qd-shell > header {
          opacity: 1;
          transform: none;
        }
        .qd-anim .qd-section > * {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .qd-anim .qd-section.qd-in > * {
          opacity: 1;
          transform: none;
        }
        .qd-anim .qd-section.qd-in > *:nth-child(2) { transition-delay: 0.09s; }
        .qd-anim .qd-section.qd-in > *:nth-child(3) { transition-delay: 0.18s; }
        .qd-anim .qd-section.qd-in > *:nth-child(4) { transition-delay: 0.27s; }
        .qd-anim .qd-section.qd-in > *:nth-child(5) { transition-delay: 0.36s; }
        .qd-anim .qd-section.qd-in > *:nth-child(6) { transition-delay: 0.45s; }

        .qd-footer {
          position: relative;
          z-index: 2;
          border-top: 1px solid var(--qd-line);
        }
        .qd-footer-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .qd-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .qd-footer-logo-svg { height: 15px; width: auto; display: block; }
        .qd-footer-id {
          display: flex;
          align-items: center;
          gap: 1.1rem;
        }
        .qd-footer-tag {
          color: var(--qd-muted);
          font-size: 0.85rem;
          margin: 0;
        }
        .qd-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .qd-footer-links a {
          color: var(--qd-muted);
          text-decoration: none;
          border-bottom: 1px solid var(--qd-accent);
          padding-bottom: 2px;
          transition: color 0.2s ease;
        }
        .qd-footer-links a:hover { color: var(--qd-bright); }
        .qd-footer-meta {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          color: var(--qd-muted);
        }

        @media (max-height: 940px) {
          .qd-eyebrow { margin-top: 2rem; }
          .qd-h1 { margin-bottom: 1.5rem; font-size: clamp(2.6rem, 6.5vw, 4.4rem); }
          .qd-bio { margin-bottom: 2rem; }
          .qd-tagline { margin-bottom: 2rem; }
          .qd-links { margin-bottom: 2.5rem; }
        }

        .qd-root a:focus-visible,
        .qd-root :focus-visible {
          outline: 2px solid var(--qd-accent);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .qd-clock-dot, .qd-cursor { animation: none; }
          .qd-lamp { display: none; }
          .qd-header, .qd-header-links a, .qd-theme-btn, .qd-job::before {
            transition: none;
          }
          .qd-anim .qd-shell > header,
          .qd-anim .qd-section > * {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      {!introDone && !reduced && <Intro onDone={finishIntro} />}

      <span className="film-grain qd-grain" aria-hidden="true" />
      <div ref={lampRef} className="qd-lamp" aria-hidden="true" />

      <header ref={headerRef} className="qd-header">
        <div className="qd-header-inner">
          <Link
            href="/"
            className="qd-logo"
            aria-label="Home"
            style={{ opacity: !introDone && !reduced ? 0 : undefined }}
          >
            <LogoMark className="qd-logo-svg" />
          </Link>
          <span className="qd-header-badge">
            <span className="qd-clock-dot" aria-hidden="true" />
            Shipping · Early teams
          </span>
          <nav className="qd-header-links" aria-label="Site">
            <Link href="#journey">Journey</Link>
            <Link href="#contact">Contact</Link>
            <Link
              href="https://github.com/Moriyan1307"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
            <button
              type="button"
              className="qd-theme-btn"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
            >
              {theme === "dark" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4.2" />
                  <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3L17 7M7 17l-1.7 1.7" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.4 14.2A8.4 8.4 0 0 1 9.8 3.6a8.4 8.4 0 1 0 10.6 10.6Z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      <div className="qd-shell">
        <header>
          <div className="qd-topline">
            <span>New York City, NY</span>
            <LiveClock />
          </div>
          <p className="qd-eyebrow">
            Founding Software+Product Engineer · Writer · Storyteller
          </p>
          <h1 className="qd-h qd-h1">Software that feels inevitable.</h1>
          <p className="qd-bio">
            I approach engineering like design: thoughtful, intentional, and
            built to last. I combine a founder&rsquo;s urgency with an
            engineer&rsquo;s precision to turn ambitious ideas into fast,
            scalable systems people love to use.
          </p>
          <Typewriter reduced={reduced} />
          <div className="qd-links">
            <Link href="#journey" className="qd-link">
              View Journey →
            </Link>
            <Link
              href={calendarLink}
              target="_blank"
              rel="noreferrer"
              className="qd-link"
            >
              Let&rsquo;s chat
            </Link>
          </div>
          <div className="qd-stats">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="qd-stat-value">{stat.value}</p>
                <p className="qd-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="qd-section">
          <p className="qd-eyebrow qd-eyebrow-tight">Currently</p>
          <div className="qd-spotlight">
            <p className="qd-spotlight-title">{spotlight.title}</p>
            <h2 className="qd-h qd-h2">{spotlight.headline}</h2>
            {spotlight.copy.map((paragraph) => (
              <p key={paragraph} className="qd-body">
                {paragraph}
              </p>
            ))}
            <p className="qd-hl-label">Systems checklist</p>
            <ul className="qd-hl-list">
              {spotlight.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p className="qd-gh-row">
              <Link
                href="https://github.com/Moriyan1307"
                target="_blank"
                rel="noreferrer"
                className="qd-link"
              >
                GitHub ↗
              </Link>
            </p>
          </div>
        </section>

        <section id="journey" className="qd-section">
          <p className="qd-eyebrow qd-eyebrow-tight">Career</p>
          <h2 className="qd-h qd-career-title">
            Career headlines that scale with founders
            <span className="qd-hdot">.</span>
          </h2>
          <div>
            {journeyHighlights.map((journey) => (
              <article key={journey.company} className="qd-job">
                <h3 className="qd-h qd-job-company">{journey.company}</h3>
                <p className="qd-job-role">{journey.role}</p>
                <p className="qd-job-period">{journey.period}</p>
                <p className="qd-job-summary">{journey.summary}</p>
                <p className="qd-job-stack">{journey.stack.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="qd-section qd-cta">
          <p className="qd-eyebrow qd-eyebrow-tight">Contact</p>
          <h2 className="qd-h qd-h2">
            Let&rsquo;s build something inevitable
            <span className="qd-hdot">.</span>
          </h2>
          <p className="qd-body">
            I like hard problems. If you&rsquo;re building something
            ambitious, you get product and engineering in one seat, from
            problem to production. The best work on this page started with a
            short note. Send one.
          </p>
          <div className="qd-links qd-links-last">
            <Link
              href={calendarLink}
              target="_blank"
              rel="noreferrer"
              className="qd-link"
            >
              Let&rsquo;s chat
            </Link>
            <Link href="#journey" className="qd-link">
              Review the journey
            </Link>
            <Link href="mailto:aaryanmori@gmail.com" className="qd-link">
              Send an email
            </Link>
          </div>
        </section>
      </div>

      <footer className="qd-footer">
        <div className="qd-footer-inner">
          <div className="qd-footer-row">
            <div className="qd-footer-id">
              <Link href="/" className="qd-logo" aria-label="Home">
                <LogoMark className="qd-footer-logo-svg" />
              </Link>
              <p className="qd-footer-tag">
                Building calm, measurable systems for ambitious teams.
              </p>
            </div>
            <nav className="qd-footer-links" aria-label="Social">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noreferrer" : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="qd-footer-row qd-footer-meta">
            <span>© {year} Aaryan Mori</span>
            <span className="qd-clock-wrap">
              New York City, NY · <LiveClock />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
