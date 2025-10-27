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
    { label: "Users impacted", value: "15K+" },
    { label: "Latency reduced", value: "60%+" },
  ];

  const calendarLink = "https://calendar.app.google/AzbtoyNQaMngZgXa8";

  const spotlight = {
    title: "Misprint · Real-time trading rails",
    headline:
      "Pricing Pokémon collectibles with sub-minute freshness and calm UX.",
    copy: [
      "As Founding Software Engineer at Misprint (YC W25), I owned the real-time valuation engine that keeps millions of collectibles in lockstep with the market.",
      "Edge functions, streaming Supabase pipelines, and transparent UI states keep trading rails tactile without feeling frantic.",
    ],
    highlights: [
      "Next.js 15 + Supabase edge orchestration",
      "Normalized Postgres schemas with background refresh jobs",
      "Collections rebuilt into a tradable, shareable portfolio hub",
    ],
  };

  const capabilityAreas = [
    {
      title: "Systems Architecture",
      description:
        "End-to-end product ownership across React/Next.js, Node, Supabase, and typed APIs with a bias for measurable performance.",
      items: ["Next.js 15", "React 19", "Supabase", "Prisma", "Edge Functions"],
    },
    {
      title: "Calm Infrastructure",
      description:
        "Edge compute, background tasks, and observability baked in so real-time experiences feel cinematic, not chaotic.",
      items: ["Vercel Edge", "Supabase Tasks", "Telemetry", "CI/CD"],
    },
    {
      title: "Product Stewardship",
      description:
        "Guiding founders and student teams through prioritization, copy, and shipping rituals without losing technical depth.",
      items: ["Roadmapping", "Workshops", "Mentorship", "Storytelling"],
    },
  ];

  const journeyHighlights = [
    {
      role: "Founding Software Engineer",
      company: "Misprint Inc. (YC W25)",
      period: "2025 · New York City",
      summary:
        "Architected live trading infrastructure for Pokémon collectibles with edge-first data refresh cycles.",
      metrics: [
        "Millions of price points",
        "60% faster queries",
        "Graded + ungraded parity",
      ],
    },
    {
      role: "Lead Full-stack Developer",
      company: "FabLab",
      period: "2023 – Present · Arlington, TX",
      summary:
        "Scaled FabApp from PHP to React/Node for 15K students, layering Azure SSO and ticketing automation.",
      metrics: ["15K+ students", "3× faster", "Azure SSO rollout"],
    },
    {
      role: "Software Developer",
      company: "HealthTick",
      period: "2023 · Bangalore, India",
      summary:
        "Built psychological assessment rails powered by Next.js + Firebase with instant clinician feedback.",
      metrics: ["2K+ assessments", "35% faster publishing", "20+ author CMS"],
    },
    {
      role: "Founder",
      company: "Privilon Technologies",
      period: "2021 – 2023 · Bangalore, India",
      summary:
        "Ran a product studio delivering 15+ full-stack builds while mentoring 75 early engineers.",
      metrics: ["15+ shipped products", "8 retained clients", "75 mentees"],
    },
  ];

  const achievementMoments = [
    {
      title: "Real-time collectible pricing",
      description:
        "Misprint: Edge-scheduled jobs keep every card valuation no more than 60 seconds old.",
      year: "2025",
    },
    {
      title: "University-scale maker ops",
      description:
        "FabLab: Ticketing, billing, and approvals unified for 15,000+ students with React + Azure.",
      year: "2023-2025",
    },
    {
      title: "Instant clinical assessments",
      description:
        "HealthTick: Next.js/Firebase stack delivering psychologist-ready PDFs in real time.",
      year: "2023",
    },
    {
      title: "Product studio stewardship",
      description:
        "Privilon: 15+ shipped builds, spanning fintech, health, and productivity with lean teams.",
      year: "2021-2024",
    },
  ];

  const currentFocus = [
    "Productizing Misprint’s valuation rails alongside the founding team.",
    "Coaching FabLab leads to own performance, not just ship features.",
    "Exploring transparent AI-native workflows for operator trust.",
  ];

  const operatingPrinciples = [
    {
      title: "Clarity ships faster",
      detail:
        "Simple rituals, typed contracts, and shared dashboards keep teams aligned.",
    },
    {
      title: "Systems tell the story",
      detail:
        "Architecture, UX, and instrumentation evolve together so progress is measurable.",
    },
    {
      title: "Focus over feature creep",
      detail:
        "Constraints and ruthless prioritization keep shipping calm even under pressure.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <span className="film-grain" aria-hidden="true" />
      <main>
        <section className="section-shell pt-24 lg:pt-32">
          <div className="page-shell">
            <div className="grid gap-12 lg:grid-cols-[0.65fr,0.35fr] items-start">
              <div className="space-y-10 animate-fade-in-up">
                <div className="flex flex-wrap items-center gap-3 text-sm text-secondary">
                  <span className="pill">New York City, NY</span>
                  <LiveTime />
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                    Full-stack engineer · Writer · Storyteller
                  </p>
                  <h1 className="text-hero text-foreground">
                    Software that feels inevitable.
                  </h1>
                </div>
                <p className="text-body max-w-3xl">
                  I approach engineering like design—thoughtful, intentional,
                  and built to last—combining a founder&apos;s urgency with an
                  engineer&apos;s precision to turn ambitious ideas into fast,
                  scalable systems people love to use.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/work"
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
              <div className="space-y-6 animate-fade-in-up stagger-2">
                <div className="soft-card p-6 lg:p-8 space-y-6">
                  <div className="text-sm font-mono text-secondary uppercase tracking-[0.3em]">
                    Signal board
                  </div>
                  <p className="text-lg font-medium text-foreground leading-snug min-h-[2.5rem]">
                    {currentText}
                    <span className="animate-pulse text-accent">|</span>
                  </p>
                  <div className="rounded-2xl border border-border/60 p-5 bg-surface-hover">
                    <p className="text-sm text-secondary mb-3">
                      Operating cadence
                    </p>
                    <ul className="space-y-3 text-sm text-foreground">
                      {currentFocus.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-xs uppercase tracking-[0.4em] text-secondary">
                    Building with early teams
                  </div>
                </div>
                <div className="rounded-3xl border border-border bg-surface/90 p-6 lg:p-8 space-y-5">
                  <p className="text-xs uppercase tracking-[0.4em] text-secondary">
                    Operating principles
                  </p>
                  <div className="space-y-4">
                    {operatingPrinciples.map((principle) => (
                      <div key={principle.title} className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">
                          {principle.title}
                        </p>
                        <p className="text-sm text-secondary">
                          {principle.detail}
                        </p>
                      </div>
                    ))}
                  </div>
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
                      href="/work"
                      className="pill bg-foreground text-background text-xs font-medium tracking-tight"
                    >
                      Read full case study
                    </Link>
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

        <section className="section-shell">
          <div className="page-shell space-y-10">
            <div className="section-leading">
              <span className="section-eyebrow">Capabilities</span>
            </div>
            <h2 className="section-title">How I operate.</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {capabilityAreas.map((area) => (
                <div
                  key={area.title}
                  className="rounded-3xl border border-border bg-surface p-6 transition-apple hover:-translate-y-1 hover:border-border-strong"
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-secondary mb-3">
                    {area.title}
                  </p>
                  <p className="text-sm text-secondary mb-6">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-foreground">
                    {area.items.map((item) => (
                      <span key={item} className="pill bg-background-muted/80">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
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
                    {journey.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="pill bg-background-muted/60"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="page-shell space-y-8">
            <div className="section-leading">
              <span className="section-eyebrow">Signals</span>
            </div>
            <h2 className="section-title">Moments I’m proud of.</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {achievementMoments.map((moment) => (
                <div
                  key={moment.title}
                  className="rounded-3xl border border-border bg-surface p-6"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-secondary mb-3">
                    {moment.year}
                  </p>
                  <h3 className="text-headline">{moment.title}</h3>
                  <p className="text-body mt-3">{moment.description}</p>
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
                Trading rails, university platforms, and health systems proved
                that calm software wins. When you need someone who can set the
                product story and wire the underlying systems, send a note.
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
                  href="/work"
                  className="inline-flex items-center rounded-[12px] border border-border px-6 py-3 text-sm font-medium text-foreground transition-apple hover:border-foreground"
                >
                  Review the work
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
