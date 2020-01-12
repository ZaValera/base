YARN = ./yarn/bin/yarn
PACKAGES = packages-cache node_modules

install:
	$(YARN) install --offline

build:
	make install
	npm run build

dev:
	make install
	npm run dev

watch:
	make install
	npm run watch

update:
	rm -rf $(PACKAGES)
	$(YARN) cache clean
	$(YARN) install
