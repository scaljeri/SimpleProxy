Sp.RouteModel = Ember.Object.extend({
	url 		 : null, 
        cache 		 : null,
        host 		 : null,
        port 		 : null,
        path 		 : null,
        ignoreExtensions : null,

	init: function(data) { this.$className = Sp.RouteModel.$className ; },

	toJson: function() {
		return this.getProperties('url', 'cache', 'host', 'port', 'path', 'ignoreExtension') ;
	}
});

Sp.RouteModel.reopenClass({
	$className: 'RouteModel'
}) ;
