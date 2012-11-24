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
		--host					- remote hostname (localhost)" 
		--port					- remote port (80)" 
		--proxy					- true: proxy all request and cache (insert/update) the responses (false)" 
								  false: if possible serve the response from cache" 
		--ignore-params			- a list of GET/POST parameter to be ignored for the cache response lookup" 
		--map-url, --map-to-fs	- map urls to the filesystem" 
		--map-ignore-extensions	- a list of file extensions which should not be served from the file system (e.g. jsp and php)" 

Example:

	$> ./server --port 8080 --host localhost --ignore-params=_dc --proxy=true

