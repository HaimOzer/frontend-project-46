publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js	

install:
	npm ci

test:
	npm test

lint:
	npx eslint .
