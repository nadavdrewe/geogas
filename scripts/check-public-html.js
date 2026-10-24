const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..", ".next-build", "server", "app");
let pages = 0;
let anchors = 0;
let faqPages = 0;

function inspect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { inspect(file); continue; }
    if (!entry.name.endsWith(".html")) continue;
    const html = fs.readFileSync(file, "utf8");
    pages++;
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    for (const nav of html.matchAll(/<nav\b[^>]*class="section-links"[^>]*>([\s\S]*?)<\/nav>/g)) {
      for (const link of nav[1].matchAll(/href="#([^"]+)"/g)) {
        assert.equal(ids.filter((id) => id === link[1]).length, 1, `${file}: invalid contents link #${link[1]}`);
        anchors++;
      }
    }
    if (ids.includes("page-faq")) {
      assert.match(html, /<details[\s>]/, `${file}: missing FAQ disclosures`);
      assert.match(html, /Expand all/, `${file}: missing disclosure controls`);
      faqPages++;
    }
  }
}

inspect(root);
assert.ok(pages > 0 && anchors > 0 && faqPages > 0, "Expected generated public pages and navigation");
console.log(`Public HTML checks passed: ${pages} pages, ${anchors} contents anchors, ${faqPages} FAQ pages.`);
