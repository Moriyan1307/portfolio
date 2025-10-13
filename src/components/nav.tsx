"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = {
  "/": {
    name: "Home",
  },
  "/work": {
    name: "Career",
  },
  "/blog": {
    name: "Blog",
  },
};

const connectLinks = [
  { label: "Email", href: "mailto:aaryanmori@gmail.com", icon: "✉️" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1DA33d0jJJq3F6mWG9zhgxn731DYb-Yov/view?usp=sharing",
    icon: "📄",
  },
  {
    label: "Portfolio",
    href: "https://docs.google.com/document/d/116tjMGYE5H8vlAq3_m8zj_PKx_raWdxdBw6cOo4LXKQ/edit?usp=sharing",
    icon: "🎨",
  },
  { label: "GitHub", href: "https://github.com/Moriyan1307", icon: "🐙" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aaryan-mori-334098192/",
    icon: "💼",
  },
  { label: "privilon.tech", href: "https://privilon.tech/", icon: "🏢" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between py-6">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center space-x-3 transition-apple hover:opacity-80"
        aria-label="Home"
      >
        <div className="w-8 h-8 flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="Aaryan Mori Logo"
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-semibold text-lg text-foreground">
          Aaryan Mori
        </span>
      </Link>

      {/* Connect Links - Centered */}
      <div className="hidden md:flex items-center space-x-6">
        {connectLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-secondary hover:text-foreground hover:bg-surface transition-apple group"
          >
            <span className="text-sm group-hover:scale-110 transition-apple">
              {link.icon}
            </span>
            <span className="text-sm font-medium">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Navigation Items */}
      <div className="flex items-center space-x-8">
        {Object.entries(navItems).map(([path, item]) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              className={`relative text-sm font-medium transition-apple hover:text-accent ${
                isActive ? "text-accent" : "text-secondary"
              }`}
            >
              {item.name}
              {isActive && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full animate-scale-in" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
