var http = require('http')
	, gzip = require('zlib')
	, qs = require('querystring')
	, argv = require('optimist').argv ;

var host = argv.host||'localhost' ;
var port = argv.port||'80' ;

module.exports.send = function proxyRequest(req, callback) {
	// no 304 responses
	delete req.headers['if-modified-since']  ;
	delete req.headers['if-none-match']  ;

	// make sure compression is not used in the response
	req.headers["accept-encoding"] = "identity; q=0.5, *;q=0" ; 

	req.headers.host = host ;
	var options = { 
		host: 	 host, 
		port: 	 port, 
		path: 	 req.url, 
		method:  req.method, 
		headers: req.headers
	} ;

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

/* handle zipped responses (not implemented)
	var buffer = [] ;
	var gunzip = gzip.createGunzip();            
        response.pipe(gunzip);
        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            callback(response, Buffer.concat(buffer) ) ;

        }).on("error", function(e) {
            callback(e);
        })
*/
        response.on('data', function (chunk) {
        	chunks.push(chunk) ;
        });

        // wait till the whole response has been received
        response.on('end', function () {
                callback(response, Buffer.concat(chunks) ) ;
        });
} ;
