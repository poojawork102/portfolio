import { SITE } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative z-[1] bg-footer py-8 text-[0.9rem] text-footer-ink">
      <div className="wrap flex flex-wrap justify-between gap-4">
        <span>Designed and built by {SITE.shortName}, 2026</span>
        <span className="flex gap-5">
          <a className="hover:underline" href={SITE.github}>GitHub</a>
          <a className="hover:underline" href={SITE.linkedin}>LinkedIn</a>
          <a className="hover:underline" href={`mailto:${SITE.email}`}>Email</a>
        </span>
      </div>
    </footer>
  );
}
