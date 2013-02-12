Sp.MenuController = Em.ObjectController.extend({
    config: { isSelected : false, cls: "", rotate: false },
    log: { isSelected : false, cls: "", rotate: false },

    selectItem: function() {
        console.log("config did render") ;
        this.set("isSelected", true) ;
        //this.controllerFor("application").switchMenuItem("configuration") ;
    },

    clicked: function(a,b,c) {
        console.log("CLICKED") ;
        this.set("config.isSelected", true) ;
    }



});
