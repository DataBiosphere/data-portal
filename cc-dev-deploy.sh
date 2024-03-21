#!/usr/bin/env bash

rm -rf ./_metadata-schema
rm -rf ./humancellatlas.github.io

git clone https://github.com/HumanCellAtlas/metadata-schema.git _metadata-schema
git clone https://github.com/HumanCellAtlas/humancellatlas.github.io

n 14.16.0
npm ci

gatsby clean

export GATSBY_EXPLORE_URL=https://explore.data.humancellatlas.dev.clevercanary.com/
export GATSBY_PORTAL_URL=https://data.humancellatlas.dev.clevercanary.com/
export GATSBY_FILE_SUMMARY_API_URL=https://service.dev.singlecell.gi.ucsc.edu/index/summary
export GATSBY_TERM_FACETS_API_URL=https://service.dev.singlecell.gi.ucsc.edu/index/projects
export GATSBY_SYSTEM_HEALTH_CHECK_API_URL=https://service.dev.singlecell.gi.ucsc.edu/health/progress
export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CzDpc0__fhyqfREDehPK8Q
export GATSBY_ENV_NAME=env-83
export GATSBY_ENV=LOCAL
export GATSBY_DEFAULT_CATALOG=dcp2
export GATSBY_ATLAS=hca
gatsby build


export BUCKET=s3://wb8-portal/
export SRCDIR=public/
aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E2SLGSHX4H0LO7 --paths "/*" --profile excira
