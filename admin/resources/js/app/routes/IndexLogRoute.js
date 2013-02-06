Sp.IndexLogRoute = Ember.Route.extend({
    enter: function() {
        var controller = this.controllerFor('application');
        controller.set("activeMenuItem", 'log') ;
    }/*
     renderTemplate: function(controller, model) {

     }*/

}) ;
