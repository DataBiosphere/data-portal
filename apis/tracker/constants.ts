// Environment variable holding the path of this build's published-atlases
// snapshot. `scripts/build.sh` writes the snapshot once before `next build`, to
// a path unique to the build, and deletes it however the build ends; every
// build worker reads it, so all pages in a build agree on which atlases are
// published (see #3203).
export const PUBLISHED_ATLASES_SNAPSHOT_ENV = "PUBLISHED_ATLASES_SNAPSHOT";
