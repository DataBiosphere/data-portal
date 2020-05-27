#!/usr/bin/env bash

gatsby clean

export GATSBY_EXPLORE_URL=https://dev.singlecell.gi.ucsc.edu/explore/
export GATSBY_FILE_SUMMARY_API_URL=https://service.dev.singlecell.gi.ucsc.edu/index/summary
export GATSBY_TERM_FACETS_API_URL=https://service.dev.singlecell.gi.ucsc.edu/index/projects
export GATSBY_SYSTEM_HEALTH_CHECK_API_URL=https://status.data.humancellatlas.org/service/dcp-health-check-prod
export GATSBY_SYSTEM_STATUS_URL=https://status.data.humancellatlas.org/
export GATSBY_GTM_ID=GTM-xxxxx
export GATSBY_GTM_AUTH=xx
export GATSBY_ENV_NAME=env-xx
export GATSBY_ENV=LOCAL
export GATSBY_CONTENT_VERSION=2
gatsby build


export BUCKET=s3://dev.singlecell.gi.ucsc.edu/
export SRCDIR=public/
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile ucsc-cgl
aws cloudfront create-invalidation --distribution-id E3562WJBOLN8W8 --paths "/*" --profile ucsc-cgl