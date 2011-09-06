run:
	node server.js
test:
	vows test/* --spec
deps:
	npm install mongodb --mongodb:native && npm install vows