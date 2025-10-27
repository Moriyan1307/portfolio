import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Aaryan Mori | Software Engineer & Founder",
  description:
    "Full-stack software engineer and founder with 5+ years of experience architecting secure, high-performance systems. Building the future, one line of code at a time.",
  icons: {
    icon: "/logo.svg",
  },
  keywords: [
    "Aaryan Mori",
    "Full-Stack Engineer",
    "React Developer",
    "Node.js Engineer",
    "Software Developer Portfolio",
    "Tech Founder",
    "Freelance Developer",
    "JavaScript Engineer",
    "Startup Engineer",
    "Web Developer",
    "Open Source Contributor",
  ],
  authors: [{ name: "Aaryan Mori", url: "https://aaryanmori.vercel.app/" }],
  creator: "Aaryan Mori",
  publisher: "Aaryan Mori",
  openGraph: {
    title: "Aaryan Mori | Software Engineer & Founder",
    description:
      "Full-stack software engineer and founder with 5+ years of experience architecting secure, high-performance systems. Building the future, one line of code at a time.",
    url: "https://aaryanmori.vercel.app/",
    siteName: "Aaryan Mori Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aaryan Mori Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaryan Mori | Software Engineer & Founder",
    description:
      "Full-stack software engineer and founder with 5+ years of experience architecting secure, high-performance systems.",
    creator: "@aaryanmori",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://aaryanmori.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-background text-foreground">
        <div className="min-h-screen flex flex-col">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
              <div className="page-shell pt-6">
                <Navbar />
              </div>
            </header>
            <main className="flex-1 pt-32">{children}</main>
            <div className="mt-16">
              <Footer />
            </div>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
