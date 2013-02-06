Sp.IndexController = Em.Controller.extend({
    switchMenuItem: function(item) {
        console.log("Iv " + item) ;
/*        if ( item )
            this.transitionToRoute("index." + item) ;
        else
            this.controllerFor("application").switchMenuItem() ;*/
    }
});
