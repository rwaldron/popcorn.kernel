
NODE_ENGINE ?= `which node nodejs`
NPM_ENGINE ?= `which npm`


if test ! -z ${JS_ENGINE}; then \
	if test ! -z ${NPM_ENGINE}; then \
		sudo npm install jake -g && sudo npm install
	else \
		echo "You must have NPM installed in order to build SPXW"; \
	fi
else \
	echo "You must have NodeJS installed in order to build SPXW"; \
fi