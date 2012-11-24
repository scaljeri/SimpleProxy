SimpleProxy
===========

A NodeJS proxy server 

Requirements:

	* Node.js
	* MongoDB

Install:

	$> cd SimpleProxy
	$> npm install

Usage:

	USAGE: node server [options]
		--host					- remote hostname (default=localhost)"
		--port					- remote port (default=80)"
		--proxy					- true: proxy all request and cache (insert/update) the responses (default=false)
								  false: if possible serve the response from cache
		--ignore-params			- a list of GET/POST parameters to be ignored for the cache response lookup
		--map-url, --map-to-fs	- map urls to the filesystem. The url part not defined by map-url is appended to the file path
		--map-ignore-extensions	- a list of file extensions which should not be served from the file system (e.g. jsp and php)

Example:

	$> ./server --port 8080 --host localhost --ignore-params=_dc --proxy=true
	$> node server --port 8080 --host localhost --map-url /base/static/app/ --map-to-fs public/app

