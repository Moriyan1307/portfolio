"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { taglines } from "./taglines/taglines";

function LiveTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-border/60 bg-background/80 backdrop-blur-sm">
      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
      <span className="font-mono text-xs font-medium text-secondary">
        {time.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </span>
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
      }, 3000); // Wait 2 seconds before deleting
      return () => clearTimeout(waitTimer);
    }

    const speed = isDeleting ? 50 : 50; // Faster deletion, slower typing

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentTagline.length) {
          setCurrentText(currentTagline.slice(0, currentText.length + 1));
        } else {
          setIsWaiting(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isWaiting, currentTaglineIndex, taglines]);

  const technologyStacks = {
    Languages: [
      { name: "JavaScript", level: "Expert", icon: "🟨" },
      { name: "TypeScript", level: "Advanced", icon: "📘" },
      { name: "Python", level: "Intermediate", icon: "🐍" },
      { name: "Java", level: "Intermediate", icon: "☕" },
      { name: "C/C++", level: "Intermediate", icon: "⚙️" },
    ],
    Frontend: [
      { name: "React.js", level: "Expert", icon: "⚛️" },
      { name: "Next.js", level: "Advanced", icon: "▲" },
      { name: "Redux", level: "Advanced", icon: "🔄" },
      { name: "Zustand", level: "Intermediate", icon: "🐻" },
      { name: "Tailwind CSS", level: "Advanced", icon: "🎨" },
      { name: "HTML/CSS", level: "Expert", icon: "🌐" },
    ],
    Backend: [
      { name: "Node.js", level: "Expert", icon: "🟢" },
      { name: "Express.js", level: "Advanced", icon: "🚂" },
      { name: "REST APIs", level: "Advanced", icon: "🌐" },
      { name: "JWT", level: "Advanced", icon: "🔐" },
      { name: "OAuth", level: "Intermediate", icon: "🔑" },
      { name: "Prisma", level: "Intermediate", icon: "🗄️" },
    ],
    Databases: [
      { name: "MySQL", level: "Advanced", icon: "🐬" },
      { name: "PostgreSQL", level: "Intermediate", icon: "🐘" },
      { name: "MongoDB", level: "Intermediate", icon: "🍃" },
      { name: "Database Design", level: "Advanced", icon: "🏗️" },
      { name: "Query Optimization", level: "Intermediate", icon: "⚡" },
    ],
    "Cloud & DevOps": [
      { name: "Azure", level: "Advanced", icon: "☁️" },
      { name: "AWS", level: "Intermediate", icon: "☁️" },
      { name: "Firebase", level: "Advanced", icon: "🔥" },
      { name: "Google Cloud", level: "Intermediate", icon: "☁️" },
      { name: "Docker", level: "Intermediate", icon: "🐳" },
      { name: "CI/CD", level: "Intermediate", icon: "🚀" },
    ],
    "Testing & Tools": [
      { name: "Jest", level: "Advanced", icon: "🧪" },
      { name: "Git", level: "Advanced", icon: "📝" },
      { name: "GitHub", level: "Advanced", icon: "🐙" },
      { name: "VS Code", level: "Expert", icon: "💻" },
      { name: "Postman", level: "Advanced", icon: "📮" },
      { name: "Agile/Scrum", level: "Advanced", icon: "📋" },
    ],
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "text-green-600";
      case "Advanced":
        return "text-blue-600";
      case "Intermediate":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-16">
      <section className="pt-16 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="animate-fade-in-up">
            <h1 className="text-hero font-bold text-foreground mb-6">
              Hey, I&apos;m Aaryan 👋
            </h1>
            <p className="text-body max-w-3xl leading-relaxed mb-6">
              I build things that matter. As a Founding Engineer at Misprint (YC
              W25), I helped scale real-time trading infrastructure for
              collectibles using Next.js and Supabase—making trading cards as
              liquid as stocks. Before that, I founded a company, led teams, and
              shipped 15+ full-stack products to over 15,000 users. Now, I’m
              focused on building intelligent, transparent systems that help
              people interact with technology more meaningfully.
            </p>
            <div className="flex items-center space-x-4 text-sm text-secondary">
              <span>📍 New York City, NY 🇺🇸</span>

              <LiveTime />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in-up stagger-1">
            <Link
              href="/work"
              className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium tracking-tight transition-apple hover:bg-foreground/90"
            >
              View My Journey
            </Link>
            <Link
              href="mailto:aaryanmori@gmail.com"
              className="px-5 py-2.5 rounded-full border border-border/60 text-sm font-medium text-foreground transition-apple hover:border-foreground/50 hover:bg-background/70"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Typewriter Taglines Section */}
      {/* <section className="py-2">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-10 flex items-center justify-center">
            <h2 className="text-1xl md:text-3xl lg:text-1xl font-light text-foreground">
              <span className="font-mono">
                {currentText}
                <span className="animate-pulse text-accent">|</span>
              </span>
            </h2>
          </div>
        </div>
      </section> */}

      {/* Typewriter Taglines Section */}
      <section className="py-8">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="inline-block px-4 py-2 rounded-full border border-border/50 bg-background/70 backdrop-blur-sm">
            <p className="text-sm sm:text-base md:text-lg font-normal text-muted-foreground tracking-tight font-mono">
              {currentText}
              <span className="animate-pulse text-accent">|</span>
            </p>
          </div>
        </div>
      </section>

      {/* Career Journey Preview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-display font-semibold text-foreground mb-4">
              Career Journey
            </h2>
            <p className="text-body max-w-2xl">
              From YC-backed trading infrastructure to university-scale student
              systems, here&apos;s how I&apos;ve grown products end-to-end.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                role: "Founding Software Engineer",
                company: "Misprint Inc. (YC W25)",
                period: "Aug 2025 – Oct 2025",
                location: "New York City, NY",
                description:
                  "Architected the trading backbone for Pokemon collectibles with Next.js, Supabase, and edge functions.",
                highlights: [
                  "Millions of price points",
                  "60% faster queries",
                  "Serverless pricing jobs",
                ],
                icon: "🃏",
              },
              {
                role: "Lead Full Stack Developer",
                company: "FabLab",
                period: "Oct 2023 – Present",
                location: "Arlington, TX",
                description:
                  "Scaling FabApp for 15,000+ students with React.js, Node.js, and Azure-powered auth.",
                highlights: ["15K+ users", "3x faster", "Azure SSO"],
                icon: "💼",
              },
              {
                role: "Software Developer",
                company: "HealthTick",
                period: "Jan 2023 – Aug 2023",
                location: "Bangalore, India",
                description:
                  "Shipped real-time assessment and content platforms with Next.js, Firebase, and Strapi.",
                highlights: ["2K+ assessments", "35% faster", "20+ authors"],
                icon: "🏥",
              },
              {
                role: "Founder",
                company: "Privilon Technologies",
                period: "May 2021 – Aug 2023",
                location: "Bangalore, India",
                description:
                  "Ran a product studio delivering 15+ full-stack builds and teaching 75+ engineers.",
                highlights: ["15+ builds", "8+ clients", "75+ students"],
                icon: "🚀",
              },
            ].map((role) => (
              <div
                key={role.company}
                className="group p-6 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-sm transition-apple hover:border-foreground/25 hover:-translate-y-1 animate-fade-in-up"
              >
                <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-xl mb-4">
                  {role.icon}
                </div>
                <h3 className="text-headline font-semibold text-foreground mb-2">
                  {role.role}
                </h3>
                <h4 className="text-lg font-medium text-accent mb-1">
                  {role.company}
                </h4>
                <p className="text-xs text-secondary uppercase tracking-wide mb-3">
                  {role.period} • {role.location}
                </p>
                <p className="text-body mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-2.5 py-1 rounded-full border border-border/40 text-xs font-medium text-secondary group-hover:text-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/60 text-sm font-medium text-foreground transition-apple hover:border-foreground/40"
            >
              <span>View Full Journey</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-display font-semibold text-foreground mb-4">
              Technology Stack
            </h2>
            <p className="text-body max-w-2xl">
              A comprehensive toolkit I use to build robust, scalable
              applications and deliver exceptional user experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(technologyStacks).map(
              ([category, technologies], categoryIndex) => (
                <div
                  key={category}
                  className="p-6 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-sm transition-apple hover:border-foreground/20 animate-fade-in-up"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <h3 className="text-headline font-semibold text-foreground mb-4">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {technologies.map((tech, techIndex) => (
                      <div
                        key={tech.name}
                        className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-background/80 transition-all duration-200 hover:border-foreground/30 hover:-translate-y-0.5"
                        style={{
                          animationDelay: `${
                            categoryIndex * 0.1 + techIndex * 0.05
                          }s`,
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{tech.icon}</span>
                          <span className="font-medium text-foreground">
                            {tech.name}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full bg-surface ${getLevelColor(
                            tech.level
                          )}`}
                        >
                          {tech.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Experience Section - More minimal approach */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-display font-semibold text-foreground mb-4">
              What I Do
            </h2>
            <p className="text-body max-w-2xl">
              I specialize in full-stack development, creating seamless user
              experiences and robust backend systems that scale with your
              business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Full-Stack Development",
                description:
                  "Building complete web applications from frontend to backend using React.js, Node.js, and modern databases with cloud integration.",
                icon: "⚡",
              },
              {
                title: "System Architecture",
                description:
                  "Designing scalable architectures, optimizing databases, and implementing secure authentication systems for enterprise applications.",
                icon: "🏗️",
              },
              {
                title: "Team Leadership",
                description:
                  "Leading development teams, mentoring developers, and establishing best practices for efficient project delivery.",
                icon: "👥",
              },
              {
                title: "Cloud Integration",
                description:
                  "Deploying and managing applications on cloud platforms with CI/CD pipelines and monitoring solutions.",
                icon: "☁️",
              },
            ].map((skill, index) => (
              <div
                key={skill.title}
                className="group p-6 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-sm transition-apple hover:border-foreground/20 animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="text-3xl mb-4 transition-apple group-hover:-translate-y-1">
                  {skill.icon}
                </div>
                <h3 className="text-headline font-semibold text-foreground mb-3">
                  {skill.title}
                </h3>
                <p className="text-body">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-display font-semibold text-foreground mb-4">
              Key Achievements
            </h2>
            <p className="text-body">
              Notable milestones and contributions across my career journey.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Real-time Collectible Pricing Rails",
                description:
                  "Misprint Inc. (YC W25): engineered the Next.js + Supabase stack that keeps millions of Pokemon card valuations fresh with edge-driven pricing jobs.",
                year: "2025",
              },
              {
                title: "15,000+ Students Served",
                description:
                  "FabLab: re-platformed FabApp from PHP to React.js/Node.js, tripling performance and unifying Azure-backed auth.",
                year: "2023-2025",
              },
              {
                title: "2,000+ Assessments Completed",
                description:
                  "HealthTick: launched a real-time psychological assessment platform with Next.js and Firebase for instant reporting.",
                year: "2023",
              },
              {
                title: "15+ Products Delivered",
                description:
                  "Privilon Technologies: led a product studio delivering 15+ full-stack builds and mentoring 75+ engineers.",
                year: "2021-2024",
              },
            ].map((experience, index) => (
              <div
                key={experience.title}
                className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-sm transition-apple hover:border-foreground/20 animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 0.15}s` }}
              >
                <div className="flex-shrink-0">
                  <span className="inline-block px-3 py-1 rounded-full border border-border/50 text-xs font-medium uppercase tracking-wide text-secondary">
                    {experience.year}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-headline font-semibold text-foreground mb-2">
                    {experience.title}
                  </h3>
                  <p className="text-body">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - More minimal */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm animate-fade-in-up">
            <h2 className="text-display font-semibold text-foreground mb-4">
              Let&apos;s Build Calm, Modern Systems
            </h2>
            <p className="text-body mb-6 max-w-2xl mx-auto">
              Whether it&apos;s real-time trading rails or a full-stack product
              refresh, I help teams ship faster with lean, data-fluent
              architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/work"
                className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium transition-apple hover:bg-foreground/90"
              >
                Explore My Journey
              </Link>
              <Link
                href="mailto:aaryanmori@gmail.com"
                className="px-5 py-2.5 rounded-full border border-border/60 text-sm font-medium text-foreground transition-apple hover:border-foreground/50 hover:bg-background/70"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
