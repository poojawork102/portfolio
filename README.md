# Pooja Lingwat — Portfolio

Personal portfolio of Pooja Lingwat, AI full stack developer and CSE student at MIT-WPU, Pune.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 (tokens in `src/app/globals.css`) |
| Animation | Framer Motion, Lenis smooth scroll, React Three Fiber (3D globe) |
| Icons | Lucide, Simple Icons (brand logos) |
| Backend | Next.js route handler `src/app/api/contact/route.ts` (Node) |
| Database | Neon Postgres (contact messages) |
| Email | Resend |
| Spam check | Honeypot field, rate limit, optional Cloudflare Turnstile |
| Hosting | Vercel, with Vercel Analytics |
| CI | GitHub Actions: lint, type check, build, npm audit, gitleaks |

## Run it locally (Windows Command Prompt)

```
npm install
copy .env.example .env.local
npm run dev
```

Open http://localhost:3000. The site works without any keys; only the contact form needs them.

The intro plays once per browser session. Open a private window to see it again.

## Edit your content

Everything you'll update monthly is in `src/data/`:

| File | What's in it |
|---|---|
| `profile.ts` | Name, links, hero, intro terminal lines, about, education, experience, leadership, recognition, contact text |
| `projects.ts` | Projects. Add an object to add a project; it also gets its own page at `/projects/<slug>` |
| `certs.ts` | Certifications. Paste each link into `url` |
| `tools.ts` | Tech stack logos |
| `project-art.ts` | Drawn previews used until a project has a real screenshot |

Images go in `public/`. For a project screenshot, save it as `public/projects/plumbline.png` and set
`image: "/projects/plumbline.png"` on that project. Put your resume at `public/resume.pdf`.

## Connect the contact form

1. **Neon**: create a free project at neon.tech, open the SQL editor and run `db/schema.sql`.
   Copy the connection string into `DATABASE_URL`.
2. **Resend**: create a free account at resend.com and an API key. Put it in `RESEND_API_KEY`.
   With the default sender, Resend only delivers to the email you signed up with, so sign up with
   pooja.work102@gmail.com.
3. **Turnstile** (optional): in Cloudflare, create a Turnstile widget for your domain and copy both keys.
4. Set `IP_HASH_SALT` to any long random string.

Messages are saved in Neon (Tables > contact_messages) and emailed to you.

## Deploy

1. On vercel.com, import `poojawork102/portfolio`. Vercel detects Next.js.
2. Add the variables from `.env.example` under Project > Settings > Environment Variables.
3. Every push to `main` deploys. Every other branch gets a preview link.

## Project structure

```
src/
  app/             pages, API route, share image, sitemap, robots
  components/      one file per section and effect
  data/            your content
  lib/             GitHub data, database client, form rules
public/            photo, resume, screenshots
db/schema.sql      contact table
```

## Credits

Fonts: Bricolage Grotesque, Figtree, IBM Plex Mono (SIL Open Font License), self-hosted via Fontsource.
Libraries: Next.js, React, Tailwind CSS, Framer Motion, three.js, React Three Fiber, Lenis, Lucide, Zod (MIT/ISC).
Brand icons: Simple Icons (CC0).
