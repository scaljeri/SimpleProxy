Sp.ConfigMenuItemView = Em.View.extend({
    templateName: 'configMenuItem',

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
