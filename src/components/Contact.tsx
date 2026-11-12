import { CONTACT, SITE } from "@/data/profile";
import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";
import { Reveal } from "./Reveal";

export function Contact() {
  const rows = [
    ["Open to", CONTACT.openTo, null],
    ["Response time", CONTACT.response, CONTACT.responseNote],
    ["Based in", SITE.location, SITE.timezone],
  ] as const;
  return (
    <section id="contact" className="section" style={{ background: "linear-gradient(180deg, #dce4d4, #c9d6c1)" }}>
      <div className="wrap">
        <Reveal>
          <p className="label">Contact</p>
          <Reveal variant="flip">
            <h2 className="h2">{CONTACT.heading}</h2>
          </Reveal>
          <p className="sub">{CONTACT.sub}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal className="card grid content-start gap-6 p-7" >
            {rows.map(([h, v, n]) => (
              <div key={h}>
                <h4 className="mb-1 font-mono text-[0.78rem] font-semibold text-maroon">{h}</h4>
                <p className="m-0">{v}</p>
                {n && <p className="m-0 text-[0.92rem] text-muted">{n}</p>}
              </div>
            ))}
            <CopyEmail email={SITE.email} />
          </Reveal>
          <Reveal delay={0.08} className="relative">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
