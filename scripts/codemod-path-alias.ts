// One-off codemod for #3210: rewrites imports that reach outside a file's own
// subtree to the `@/` root alias. Relative `./` imports are left alone.
//
//   ../../@types/network   ->  @/types/network   (@types renamed to types)
//   constants/routes       ->  @/constants/routes   (bare baseUrl form)
//
// Usage (from the repo root): npm run codemod:path-alias [-- --dry-run]

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

// Run from the repo root (as the npm script does); esrun bundles the script,
// so import.meta.url cannot be used to locate it.
const ROOT = process.cwd();
const DRY_RUN = process.argv.includes("--dry-run");
const EXTENSIONS = new Set([".ts", ".tsx"]);
const SKIP_DIRS = new Set([
  ".git",
  ".next",
  "analytics",
  "node_modules",
  "out",
]);

// Directories renamed in the same change; the alias points at the new name.
const RENAMED_DIRS = new Map([["@types", "types"]]);

// Top-level directories that the pre-alias `baseUrl: "."` allowed as bare
// specifiers. Only these are rewritten; anything else bare is a package.
const TOP_LEVEL_DIRS = new Set(
  readdirSync(ROOT).filter(
    (name) =>
      !SKIP_DIRS.has(name) && statSync(path.join(ROOT, name)).isDirectory()
  )
);

// Matches the module specifier of static imports/re-exports and dynamic
// imports. Group 1 is the opening delimiter, group 2 the specifier.
const SPECIFIER_RE =
  /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])([^"']+)\2/g;

/**
 * Walks a directory tree collecting ts/tsx files.
 * @param dir - Directory to walk.
 * @param out - Accumulator.
 * @returns collected file paths.
 */
function collect(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) collect(full, out);
    else if (EXTENSIONS.has(path.extname(entry))) out.push(full);
  }
  return out;
}

/**
 * Returns the aliased specifier for one that reaches outside the file's
 * subtree, or null when it should be left unchanged.
 * @param file - Absolute path of the importing file.
 * @param spec - Original module specifier.
 * @returns rewritten specifier or null.
 */
function rewrite(file: string, spec: string): string | null {
  if (spec.startsWith("../")) {
    const abs = path.resolve(path.dirname(file), spec);
    const segments = path.relative(ROOT, abs).split(path.sep);
    segments[0] = RENAMED_DIRS.get(segments[0]) ?? segments[0];
    return "@/" + segments.join("/");
  }
  if (spec.startsWith("./") || spec.startsWith("@/")) return null;
  const [head, ...rest] = spec.split("/");
  const dir = RENAMED_DIRS.get(head) ?? head;
  if (TOP_LEVEL_DIRS.has(dir) && rest.length > 0) {
    return "@/" + [dir, ...rest].join("/");
  }
  return null;
}

let changedFiles = 0;
let changedSpecs = 0;
for (const file of collect(ROOT)) {
  const src = readFileSync(file, "utf8");
  let count = 0;
  const next = src.replace(
    SPECIFIER_RE,
    (m: string, lead: string, q: string, spec: string): string => {
      const to = rewrite(file, spec);
      if (!to) return m;
      count++;
      return `${lead}${q}${to}${q}`;
    }
  );
  if (count === 0) continue;
  changedFiles++;
  changedSpecs += count;
  if (DRY_RUN) console.log(`${path.relative(ROOT, file)}: ${count}`);
  else writeFileSync(file, next);
}
console.log(
  `${DRY_RUN ? "[dry-run] " : ""}${changedSpecs} specifiers in ${changedFiles} files`
);
