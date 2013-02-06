Sp.IndexController = Em.Controller.extend({
    switchMenuItem: function(item) {
        this.controllerFor("application").switchMenuItem(item) ;
    }
});
