#!/usr/bin/env bash

gatsby clean

export GATSBY_EXPLORE_URL=https://dcp2.data.humancellatlas.org/explore/
export GATSBY_FILE_SUMMARY_API_URL=https://service.azul.data.humancellatlas.org/index/summary
export GATSBY_PORTAL_URL=https://dcp2.data.humancellatlas.org/
export GATSBY_TERM_FACETS_API_URL=https://service.azul.data.humancellatlas.org/index/projects
export GATSBY_SYSTEM_HEALTH_CHECK_API_URL=https://service.azul.data.humancellatlas.org/health/progress
export GATSBY_GTM_ID=GTM-M2J5NTJ
export GATSBY_GTM_AUTH=CzDpc0__fhyqfREDehPK8Q
export GATSBY_ENV_NAME=env-83
export GATSBY_ENV=LOCAL
export GATSBY_DEFAULT_CATALOG=dcp6
export GATSBY_ATLAS=hca
gatsby build


export BUCKET=s3://org-humancellatlas-data-portal-dcp2-prod/
export SRCDIR=public/
aws s3 sync --acl public-read $SRCDIR $BUCKET --delete --profile platform-hca-prod
aws cloudfront create-invalidation --distribution-id E1LYQC3LZXO7M3 --paths "/*" --profile platform-hca-prod
