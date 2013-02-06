Sp.ConfigController = Em.Controller.extend({
    switchMenuItem: function() {
        console.log("config did render") ;

        this.controller.switchMenuItem("configuration") ;
    }
});
