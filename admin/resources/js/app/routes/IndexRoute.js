Sp.IndexRoute = Ember.Route.extend({
    renderTemplate: function(controller, model) {
        this.render('index', { controller: "index"});
    },

    setupController: function(controller) {
        controller.set('content', [
            {   back: "ConfigurationView",
                id: "configuration",
                cls: "",
                isRotated: false,
                img: "resources/img/config-icon.png",
                txt: "Configuration"
            },
            {   back: "LogView",
                id: "log",
                cls: "",
                isRotated: false,
                img: "resources/img/log-icon.png",
                txt: "Log Overview"
            },
            {   back: "RealtimeView",
                id: "realtime",
                cls: "",
                isRotated: false,
                img: "resources/img/realtime-icon.png",
                txt: "Realtime"
            },
            {   back: "SearchView",
                id: "search",
                cls: "",
                isRotated: false,
                img: "resources/img/database-icon.png",
                txt: "Search"
            },
        ]) ;
    }
    /*
     model: function(){
     return Sp.ConfigModel.create() ;
     }
     */
});
