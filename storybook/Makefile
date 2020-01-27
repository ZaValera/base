YARN = ../yarn/bin/yarn
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

start:
	make install
	npm run storybook

update:
	rm -rf $(PACKAGES)
	$(YARN) cache clean
	$(YARN) install
