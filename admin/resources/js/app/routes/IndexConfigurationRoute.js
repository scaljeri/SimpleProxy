Sp.IndexConfigurationRoute = Ember.Route.extend({
    enter: function() {
        console.log("RENDER CONFIG STUFF") ;
        this.controllerFor('application').set("activeMenuItem", 'configuration') ;
    }
}) ;