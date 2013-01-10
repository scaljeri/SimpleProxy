Sp.ConfigModel = Sp.BaseModel.extend({
	description  : null,
        remoteHost   : null,
        remotePort   : null,
        proxyOnly    : null,
        ignoreParams : null,
        routes       : [],
	hasMany	     : [],

	init: function() { 
		this.hasMany.push({ key: 'routes', model: Sp.RouteModel }) ; // the relation is set when instance is crated, to make sure RouteModel exists
		this.$className = Sp.ConfigModel.$className ; // get the className
	},

	toJson: function() {
		return this.getProperties('description', 'remoteHost', 'remotePort', 'proxyOnly', 'ignoreParams', 'routes') ;
	}
});

Sp.ConfigModel.reopenClass({
	$className: 'ConfigModel'
}) ;
