#!/usr/bin/env bash

rm -rf ./.cache
export GATSBY_EXPLORE_URL="https://dev.data.humancellatlas.org/explore/"
export GATSBY_FILE_SUMMARY_API_URL="https://service.dev.explore.data.humancellatlas.org/repository/summary"
export GATSBY_TERM_FACETS_API_URL="https://service.dev.explore.data.humancellatlas.org/repository/projects"
export GATSBY_DEV_ENV="LOCAL"

