"use client";

import Link from "next/link";
import { useState } from "react";

const filters = [
  "All",
  "Startups",
  "Infrastructure",
  "Education",
  "Health",
  "Studios",
];

const workStreams = [
  {
    id: "misprint",
    role: "Founding Software Engineer",
    company: "Misprint Inc. (YC W25)",
    timeline: "Aug 2025 – Oct 2025",
    location: "New York City, NY",
    summary:
      "Partnered with the founding team to make trading Pokémon collectibles feel as fluid as checking stocks—owning schemas, edge functions, and calm UX.",
    categories: ["Startups", "Infrastructure"],
    stack: ["Next.js 15", "Supabase", "PostgreSQL", "Edge Functions", "Vercel"],
    impact: [
      "Architected Next.js + Supabase infrastructure powering real-time valuations across millions of cards with sub-minute freshness.",
      "Designed normalized Postgres schemas and Supabase migrations that reduced pricing latency by 60%.",
      "Orchestrated Supabase Edge Functions + background jobs so heavy crunching never blocks traders.",
      "Rebuilt collections into a tradable hub with live portfolio tracking, monetization, and shared valuations.",
    ],
    showcases: [
      {
        title: "Real-Time Pricing Platform",
        description:
          "Streaming valuation engine with sub-minute freshness and historical lookups.",
        technologies: ["Next.js", "Supabase", "PostgreSQL", "Edge Functions"],
        metrics: {
          prices: "Millions",
          latency: "-60%",
          freshness: "<60s",
        },
      },
      {
        title: "Collections Trading Hub",
        description:
          "Shareable marketplace experience with built-in valuation, monetization, and trade history.",
        technologies: ["Next.js", "Supabase", "TypeScript"],
        metrics: {
          coverage: "Graded + Ungraded",
          monetization: "Share flows",
          analytics: "Live portfolios",
        },
      },
    ],
  },
  {
    id: "fablab",
    role: "Lead Full-stack Developer",
    company: "FabLab",
    timeline: "Oct 2023 – Present",
    location: "Arlington, TX",
    summary:
      "Scaled FabApp from PHP to a React/Node platform that keeps 15,000+ students building with secure ticketing, billing, and approvals.",
    categories: ["Education", "Infrastructure"],
    stack: ["React.js", "Node.js", "MySQL", "Azure AD", "Redux"],
    impact: [
      "Migrated core systems to React + Node, unlocking 3× faster performance for FabLab operations.",
      "Redesigned MySQL schemas and API contracts for efficient ticket retrieval and billing logic.",
      "Implemented Azure AD + SAML SSO, plus JWT-based sessions with role-aware access.",
      "Ran Agile rituals, mentored student devs, and championed instrumentation for smoother launches.",
    ],
    showcases: [
      {
        title: "FabApp Management System",
        description:
          "Ticketing + payment rails that orchestrate labs, equipment, and billing for 15K students.",
        technologies: ["React.js", "Node.js", "MySQL", "Redux"],
        metrics: {
          users: "15K+",
          performance: "3× faster",
          migration: "PHP → React",
        },
      },
      {
        title: "Azure Cloud Integration",
        description:
          "End-to-end cloud migration and single sign-on experience with enterprise-grade uptime.",
        technologies: ["Azure", "SAML", "JWT"],
        metrics: {
          uptime: "99.9%",
          security: "Enterprise SSO",
          automation: "CI/CD",
        },
      },
    ],
  },
  {
    id: "healthtick",
    role: "Software Developer",
    company: "HealthTick",
    timeline: "Jan 2023 – Aug 2023",
    location: "Bangalore, India",
    summary:
      "Built healthcare platforms that deliver instant psychological assessments and frictionless publishing.",
    categories: ["Health", "Startups"],
    stack: ["Next.js", "TypeScript", "Firebase", "Express.js", "Strapi"],
    impact: [
      "Launched a real-time assessment product with instant clinician feedback across 2,000+ sessions.",
      "Designed a high-performance health blog with Strapi and Next.js, improving load times by 35%.",
      "Crafted admin tooling with React data viz and tuned REST APIs for smoother reporting.",
    ],
    showcases: [
      {
        title: "Psychological Assessment Platform",
        description:
          "Realtime testing workflows with automated PDF reporting for practitioners.",
        technologies: ["Next.js", "Firebase", "Express.js"],
        metrics: {
          assessments: "2K+",
          feedback: "Instant",
          efficiency: "+35%",
        },
      },
      {
        title: "Health Blog CMS",
        description:
          "Headless CMS stack for 20+ authors with editorial guardrails and blazing load times.",
        technologies: ["Next.js", "Strapi", "TypeScript"],
        metrics: {
          authors: "20+",
          speed: "+35%",
          automation: "Content ops",
        },
      },
    ],
  },
  {
    id: "privilon",
    role: "Founder",
    company: "Privilon Technologies",
    timeline: "May 2021 – Aug 2023",
    location: "Bangalore, India",
    summary:
      "Ran a boutique product studio shipping 15+ full-stack builds and mentoring 75+ engineers.",
    categories: ["Studios", "Startups"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "GCP", "Design Systems"],
    impact: [
      "Delivered 15+ production products across SaaS, fintech, and health founders.",
      "Maintained 8 long-term client partnerships with lean delivery pods.",
      "Mentored 75+ engineers via internal workshops and paired builds.",
    ],
    showcases: [
      {
        title: "Product Studio Builds",
        description:
          "Composable starter kits, audit playbooks, and sprint frameworks for early teams.",
        technologies: ["Next.js", "Node.js", "Design Systems"],
        metrics: {
          products: "15+",
          clients: "8 retained",
          mentees: "75+",
        },
      },
    ],
  },
];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const calendarLink = "https://calendar.app.google/AzbtoyNQaMngZgXa8";

  const filteredWork =
    selectedCategory === "All"
      ? workStreams
      : workStreams.filter((work) =>
          work.categories.includes(selectedCategory)
        );

  const projectGrid = workStreams.flatMap((stream) =>
    stream.showcases.map((project) => ({
      ...project,
      company: stream.company,
      id: `${stream.id}-${project.title}`,
    }))
  );

  return (
    <div className="relative overflow-hidden">
      <span className="film-grain" aria-hidden="true" />
      <main>
        <section className="section-shell pt-32">
          <div className="page-shell space-y-6">
            <div className="section-leading">
              <span className="section-eyebrow">Work archive</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-hero">Case studies with receipts.</h1>
              <p className="text-body max-w-3xl">
                Every engagement carried a real scoreboard—latency shaved, users
                empowered, founders unblocked. Here’s how product thinking and
                infrastructure discipline shape those outcomes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedCategory(filter)}
                  data-active={selectedCategory === filter}
                  className={`pill filter-pill text-sm font-medium transition-apple ${
                    selectedCategory === filter
                      ? ""
                      : "text-secondary hover:border-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="page-shell space-y-8">
            {filteredWork.map((work) => (
              <article
                key={work.id}
                className="rounded-3xl border border-border bg-surface/90 p-6 lg:p-10 transition-apple hover:-translate-y-1 hover:border-border-strong"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-secondary">
                      {work.role}
                    </p>
                    <h2 className="text-display">{work.company}</h2>
                  </div>
                  <div className="text-sm text-secondary space-y-2">
                    <p>{work.timeline}</p>
                    <p>{work.location}</p>
                  </div>
                </div>
                <p className="text-body mt-6">{work.summary}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {work.stack.map((tech) => (
                    <span
                      key={tech}
                      className="pill bg-background-muted/80 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {work.impact.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-border/60 bg-background-muted/60 p-4 text-sm text-foreground"
                    >
                      {point}
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  {work.showcases.map((project) => (
                    <div
                      key={project.title}
                      className="rounded-2xl border border-border/60 bg-background/70 p-5"
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-secondary">
                        <span>Case Study</span>
                        <span>{work.company}</span>
                      </div>
                      <h3 className="text-headline mt-3">{project.title}</h3>
                      <p className="text-body mt-2">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="pill bg-surface/80">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-secondary">
                        {Object.entries(project.metrics).map(
                          ([label, value]) => (
                            <div key={label}>
                              <p className="font-semibold text-foreground">
                                {value}
                              </p>
                              <p className="uppercase tracking-[0.3em] text-xs">
                                {label}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <div className="page-shell space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="section-leading mb-4">
                  <span className="section-eyebrow">Spotlights</span>
                </div>
                <h2 className="section-title mt-0">Select builds in focus.</h2>
              </div>
              <Link
                href="mailto:aaryanmori@gmail.com"
                className="pill bg-foreground text-background"
              >
                Share a brief
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {projectGrid.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl border border-border bg-surface p-6"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-secondary mb-3">
                    {project.company}
                  </p>
                  <h3 className="text-headline">{project.title}</h3>
                  <p className="text-body mt-2">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {project.technologies.map((tech: string) => (
                      <span key={tech} className="pill bg-background-muted/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-6 text-sm">
                    {Object.entries(project.metrics).map(([label, value]) => (
                      <div key={`${project.id}-${label}`}>
                        <p className="font-semibold text-foreground">{value}</p>
                        <p className="uppercase tracking-[0.3em] text-xs text-secondary">
                          {label}
                        </p>
                      </div>
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
                Proof over promises
              </span>
              <h2 className="text-display">
                Product strategy and deep systems in the same seat.
              </h2>
              <p className="text-body max-w-2xl mx-auto">
                I embed with founders and technical leads when the stakes are
                highest—aligning architecture, instrumentation, and storytelling
                so the roadmap feels inevitable. Ping me when you want that
                energy on your team.
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
