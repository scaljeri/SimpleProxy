(function($) {
	if ( !window.admin )
		window.admin = {} ;
	
	window.admin.loadConfigs = function() {
			doAjax( {url: '/admin/config.json', success: insertConfigs} ) ;
			doAjax( {url: '/admin/config/defaults.json', success: fillForm} ) ;
		};
	window.admin.manipulate = function(e) {
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
				case 'add-route':
					createUrlRoute() ;
					break ;
				case 'delete':
					if (confirm('Delete configuration ' + config + ' ?')) {
						console.log("delete") ;
					}
  					break;
				default:
					alert("Oooops") ;
			}	
		};

	function fillForm(json) {
		if ( json.description )	
			$('#description').html(json.description) ;

		if ( json["remote-host"] ) 
			$('#remote-host').val(json['remote-host']) ;

		if ( json["remote-port"] )
			$('#remote-port').val(json['remote-port']) ;

		if ( "" + $('#proxy-only') )
			$('#proxy-only-'+ json['proxy-only']).attr('checked', true) ;

		if ( json['ignore-params'] )
			$('#ignore-params').val(json['ignore-params']) ;

		if ( json.routes && json.routes.length > 0 ) {
			$('#routes').html(window.admin.templates.createRoutes(json)) ;
/*
			$('#routes').empty() ;
			for( var i = 0; i < json.routes.length; i++ ) {
				var route = json.routes[i] ;
				var routeTo = route.host ? route.host + ':' + route.port : route.path ; 
				if ( route.host )
					routeTo += (/^\//.test(route.path) ? '' : '/') + route.path ;
				$('<a href="#"><div class="route-' + i + '" data-json="' + JSON.stringify(route) + '"><span>' + route.url + '</span> - <span>' + routeTo + '</span></div></a>').appendTo('#routes') ;
			}
*/
		}

	}

	function insertConfigs(json) {
		var s = $('#config-select') ;
		for(var key in json) {
    			$("<option />", {value: key, text: json[key].replace('.json','')}).appendTo(s) ;
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

	function createUrlRoute() {
		var newRoute = $('fieldset fieldset:first').clone() ;
		newRoute.css({height: 'auto', display: 'none'}).fadeOut(0) ;
		$('fieldset fieldset').animate({ height: 0 }, 500, function() {
			$('#buttons').before(newRoute) ;
			newRoute.fadeIn(500) ;

		}) ;
	}

})(jQuery) ;

