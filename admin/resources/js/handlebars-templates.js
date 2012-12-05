if ( ! window.admin )
	window.admin = {} ;

window.admin.tooltips = {
	"edit-route": "this is a tooltip",	
	"delete-route": "this is a tooltip - delete"	
}



window.admin.templates = {
	createTooltipLink: Handlebars.compile(
                [
                        '<span ',
                                'class="{{classes}} tooltip ss_sprite ss_{{icon}}" ',
                                'data-tip="{{text}}">',
                                        '&nbsp;',
                        '</span>'
                ].join('')),
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
	       	].join('')
	)
};

Handlebars.registerPartial('createTooltipLink', window.admin.templates.createTooltipLink ) ;

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
	return window.admin.templates.createTooltipLink($.extend({},
		this,
		{
			icon: options.hash.icon,
			text: window.admin.tooltips[options.hash.text]
		}
	))}
) ;
