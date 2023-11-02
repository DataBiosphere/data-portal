#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out

echo \"Deleting ./build/\"
rm -rf ./build

n 16.15.1
npm ci

mkdir -p build

# Build AnVIL
rm -rf ./out
npm run build-prod:data-portal
mv out/* build

export BUCKET=s3://s6g-data.humancellatlas.org.next/
export SRCDIR=build/

aws s3 sync  $SRCDIR $BUCKET --delete --profile platform-hca-portal
aws cloudfront create-invalidation --distribution-id E1Z9WM5A7ARDA2 --paths "/*" --profile platform-hca-portal