Sp.IndexController = Ember.ArrayController.extend({
    content: [
        {   name: "configuration",
            cls: "",
            isRotated: false
        },
        {
            name: "log",
            cls: "",
            isRotated: false
        },
        {
            name: "realtime",
            cls: "",
            isRotated: false
        },
        {
            name: "search",
            cls: "",
            isRotated: false
        }
    ],
    switchMenuItem: function(item) {
        console.log("INDEX CONTROLLER " + item) ;
        //this.controllerFor("application").switchMenuItem(item) ;
    }
});
