var connect = require('connect')
  , mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'proxy')
  , Schema = mongoose.Schema 
  , argv = require('optimist').argv ;

db.on('error', function(err) {
        console.error('MongoDB connection %s', err);
	process.exit(0) ;
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
	if ( req.proxy.data ) 
		cache.binaryData = req.proxy.data ;		

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
		if( Object.prototype.hasOwnProperty.call(input, i) && (!argv['ignore-params'] || !i.match(argv['ignore-params'])) ) 
			search[key + '.' + i] = input[i] ;			
	}	
	return search ;
}
