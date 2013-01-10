if ( ! window.admin )
	window.admin = {} ;

window.admin.tooltips = {
	"create-config": "Create a new configuration",
	"delete-config": "Delete selected configuration",
	"info-hostname": "remote host name (--host)",
	"info-remote-port": "remote port number (--port)",
	"info-proxy-only": "No request will be served from cache, but each (new) response is written to cache (--act-as-proxy)",
	"info-ignore-params": "A comma seperated list with parameters (POST or GET) to be ignored for cache requests lookup (--ignore-params",
	"route-create": "Create new route",
	"route-edit": "Edit route configuration below",	
	"route-delete": "Delete this route configuration",
	"route-incoming-url": "proxy (and cache) all request. If a request is already cached, it will be updated with the new response (--map-url)",
	"route-cache": "Specify if caching should be enabled/disabled (--map-cache)",
	"route-to": "Route a specific url to an other hostname/ip or to the local filesystem",
	"route-to-host": "proxy the request to an other host. If only an absolute path is defined the default hostname/port is used (--map-to-url)",
	"route-to-filesystem": "forward the request to the local filesystem (--map-to-fs)",
	"route-ignore-extensions": "A comma seperareted list with extensions which should not be mapped (--map-ignore-extensions)"
}



window.admin.templates = {
	noRoutesDefined: Handlebars.compile( '<div id="no-routes">No routes configured</div>' ),
	addRouteConfig: Handlebars.compile(
		[
			'<section>',
				'<header style="position:relative">',
					'<h4>Route URL to host/ip or local filesystem:</h4>',
					'<div style="position:absolute;top:0;right:0">',
						'{{#tooltipLink text="route-create" icon="add" data-type="add"}}{{/tooltipLink}}',
					'</div>',
				'</header>',
                                '<article id="route-url">',
					'<div class="route-input">',
                                        	'<label>Incoming URL</label>',
                                        	'<input type="text" placeholder="/admin/configs/json/localhost.json">',
					'</div>',
					'{{#tooltipLink text="route-incoming-url" icon="information"}}{{/tooltipLink}}',
                                '</article>',
                                '<article id="route-cache">',
					'<div class="route-input">',
                                        	'<label for="proxy">Cache request</label>',
                                        	'<div class="value-container">',
                                                	'<input name="route-cache" type="radio" value="true">true',
                                                	'<input name="route-cache" type="radio" value="false">false',
                                        	'</div>',
                                        '</div>',
					'{{#tooltipLink text="route-cache" icon="information"}}{{/tooltipLink}}',
                                '</article>',
                                '<article id="route-to">',
					'<div class="route-input">',
                                       		'<label>Route to:</label>',
						'<div class="value-container">',
                                        		'<input type="radio" name="route-to" value="hostname">hostname/ip',
                                        		'<input type="radio" name="route-to" value="filesystem">Filesystem',
						'</div>',
					'</div>',
					'{{#tooltipLink text="route-to" icon="information"}}{{/tooltipLink}}',
                                '</article>',
                               	'<article id="route-to-something">',
					'<div id="route-to-hostname" class="hidden">',
						'<div class="route-input">',
                                        		'<label>Hostname</label>',
                                        		'<input name="route-to-hostname" type="text" placeholder="localhost" style="width:160px">',
                                        		'<input type="route-to-port" text" placeholder="80" style="width:30px;margin-left:10px;">',
						'</div>',
						'{{#tooltipLink text="route-to-host" icon="information"}}{{/tooltipLink}}',
					'</div>',
					'<div id="route-to-filesystem" class="hidden">',
						'<div class="route-input">',
                                        		'<label>Filesystem</label>',
                                        		'<input name="route-to-fs" type="text" placeholder="/Users/www/">',
						'</div>',
						'{{#tooltipLink text="route-to-fs" icon="information"}}{{/tooltipLink}}',
					'</div>',
                                '</article>',
                                '<article>',
                                        	'<label for="proxy">Ignore specific extensions</label>',
                                        	'<div style="display:inline-block;vertical-align:top">',
                                                	'<input type="text" placeholder="jsp,asp,php" style="margin-right: 7px">',
							'{{#tooltipLink text="route-ignore-extensions" icon="information"}}{{/tooltipLink}}',
						'</div>',
                                '</article>',
			'</section>'
		].join('')
	),
	createConfigLoader: Handlebars.compile(
		[
			'<section>',
				'<div id="config-loading">',
					'Loading configuration files',
                                	'<div class="spinner"></div>',
                        	'</div>',
	
                        	'<div id="configs" class="hidden">',
                        		'<label for="config-select" class="config-msg">Choose config file: </label>',
                                	'<select id="config-select"></select>',
	
					'{{#tooltipLink id="delete-config" class="hidden" text="delete-config" icon="delete"}}{{/tooltipLink}}',
					'{{#tooltipLink text="create-config" icon="add"}}{{/tooltipLink}}',
                        	'</div>',
			'</section>'
		].join('')
	),

	createGlobalSettings: Handlebars.compile(
		[
			'<section',
				'<acticle>', <!-- HOSTNAME -->
                        		'<label for="remote-host">Remote host</label>',
                        		'<input id="remote-host" type="text" placeholder="localhost" class="tooltip">',
					'{{#tooltipLink text="info-hostname" icon="information"}}{{/tooltipLink}}',
                  		'</article>',

                  		'<article>', <!-- REMOTE PORT -->
                        		'<label for="remote-port">Remote port</label>',
                        		'<input id="remote-port" type="text" placeholder="80">',
					'{{#tooltipLink text="info-remote-port" icon="information"}}{{/tooltipLink}}',
				'</article>',
                  		'<article>', <!-- ACT AS PROXY ONLY -->
                                        '<label for="proxy">Act as proxy only</label>',
                                        '<div class="value-container" style="display:inline-block;width:206px">',
                                                '<input id="proxy-only-true" type="radio" name="act-as-proxy" value="true">true',
                                                '<input id="proxy-only-false" type="radio" name="act-as-proxy" value="false">false',
                                        '</div>',
					'{{#tooltipLink text="info-remote-proxy" icon="information"}}{{/tooltipLink}}',
                  		'</article>',
                  		'<article>', <!-- IGNORE PARAMETERS -->
                        		'<label for="proxy">ignore parameter</label>',
                        		'<input id="ignore-params" type="text" placeholder="_dc,r">',
					'{{#tooltipLink text="info-ignore-params" icon="information"}}{{/tooltipLink}}',
                  		'</article>'
		].join('')
	),

	createTooltipLink: Handlebars.compile(
                [
                        '<span ',
                                'class="{{classes}} tooltip hand ss_sprite ss_{{icon}}" ',
                                'data-tip="{{text}}" data-type="{{data-type}}">',
                                        '&nbsp;',
                        '</span>'
                ].join('')
	),

	createRoutes: Handlebars.compile(
		[
			'{{#eachWithIndex routes}}',
				'<li data-index="{{index}}">',
					'{{url}} -- {{#createPath}}{{host}} {{port}} {{path}}{{/createPath}}',
					'<input type="hidden" name="route-url"   value="{{url}}"/>',
					'<input type="hidden" name="route-cache" value="{{cache}}"/>',
					'<input type="hidden" name="route-host"  value="{{host}}"/>',
					'<input type="hidden" name="route-port"  value="{{port}}"/>',
					'<input type="hidden" name="route-path"  value="{{path}}"/>',
					'<input type="hidden" name="route-ignore-extensions" value="{{ignore-extensions}}"/>',
					'<div style="float:right">',
						'{{#tooltipLink text="route-edit" icon="page_white_edit" data-type="edit"}}{{/tooltipLink}}',
						'{{#tooltipLink text="route-delete" icon="delete" data-type="delete"}}{{/tooltipLink}}',
					'</div>',
				'</li>',
			'{{/eachWithIndex}}'
	       	].join('')
	)
};

Handlebars.registerPartial('createTooltipLink', window.admin.templates.createTooltipLink ) ;

Handlebars.registerHelper("eachWithIndex", function(array, block) {
	var buffer = '' ;
	for (var i = 0; i < array.length; i++) {
		array[i].index = i ;
		buffer += block.fn(array[i]);
	}
	return buffer;
});

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
			text: window.admin.tooltips[options.hash.text],
			"data-type": options.hash["data-type"]
		}
	))}
) ;
