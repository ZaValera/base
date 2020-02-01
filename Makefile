.PHONY: front back storybook

YARN = ./yarn/bin/yarn
PACKAGES = packages-cache node_modules webpack_cache

install:
	$(YARN) install --offline

add:
	$(YARN) add $(filter-out $@,$(MAKECMDGOALS))

add-dev:
	$(YARN) add $(filter-out $@,$(MAKECMDGOALS)) --dev

remove:
	$(YARN) remove $(filter-out $@,$(MAKECMDGOALS))

upgrade:
	$(YARN) upgrade $(filter-out $@,$(MAKECMDGOALS))

build:
	make install
	npm run build

dev:
	make install
	npm run dev

front:
	make install
	npm run front

back:
	make install
	npm run back

watch:
	make install
	npm run watch

clean:
	rm -rf webpack_cache front/build back/build

update:
	rm -rf $(PACKAGES)
	$(YARN) cache clean
	$(YARN) install

server:
	npm run server

hotServer:
	npm run hotServer

storybook:
	npm run storybook
