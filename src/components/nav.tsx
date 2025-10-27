"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Notes" },
];

const connectLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Moriyan1307",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aaryan-mori-334098192/",
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1DA33d0jJJq3F6mWG9zhgxn731DYb-Yov/view?usp=sharing",
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-auto rounded-[24px] border border-border/70 bg-surface/90 px-5 py-3 shadow-[0_18px_45px_rgba(15,15,25,0.12)] backdrop-blur-xl transition-apple">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-medium tracking-tight text-foreground transition-apple hover:opacity-80"
          aria-label="Home"
        >
          <div className="w-9 h-9 rounded-[12px] border border-border flex items-center justify-center bg-background">
            <Image
              src="/logo.svg"
              alt="Aaryan Mori Logo"
              width={28}
              height={28}
              className="w-6 h-6 object-contain"
            />
          </div>
          <span>Aaryan Mori</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 rounded-[12px] bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.4em] text-secondary">
          <span>Shipping · Early teams</span>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-apple ${
                  isActive ? "text-foreground" : "text-secondary hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded bg-foreground animate-scale-in" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            {connectLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[12px] border border-border text-xs font-medium tracking-[0.15em] uppercase text-secondary transition-apple hover:text-foreground hover:border-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="mailto:aaryanmori@gmail.com"
            className="inline-flex items-center rounded-[12px] bg-foreground px-4 py-2 text-sm font-medium text-background transition-apple hover:bg-foreground/80"
          >
            Send note
          </Link>
        </div>
      </div>
    </nav>
  );
}
