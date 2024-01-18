publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js	

install:
	npm install

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .
