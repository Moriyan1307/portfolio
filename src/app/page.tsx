"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { taglines } from "./taglines/taglines";

function LiveTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pill font-mono text-xs tracking-tight text-secondary">
      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
      {time.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>
  );
}

export default function Page() {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentTagline = taglines[currentTaglineIndex];

    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 2600);
      return () => clearTimeout(waitTimer);
    }

    const speed = isDeleting ? 45 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentTagline.length) {
          setCurrentText(currentTagline.slice(0, currentText.length + 1));
        } else {
          setIsWaiting(true);
        }
      } else if (currentText.length > 0) {
        setCurrentText(currentText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isWaiting, currentTaglineIndex]);

  const heroStats = [
    { label: "Products shipped", value: "15+" },
    { label: "Founding engineer", value: "2x" },
    { label: "Founder", value: "1x" },
  ];

  const calendarLink = "https://calendar.app.google/AzbtoyNQaMngZgXa8";

  const spotlight = {
    title: "Stealth Startup · Revenue system for independent hotels",
    headline:
      "Rebuilding hotel revenue management as an agentic system.",
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
      stack: ["Next.js", "NestJS", "TypeScript", "Anthropic Agent SDK", "PostgreSQL", "AWS"],
    },
    {
      role: "Founding Software Engineer",
      company: "Misprint Inc. (YC W25)",
      period: "Aug 2025 – Oct 2025 · New York City",
      summary:
        "Built real-time valuation infrastructure for collectibles trading: millions of prices, sub-minute freshness, and a schema redesign that cut data latency 60% on key endpoints.",
      stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions", "Vercel"],
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

  return (
    <div className="relative overflow-hidden">
      <span className="film-grain" aria-hidden="true" />
      <main>
        <section className="section-shell pt-24 lg:pt-32">
          <div className="page-shell">
            <div className="grid gap-12 items-start">
              <div className="space-y-10 animate-fade-in-up">
                <div className="flex flex-wrap items-center gap-3 text-sm text-secondary">
                  <span className="pill">New York City, NY</span>
                  <LiveTime />
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                    Founding Software Engineer · Writer · Storyteller
                  </p>
                  <h1 className="text-hero text-foreground">
                    Software that feels inevitable.
                  </h1>
                </div>
                <p className="text-body max-w-3xl">
                  I approach engineering like design: thoughtful, intentional,
                  and built to last. I combine a founder&apos;s urgency with an
                  engineer&apos;s precision to turn ambitious ideas into fast,
                  scalable systems people love to use.
                </p>
                <p className="font-mono text-sm text-secondary min-h-[1.5rem]">
                  {currentText}
                  <span className="animate-pulse text-accent">|</span>
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="#journey"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-foreground text-background px-6 py-3 text-sm font-medium tracking-tight transition-apple hover:bg-foreground/80"
                  >
                    View Journey
                    <span>→</span>
                  </Link>
                  {/* <Link
                    href="mailto:aaryanmori@gmail.com"
                    className="inline-flex items-center gap-2 rounded-[12px] border border-border/70 px-6 py-3 text-sm font-medium text-foreground transition-apple hover:border-foreground"
                  >
                    Share a brief
                  </Link> */}
                  <Link
                    href={calendarLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[12px] border border-dashed border-border/90 px-6 py-3 text-sm font-medium text-foreground transition-apple hover:text-foreground hover:border-foreground/80"
                  >
                    Let&apos;s chat
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <p className="text-headline">{stat.value}</p>
                      <p className="text-sm uppercase tracking-widest text-secondary">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="page-shell">
            <div className="soft-card p-8 lg:p-12 animate-fade-in-up">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="flex-1 space-y-4">
                  <p className="pill bg-background-muted/60 text-secondary border-border/40 w-fit">
                    {spotlight.title}
                  </p>
                  <h2 className="text-display text-foreground">
                    {spotlight.headline}
                  </h2>
                  {spotlight.copy.map((paragraph) => (
                    <p key={paragraph} className="text-body">
                      {paragraph}
                    </p>
                  ))}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="https://github.com/Moriyan1307"
                      target="_blank"
                      rel="noreferrer"
                      className="pill text-xs font-medium tracking-tight hover:border-foreground"
                    >
                      GitHub ↗
                    </Link>
                  </div>
                </div>
                <div className="w-full max-w-sm">
                  <div className="rounded-3xl border border-border bg-background-muted/60 p-6 space-y-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                      Systems checklist
                    </p>
                    <ul className="space-y-3 text-sm text-foreground">
                      {spotlight.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="section-shell">
          <div className="page-shell space-y-10">
            <div className="section-leading">
              <span className="section-eyebrow">Career</span>
            </div>
            <h2 className="section-title">
              Career headlines that scale with founders.
            </h2>
            <div className="space-y-4">
              {journeyHighlights.map((journey) => (
                <div
                  key={journey.company}
                  className="rounded-3xl border border-border bg-surface p-6 lg:p-8 transition-apple hover:border-border-strong"
                >
                  <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
                    <div>
                      <h3 className="text-headline text-foreground">
                        {journey.role}
                      </h3>
                      <p className="text-sm font-medium text-secondary">
                        {journey.company}
                      </p>
                    </div>
                    <p className="text-sm uppercase tracking-[0.3em] text-secondary">
                      {journey.period}
                    </p>
                  </div>
                  <p className="text-body mt-4">{journey.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {journey.stack.map((tech) => (
                      <span
                        key={tech}
                        className="pill bg-background-muted/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="page-shell">
            <div className="soft-card p-10 text-center space-y-6">
              <span className="section-eyebrow block text-center">
                Build with clarity
              </span>
              <h2 className="text-display text-foreground">
                Founding engineer energy with product-level empathy.
              </h2>
              <p className="text-body max-w-2xl mx-auto">
                Hotel revenue systems, trading rails, and large-scale platforms
                proved that calm software wins. When you need someone who can
                set the product story and wire the underlying systems, send a
                note.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={calendarLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-[12px] bg-foreground px-6 py-3 text-background text-sm font-medium tracking-tight transition-apple hover:bg-foreground/80"
                >
                  Let&apos;s chat
                </Link>
                <Link
                  href="#journey"
                  className="inline-flex items-center rounded-[12px] border border-border px-6 py-3 text-sm font-medium text-foreground transition-apple hover:border-foreground"
                >
                  Review the journey
                </Link>
                <Link
                  href="mailto:aaryanmori@gmail.com"
                  className="inline-flex items-center rounded-[12px] border border-dashed border-border px-6 py-3 text-sm font-medium text-secondary transition-apple hover:text-foreground hover:border-foreground"
                >
                  Send an email
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
