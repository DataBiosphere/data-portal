#!/usr/bin/env bash

echo \"Deleting ./.cache/\" 
rm -rf ./.cache
echo \"Deleting ./public/\"
rm -rf ./public
export GATSBY_DATA_BROWSER_URL="https://dev.data.humancellatlas.org/explore/projects?filter=%5B%7B"facetName":"genusSpecies","terms":%5B"Homo%20sapiens"%5D%7D%5D"
export GATSBY_EXPLORE_URL="https://dev.data.humancellatlas.org/explore/"
export GATSBY_FILE_SUMMARY_API_URL="https://service.dev.explore.data.humancellatlas.org/repository/summary"
export GATSBY_TERM_FACETS_API_URL="https://service.dev.explore.data.humancellatlas.org/repository/projects"
export GATSBY_SYSTEM_HEALTH_CHECK_API_URL="https://status.dev.data.humancellatlas.org/service/dcp-health-check-dev"
export GATSBY_SYSTEM_STATUS_URL=https://status.dev.data.humancellatlas.org/
export GATSBY_CONTENT_VERSION=1
export GATSBY_ENV="LOCAL"
