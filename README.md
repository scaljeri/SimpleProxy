SimpleProxy
===========

A NodeJS proxy server 

Install:

	$> cd SimpleProxy
	$> npm install

Usage:

	USAGE: node server [options]
		--host					- remote hostname (localhost)\n" ;
		-port					- remote port (80)\n" ;
		--proxy					- true: proxy all request and cache (insert/update) the responses (false)\n" ;
								  false: if possible serve the response from cache\n" ;
		--ignore-params			- a list of GET/POST parameter to be ignored for the cache response lookup\n" ;
		--map-url, --map-to-fs	- map urls to the filesystem\n" ;
		--map-ignore-extensions	- a list of file extensions which should not be served from the file system (e.g. jsp and php)\n" ;

Example:

	$> ./server --port 8080 --host localhost --ignore-params=_dc --proxy=true

