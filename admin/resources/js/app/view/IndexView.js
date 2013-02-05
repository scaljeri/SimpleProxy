Sp.IndexView = Em.View.extend({
   	templateName: 'index',
	classNames: ['index'],

    didInsertElement: function() {
        console.log("index did render") ;
        this.controller.switchMenuItem() ;
    }
});
