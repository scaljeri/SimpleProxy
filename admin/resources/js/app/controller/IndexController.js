Sp.IndexController = Em.Controller.extend({

    showMenuItem: function(e, item) {
        var otherItems = $(".menu", "#index").not(item) ;

        item.css({width: '100%', height: '100%', top: 0, left: 0})
            .find(".flip-container")
                .addClass("rotate") ;


        var positions = this.get("positions") ;
        otherItems.each(function(i, k) {
            $(k).addClass("icon " + positions[i]) ;
        }) ;
    },

    switchMenuItem: function() {
        this.controllerFor("application").switchMenuItem() ;
    }
});
