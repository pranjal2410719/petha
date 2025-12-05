import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Braynix Studios - Creator Collaboration Platform | Project Discovery & Team Building",
  description: "Join thousands of creators on Braynix Studios. Discover innovative projects, collaborate with talented developers, designers, and entrepreneurs. Build amazing projects together with real-time collaboration tools.",
  keywords: "creator collaboration, project discovery, team building, developer collaboration, startup projects, creative partnerships, tech collaboration, project management, remote collaboration, innovation platform, AI collaboration, machine learning projects, open source collaboration, developer community, tech talent network, creative coding, collaborative development, project matching, skill-based networking, digital innovation hub",
  authors: [{ name: "Braynix Studios" }],
  creator: "Braynix Studios",
  publisher: "Braynix Studios",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://braynix-studios.vercel.app",
    siteName: "Braynix Studios",
    title: "Braynix Studios - Creator Collaboration Platform",
    description: "Discover innovative projects and collaborate with talented creators. Build amazing projects together with real-time collaboration tools.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Braynix Studios - Creator Collaboration Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Braynix Studios - Creator Collaboration Platform",
    description: "Discover innovative projects and collaborate with talented creators worldwide.",
    images: ["/og-image.jpg"],
    creator: "@braynixstudios",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://braynix-studios.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Braynix Studios",
              "description": "Creator collaboration platform for project discovery and team building. Connect developers, designers, and innovators for AI, web development, mobile apps, and open-source projects.",
              "url": "https://braynix-studios.vercel.app",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "keywords": ["developer collaboration", "AI projects", "open source", "startup collaboration", "tech community", "project discovery", "remote development", "creative coding"],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "Braynix Studios",
                "url": "https://braynix-studios.vercel.app"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
