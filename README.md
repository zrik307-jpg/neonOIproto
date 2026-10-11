# Neon.io — GitHub-ready project

This project was split from **Neon_io_v54_territory_dirty_rects.html**. The original game logic, UI, and CSS rules were preserved while extracting inline styles and scripts into separate files.

## Structure

- `index.html` — game markup and early bootstrap / SDK loader.
- `css/style.css` — extracted styles, preserving their original order.
- `js/core.js` — core runtime scripts in original order.
- `js/addons.js` — later add-ons and compatibility fixes in original order.
- `assets/images/` — place image assets here if you later move them out of the HTML.
- `assets/audio/` — place audio assets here if you later move them out of the HTML.

## Run locally

Because the game uses external JavaScript files, run it from a local web server rather than opening `index.html` as a `file://` URL. For example, with Python installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a GitHub repository and upload the contents of this folder (the `index.html` must be at the repository root).
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**, choose the `main` branch and `/(root)`, then save.
4. Wait for GitHub Pages to publish the site.

## Important

- `index.html` still includes the original early bootstrap and the `/sdk.js` script reference, unchanged. If your hosting platform does not provide `/sdk.js`, check whether it should instead use the Telegram Web Apps SDK URL for your deployment.
- This is a structural split, not a rewrite of the gameplay engine. It aims to preserve the v54 build rather than introduce new gameplay changes. Test the published build on mobile before replacing your current live version.
