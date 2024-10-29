#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 20.10.0
npm ci

mkdir -p build

# Build AnVIL
rm -rf ./out
npm run build-dev:data-portal
mv out/* build

export BUCKET=s3://wb8-data.humancellatlas.dev.next/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E2SLGSHX4H0LO7 --paths "/*" --profile excira
