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
	cp -R build/* $(DESTDIR)$(STATIC)/$(PROJECT)/
	## Create nginx sample config files
	mkdir -p $(DESTDIR)$(STATIC)/doc/$(PROJECT)/
	cp debian/nginx-clearer $(DESTDIR)$(STATIC)/doc/$(PROJECT)/

clean:
	rm -rf dist/ node_modules/
