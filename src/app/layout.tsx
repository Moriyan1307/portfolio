import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const description =
  "Founding software + product engineer in New York. Building agentic revenue systems for independent hotels, from infrastructure to the agents on top.";

export const metadata: Metadata = {
  title: "Aaryan Mori | Founding Software + Product Engineer",
  description,
  icons: {
    icon: "/logo.svg",
  },
  keywords: [
    "Aaryan Mori",
    "Founding Engineer",
    "Software Engineer",
    "Product Engineer",
    "Agentic Systems",
    "Multi-Agent Systems",
    "AI Engineer",
    "Dynamic Pricing",
    "TypeScript",
    "Next.js",
    "NestJS",
    "New York",
  ],
  authors: [{ name: "Aaryan Mori", url: "https://www.aaryanmori.com/" }],
  creator: "Aaryan Mori",
  publisher: "Aaryan Mori",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aaryan Mori | Founding Software + Product Engineer",
    description,
    url: "https://www.aaryanmori.com/",
    siteName: "Aaryan Mori",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaryan Mori | Founding Software + Product Engineer",
    description,
    creator: "@aaryanmori",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://www.aaryanmori.com/"),
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaryan Mori",
  url: "https://www.aaryanmori.com/",
  jobTitle: "Founding Software + Product Engineer",
  email: "mailto:aaryanmori@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York City",
    addressRegion: "NY",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/Moriyan1307",
    "https://www.linkedin.com/in/aaryan-mori-334098192/",
  ],
  knowsAbout: [
    "Agentic systems",
    "Multi-agent orchestration",
    "Dynamic pricing",
    "Revenue management systems",
    "TypeScript",
    "Next.js",
    "NestJS",
    "PostgreSQL",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
