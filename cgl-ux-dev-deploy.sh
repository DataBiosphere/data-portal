#!/usr/bin/env bash

gatsby clean

export GATSBY_EXPLORE_URL=https://ux-dev.singlecell.gi.ucsc.edu/explore/
export GATSBY_FILE_SUMMARY_API_URL=https://service.dev.singlecell.gi.ucsc.edu/index/summary
export GATSBY_TERM_FACETS_API_URL=https://service.dev.singlecell.gi.ucsc.edu/index/projects
export GATSBY_SYSTEM_HEALTH_CHECK_API_URL=https://service.dev.singlecell.gi.ucsc.edu/health/progress
export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CzDpc0__fhyqfREDehPK8Q
export GATSBY_ENV_NAME=env-83
export GATSBY_ENV=LOCAL
export GATSBY_DEFAULT_CATALOG=dcp2
gatsby build


export BUCKET=s3://ux-dev.singlecell.gi.ucsc.edu/
export SRCDIR=public/
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile ucsc-cgl
aws cloudfront create-invalidation --distribution-id E3FFK49Z7TQ60R --paths "/*" --profile ucsc-cgl
