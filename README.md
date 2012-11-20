SimpleProxy
===========

A NodeJS proxy server

Usage:

	$> ./server --port 8080 --host localhost --ignore-params=_dc --proxy=true
		--host				- host to be proxied
		--port				- remote port
		--ignore-params		- a comma seperated list of parameters (GET/POST) which should be ignored (like: timestamp parameters to preven browser caching)
					 	 NOTE: currently only one parameter is supported
		--proxy				- if true means that it should not serve content from cache, but send a request to the other host and save the response (again)
