// Generates index.html and projects/<slug>/index.html from scripts/projects.mjs.
// Usage: node scripts/build.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { groups, projects, thumbs } from "./projects.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const isExternal = (href) => /^https?:\/\//.test(href);

function head(title, description) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
  <div class="wrap">
    <header class="site-header">
      <a class="brand" href="/">wricardo<span>.</span>github<span>.</span>io</a>
      <nav>
        <a href="/#projects">Projects</a>
        <a href="https://github.com/wricardo">GitHub ↗</a>
      </nav>
    </header>
`;
}

const foot = `
    <footer class="site-footer">
      <span>© Wallace Ricardo</span>
      <span>Static site · GitHub Pages</span>
    </footer>
  </div>
</body>
</html>
`;

function thumb(p) {
  if (p.shot) {
    return `<div class="thumb thumb-shot"><img src="${p.shot}" alt="" loading="lazy"></div>`;
  }
  return `<div class="thumb">${thumbs[p.slug] ?? ""}</div>`;
}

function card(p, n) {
  return `        <li class="project">
          <a href="/projects/${p.slug}/">
            <span class="num">${pad(n)}</span>
            <div>
              <h2>${esc(p.title)}</h2>
              <p>${esc(p.summary)}</p>
              <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
            </div>
            ${thumb(p)}
          </a>
        </li>`;
}

function index() {
  let n = 0;
  const sections = groups
    .map((g) => {
      const items = projects.filter((p) => p.group === g.id);
      const cards = items.map((p) => card(p, ++n)).join("\n");
      return `    <section class="group" id="${g.id}">
      <div class="section-label"><span>${esc(g.label)}</span><span>${pad(items.length)}</span></div>
      <ul class="projects">
${cards}
      </ul>
    </section>`;
    })
    .join("\n\n");

  return (
    head("Wallace Ricardo — Projects", "Games, developer tools and browser utilities by Wallace Ricardo.") +
    `
    <section class="hero">
      <p class="eyebrow">Index of things</p>
      <h1>Games, tools<br><em>&amp; small experiments.</em></h1>
      <p class="lede">Puzzle games that people and AI agents can both play, GraphQL tooling, a Factorio mod, and a few browser utilities.</p>
      <div class="jump">${groups.map((g) => `<a href="#${g.id}">${esc(g.label)}</a>`).join("")}</div>
    </section>

    <div id="projects">
${sections}
    </div>
` +
    foot
  );
}

function media(p) {
  if (p.shot) {
    const live = p.links.find((l) => l.primary)?.href;
    return `    <a class="demo" href="${live}">
      <div class="demo-bar"><i></i><i></i><i></i><span>${esc(p.shotUrl)}</span><em>Open ↗</em></div>
      <img src="${p.shot}" alt="${esc(p.title)} screenshot">
    </a>`;
  }
  if (p.iframe) {
    return `    <div class="demo">
      <div class="demo-bar"><i></i><i></i><i></i><span>${esc(p.iframe.src)}</span></div>
      <iframe src="${p.iframe.src}" height="${p.iframe.height}" title="${esc(p.title)} demo" loading="lazy"></iframe>
    </div>`;
  }
  if (p.code) {
    return `    <div class="demo demo-term">
      <div class="demo-bar"><i></i><i></i><i></i><span>${esc(p.code.title)}</span></div>
      <pre>${p.code.body}</pre>
    </div>`;
  }
  return "";
}

function detail(p, i) {
  const next = projects[(i + 1) % projects.length];
  const actions = p.links
    .map(
      (l) =>
        `<a class="btn ${l.primary ? "btn-primary" : "btn-ghost"}" href="${l.href}">${esc(l.label)}${isExternal(l.href) || l.primary ? " ↗" : ""}</a>`,
    )
    .join("\n        ");
  const sections = p.sections
    .map(
      (s) => `    <div class="prose">
      <h3>${esc(s.h)}</h3>
      <div class="body">
${s.html}
      </div>
    </div>`,
    )
    .join("\n\n");

  return (
    head(`${p.title} — Wallace Ricardo`, p.summary) +
    `
    <a class="back" href="/">← All projects</a>

    <section class="detail-hero">
      <p class="eyebrow">Project ${pad(i + 1)} · ${esc(groups.find((g) => g.id === p.group).label)}</p>
      <h1>${p.titleHtml}</h1>
      <p class="lede">${esc(p.lede)}</p>
      <div class="actions">
        ${actions}
      </div>
    </section>

    <dl class="meta">
${p.meta.map(([k, v]) => `      <div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("\n")}
    </dl>

${media(p)}

${sections}

    <a class="next" href="/projects/${next.slug}/">
      <small>Next project →</small>
      <div>${esc(next.title)}</div>
    </a>
` +
    foot
  );
}

writeFileSync(join(root, "index.html"), index());
projects.forEach((p, i) => {
  const dir = join(root, "projects", p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), detail(p, i));
});
console.log(`built index + ${projects.length} project pages`);
