exports = module.exports = function cacheProxy() {

  // Initialize the counter
  var cache = {} ;

  return function cacheProxy(req, res, next) {
    console.log("Request " + req.url);
    next();
  };
};
