#!/bin/bash
set -eo pipefail

# Bundle the script with esbuild so Node can load findable-ui's extensionless
# imports, then run it to write public/downloads/hca-tier-1-metadata.xlsx.
npx --no-install esbuild ./scripts/build-tier-1-metadata-xlsx.ts --bundle --platform=node --external:exceljs --log-level=warning | node
