"use client";
import Link from "next/link";
import { useState } from "react";

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const careerJourney = [
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
    "Full-Stack",
    "Frontend",
    "Backend",
    "Cloud",
    "Education",
  ];
  const filteredJourney =
    selectedCategory === "All"
      ? careerJourney
      : careerJourney.filter((role) => {
          if (selectedCategory === "Full-Stack")
            return role.role === "Full Stack Developer";
          if (selectedCategory === "Frontend")
            return role.technologies.some((tech) =>
              ["React.js", "Next.js", "TypeScript"].includes(tech)
            );
          if (selectedCategory === "Backend")
            return role.technologies.some((tech) =>
              ["Node.js", "Express.js", "MySQL", "PostgreSQL"].includes(tech)
            );
          if (selectedCategory === "Cloud")
            return role.technologies.some((tech) =>
              ["Azure", "AWS", "Firebase"].includes(tech)
            );
          if (selectedCategory === "Education") return role.role === "Founder";
          return true;
        });

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
              My professional evolution from founding a tech company to leading
              full-stack development at innovative organizations.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 pt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-apple ${
                  selectedCategory === category
                    ? "bg-accent text-background"
                    : "bg-surface text-secondary hover:text-foreground hover:bg-surface-hover"
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
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 via-accent/30 to-accent/10"></div>

            <div className="space-y-16">
              {filteredJourney.map((role, index) => (
                <div
                  key={`${role.company}-${role.period}`}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg"></div>

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
                              className="px-3 py-1 bg-surface text-secondary text-xs rounded-full border border-border/50"
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
                              className="flex items-start space-x-3 p-4 rounded-lg bg-surface/30 border border-border/30 hover:bg-surface/50 transition-apple"
                            >
                              <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
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
                            className="group p-6 rounded-xl bg-surface/50 border border-border/50 hover:bg-surface hover:border-accent/20 transition-apple"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-headline font-semibold text-foreground group-hover:text-accent transition-apple">
                                {project.title}
                              </h5>
                              <Link
                                href="#"
                                className="text-secondary hover:text-accent transition-apple group-hover:scale-110"
                                title="View Details"
                              >
                                →
                              </Link>
                            </div>

                            <p className="text-body mb-4">
                              {project.description}
                            </p>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              {Object.entries(project.metrics).map(
                                ([key, value]) => (
                                  <div key={key} className="text-center">
                                    <div className="text-sm font-bold text-accent">
                                      {value}
                                    </div>
                                    <div className="text-xs text-secondary capitalize">
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
                                    className="px-2 py-1 bg-background/50 text-secondary text-xs rounded-md border border-border/30"
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
                                <ul className="space-y-1">
                                  {project.challenges.map((challenge) => (
                                    <li
                                      key={challenge}
                                      className="text-xs text-secondary flex items-center"
                                    >
                                      <span className="w-1 h-1 bg-accent rounded-full mr-2" />
                                      {challenge}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h6 className="text-xs font-medium text-foreground mb-2">
                                  Solutions
                                </h6>
                                <ul className="space-y-1">
                                  {project.solutions.map((solution) => (
                                    <li
                                      key={solution}
                                      className="text-xs text-secondary flex items-center"
                                    >
                                      <span className="w-1 h-1 bg-accent rounded-full mr-2" />
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
          <div className="p-8 rounded-2xl bg-surface/50 border border-border/50 animate-fade-in-up">
            <h2 className="text-display font-semibold text-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-body mb-6">
              From founding a tech company to leading development teams, I bring
              diverse experience and technical expertise to every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:hello@aaryanmori.com"
                className="px-6 py-3 bg-accent text-background font-medium rounded-lg transition-apple hover:bg-accent-hover hover:scale-105"
              >
                Get In Touch
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border border-accent text-accent font-medium rounded-lg transition-apple hover:bg-accent hover:text-background"
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
