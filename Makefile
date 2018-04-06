STAGING_BUCKET := s3://staging.data.humancellatlas.org/

build:
	node_modules/.bin/webpackf

deploy-staging:
	aws s3 sync --acl public-read site/ $(STAGING_BUCKET) --profile hca

deploy-staging-travis:
	aws s3 sync --acl public-read site/ $(STAGING_BUCKET)
	aws cloudfront create-invalidation --distribution-id ${DIST_ID} --paths "/*"