Sp.ApplicationController = Em.Controller.extend({
    positions: ['top', 'middle', 'bottom'],
    isLoading: true,
    isMenuFullscreen: true,
    activeMenuItem: null,
    isInitialState: true,

    didActiveMenuItemChanged: function(controller, property) {
        debugger ;
        setTimeout( this.switchMenuItem.bind(this),0) ;
    }.observes('activeMenuItem'),

    switchMenuItem: function() {
        console.log("DO SWITCH " + this.activeMenuItem) ;

        $menuItem = $('#' + this.get("activeMenuItem")) ;


        if ( $menuItem ) {
            if ( this.isInitialState ) {
                this.set("isInitialState", false) ;
                $('#application h1').removeClass('disabled') ; // make title clickable
                var otherItems = $(".menu-item", "#index").not($menuItem) ;

                var positions = this.get("positions") ;
                setTimeout(function() { // let the UI thread first continue and draw the templates
                    $menuItem.addClass("selected")
                        .find('.flip-container').addClass("rotate") ;

                    otherItems.each(function(i, k) {
                        $(k).addClass("icon " + positions[i]) ;
                    }) ;
                }, 0) ;
            }
            else { // switch two menu items ( fullscreen item with an iconized one)
                console.log("switch menu items") ;
                debugger ;
            }
        }
    },

    resetMenu: function() {
        var selectedMenuItem = $('.menu-item.selected') ;
        this.set("isInitialState", true) ;
        $('#application h1').addClass('disabled') ; // make title not clickable
        selectedMenuItem .removeClass("selected")
            .find('.flip-container').removeClass('rotate') ;

        $(".menu-item").not(selectedMenuItem)
            .one("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd mozTransitionEnd", function() {
               $(this).find("h3").fadeIn() ;
            })
            .not(selectedMenuItem).removeClass("icon " + this.get("positions").join(" ")).find("h3").css("display", "none") ;

        if(history.pushState) {
            history.pushState(null, null,"#");
        }
        else {
            location.hash = '';
        }
    }
});
