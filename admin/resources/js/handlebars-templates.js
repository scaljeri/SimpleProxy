if ( ! window.admin )
	window.admin = {} ;

window.admin.tooltips = {
	"edit-route": "this is a tooltip",	
	"delete-route": "this is a tooltip - delete"	
}

Handlebars.registerHelper('createPath', function(options) {
	
	var output = this.path ;
	if ( this.host ) {
		output = this.host ;
		if ( this.port || this.port != 80 ) 
			output += ':' + this.port ;
		output +=  (/^\//.test(this.path) ? '':'/' ) + this.path ;
	}

	return output ;
  	//text = Handlebars.Utils.escapeExpression(text);
  	//url  = Handlebars.Utils.escapeExpression(url);
  	//return new Handlebars.SafeString("hallo");
});

Handlebars.registerHelper('tooltipLink', function(options) {
	var classes = 'hand tooltip ss_sprite ss_' + options.hash.icon ;

	return ['<span href="#"',
		   'class="' +  classes + '" ',
		   'data-tip="' + window.admin.tooltips[options.hash.text] + '">&nbsp;',
		'</span>'].join('') ;
	
}) ;

window.admin.templates = {
	createRoutes: Handlebars.compile(
		[
			'{{#each routes}}',
				'<div>',
					'<li>',
						'{{url}} -- {{#createPath}}{{host}} {{port}} {{path}}{{/createPath}}',
						'<div style="float:right">',
							'{{#tooltipLink text="edit-route" icon="page_white_edit"}}{{/tooltipLink}}',
							'{{#tooltipLink text="delete-route" icon="delete"}}{{/tooltipLink}}',
						'</div>',
					'</li>',
				'<div>',
			'{{/each}}'
	       	].join('')) 
}
