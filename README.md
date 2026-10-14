# Friendly Technologies

Single-page marketing site for [friendlytechnologies.net](https://friendlytechnologies.net).
Static Next.js app (app router + `output: 'export'`), styled after [wxdu.org](https://github.com/dillo/wxdnew) -
same kallisto/Courier Prime type pairing and drifting noise-square background (that component is a
theme-aware port of WXDU's MIT-licensed GPU shader).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static export to out/
```

## Themes

Four color themes live in `app/globals.css` as `data-theme` attributes
(`teal` default, `violet`, `orange`, `paper`). The dots in the header switch
them; the choice is saved to `localStorage` (`ft-theme`). The background shader
reads its `--wash-*` and `--square` values from the live stylesheet, so it
follows the theme automatically. Default / content files: `app/page.jsx`,
`components/ThemeContext.jsx`, `components/Background.jsx`.

## Deploy

GitHub Pages serves the `gh-pages` branch; the workflow in
`.github/workflows/deploy.yml` builds and pushes `out/` there on every push to
`main` (or run `npm run deploy` locally). The `CNAME` lives in `public/` so the
custom domain survives the export.
