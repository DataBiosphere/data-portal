#!/usr/bin/env bash

gatsby clean

export GATSBY_EXPLORE_URL=https://data-browser.lungmap.net/explore/
export GATSBY_FILE_SUMMARY_API_URL=https://service.azul.data.humancellatlas.org/index/summary
export GATSBY_TERM_FACETS_API_URL=https://service.azul.data.humancellatlas.org/index/projects
export GATSBY_SYSTEM_HEALTH_CHECK_API_URL=https://service.azul.data.humancellatlas.org/health/progress
export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=WB1d2Aoi1q3GOmQMSGMsZA
export GATSBY_ENV_NAME=env-150
export GATSBY_ENV=LOCAL
export GATSBY_DEFAULT_CATALOG=lungmap
export GATSBY_ATLAS=lungmap
gatsby build


export BUCKET=s3://data-browser.lungmap.net/
export SRCDIR=public/
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile platform-hca-prod
aws cloudfront create-invalidation --distribution-id E22L661MUAMMTD --paths "/*" --profile platform-hca-prod
