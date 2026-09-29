// Snapshot of the tracker's published atlases, written once by
// `scripts/snapshot-published-atlases.ts` before `next build` and read by every
// build worker, so all pages in a build agree on which atlases are published.
// `postbuild` deletes it, so a later bare `next build` fails instead of reading
// a stale one.
export const PUBLISHED_ATLASES_SNAPSHOT_PATH =
  "./.tracker/published-atlases.json";
