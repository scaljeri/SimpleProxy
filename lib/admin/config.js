var fs  = require('fs') ;

module.exports.list = function(callback) {
	fs.readdir( './admin/configs', function(err, files) {
		callback(files) ;
	}) ;
}
