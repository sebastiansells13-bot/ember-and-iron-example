# ember-and-iron-example

A live example site for a fictional one-person blacksmith shop — **Ember & Iron**.

**Live site:** https://sebastiansells13-bot.github.io/ember-and-iron-example/

## Why this one's different from the other examples

Every other example site in this portfolio (client-site-starter and everything built
from it — the coffee shop, realty agent, comics shop, vintage clothing shop) is an
Eleventy static-site build: Nunjucks templates, Sass, a GitHub Actions build step,
content-hashed assets.

This one is **plain hand-authored HTML, CSS, and JavaScript. No build step, no
framework, no templating engine.** Each page (`index.html`, `work.html`,
`custom-order.html`, `about.html`, `contact.html`) is a complete, standalone HTML
file with the header/nav/footer duplicated across them — the deliberate tradeoff of
zero tooling. Navigation uses relative links (`work.html`, not `/work.html`), so it
works correctly under a GitHub Pages project subpath with no `pathPrefix` config
needed anywhere — a real, useful contrast with the Eleventy sites, which all needed
that fix.

The one exception is `404.html`. GitHub Pages serves it at whatever URL was
missing (e.g. `/ember-and-iron-example/a/b`), where relative links would resolve
under `/a/`, so it sets `<base href="/ember-and-iron-example/">`. Change that to
`/` on a custom domain.

The GitHub Actions workflow (`.github/workflows/deploy.yml`) reflects this too — it's
five lines shorter than the Eleventy ones because there's nothing to build; it just
uploads the repo as-is.

This is the right choice for a genuinely simple site that will rarely change and
doesn't need a CMS, a blog, or reusable components. It's the wrong choice the moment
a client wants to self-edit content, or the site grows past a handful of pages —
that's exactly when the Eleventy + Pages CMS pattern in the other examples starts
paying for itself.

## Feature: instant custom-order estimate

`custom-order.html` + `js/quote-calculator.js` — a fully client-side price/lead-time
estimator (item type × material × engraving × quantity), explicitly framed as a rough
planning estimate rather than a binding quote, the same honesty pattern used for the
shipping calculators on the ecommerce examples.

## Local development

No build step — just open `index.html` in a browser, or serve the directory with
any static file server (e.g. `npx serve .`).
