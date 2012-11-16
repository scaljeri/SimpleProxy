var http = require('http')
	, qs = require('querystring')
	, argv = require('optimist').argv ;

module.exports.send = function proxyRequest(req, callback) {
	console.log("PROXY REQUEST " + req.url) ;
	// no 304 responses
		delete req.headers['if-modified-since']  ;
		delete req.headers['if-none-match']  ;

	var options = { 
		host: 	 argv.host||'localhost', 
		port: 	 argv.port||8080, 
		path: 	 req.url, 
		method:  req.method, 
		headers: JSON.parse(JSON.stringify(req.headers).replace('8000','8080')) 
	} ;

	console.log("act as proxy for " + req.url) ;

 	var server = http.request(options, function(response){ handleResponse(response, callback); }) ;

	server.on('error', function(e) {
  		console.log('problem with request: ' + e.message + " (" + req.url + ")");
	});

	if ( req.method == 'POST' ) 
		server.write(qs.stringify(req.body));
	server.end() ;
}

/* PRIVATE METHODS */
function handleResponse(response, callback) {
	var chunks = [] ;
        response.on('data', function (chunk) {
        	chunks.push(chunk) ;
        });

        // wait till the whole response has been received
        response.on('end', function () {
        	console.log("RESPONSE CODE = " + response.statusCode) ;
		response.headers = JSON.parse(JSON.stringify(response.headers).replace(argv.port||'8080', '8000')) ;
                callback(response, Buffer.concat(chunks) ) ;
        });
} ;
