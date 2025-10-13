"use client";
import Link from "next/link";
import { useState } from "react";

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const careerJourney = [
    {
      role: "Founding Software Engineer",
      company: "Misprint Inc. (YC W25)",
      period: "Aug 2025 – Oct 2025",
      location: "New York City, NY",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Edge Functions",
        "Vercel",
      ],
      tags: ["Startups", "Full-Stack", "Backend", "Cloud"],
      description:
        "Partnered with the founding team to launch trading infrastructure for Pokemon collectibles, owning everything from schemas to edge functions.",
      achievements: [
        "Architected Next.js + Supabase infrastructure powering real-time Pokemon collectible pricing across millions of valuations.",
        "Designed PostgreSQL schemas and Supabase migrations that improved query efficiency and reduced latency by 60% across pricing endpoints.",
        "Implemented Supabase Edge Functions and background tasks to aggregate heavy data workloads and refresh pricing without blocking users.",
        "Rebuilt the Collections module into a trading hub with live portfolio tracking, graded/ungraded valuations, and shareable monetization flows.",
      ],
      projects: [
        {
          title: "Real-Time Pricing Platform",
          description:
            "Streaming valuation engine for Pokemon collectibles with sub-minute freshness and historical lookups.",
          technologies: [
            "Next.js",
            "Supabase",
            "PostgreSQL",
            "Edge Functions",
            "TypeScript",
          ],
          metrics: {
            prices: "Millions",
            latency: "-60%",
            freshness: "<60s",
          },
          challenges: [
            "High-frequency price updates",
            "Historical data volume",
            "Latency-sensitive endpoints",
          ],
          solutions: [
            "Edge function orchestration",
            "Normalized Postgres schemas",
            "Background task pipelines",
          ],
        },
        {
          title: "Collections Trading Hub",
          description:
            "Converted collections into a shareable marketplace with built-in valuation, monetization, and trade history.",
          technologies: [
            "Next.js",
            "Supabase",
            "PostgreSQL",
            "TypeScript",
            "Edge Functions",
          ],
          metrics: {
            portfolios: "Live valuations",
            coverage: "Graded + Ungraded",
            monetization: "Shareable",
          },
          challenges: [
            "Portfolio accuracy",
            "Tradable user flows",
            "Multi-source pricing data",
          ],
          solutions: [
            "Valuation engine",
            "Portfolio analytics",
            "Share + monetization flows",
          ],
        },
      ],
    },
    {
      role: "Full Stack Developer",
      company: "FabLab",
      period: "Oct 2023 – Present",
      location: "Arlington, TX",
      technologies: [
        "JavaScript",
        "React.js",
        "Node.js",
        "MySQL",
        "Redux",
        "Azure",
      ],
      tags: ["Full-Stack", "Backend", "Cloud"],
      description:
        "Leading full-stack development initiatives with focus on scalable web applications and cloud integration.",
      achievements: [
        "Spearheaded the development of FabApp, a management and ticketing system used by 15,000 students at the University of Texas at Arlington, successfully migrating from PHP to React.js using advanced React hooks.",
        "Architected a scalable Node.js backend, restructured MySQL schema for efficient query retrieval, and optimized RESTful APIs, achieving a 3X performance improvement.",
        "Implemented SSO with Azure AD and SAML, designed JWT authentication strategies for token-based sessions, and enforced role-based access control for secure, granular user access.",
        "Led development using Agile and Scrum methodologies, ensuring iterative delivery, continuous integration, and cross-functional team collaboration for efficient project execution.",
        "Enhanced state management in React.js using Redux, streamlining ticket handling and payment authorization.",
      ],
      projects: [
        {
          title: "FabApp - Student Management System",
          description:
            "Comprehensive management and ticketing system serving 15,000+ students",
          technologies: [
            "React.js",
            "Node.js",
            "MySQL",
            "Azure AD",
            "JWT",
            "Redux",
          ],
          metrics: {
            users: "15K+",
            performance: "3X",
            migration: "PHP→React",
          },
          challenges: [
            "Legacy Migration",
            "Scale Management",
            "Security Implementation",
          ],
          solutions: ["React Hooks", "Optimized APIs", "SSO Integration"],
        },
        {
          title: "Azure Cloud Integration",
          description: "Complete cloud migration and SSO implementation",
          technologies: ["Azure", "SAML", "JWT", "Node.js", "MySQL"],
          metrics: {
            security: "99.9%",
            performance: "3X",
            uptime: "99.9%",
          },
          challenges: [
            "Cloud Migration",
            "SSO Setup",
            "Performance Optimization",
          ],
          solutions: ["Azure DevOps", "SAML Integration", "API Optimization"],
        },
      ],
    },
    {
      role: "Software Developer",
      company: "HealthTick",
      period: "Jan 2023 – Aug 2023",
      location: "Bangalore, India",
      technologies: ["TypeScript", "Next.js", "Firebase", "Redux", "Strapi"],
      tags: ["Full-Stack", "Frontend", "Backend"],
      description:
        "Developed innovative healthcare platforms with focus on psychological assessment and content management.",
      achievements: [
        "Engineered an innovative psychological assessment platform with Next.js, Firebase, and Express.JS; implemented real-time data processing capabilities, enabling instant feedback for users and facilitating over 2,000 assessments completed in the first quarter.",
        "Constructed a high-performance health blog with Next.js, achieving a 35% faster load time; implemented Strapi as a headless CMS, streamlined content processes, and improved publishing efficiency for 20+ authors.",
        "Designed and optimized an intuitive Admin Panel for the nutritionist team, enhancing data visualization with React graphing libraries and refining REST APIs for seamless performance.",
      ],
      projects: [
        {
          title: "Psychological Assessment Platform",
          description:
            "Real-time assessment platform with instant feedback capabilities",
          technologies: [
            "Next.js",
            "Firebase",
            "Express.js",
            "TypeScript",
            "Real-time",
          ],
          metrics: {
            assessments: "2K+",
            feedback: "Instant",
            efficiency: "35%",
          },
          challenges: [
            "Real-time Processing",
            "Data Management",
            "User Experience",
          ],
          solutions: [
            "Firebase Integration",
            "Optimized APIs",
            "React Libraries",
          ],
        },
        {
          title: "Health Blog CMS",
          description:
            "High-performance content management system for health professionals",
          technologies: ["Next.js", "Strapi", "TypeScript", "Performance"],
          metrics: {
            loadTime: "35%",
            authors: "20+",
            efficiency: "High",
          },
          challenges: [
            "Performance Optimization",
            "Content Management",
            "Multi-author",
          ],
          solutions: ["Next.js Optimization", "Strapi CMS", "Caching Strategy"],
        },
      ],
    },
    {
      role: "Founder",
      company: "Privilon Technologies",
      period: "May 2021 – Aug 2023",
      location: "Bangalore, India",
      technologies: [
        "JavaScript",
        "TypeScript",
        "React.js",
        "Next.js",
        "Node.js",
        "AWS",
      ],
      tags: ["Full-Stack", "Education", "Leadership"],
      description:
        "Founded and led a strategic software development firm providing consulting services and educational programs.",
      achievements: [
        "Launched a strategic software development firm providing consulting services to over 8 clients and start-ups.",
        "Developed and deployed 10+ web applications in React.js, collaborating with lead developers and senior engineers.",
        "Delivered 15+ projects across various domains, increasing client efficiency by 40%.",
        "Established a community and taught 75+ students web development and programming through React.js.",
      ],
      projects: [
        {
          title: "Client Portfolio (10+ Applications)",
          description:
            "Diverse web applications across multiple domains and industries",
          technologies: [
            "React.js",
            "Next.js",
            "Node.js",
            "AWS",
            "Various APIs",
          ],
          metrics: {
            projects: "15+",
            clients: "8+",
            efficiency: "40%",
          },
          challenges: [
            "Diverse Requirements",
            "Client Management",
            "Quality Assurance",
          ],
          solutions: [
            "Agile Development",
            "Best Practices",
            "Continuous Delivery",
          ],
        },
        {
          title: "Educational Community",
          description: "Web development education program for 75+ students",
          technologies: ["React.js", "Teaching", "Community Building"],
          metrics: {
            students: "75+",
            success: "High",
            impact: "Community",
          },
          challenges: [
            "Curriculum Design",
            "Student Engagement",
            "Skill Transfer",
          ],
          solutions: ["Structured Learning", "Hands-on Projects", "Mentorship"],
        },
      ],
    },
  ];

  const categories = [
    "All",
    "Startups",
    "Full-Stack",
    "Frontend",
    "Backend",
    "Cloud",
    "Education",
  ];
  const filteredJourney =
    selectedCategory === "All"
      ? careerJourney
      : careerJourney.filter((role) =>
          role.tags ? role.tags.includes(selectedCategory) : false
        );

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="animate-fade-in-up">
            <h1 className="text-hero font-bold text-foreground mb-4">
              Career Journey
            </h1>
            <p className="text-body max-w-2xl">
              From building YC-backed trading infrastructure at Misprint to
              modernizing university platforms and leading a product studio,
              here&apos;s the throughline of my work.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 pt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-apple border ${
                  selectedCategory === category
                    ? "border-transparent bg-foreground text-background shadow-sm"
                    : "border-border/60 text-secondary hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Career Journey Timeline */}
      <section>
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border/60"></div>

            <div className="space-y-16">
              {filteredJourney.map((role, index) => (
                <div
                  key={`${role.company}-${role.period}`}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 rounded-full border border-border/60 bg-background"></div>

                  <div className="ml-16">
                    {/* Role Header */}
                    <div className="mb-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h2 className="text-headline font-bold text-foreground mb-2">
                            {role.role}
                          </h2>
                          <h3 className="text-lg font-semibold text-accent mb-1">
                            {role.company}
                          </h3>
                          <p className="text-body text-secondary">
                            {role.period} • {role.location}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {role.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full border border-border/50 text-xs text-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-body">{role.description}</p>
                    </div>

                    {/* Key Achievements */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-foreground mb-4">
                        Key Achievements
                      </h4>
                      <div className="space-y-3">
                        {role.achievements.map(
                          (achievement, achievementIndex) => (
                            <div
                              key={achievementIndex}
                              className="flex items-start space-x-3 p-4 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-sm hover:border-foreground/20 transition-apple"
                            >
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground flex-shrink-0"></span>
                              <p className="text-body">{achievement}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Projects Grid */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-6">
                        Notable Projects
                      </h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        {role.projects.map((project, projectIndex) => (
                          <div
                            key={projectIndex}
                            className="group p-6 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-sm transition-apple hover:border-foreground/20"
                          >
                            <h5 className="text-headline font-semibold text-foreground mb-3">
                              {project.title}
                            </h5>

                            <p className="text-body mb-4">
                              {project.description}
                            </p>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              {Object.entries(project.metrics).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="rounded-xl border border-border/40 bg-background/80 p-3 text-center"
                                  >
                                    <div className="text-sm font-semibold text-foreground">
                                      {value}
                                    </div>
                                    <div className="text-xs text-secondary uppercase tracking-wide">
                                      {key}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>

                            {/* Technologies */}
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-full border border-border/50 text-xs text-secondary"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Challenges & Solutions */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h6 className="text-xs font-medium text-foreground mb-2">
                                  Challenges
                                </h6>
                                <ul className="space-y-1.5">
                                  {project.challenges.map((challenge) => (
                                    <li
                                      key={challenge}
                                      className="text-xs text-secondary flex items-center"
                                    >
                                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-foreground/80" />
                                      {challenge}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h6 className="text-xs font-medium text-foreground mb-2">
                                  Solutions
                                </h6>
                                <ul className="space-y-1.5">
                                  {project.solutions.map((solution) => (
                                    <li
                                      key={solution}
                                      className="text-xs text-secondary flex items-center"
                                    >
                                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-foreground/80" />
                                      {solution}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm animate-fade-in-up">
            <h2 className="text-display font-semibold text-foreground mb-4">
              Plan the Next Release Together
            </h2>
            <p className="text-body mb-6">
              Need a founding engineer or a full-stack partner who can ship with
              clarity? Let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:hello@aaryanmori.com"
                className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium transition-apple hover:bg-foreground/90"
              >
                Get In Touch
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 rounded-full border border-border/60 text-sm font-medium text-foreground transition-apple hover:border-foreground/50 hover:bg-background/70"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
