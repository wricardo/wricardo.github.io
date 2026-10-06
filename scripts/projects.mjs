// Project data. Edit here, then run `node scripts/build.mjs` to regenerate
// index.html and projects/<slug>/index.html.

const GH = "https://github.com/wricardo";

export const groups = [
  { id: "games", label: "Games for humans & AI" },
  { id: "tools", label: "Developer tools" },
  { id: "utils", label: "Browser utilities" },
];

export const projects = [
  {
    slug: "motor-programming",
    group: "games",
    title: "Dr Brain: Motor Programming",
    titleHtml: "Motor <em>Programming</em>",
    summary:
      "A puzzle game about programming a little robot with tiny tapes and subroutines. Humans drag instructions; AI agents play through a GraphQL API.",
    lede:
      "Program the robot, collect every treat, reuse your moves. A puzzle about spotting patterns — playable by humans in the browser and by AI agents over GraphQL.",
    tags: ["Go", "GraphQL", "SvelteKit", "AI agents"],
    links: [
      { label: "Play it", href: "https://motor-programming.wricardo.net/", primary: true },
      { label: "GitHub repo", href: `${GH}/drbrain-motor-programming` },
      { label: "llms.txt", href: "https://motor-programming.wricardo.net/llms.txt" },
    ],
    meta: [
      ["Type", "Puzzle game"],
      ["Stack", "Go, gqlgen, SvelteKit"],
      ["Maps", "11, easy → hard"],
      ["Players", "Humans & AI"],
    ],
    shot: "/assets/shots/motor-programming.webp",
    shotUrl: "motor-programming.wricardo.net",
    sections: [
      {
        h: "How it works",
        html: `<p>A robot stands on a grid with rocks and treats. You don't steer it — you write a short program, press <strong>Run</strong>, and watch it follow your instructions one step at a time. Collect every treat to win.</p>
<ul>
  <li><strong>Move forward</strong> — one square in the facing direction.</li>
  <li><strong>Turn left / right</strong> — 90°, staying in place.</li>
  <li><strong>Call sub 1 / 2 / 3</strong> — run a subroutine, then continue.</li>
</ul>`,
      },
      {
        h: "The catch",
        html: `<p>The main tape has only a few slots, often far fewer than the route needs. Subroutines can call other subroutines, so a few slots turn into dozens of moves. On some maps a subroutine can call <em>itself</em>, which gives you a loop. Most of the game is folding the route into as few instructions as possible.</p>`,
      },
      {
        h: "Playing with AI",
        html: `<p>Click <strong>Play with an AI</strong> in a game to copy a ready-made prompt for a coding agent, or point an agent at <a href="https://motor-programming.wricardo.net/llms.txt"><code>/llms.txt</code></a>. A full game is four GraphQL calls: pick a map, create a session, set a program, run it. Humans and AIs can share a session, and anyone can watch live.</p>`,
      },
    ],
  },
  {
    slug: "mazes",
    group: "games",
    title: "Dr Brain: Mazes",
    titleHtml: "<em>Mazes</em>",
    summary:
      "Climb a fog-covered tower of maze levels with stairs and numbered portals. Arrow keys for humans, GraphQL for AI agents.",
    lede:
      "Climb the tower, find the way out, mind the portals. You only ever see the level you're standing on — the rest stays dark until you get there.",
    tags: ["Go", "GraphQL", "SvelteKit", "AI agents"],
    links: [
      { label: "Play it", href: "https://mazes.wricardo.net/", primary: true },
      { label: "GitHub repo", href: `${GH}/drbrain-mazes` },
      { label: "llms.txt", href: "https://mazes.wricardo.net/llms.txt" },
    ],
    meta: [
      ["Type", "Maze game"],
      ["Stack", "Go, GraphQL, SvelteKit"],
      ["Maps", "16, up to 6 levels"],
      ["Players", "Humans & AI"],
    ],
    shot: "/assets/shots/mazes.webp",
    shotUrl: "mazes.wricardo.net",
    sections: [
      {
        h: "How it works",
        html: `<p>Walk an explorer from <strong>START</strong> on the bottom level to <strong>FINISH</strong> on the top. Stone is floor, black is void.</p>
<ul>
  <li><strong>Blue up arrow</strong> lifts you one level; <strong>red down arrow</strong> drops you one.</li>
  <li><strong>Glowing holes</strong> (1–9) pipe you to the matching hole, possibly on another level.</li>
  <li>Each map has a move limit and a <strong>par</strong> — the shortest possible route.</li>
</ul>`,
      },
      {
        h: "Maps",
        html: `<p>16 maps, from <em>First Steps</em> and <em>Ladder</em> through <em>Wormholes</em> and <em>Tower Maze</em> up to <em>Grand Tower</em> and <em>Miner's Shaft</em> — six-level towers with pipes and staircases everywhere.</p>`,
      },
      {
        h: "Playing with AI",
        html: `<p>Same model as Motor Programming: copy the in-game AI prompt, or hand an agent <a href="https://mazes.wricardo.net/llms.txt"><code>/llms.txt</code></a>. The agent reads the level it's on, moves, and sees what changes — exploring under the same fog a human does.</p>`,
      },
    ],
  },
  {
    slug: "tesla-road-trip",
    group: "games",
    title: "Tesla Road Trip",
    titleHtml: "Tesla <em>Road Trip</em>",
    summary:
      "Drive a Tesla across a grid to visit every park without running out of battery. Built as a testbed for how people and AI agents plan.",
    lede:
      "Drive the car across the map, visit every park, don't run out of battery. A grid game for exploring how people and AI agents make decisions.",
    tags: ["Go", "GraphQL", "MCP", "SvelteKit", "WebSocket"],
    links: [
      { label: "Play it", href: "https://tesla.wricardo.net/", primary: true },
      { label: "GitHub repo", href: `${GH}/tesla-road-trip-game` },
    ],
    meta: [
      ["Type", "Route-planning game"],
      ["Stack", "Go, gqlgen, SvelteKit"],
      ["AI access", "MCP + GraphQL"],
      ["Clients", "Web, TUI"],
    ],
    shot: "/assets/shots/tesla.webp",
    shotUrl: "tesla.wricardo.net",
    sections: [
      {
        h: "Rules",
        html: `<ul>
  <li>Each move costs 1 unit of battery.</li>
  <li>Recharge at <strong>home</strong> (H) or <strong>superchargers</strong> (S).</li>
  <li>Visit every <strong>park</strong> (P) to win. Run dry with no charger in reach and it's over.</li>
  <li>Plan around water and blocked tiles.</li>
</ul>`,
      },
      {
        h: "Architecture",
        html: `<p>Multi-session Go server exposing the game three ways: a GraphQL API (gqlgen), an <strong>MCP server</strong> over Streamable HTTP so Claude and other agents can play with tools, and WebSocket updates for live watching. Front ends: a SvelteKit web UI with multi-watch, and a terminal client.</p>`,
      },
      {
        h: "Run locally",
        html: `<pre class="code">git clone https://github.com/wricardo/tesla-road-trip-game.git
cd tesla-road-trip-game
make build
./tesla-road-trip       # http://localhost:8000</pre>`,
      },
    ],
  },
  {
    slug: "factorio-cashflow",
    group: "games",
    title: "Cashflow (Factorio mod)",
    titleHtml: "<em>Cashflow</em> for Factorio",
    summary:
      "A Factorio 2.0 mod that turns personal finance into belts: iron plates are cash, copper plates are bills and debt.",
    lede:
      "A personal-finance game inside ordinary Factorio Freeplay. Iron plates are cash, copper plates are bills, and you run your money with belts.",
    tags: ["Lua", "Factorio 2.0", "Mod"],
    links: [
      { label: "GitHub repo", href: `${GH}/factorio-cashflow-mod`, primary: true },
      { label: "Releases", href: `${GH}/factorio-cashflow-mod/releases` },
    ],
    meta: [
      ["Type", "Factorio mod"],
      ["Language", "Lua"],
      ["Game", "Factorio 2.0"],
      ["Latest", "v1.0.1"],
    ],
    code: {
      title: "install (macOS)",
      body: `<span class="p">$</span> curl -fsSL https://raw.githubusercontent.com/wricardo/factorio-cashflow-mod/main/scripts/install-latest.sh | bash

<span class="c"># wiring</span>
Passive Income  CASH OUT      <span class="a">→</span> Cashflow CASH IN
Expense         COPPER OUT    <span class="a">→</span> Cashflow BILLS IN
Cashflow        SURPLUS OUT   <span class="a">→</span> Investment DEPOSIT IN
Cashflow        UNPAID OUT    <span class="a">→</span> Debt BORROW IN
Debt            INTEREST OUT  <span class="a">→</span> Cashflow BILLS IN`,
    },
    sections: [
      {
        h: "How it works",
        html: `<ul>
  <li>One <strong>iron plate</strong> is $10 cash; one <strong>copper plate</strong> is a $10 bill or $10 of debt.</li>
  <li>A <strong>Cashflow Station</strong> cancels one iron against one copper. What's left is surplus or unpaid bills.</li>
  <li>Unpaid bills go to a <strong>Debt Station</strong> that charges monthly interest; surplus goes to an <strong>Investment Account</strong> that pays monthly returns.</li>
  <li>A month is 60 seconds; every 12th month brings a yearly report.</li>
</ul>`,
      },
      {
        h: "Stations",
        html: `<p>Account (dashboard), Passive Income, Active Income (feed it 50 coal a month for a salary), Expense, Cashflow, Debt, Investment Account, Coal Supply and a Percent Splitter. Each Account is independent — run several — and nothing in vanilla Freeplay is restricted.</p>`,
      },
    ],
  },
  {
    slug: "gqlcli",
    group: "tools",
    title: "gqlcli",
    titleHtml: "<em>gqlcli</em>",
    summary:
      "A GraphQL client for the terminal and a Go library for building GraphQL-backed CLIs. Schema discovery, scripting and token-lean output for AI agents.",
    lede:
      "Discover, query and script any GraphQL API from the command line — with output formats sized for humans, jq, and LLMs.",
    tags: ["Go", "GraphQL", "CLI", "Library"],
    links: [
      { label: "GitHub repo", href: `${GH}/gqlcli`, primary: true },
      { label: "Releases", href: `${GH}/gqlcli/releases` },
    ],
    meta: [
      ["Type", "CLI + Go library"],
      ["Language", "Go"],
      ["Latest", "v0.10.0"],
      ["License", "MIT"],
    ],
    code: {
      title: "terminal",
      body: `<span class="p">$</span> curl -fsSL https://raw.githubusercontent.com/wricardo/gqlcli/main/install.sh | bash

<span class="p">$</span> gqlcli queries --filter user --desc
<span class="p">$</span> gqlcli describe User --args --depth 1
<span class="p">$</span> gqlcli query --query "{ users { id name } }" -f table
<span class="p">$</span> gqlcli query --env prod --query-file ./getUser.graphql --variables '{"id":"123"}'`,
    },
    sections: [
      {
        h: "Commands",
        html: `<ul>
  <li><code>queries</code>, <code>mutations</code>, <code>types</code>, <code>describe</code> — explore the schema instantly.</li>
  <li><code>query</code>, <code>mutation</code>, <code>subscribe</code> — execute, with built-in <code>--jq</code> filtering.</li>
  <li><code>batch</code> and <code>script</code> — run many operations, or JavaScript workflows with async/await and <code>gql.each()</code>.</li>
  <li><code>validate</code>, <code>sdl</code>, <code>op</code>, <code>embed</code> — offline validation, saved operations, semantic schema search.</li>
</ul>`,
      },
      {
        h: "Output",
        html: `<p>Default format is <strong>toon</strong>, a token-optimized format 40–60% smaller than JSON. Also <code>json</code>, <code>table</code>, <code>llm</code> (markdown) and <code>compact</code>.</p>`,
      },
      {
        h: "Config",
        html: `<p>Per-directory <code>.gqlcli.json</code> with named environments (<code>local</code>, <code>qa</code>, <code>prod</code>), bearer auth, custom headers, retries and an on-disk schema cache.</p>`,
      },
      {
        h: "As a library",
        html: `<p>Build Go CLIs where GraphQL is the interface instead of subcommands and flags — a good fit for AI agents that can introspect a schema and write their own queries.</p>`,
      },
    ],
  },
  {
    slug: "quickgql",
    group: "tools",
    title: "quickgql",
    titleHtml: "<em>quickgql</em>",
    summary:
      "Spin up GraphQL endpoints at runtime for testing and PoCs — schema as JSON, resolvers in JavaScript, no config files, no restart.",
    lede:
      "One binary, N GraphQL endpoints created at runtime. Define the schema as data, write resolvers in JavaScript, and it's live immediately.",
    tags: ["Go", "GraphQL", "goja", "mongolite"],
    links: [{ label: "GitHub repo", href: `${GH}/quickgql`, primary: true }],
    meta: [
      ["Type", "Dev server"],
      ["Language", "Go"],
      ["Resolvers", "JavaScript (goja)"],
      ["Storage", "mongolite"],
    ],
    code: {
      title: "layout",
      body: `<span class="p">$</span> quickgql serve --addr :8080 --data-dir ./data

/graphql             <span class="c"># admin API: manage endpoints</span>
/endpointa/graphql   <span class="c"># created at runtime</span>
/endpointb/graphql

<span class="c"># resolver for Query.users</span>
var docs = db.find('users', {});
docs.forEach(function(d){ d.id = d._id; });
return docs;`,
    },
    sections: [
      {
        h: "How it works",
        html: `<p>An admin GraphQL API at <code>/graphql</code> creates and patches endpoints: <code>createEndpoint</code>, <code>setType</code>, <code>setField</code>, <code>setResolver</code> and their removals. Each endpoint mounts at <code>/&lt;name&gt;/graphql</code> with GraphiQL on GET.</p>
<p>Mutations validate before persisting: a patch that would produce a broken schema is rejected and the running endpoints keep serving.</p>`,
      },
      {
        h: "Resolvers",
        html: `<p>Each resolver is a <code>Type.field</code> key plus a JS body with access to <code>args</code>, <code>parent</code>, <code>ctx</code> and <code>db</code> — a MongoDB-style API (<code>find</code>, <code>insertOne</code>, <code>updateOne</code>…) over the endpoint's own database. Fields without a resolver fall back to plain lookup, so only computed fields need code. Fresh sandbox per call, no Node dependency.</p>`,
      },
      {
        h: "Storage",
        html: `<p>Definitions and data persist in embedded <a href="https://github.com/wricardo/mongolite">mongolite</a> instances — single-file, MongoDB wire-protocol compatible — one per endpoint plus a meta database.</p>`,
      },
    ],
  },
  {
    slug: "totp-generator",
    group: "utils",
    title: "TOTP Generator",
    titleHtml: "TOTP <em>Generator</em>",
    summary:
      "Generate time-based one-time passwords from a secret key, entirely in the browser. Includes a hex to base-32 converter.",
    lede:
      "Generate time-based one-time passwords in the browser — useful when you lose access to the phone that holds your authenticator.",
    tags: ["Vue", "otpauth", "2FA"],
    links: [
      { label: "Open app", href: "/totp-generator/public/index.html", primary: true },
      { label: "Hex → base-32 converter", href: "/totp-generator/public/hex-to-base32.html" },
      { label: "Upstream source", href: "https://github.com/jaden/totp-generator" },
    ],
    meta: [
      ["Type", "Web utility"],
      ["Stack", "Vue 2, Bulma"],
      ["Library", "otpauth 3.1.3"],
      ["Runs", "Client-side only"],
    ],
    iframe: { src: "/totp-generator/public/index.html", height: 560 },
    sections: [
      {
        h: "About",
        html: `<p>Enter a base-32 secret, the number of digits and the token period. The token refreshes automatically, with a progress bar showing time until the next one. Nothing leaves the page.</p>
<p>The secret can also be passed in the URL hash: <code>/totp-generator/public/index.html#/KEY</code>.</p>`,
      },
      {
        h: "Authy tokens",
        html: `<p>Authy secrets are exported as hex. Convert them with the bundled hex → base-32 converter, then use these settings:</p>
<ul>
  <li><strong>Digits:</strong> 7</li>
  <li><strong>Period:</strong> 10 seconds (Authy shows 20 but skips every other token)</li>
</ul>`,
      },
      {
        h: "Credits",
        html: `<p>Fork of <a href="https://github.com/jaden/totp-generator">jaden/totp-generator</a> by Dan Hersam, built on <a href="https://github.com/hectorm/otpauth">otpauth</a>.</p>`,
      },
    ],
  },
  {
    slug: "color-puzzle",
    group: "utils",
    title: "Color Puzzle Generator",
    titleHtml: "Color Puzzle <em>Generator</em>",
    summary:
      "Randomizes a 2×6 grid so each column gets a unique pair from four colors — a quick generator for puzzle setups.",
    lede:
      "One click shuffles a 2×6 grid so every column holds a different pair of colors. Built to set up a physical puzzle game quickly.",
    tags: ["Vanilla JS", "Game"],
    links: [{ label: "Open app", href: "/puzzle-gen/index.html", primary: true }],
    meta: [
      ["Type", "Game helper"],
      ["Stack", "HTML, vanilla JS"],
      ["Size", "~75 lines"],
      ["Year", "2025"],
    ],
    iframe: { src: "/puzzle-gen/index.html", height: 440 },
    sections: [
      {
        h: "How it works",
        html: `<p>Four colors — green, orange, blue, purple — form exactly six unique pairs. Each randomize:</p>
<ul>
  <li>Picks the six pairs in random order, one per column, without repeats.</li>
  <li>Flips each pair with 50% probability, so either color can land on top.</li>
  <li>Paints the two cells of the column with the pair.</li>
</ul>
<p>Result: every combination appears exactly once per board, in a different layout each time.</p>`,
      },
    ],
  },
];

// Thumbnails shown on the index. Projects with a screenshot use it instead.
export const thumbs = {
  "factorio-cashflow": `<div class="thumb-belts">
  <div class="belt belt-iron"></div>
  <div class="belt belt-copper"></div>
  <div class="belt-label"><span>+$10 iron</span><span>−$10 copper</span></div>
</div>`,
  gqlcli: `<div class="thumb-term"><b>$</b> gqlcli queries
<i>users</i>    [User!]!
<i>user</i>     (id: ID!) User</div>`,
  quickgql: `<div class="thumb-paths">
  <div><span class="dot"></span>/graphql</div>
  <div><span class="dot live"></span>/endpointa/graphql</div>
  <div><span class="dot live"></span>/endpointb/graphql</div>
  <div class="ghost">+ createEndpoint</div>
</div>`,
  "totp-generator": `<div class="thumb-totp"><div class="code">482 913</div><div class="bar"><i></i></div></div>`,
  "color-puzzle": `<div class="mini-grid">
  <i class="c-green"></i><i class="c-blue"></i><i class="c-orange"></i><i class="c-purple"></i><i class="c-blue"></i><i class="c-orange"></i>
  <i class="c-orange"></i><i class="c-purple"></i><i class="c-blue"></i><i class="c-green"></i><i class="c-green"></i><i class="c-purple"></i>
</div>`,
};
