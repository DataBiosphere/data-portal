#!/bin/bash
set -e

# Snapshot the tracker's published atlases once, to a path unique to this
# build, so every `next build` worker agrees on which atlases are published
# (see #3203). The trap deletes the snapshot however the build ends.
TMP_DIR="${TMPDIR:-/tmp}"
PUBLISHED_ATLASES_SNAPSHOT=$(mktemp "${TMP_DIR%/}/published-atlases.XXXXXX")
export PUBLISHED_ATLASES_SNAPSHOT
trap 'rm -f "$PUBLISHED_ATLASES_SNAPSHOT"' EXIT

npx --no-install esrun ./scripts/snapshot-published-atlases.ts
npx --no-install next build --webpack "$@"
