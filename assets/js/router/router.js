//////////////////////////////////
/// Contains the router and routes
//////////////////////////////////
App.Router.map(function() {
    // put your routes here
    //this.route('about');
    // this.resource('products', function() {
    //     this.route('onsale');
    //     this.resource('product', {
    //         path: '/:product_id'
    //     });
    // });

});

//////////////////////////////////
/// Routes
//////////////////////////////////

// INDEX
App.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('dummy');
    }
});