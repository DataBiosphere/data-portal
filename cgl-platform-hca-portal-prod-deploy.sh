#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

rm -rf ./_metadata-schema
rm -rf ./humancellatlas.github.io

git clone https://github.com/HumanCellAtlas/metadata-schema.git _metadata-schema
git clone https://github.com/HumanCellAtlas/humancellatlas.github.io

n 14.16.0
npm ci

gatsby clean

export GATSBY_EXPLORE_URL=https://explore.data.humancellatlas.org/
export GATSBY_FILE_SUMMARY_API_URL=https://service.azul.data.humancellatlas.org/index/summary
export GATSBY_PORTAL_URL=https://data.humancellatlas.org/
export GATSBY_TERM_FACETS_API_URL=https://service.azul.data.humancellatlas.org/index/projects
export GATSBY_SYSTEM_HEALTH_CHECK_API_URL=https://service.azul.data.humancellatlas.org/health/progress
export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=xm3qglWPEFim7Lb4AxXnsA
export GATSBY_ENV_NAME=env-2
export GATSBY_ENV=PROD
export GATSBY_DEFAULT_CATALOG=dcp32
export GATSBY_ATLAS=hca
gatsby build


export BUCKET=s3://s6g-data.humancellatlas.org.portal/
export SRCDIR=public/
aws s3 sync $SRCDIR $BUCKET --delete --profile platform-hca-portal
aws cloudfront create-invalidation --distribution-id E1Z9WM5A7ARDA2 --paths "/*" --profile platform-hca-portal
