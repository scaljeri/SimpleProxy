Sp.ApplicationController = Em.Controller.extend({
    positions: ['top', 'middle', 'bottom'],
    isLoading: true,
    activeMenuItem: null,

/*    didActiveMenuItemChanged: function(controller, property) {
        if ( this._activeMenuItem != this.activeMenuItem ) {
            this._activeMenuItem = this.activeMenuItem ;
            setTimeout( this.switchMenuItem.bind(this),0) ;
        }
    }.observes('activeMenuItem'),*/

    switchMenuItem: function(menuItem) {
        console.log("DO SWITCH " + this.activeMenuItem) ;

        if ( menuItem && this.activeMenuItem ) { // switch menu items
            var $menuItem   = $('#' + menuItem) ;
            var $activeItem = $('#' + this.activeMenuItem) ;

            var position = $menuItem.attr("data-position") ;
            $activeItem.attr("data-position", position)
                .addClass(position + " icon")
                .removeClass("selected")
                .find('.flip-container').removeClass('rotate') ;

            $menuItem.addClass("selected")
                .removeClass("icon " + position)
                .attr("position", "")
                .find('.flip-container').addClass("rotate")
                /*.one("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd mozTransitionEnd", function() {
                    $(this).find("h3").css("display", "block") ;
                })*/
                .find("h3").css("display", "none") ;

            this.activeMenuItem = menuItem ;
        }
        else if ( menuItem ){
            this.activeMenuItem = menuItem ;
            var $menuItem = $('#' + this.get("activeMenuItem")) ;

            $('#application h1').removeClass('disabled') ; // make title clickable
            var otherItems = $(".menu-item", "#index").not($menuItem) ;

            var positions = this.get("positions") ;
            setTimeout(function() { // let the UI thread first continue and draw the templates
                $menuItem.addClass("selected")
                    .find('.flip-container').addClass("rotate") ;

                otherItems.each(function(i, k) {
                    $(k).attr("data-position", positions[i])
                        .addClass("icon " + positions[i])
                        .find("h3").css("display", "none") ;
                }) ;
            }, 0) ;

        }
    },

    resetMenu: function() {
        var selectedMenuItem = $('.menu-item.selected') ;
        $('#application h1').addClass('disabled') ; // make title not clickable
        selectedMenuItem.removeClass("selected")
            .find('.flip-container').removeClass('rotate')
            .find("h3").css("display", "block") ;

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
        this.activeMenuItem = null ;
    }
});
