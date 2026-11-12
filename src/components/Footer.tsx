import { SITE } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative z-[1] bg-sage-deep py-8 text-[0.9rem] text-[#e6ede1]">
      <div className="wrap flex flex-wrap justify-between gap-4">
        <span>Designed and built by {SITE.shortName}, 2026</span>
        <span className="flex gap-5">
          <a className="text-cream hover:underline" href={SITE.github}>GitHub</a>
          <a className="text-cream hover:underline" href={SITE.linkedin}>LinkedIn</a>
          <a className="text-cream hover:underline" href={`mailto:${SITE.email}`}>Email</a>
        </span>
      </div>
    </footer>
  );
}
