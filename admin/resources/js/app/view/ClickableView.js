Sp.ClickableView = Em.View.extend({
	click: function(e) {
        console.log("CLOCK "  + $(e.target).closest(".menu-item").attr("id") ) ;
        this.get("controller").send("switchMenuItem", $(e.target).closest(".menu-item").attr("id") ) ;
	}

});
