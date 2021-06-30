#!/usr/bin/env bash

gatsby clean

export GATSBY_EXPLORE_URL=https://data-browser.dev.lungmap.net/explore/
export GATSBY_FILE_SUMMARY_API_URL=https://service.dev.singlecell.gi.ucsc.edu/index/summary
export GATSBY_TERM_FACETS_API_URL=https://service.dev.singlecell.gi.ucsc.edu/index/projects
export GATSBY_SYSTEM_HEALTH_CHECK_API_URL=https://service.dev.singlecell.gi.ucsc.edu/health/progress
export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=XOKAlpBSltsrm1PKGR-fow
export GATSBY_ENV_NAME=env-149
export GATSBY_ENV=LOCAL
export GATSBY_DEFAULT_CATALOG=lungmap
export GATSBY_ATLAS=lungmap
gatsby build


export BUCKET=s3://data-browser.dev.lungmap.net/
export SRCDIR=public/
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile ucsc-cgl
aws cloudfront create-invalidation --distribution-id E21CJFOUWO9Q7X --paths "/*" --profile ucsc-cgl
