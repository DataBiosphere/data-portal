// One-off codemod for #3210: rewrites imports that reach outside a file's own
// subtree to the `@/` root alias. Relative `./` imports are left alone.
//
//   ../../@types/network   ->  @/types/network   (@types renamed to types)
//   constants/routes       ->  @/constants/routes   (bare baseUrl form)
//
// Usage (from the repo root): npm run codemod:path-alias [-- --dry-run]

import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
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
// Applied to resolved relative paths only, never to bare specifiers, so a
// scoped npm package such as `@types/node` is left alone.
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
// imports. Group 1 is the opening delimiter, group 2 the quote, group 3 the
// specifier.
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
 * Returns true when a top-level directory can be imported bare, i.e. it has
 * an index file that `baseUrl: "."` resolves.
 * @param dir - Top-level directory name.
 * @returns true if the directory has an index file.
 */
function hasIndexFile(dir: string): boolean {
  return ["index.ts", "index.tsx"].some((f) =>
    existsSync(path.join(ROOT, dir, f))
  );
}

/**
 * Returns the aliased specifier for one that reaches outside the file's
 * subtree, or null when it should be left unchanged.
 * @param file - Absolute path of the importing file.
 * @param spec - Original module specifier.
 * @returns rewritten specifier or null.
 */
function rewrite(file: string, spec: string): string | null {
  if (spec.startsWith("@/")) return null;
  if (spec.startsWith("./") || spec.startsWith("../")) {
    // Normalise so `./../x` is treated the same as `../x`.
    const fromDir = path.dirname(file);
    const abs = path.resolve(fromDir, spec);
    const rel = path.relative(fromDir, abs);
    if (!rel.startsWith("..")) return null; // same dir or descendant
    const segments = path.relative(ROOT, abs).split(path.sep);
    segments[0] = RENAMED_DIRS.get(segments[0]) ?? segments[0];
    return "@/" + segments.join("/");
  }
  // Bare baseUrl form, e.g. `constants/routes`. Scoped packages (`@scope/x`)
  // are never rewritten: `@types/node` is an npm package, not our directory.
  if (spec.startsWith("@")) return null;
  const [head, ...rest] = spec.split("/");
  if (!TOP_LEVEL_DIRS.has(head)) return null;
  if (rest.length > 0 || hasIndexFile(head)) return "@/" + spec;
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
