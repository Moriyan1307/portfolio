"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { taglines } from "./taglines/taglines";

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
              I&apos;m a Full Stack Developer with a unique journey from
              founding a tech company to leading development teams. Currently at
              FabLab, I specialize in building scalable web applications and
              have delivered 15+ projects across various domains, serving
              15,000+ users with innovative solutions.
            </p>
            <div className="flex items-center space-x-4 text-sm text-secondary">
              <span>Currently in New York City, CA 🇺🇸</span>
              <span>Founding Engineer at Misprint</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in-up stagger-1">
            <Link
              href="/work"
              className="px-6 py-3 bg-accent text-background font-medium rounded-lg transition-apple hover:bg-accent-hover hover:scale-105"
            >
              View My Journey
            </Link>
            <Link
              href="mailto:aaryanmori@gmail.com"
              className="px-6 py-3 border border-border text-foreground font-medium rounded-lg transition-apple hover:bg-surface"
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
          <div className="inline-block px-4 py-2 rounded-xl ">
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
              From founding a tech company to leading development teams,
              here&apos;s my professional evolution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "Lead Full Stack Developer",
                company: "FabLab",
                period: "Oct 2023 – Present",
                location: "Arlington, TX",
                description:
                  "Leading development of FabApp serving 15,000+ students with React.js, Node.js, and Azure integration.",
                achievements: ["15K+ Users", "3X Performance", "Azure SSO"],
                color: "from-blue-500/20 to-blue-600/20",
              },
              {
                role: "Software Developer",
                company: "HealthTick",
                period: "Jan 2023 – Aug 2023",
                location: "Bangalore, India",
                description:
                  "Built psychological assessment platforms and health blogs using Next.js, Firebase, and Strapi.",
                achievements: [
                  "2K+ Assessments",
                  "35% Performance",
                  "20+ Authors",
                ],
                color: "from-green-500/20 to-green-600/20",
              },
              {
                role: "Founder",
                company: "Privilon Technologies",
                period: "May 2021 – Aug 2023",
                location: "Bangalore, India",
                description:
                  "Founded software development firm, delivered 15+ projects and taught 75+ students React.js.",
                achievements: ["15+ Projects", "8+ Clients", "75+ Students"],
                color: "from-purple-500/20 to-purple-600/20",
              },
            ].map((role, index) => (
              <div
                key={role.company}
                className="group p-6 rounded-xl bg-surface/50 border border-border/50 transition-apple hover:bg-surface hover:border-accent/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} mb-4 flex items-center justify-center text-2xl`}
                >
                  {index === 0 ? "💼" : index === 1 ? "🏥" : "🚀"}
                </div>
                <h3 className="text-headline font-semibold text-foreground mb-2">
                  {role.role}
                </h3>
                <h4 className="text-lg font-medium text-accent mb-1">
                  {role.company}
                </h4>
                <p className="text-sm text-secondary mb-3">
                  {role.period} • {role.location}
                </p>
                <p className="text-body mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/work"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-accent text-accent font-medium rounded-lg transition-apple hover:bg-accent hover:text-background"
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
                  className="p-6 rounded-xl bg-surface/50 border border-border/50 transition-apple hover:bg-surface hover:border-accent/20 animate-fade-in-up"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <h3 className="text-headline font-semibold text-foreground mb-4">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {technologies.map((tech, techIndex) => (
                      <div
                        key={tech.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30 hover:border-accent/30 transition-all duration-200 hover:scale-105"
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
                className="group p-6 rounded-xl bg-surface/50 border border-border/50 transition-apple hover:bg-surface hover:border-accent/20 animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-apple">
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
                title: "15,000+ Students Served",
                description:
                  "Developed FabApp management system for University of Texas at Arlington, successfully migrating from PHP to React.js with 3X performance improvement.",
                year: "2023-2025",
              },
              {
                title: "2,000+ Assessments Completed",
                description:
                  "Built psychological assessment platform at HealthTick with real-time processing and instant feedback capabilities.",
                year: "2023",
              },
              {
                title: "15+ Projects Delivered",
                description:
                  "Founded Privilon Technologies and delivered diverse web applications across multiple domains, increasing client efficiency by 40%.",
                year: "2021-2024",
              },
            ].map((experience, index) => (
              <div
                key={experience.title}
                className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl bg-surface/30 border border-border/30 transition-apple hover:bg-surface/50 hover:border-accent/20 animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 0.15}s` }}
              >
                <div className="flex-shrink-0">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-medium rounded-full text-sm">
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
          <div className="p-8 rounded-2xl bg-surface/50 border border-border/50 animate-fade-in-up">
            <h2 className="text-display font-semibold text-foreground mb-4">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-body mb-6 max-w-2xl mx-auto">
              From founding a tech company to leading development teams, I bring
              diverse experience and technical expertise to every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/work"
                className="px-6 py-3 bg-accent text-background font-medium rounded-lg transition-apple hover:bg-accent-hover hover:scale-105"
              >
                Explore My Journey
              </Link>
              <Link
                href="mailto:aaryanmori@gmail.com"
                className="px-6 py-3 border border-accent text-accent font-medium rounded-lg transition-apple hover:bg-accent hover:text-background"
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
