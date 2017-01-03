build:
	npm run gulp -- build

deploy: build
	aws s3 cp build/ s3://www.playcatandmouse.com --recursive


.PHONY: build deploy
