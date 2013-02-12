Sp.MenuConfigItemView = Em.View.extend({
    templateName: 'menu-config',

    position: null,
    background: "bg",

    /*classNamesStr: function() {
        return "config " + this.get("background") + " " + this.get("position") ;
    }.property('background')*/

    didInsertElement: function() {
        console.log("menuconfig did render") ;

        //this.controller.switchMenuItem("configuration") ;
    }
});
