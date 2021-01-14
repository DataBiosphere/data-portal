#!/usr/bin/env bash

echo \"Deleting ./.cache/\" 
rm -rf ./.cache
echo \"Deleting ./public/\"
rm -rf ./public
export GATSBY_EXPLORE_URL="https://dev.singlecell.gi.ucsc.edu/explore/"
export GATSBY_FILE_SUMMARY_API_URL="https://service.dev.singlecell.gi.ucsc.edu/index/summary"
export GATSBY_TERM_FACETS_API_URL="https://service.dev.singlecell.gi.ucsc.edu/index/projects"
export GATSBY_SYSTEM_HEALTH_CHECK_API_URL="https://service.dev.singlecell.gi.ucsc.edu/health/progress"
export GATSBY_SYSTEM_STATUS_URL="https://status.dev.data.humancellatlas.org/"
export GATSBY_CONTENT_VERSION=2
export GATSBY_DEFAULT_CATALOG="dcp2"
export GATSBY_ENV="LOCAL"
