STATIC=/usr/share
VAR=/var
PROJECT=freeports-trading-platform/clearer

all: build

node_modules: build

build:
	npx yarn install
	npx yarn run build

install: node_modules
	## Copy static files
	mkdir -p $(DESTDIR)$(STATIC)/$(PROJECT)/
	cp -R dist/* $(DESTDIR)$(STATIC)/$(PROJECT)/

clean:
	rm -rf dist/ node_modules/
