Sp.BaseModel = Ember.Object.extend({
	belongsTo : [],
	hasMany	  : [],

	init: function(data) {debugger;},
});

Sp.BaseModel.reopenClass({
	$className: 'BaseModel',
	initialize: function(data) {
		var model = this.create() ;
		
		for( var key in data ) {
			if ( data.hasOwnProperty(key) )
				mode.set(key, data[key]) ;	
		}
		
		return model ;
	}
}) ;
