(function($) {
	
	window.admin = {
		loadConfigs: function() {
			doAjax( { url: '/admin/config.json', success: insertConfigs }) ;
		},
		manipulate: function(e) {
			var action = $(e.target).attr('data-manip') ;
			var config = $('#config-select').find(":selected").text();
			switch(action) {
				case 'add':
					console.log("add") ;
					$('#config-form')[0].reset() ;
					$('#config-form').fadeIn() ;
  					break;
				case 'edit':
					console.log("edit") ;
  					break;
				case 'delete':
					if (confirm('Delete configuration ' + config + ' ?')) {
						console.log("delete") ;
					}
  					break;
				default:
					alert("Oooops") ;
			}	
		}
	} ;

	function insertConfigs(json) {
		var s = $('#config-select') ;
		for(var key in json) {
    			$("<option />", {value: key, text: json[key]}).appendTo(s) ;
		}
		$('#config-loading').addClass('hidden') ;
		$('#configs').removeClass('hidden') ;
	}

	function doAjax(options) {
		var ajaxOpts = $.extend( { 
			type : 'GET',
			async : true,
			dataType : 'json',
		}, options ) ;
		if ( ajaxOpts.type == 'POST' && !ajaxOpts.contentType )
			ajaxOpts.contentType = "application/json; charset=utf-8" ;

		$.ajax(options) ;
	}

})(jQuery) ;

