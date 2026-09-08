import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));
const expected = {
  name: "rappi",
  version: "0.2.2",
  url: "https://github.com/PedroAVJ/rappi",
};

async function json(...parts) {
  return JSON.parse(await readFile(join(root, ...parts), "utf8"));
}

test("standalone plugin metadata is synchronized", async () => {
  const codex = await json(".codex-plugin", "plugin.json");
  const claude = await json(".claude-plugin", "plugin.json");
  const pkg = await json("package.json");

  assert.equal(codex.name, expected.name);
  assert.equal(codex.version, expected.version);
  assert.equal(codex.homepage, expected.url);
  assert.equal(codex.repository, expected.url);
  assert.equal(codex.interface.category, "Shopping");
  assert.equal(codex.interface.brandColor, "#FF441F");
  assert.equal(codex.interface.composerIcon, "./assets/rappi-icon.svg");
  assert.equal(codex.interface.logo, "./assets/rappi-icon.svg");
  assert.equal(claude.name, codex.name);
  assert.equal(claude.version, codex.version);
  assert.equal(claude.homepage, expected.url);
  assert.equal(claude.repository, expected.url);
  assert.equal(pkg.version, expected.version);
  assert.equal(pkg.homepage, expected.url + "#readme");
  assert.equal(pkg.repository.url, "git+" + expected.url + ".git");

  await access(join(root, "README.md"));
  await access(join(root, "AGENTS.md"));
  await access(join(root, "ICON-SOURCES.md"));
  const icon = await readFile(join(root, "assets", "rappi-icon.svg"));
  assert.match(icon.toString("utf8"), /<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
});

test("Rappi cart workflow stays reversible and uses only the customer website", async () => {
  const readme = await readFile(join(root, "README.md"), "utf8");
  const skill = await readFile(join(root, "skills", "order-with-rappi", "SKILL.md"), "utf8");

  assert.match(readme, /signed-in Rappi customer session in Google\s+Chrome/i);
  assert.match(skill, /not an official Rappi API integration/i);
  assert.match(skill, /Do not call private\s+or undocumented Rappi endpoints/i);
  assert.match(skill, /Never silently\s+substitute a medication/i);
  assert.match(skill, /Application Support\/PedroAVJ\/Rappi\/preferences\.md/i);
  assert.match(skill, /native schedule starts a fresh task/i);
  assert.match(skill, /recent order status before searching/i);
  assert.match(skill, /do not add another quantity/i);
  assert.match(skill, /obtain the user's action-time\s+confirmation before searching/i);
  assert.match(skill, /Creating the native schedule is not that confirmation/i);
  assert.match(skill, /ask for approval in the\s+same scheduled task/i);
  assert.match(skill, /Never choose a scheduled slot, subscription, or\s+recurring commitment/i);
  assert.match(skill, /terminal unattended action/i);
  assert.match(skill, /Do not\s+start checkout or place an order without a later direct instruction in the same/i);
  assert.match(skill, /action-time confirmation/i);
});
