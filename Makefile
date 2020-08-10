test:
	rm -rf ./dist
	npm run build && npm run test

start: 
	rm -rf ./dist
	npm run build && npm run start
