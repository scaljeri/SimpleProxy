var fs  = require('fs') ;

module.exports.list = function(callback) {
	fs.readdir( './admin/config', function(err, files) {
		callback(files) ;
	}) ;
}
