Sp.ClickableView = Em.View.extend({
	click: function(e) {
		console.log("CLICK");
        $(e.target).closest(".flip-container").toggleClass("rotate") ;
	}
});
