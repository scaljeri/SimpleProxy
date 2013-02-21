Ember.Handlebars.registerBoundHelper('setItemBackside', function(value, options) {
    console.log("create back for " + value.back) ;
    var template = Sp[value.back].create() ;
    console.log("template created " + template) ;
    debugger ;
    var $elem;
    Ember.run(function() {
        $elem = $('<div>');
        template.appendTo($elem);
    });
    var html = $elem.html();
    return new Handlebars.SafeString($elem.html());
    /*
    text = Handlebars.Utils.escapeExpression(text);
    url  = Handlebars.Utils.escapeExpression(url);

    var result = '<a href="' + url + '">' + text + '</a>';

    return new Handlebars.SafeString(result);
    */
});