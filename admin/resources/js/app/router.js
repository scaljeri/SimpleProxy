Sp.Router.map(function() {
    this.resource('index', { path: '/' }, function() {
        this.route('config', { path: '/configuration' });
    }) ;
    //match('/').to('index');
    //match('/config').to('config');
});

Sp.IndexConfigRoute = Ember.Route.extend({
    enter: function() {
        var controller = this.controllerFor('application');
        controller.set("activeMenuItem", 'configuration') ;
    }/*,
    renderTemplate: function(controller, model) {

    }*/

}) ;

Sp.IndexRoute = Ember.Route.extend({
    renderTemplate: function(controller, model) {
        console.log("STEP 1") ;
        this.render('index');

        this.render('rotatable', {into: 'index', outlet: 'config'}) ;
        this.render('clickable', {into: 'rotatable', outlet: 'front'}) ;
        this.render('menuconfig', {into: 'clickable'}) ;
        //this.render('clickable', {into: 'rotatable', outlet: 'back'}) ;
        this.render('configuration', {into: 'rotatable', outlet: 'back'}) ;

        this.render('rotatable', {into: 'index', outlet: 'logging'}) ;
        this.render('clickable', {into: 'rotatable', outlet: 'front'}) ;
        this.render('menulogging', {into: 'clickable'}) ;
        this.render('logging', {into: 'rotatable', outlet: 'back'}) ;

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

/*
Sp.Router = Ember.Router.extend({
    enableLogging: true,
    location: 'hash',

    root: Ember.Route.extend({
        //uiMenuHomeUrl: Ember.State.transitionTo('test'),
        index: Ember.Route.extend({
            route: '/',
            connectOutlets: function(router) {
                router.get('applicationController').connectOutlet('config');
            },

        }),
        test: Ember.Route.extend({
            route: '/log',
            connectOutlets: function(router) {
                //router.get('projectController').connectOutlet('test', 'test');
            }
        })
    })
});
*/
