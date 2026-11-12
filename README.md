# Pooja Lingwat — Portfolio

Personal portfolio of Pooja Lingwat, CSE student at MIT-WPU, Pune.

## Run it locally

No build step. Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

Then open http://localhost:3000

## Where things live

| Path | What's in it |
|---|---|
| `index.html` | Page structure and most text |
| `css/styles.css` | Colours, fonts, layout. Colour tokens are at the top in `:root` |
| `js/main.js` | Intro loader, animations, 3D globe, projects, certificates, tech stack |
| `assets/` | Photo and images |

## Updating content

Projects, certificates and the tech stack are data at the top of `js/main.js`
(`PROJECTS`, `CERTS`, `TOOLS`). Add an entry and refresh.

## Still to do

- Certificate links (`url` in `CERTS`)
- Real project screenshots
- `resume.pdf` in the root folder
- Contact form backend (planned: Next.js API route + Postgres + Resend)
- Move to Next.js + Tailwind + Framer Motion

## Credits

Fonts: Bricolage Grotesque, Figtree, IBM Plex Mono (SIL Open Font License).
Libraries: three.js (MIT), Lenis (MIT). Brand icons: Simple Icons (CC0).
