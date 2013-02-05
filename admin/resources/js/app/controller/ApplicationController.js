Sp.ApplicationController = Em.Controller.extend({
    positions: ['top', 'middle', 'bottom'],
    isMenuFullscreen: true,
    activeMenuItem: null,
    isInitialState: true,

    switchMenuItem: function() {
        if ( this.get("activeMenuItem") ) {
            if ( this.isInitialState ) {
                this.set("isInitialState", false) ;
                this.set("activeMenuItem", $("#" + this.activeMenuItem)) ;
                var otherItems = $(".menu-item", "#index").not(this.activeMenuItem) ;

                var me = this ;
                setTimeout(function() {
                    me.activeMenuItem.addClass("selected")
                        .find('.flip-container').addClass("rotate") ;

                    var positions = me.get("positions") ;
                    otherItems.each(function(i, k) {
                        $(k).addClass("icon " + positions[i]) ;
                    }) ;
                }, 0) ;
            }
            else {

            }
        }
    }
});
