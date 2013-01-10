(function($) {
	Sp.Store = Ember.Object.extend({
		model : null,
		url   : '/admin/api/',
	
		find: function(callback, mid) {
			if ( !this.model) {
				console.log("store without a model") ;	
			}
			else {
				loadData.apply(this, arguments) ;
			}
		},
	
		findAll: function(callback) {
	
		}
	}) ;

	function loadData(callback, mid) {
		$.ajax({
			url : this.url + this.model.toString() + (typeof(mid)== 'integer' ? '/' + mid : ''),
			type : 'GET',
			success : function(data) {
				callback;
			},
			error : handleError
		});
	}

	function handleError(iets) {

	}
})(jQuery) ;
