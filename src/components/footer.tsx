import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-16">
      <div className="page-shell space-y-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Aaryan Mori Logo"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-secondary">
                Aaryan Mori
              </p>
              <p className="text-body">
                Building calm, measurable systems for ambitious teams.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-secondary">
            {[
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
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="pill border-border/60 text-secondary hover:text-foreground hover:border-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-secondary md:flex-row md:items-center md:justify-between">
          <p>© {year} Aaryan Mori. MIT License.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-apple">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-apple">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
