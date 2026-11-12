import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource-variable/figtree/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { SITE } from "@/data/profile";
import { SmoothScroll } from "@/components/SmoothScroll";
import { StarField } from "@/components/StarField";
import { Cursor } from "@/components/Cursor";
import { Intro } from "@/components/Intro";
import { Providers } from "@/components/Providers";

// Runs before the page paints: skip the intro on repeat visits in this session or with reduced motion.
const introScript = `try{if(sessionStorage.getItem("intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | AI Full Stack Developer`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.name} | AI Full Stack Developer`,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#efe8da",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <Providers>
          <SmoothScroll />
          <StarField />
          <div className="page-glow" aria-hidden />
          <Cursor />
          <Intro />
          {children}
        </Providers>
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
