# Portfolio — Zahid Faqih Alim Rabbani

Rebuilt with **React + TypeScript + Tailwind CSS v4 + Vite**, using a
PCB/schematic-inspired visual theme (copper traces, LED accents, datasheet
typography) that ties into an electrical engineering / IoT background.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The output goes to `dist/`.

## Project structure

```
src/
  components/   All UI sections (Nav, Hero, About, Experience, SkillsEducation, Contact, Footer)
  data/         Content lives here — edit these instead of the components
    profile.ts    Name, bio, contact info, social links, nav labels
    projects.ts   Project cards shown in the "Projects" section
    education.ts  Education timeline + skills lists
  hooks/        useReveal — scroll-triggered fade-up animation
public/img/     Photos used across the site
```

### Adding or editing projects

Open `src/data/projects.ts` and add an object to the `projects` array:

```ts
{
  id: "my-new-project",
  title: "Project Title",
  description: "One or two sentences about what it does.",
  image: "img/my-image.jpg", // place the file in public/img first
  link: "https://github.com/your-username/repo",
  tags: ["ESP32", "Fuzzy Logic"],
}
```

No other file needs to change — the Projects section renders this array
automatically.

### Editing bio / contact info

Everything in the hero, about, and contact sections comes from
`src/data/profile.ts`.

## Deploying to GitHub Pages

This repo already includes a GitHub Actions workflow at
`.github/workflows/deploy.yml` that builds the site and publishes it to
GitHub Pages automatically on every push to `main`.

**One-time setup on GitHub:**

1. Push this project's contents to the `main` branch of
   `zafar2154/zafar2154.github.io` (replacing the old static site).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or re-run the workflow from the **Actions** tab) — the
   site will build and publish to `https://zafar2154.github.io/`.

No manual `gh-pages` branch or extra token setup is needed; the workflow
uses GitHub's built-in Pages deployment action.

### Manual deploy (alternative)

If you'd rather not use Actions:

```bash
npm run build
```

Then copy the contents of `dist/` to the root of the branch GitHub Pages is
configured to serve.

## Notes

- The contact form opens the visitor's email client via a `mailto:` link
  (pre-filled with their name, email, and message) instead of sending mail
  directly — this avoids exposing any email-sending credentials in the
  client-side code, which the previous smtp.js-based form did.
- Fonts (JetBrains Mono, Inter) load from Google Fonts at runtime, so an
  internet connection is needed to see them in their intended style;
  otherwise the browser falls back to system fonts.
