(function($) {
	if ( !window.admin )
		window.admin = {} ;

	var name   = "defaults.json" ; 	// name of the selected configuration file
	var config = null ; 		// contains the loaded configuration data

	var formValidation = new FormManager('#route-config') ; // define the form

	
	window.admin.loadConfigs = function() {
			doAjax( {url: '/admin/config.json', success: insertConfigs} ) ;
			doAjax( {url: '/admin/config/' + name, success: fillForm} ) ;

			// bind to route actions
			$('fieldset fieldset').off('click', 'span[data-type]') // event delegation
				    .on('click', 'span[data-type]', function(e) {
					var $this = $(this) ;
					var atype = $(this).attr("data-type") ;
					var index = $this.closest('[data-index]').attr('data-index') ; 

					switch(atype) {
						case 'add':
							// TODO: validate and save
							validateRouteForm() ;
							break ;
						case 'edit':
							// TODO: fill form
							break ;
						case 'delete':
							$('#routes li[data-index="' + index + '"]').fadeOut(function(){ 
								$(this).remove();
								if ( $('#routes li').length == 0 ) 
									$('#routes').append(window.admin.templates.noRoutesDefined({})) ;	
							}) ;
							//doAjax( { url: '/admin/config/route/' + name, data: {
							break ;
	
					}
			}) ;

        		$('input[name="route-to"]').change(function(e) {
				$('#route-to-hostname, #route-to-filesystem').addClass('hidden') ;
				$('#route-to-' + $(this).val()).removeClass('hidden') ;
        		}) ;
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

	function validateRouteForm() {
		$('.route-input').css('border', 'none') ;
		var routeUrl = $('#route-url input') ;
		if ( !routeUrl.val() )
			routeUrl.closest('.value-container').css('border', '1px solid red') ;	

		var routeCache = $('#route-cache input:checked') ;
		if ( routeCache.length == 0 ) {
			$('#route-cache .value-container').css('border', '1px solid red') ;
		}

		var routeTo = $('#route-to-something input:checked') ;
		if ( routeTo.length == 0 ) {
			$('#route-to .value-container').css('border', '1px solid red') ;
		}
		else {
			//var checked = $('#route-to-hostname input:chec
		}
	}

	function fillForm(json) {
		config = json ;
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

		if ( json.routes && json.routes.length > 0 )  {
			$('#routes').empty() 
	    			.append(window.admin.templates.createRoutes(json)) ;
		}

	}

	function insertRouteConfig(json) {

	}

	function insertConfigs(json) {
		var s = $('#config-select').empty() ;
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

	function FormManager(formId) {

	}

	/* Usage:
	 * var handler = new FormValidation(inputElement) ;	// textfield
	 * var handler = new FormValidation(checkboxArray) ;    // array with checkboxes 
   	 *
	 * handler.validate() ; // true or false
         * handler.isValid    ; // true of false 
	 */
	function FormValidation(e, regexp) {
		var self = this ;

		this.e = e ;
		this.borderElement = Array.isArray(e) ? e.closest('.value-container') : e ;
		this.borderColor = this.borderElement.css('border-color') ;
		this.redBorderShown = false ;
		this.isValid = validateElement() ;
		
		this.e.on('change', function(e) {
			self.e.css( 'border-color', this.e.val() ? self.borderColor : 'red' ) ;
			//self.trigger( 'changed', {to: e.val()} ) ;
		}) ;

		this.validate = function() {
			if ( !(self.isValid = validateElement()) ) {
				if ( Array.isArray(self.e) )
					self.e.closest('.value-container').css		
			}
		} ;

		function validateElement() {
			if ( Array.isArray(this.e) ) { // checkbox group
				console.log("TODO") ;
			}
			else { // textfield
				return !!this.e.val() ;
			}
		}

		/*
		this.on('destroyed', function(e) {
			console.log('destroyed') ;
		}) ;
		*/
	}



	/*
	jQuery.event.special.destroyed = {
    		remove: function(o) {
      			if (o.handler) {
        			//o.handler()
				o.handler.apply(this,arguments)
      			}
    		}
  	} ;
	*/
})(jQuery) ;

