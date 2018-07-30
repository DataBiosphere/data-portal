#!/usr/bin/env bash
if [ "$TRAVIS_BRANCH" = "develop" ]; then
    GATSBY_EXPLORE_URL=https://explore.dev.data.humancellatlas.org/
elif [ "$TRAVIS_BRANCH" = "integration" ]; then
    GATSBY_EXPLORE_URL=https://explore.integration.data.humancellatlas.org/
elif [ "$TRAVIS_BRANCH" = "staging" ]; then
    GATSBY_EXPLORE_URL=https://explore.staging.data.humancellatlas.org/
else
    GATSBY_EXPLORE_URL=https://explore.data.humancellatlas.org/
fi

export GATSBY_EXPLORE_URL
echo $GATSBY_EXPLORE_URL
gatsby build