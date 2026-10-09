import { fetchPublishedAtlases } from "@/apis/tracker/api";
import { PUBLISHED_ATLASES_SNAPSHOT_ENV } from "@/apis/tracker/constants";
import fsp from "fs/promises";
import { createRequire } from "module";
import path from "path";

snapshotPublishedAtlases().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Fetches the tracker's published atlases once and writes them to the
 * snapshot every `next build` worker reads, so all pages in a build agree on
 * which atlases are published (see #3203). Run by `scripts/build.sh`, which
 * sets the snapshot path.
 */
async function snapshotPublishedAtlases(): Promise<void> {
  const snapshotPath = process.env[PUBLISHED_ATLASES_SNAPSHOT_ENV];
  if (!snapshotPath) {
    throw new Error(
      `${PUBLISHED_ATLASES_SNAPSHOT_ENV} is not set; run \`npm run build\`, which sets it`
    );
  }
  // Load `@next/env` through `next`, so env files are read by the exact copy
  // `next build` uses, in the same order, rather than a separately pinned one.
  const requireFromRoot = createRequire(path.resolve("package.json"));
  const requireFromNext = createRequire(
    requireFromRoot.resolve("next/package.json")
  );
  const { loadEnvConfig } = requireFromNext("@next/env") as {
    loadEnvConfig: (dir: string) => unknown;
  };
  loadEnvConfig(process.cwd());
  const atlases = await fetchPublishedAtlases();
  await fsp.writeFile(snapshotPath, JSON.stringify(atlases, undefined, 2));
  console.log(`Wrote ${atlases.length} published atlases to ${snapshotPath}`);
}
