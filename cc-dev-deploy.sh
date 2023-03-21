#!/usr/bin/env bash

gatsby clean

export GATSBY_EXPLORE_URL=https://hca-data-portal.dev.clevercanary.com/explore/
export GATSBY_PORTAL_URL=https://hca-data-portal.dev.clevercanary.com/
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


export BUCKET=s3://hca-data-portal.dev.clevercanary.com/
export SRCDIR=public/
aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E2TY6LP6E2DGZ3 --paths "/*" --profile excira
