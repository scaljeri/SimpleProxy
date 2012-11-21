var connect = require('connect')
  , mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'proxy')
  , Schema = mongoose.Schema 
  , argv = require('optimist').argv ;

db.on('error', function(err) {
        console.error('MongoDB connection %s', err);
}) ;
db.once('open', function () {
        console.log("connected with MongoDB") ;
});

var cachedSchema = new Schema({
        url: String,
        method: String,
	statusCode: Number,
        headers: Schema.Types.Mixed,
	body: Schema.Types.Mixed,
	query: Schema.Types.Mixed,
        binaryData: Buffer,
	utf8Data: String,
	updated: String
});
var Cached = db.model('response', cachedSchema) ;

// search MongoDB for cached responses
module.exports.load = function load(req, callback) {
	var searchObj = buildSearchObj( buildSearchObj( {url: req.url.split('?')[0]},  'query', req.query), 'body', req.body ) ;
	//console.dir(searchObj) ;

	Cached.findOne( searchObj, function(err, cache) {
		if( err ) throw err ;
		else {
			if ( cache ) {
				callback(cache); 
			}
			else
				callback() ;
		}
	}) ;
}


module.exports.save = function save(req, callback) {
	// first check if the response already exists
	module.exports.load(req, function(cachedObj) { saveResponse(req, cachedObj, callback); } ) ;
} ;

/* PRIVATE FUNCTIONS */

/*
 * Save the response, or perform an update if fromDB exists
 */
function saveResponse(req, cachedObj, callback) {
	var cache     = cachedObj ;
	if ( !cache )
		cache = new Cached() ;

	cache.url     = req.url.split('?')[0] ; // create an url without parameters
	cache.method  = req.method ;
	if ( req.proxy.headers['content-type'] ) { // not all responses have a 'content-type', like a 302 response
		var encoding     = (req.proxy.headers['content-type'].match(/^image/) ? 'binary' : 'utf8') + 'Data' ;
		cache[encoding] = req.proxy.data ;
	}

	cache.headers = req.proxy.headers ;
	cache.body    = req.body ;
	cache.query   = req.query ;
	cache.statusCode = req.proxy.statusCode ;
	cache.updated = new Date() ;

	cache.save(function(err) {
       		if (err) throw err ;
		if ( callback )
			callback(true) ;
	}) ;

}

/*
 * Convert a json object (input) into a mongodb object (search)
 */
function buildSearchObj( search, key, input ) {
	for( var i in input ) {
		if( Object.prototype.hasOwnProperty.call(input, i) && !i.match(argv['ignore-params']) )
			search[key + '.' + i] = input[i] ;			
	}	
	return search ;
}
