
test:
	@NODE_ENV=test mocha \
		--require should \
		--reporter spec \

.PHONY: test
