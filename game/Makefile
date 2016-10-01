GULP = node_modules/.bin/coffeegulp

gulp:
	$(GULP) $(COMMAND)

deploy: build
	aws s3 cp build/ s3://www.playcatandmouse.com --recursive

build:
	$(GULP) build

.PHONY: gulp build deploy
