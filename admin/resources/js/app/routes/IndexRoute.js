Sp.IndexRoute = Ember.Route.extend({
    renderTemplate: function(controller, model) {
        this.render('index');

        this.render('rotatable', {into: 'index', outlet: 'config'}) ;
        this.render('clickable', {into: 'rotatable', outlet: 'front'}) ;
        debugger ;
        this.render('configMenuItem', {into: 'clickable'}) ;
        //this.render('clickable', {into: 'rotatable', outlet: 'back'}) ;
        this.render('configuration', {into: 'rotatable', outlet: 'back'}) ;

        this.render('rotatable', {into: 'index', outlet: 'logging'}) ;
        this.render('clickable', {into: 'rotatable', outlet: 'front'}) ;
        this.render('menulogging', {into: 'clickable'}) ;
        this.render('log', {into: 'rotatable', outlet: 'back'}) ;

        this.render('rotatable', {into: 'index', outlet: 'realtime'}) ;
        this.render('clickable', {into: 'rotatable', outlet: 'front'}) ;
        this.render('menurealtime', {into: 'clickable'}) ;
        this.render('realtime', {into: 'rotatable', outlet: 'back'}) ;

        this.render('rotatable', {into: 'index', outlet: 'search'}) ;
        this.render('clickable', {into: 'rotatable', outlet: 'front'}) ;
        this.render('menusearch', {into: 'clickable'}) ;
        this.render('search', {into: 'rotatable', outlet: 'back'}) ;
    }
    /*
     model: function(){
     return Sp.ConfigModel.create() ;
     }
     */
});
