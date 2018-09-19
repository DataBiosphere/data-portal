#!/usr/bin/env bash
if [ "$TRAVIS_BRANCH" = "develop" ]; then
    GATSBY_EXPLORE_URL=https://dev.explore.data.humancellatlas.org/
elif [ "$TRAVIS_BRANCH" = "integration" ]; then
    GATSBY_EXPLORE_URL=https://integration.explore.data.humancellatlas.org/
elif [ "$TRAVIS_BRANCH" = "staging" ]; then
    GATSBY_EXPLORE_URL=https://staging.explore.data.humancellatlas.org/
else
    GATSBY_EXPLORE_URL=https://explore.data.humancellatlas.org/
fi

export GATSBY_EXPLORE_URL
echo $GATSBY_EXPLORE_URL

git clone https://github.com/HumanCellAtlas/metadata-schema.git _metadata-schema
#cd _metadata-schema
#git checkout staging
#cd ..


gatsby build