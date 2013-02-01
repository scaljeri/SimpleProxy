Sp.IndexController = Em.Controller.extend({
	states: ['menu', 'config', 'log', 'realtime', 'search'],
    positions: [ { r: "-35px", t: "-10px"}, { r: "-35px", t: "50px"}, { r: "-35px", t: "110px"}],
    state: 0,

    showMenuItem: function(e, item) {
        var otherItems = $(".menu", "#index").not(item) ;
        item.css({width: '100%', height: '100%', top: 0, left: 0})
            .find(".flip-container")
                .addClass("rotate") ;


        var positions = this.get("positions") ;
        otherItems.each(function(i, k) {
            var $k = $(k) ;
            $k.css({ top: positions[i].t, right: positions[i].r, width: "50px", height: "50px"});
            $k.find("h3").css("display", "none") ;
            $k.find(".img-container").css("padding",0) ;

        }) ;
    }
});
