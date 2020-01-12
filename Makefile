YARN = ./yarn/bin/yarn
PACKAGES = packages-cache node_modules

install:
	$(YARN) install --offline

add:
	$(YARN) add $(PACKAGE)

remove:
	$(YARN) remove $(PACKAGE)

upgrade:
	$(YARN) upgrade $(PACKAGE)

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
