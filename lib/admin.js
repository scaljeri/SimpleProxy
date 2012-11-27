var http = require('http')
        , url = require('url')
        , fs  = require('fs')
        , connect = require('connect')
	, config = require('./admin/config')
	, db = require('./admin/mongoDB')
        , argv = require('optimist').argv ;


var app = connect() ;

app.use(connect.logger(':date - :method :url :status :response-time ms'))
   .use( function(req, res, next) { // redirect request if 'admin' is missing
	if ( req.method == 'GET' && !/\/admin/.test(req.url) ) {
		res.writeHead(302, {
  			'Location': '/admin' + req.url
		});
		res.end();
	}
	else
		next() ;
   })
   .use( connect.bodyParser() )
   .use(connect.query())
   .use(function(req, res, next) {
	switch(req.method)
	{
		case "GET":
			if ( /config\.json$/.test(req.url) ) {
				config.list(function(files) {
                			res.writeHead(200, { 'content-type': 'application/json' });
                			res.end(JSON.stringify(files), 'utf8');
				}) ;
			}
			else
				next() ;
  			break;
		case POST:
			console.log("POST FOR " + req.url) ;
			next() ;
  			break;
		default:
			// not supported method
		}
   })
   .use( '/admin', connect.static('./admin/'))
   .use(function(req, res, next) {
	if ( req.method == 'POST' ) {

	}
	else { // server main file
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
