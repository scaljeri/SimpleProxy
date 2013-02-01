Sp.ClickableView = Em.View.extend({
	click: function(e) {
		console.log("CLICK");
        this.get("controller").send("showMenuItem", e, $(e.target).closest(".menu") ) ;
	}
});
