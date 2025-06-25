import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/nav";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Aaryan | Portfolio",
  description: "My personal portfolio website",
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
    title: "Aaryan Mori | Full-Stack Engineer & Startup Builder",
    description:
      "Explore the work and experience of Aaryan Mori, a full-stack engineer and startup founder focused on building clean, scalable web apps.",
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
    title: "Aaryan Mori | Full-Stack Engineer & Startup Builder",
    description:
      "I'm Aaryan Mori, a full-stack software engineer and founder focused on building modern web experiences. Explore my portfolio.",
    creator: "@aaryanmori", // if applicable
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
    <html lang="en">
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
