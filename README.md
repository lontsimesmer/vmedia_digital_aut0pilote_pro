# VMedia Digital — Sites web & tunnels clés en main

Single-page French lead-capture funnel for **VMedia Digital**, an agency that
builds websites, sales funnels and landing pages for businesses. The page has
one goal: get visitors to fill in the contact form.

## What's inside

- **Hero-only layout** with an embedded lead form (no extra sections, no menus)
- **Brand design system** — Ice background, Action Blue accents, Unbounded /
  DM Sans / Michroma type pairing (loaded via Google Fonts)
- **Interactive bubbles** that follow the cursor and **draggable doodles**
  around the page edges
- **International phone input** with country-code selection and per-country
  length validation (`react-phone-number-input`)
- **Custom "Business Description" field** mapped to the connected CRM, with
  new submissions tagged `lead - automation plan` and routed to the follow-up
  workflow
- **Floating WhatsApp CTA** linking to `wa.me/+22577832317`
- **Thank-you state** rendered in the same card after a successful submit
- Fully **responsive** — desktop full-screen hero + a tailored mobile layout

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, SSR/SSG)
- TypeScript + Vite
- Tailwind CSS v4 (design tokens in `src/styles.css`)
- `react-phone-number-input`, `lucide-react`, `tw-animate-css`

## Development

You need Node.js (18+) and npm (or `bun`).

```sh
git clone <this-repository-url>
cd vmedia-digital
npm install
npm run dev
```

Then open the printed local URL.

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the dev server                 |
| `npm run build`    | Production build                     |
| `npm run preview`  | Preview the production build         |
| `npm run lint`     | Lint with ESLint                     |
| `npm run format`   | Format with Prettier                 |

## Project structure

```
src/
├─ components/        # LeadFormCard, InteractiveBubbles, VMediaAssets (logo + doodles)
├─ lib/              # i18n (French), utils, error reporting
├─ routes/           # index.tsx (the single hero page), __root.tsx (head + favicon)
└─ styles.css        # Design tokens + Tailwind v4 theme
public/
└─ favicon.svg       # Cropped logo mark for crisp browser-tab rendering
```

## Deploy

This project targets an Edge runtime (e.g. Cloudflare Workers). Run
`npm run build` and deploy the resulting output per your host's instructions.
