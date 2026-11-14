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
import { ScrollProgress } from "@/components/ScrollProgress";
import { Providers } from "@/components/Providers";

// Runs before the page paints, so the theme and the intro never flash the wrong state.
const bootScript = `try{
var r=document.documentElement;
var t=localStorage.getItem("theme");
if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
r.dataset.theme=t;
var m=document.querySelector('meta[name="theme-color"]');
if(m)m.setAttribute("content",t==="dark"?"#14100f":"#efe8da");
if(sessionStorage.getItem("intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)r.dataset.intro="skip";
}catch(e){}`.replace(/\s*\n\s*/g, "");

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
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Providers>
          <SmoothScroll />
          <ScrollProgress />
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
