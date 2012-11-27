var http = require('http')
        , url = require('url')
        , fs  = require('fs')
        , connect = require('connect')
        , argv = require('optimist').argv ;


var app = connect() ;

app.use(connect.logger(':date - :method :url :status :response-time ms'))
   .use( function(req, res, next) {
	if ( req.method == 'GET' && !/\/(admin|config)/.test(req.url) ) {
		res.writeHead(302, {
  			'Location': '/admin' + req.url
		});
		res.end();
	}
	else
		next() ;
   })
   .use( '/admin', connect.static('./admin/'))
   .use( connect.bodyParser() )
   .use(connect.query())
   .use(function(req, res, next) {
	console.log("CONFIGGG") ;
	if ( req.method == 'POST' ) {

	}
	else {
		if ( req.url == '/' )
			req.url = '/index.html' ;
		fs.readFile( 'config/' + req.url, 'utf8', function(err, data) {
                	res.writeHead(200, { 'content-type': 'text/html' });
                	res.end(data, 'utf8');
		}) ;
	}
   }) ;

http.createServer(app).listen(8001) ;

module.exports.loadConfig = function() {

} ; 
