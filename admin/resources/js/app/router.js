Sp.Router.map(function() {
    this.resource('index', { path: '/' }, function() {
        this.route('configuration', { path: 'configuration' }); // index.configuration
        this.route('log', { path: 'log'}) ; // index.log
    }) ;
});
