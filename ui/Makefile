build:
	npm run gulp -- build

deploy: build
	aws s3 cp --acl public-read build/ s3://www.playcatandmouse.com --recursive


.PHONY: build deploy
