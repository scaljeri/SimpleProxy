Sp.Router.map(function(match) {
  match('/').to('index');
});

Sp.IndexRoute = Ember.Route.extend({
  /*
  model: function(){
	return Sp.ConfigModel.create() ;
  },
  renderTemplate: function(controller, model) {
    this.render('index');
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
