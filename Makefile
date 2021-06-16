STATIC=/usr/share
VAR=/var
PROJECT=freeports-trading-platform

all: build

node_modules: build

build:
	npx yarn install
	npx yarn run build:clearer
	npx yarn run build:organization

install: node_modules
	## Replaced by .install files

clean:
	rm -rf dist/ node_modules/
