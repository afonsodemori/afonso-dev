help:

clean:
	rm -rf .nuxt/ .output/ .wrangler/ dist/ node_modules/ i18n/locales/generated/*
	npm ci
	. bin/prebuild.sh

build:
	npx nuxt build

dev: build
	npx nuxt dev

import-resume:
	bash bin/resume-html.sh

generate: import-resume
	npx nuxt generate

preview: generate
	npx wrangler dev

deploy-preview: clean generate
	npx wrangler versions upload --env=preview --preview-alias=preview
	rm -rf dist/

deploy-production: clean generate
	npx wrangler deploy --env=production
	rm -rf dist/
