Router.configure({
   layoutTemplate: 'index'
 });

Router.map(function () {

    this.route('login', {
        path: '/'
        });

    this.route('game', {
    	onBeforeLoad: function() {
        game.onload();
   
    	}
    });


});
