import { fetchPublishedAtlases } from "@/apis/tracker/api";
import { PUBLISHED_ATLASES_SNAPSHOT_PATH } from "@/apis/tracker/constants";
import nextEnv from "@next/env";
import fsp from "fs/promises";
import path from "path";

snapshotPublishedAtlases().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

/**
 * Fetches the tracker's published atlases once and writes them to the
 * snapshot every `next build` worker reads, so all pages in a build agree on
 * which atlases are published (see #3203). Any previous snapshot is removed
 * first, so a failed fetch cannot leave a stale one behind.
 */
async function snapshotPublishedAtlases(): Promise<void> {
  // Load the same env files, in the same order, as `next build`.
  nextEnv.loadEnvConfig(process.cwd());
  await fsp.rm(PUBLISHED_ATLASES_SNAPSHOT_PATH, { force: true });
  const atlases = await fetchPublishedAtlases();
  await fsp.mkdir(path.dirname(PUBLISHED_ATLASES_SNAPSHOT_PATH), {
    recursive: true,
  });
  await fsp.writeFile(
    PUBLISHED_ATLASES_SNAPSHOT_PATH,
    JSON.stringify(atlases, undefined, 2)
  );
  console.log(
    `Wrote ${atlases.length} published atlases to ${PUBLISHED_ATLASES_SNAPSHOT_PATH}`
  );
}
