window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});





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

// dummy model for testing
App.Dummy = DS.Model.extend({
    name: DS.attr('string'),
    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string')
});
// dummy route for testing
App.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('dummy');
    }
});

App.IndexController = Ember.ArrayController.extend({

});



App.ApplicationAdapter = DS.SailsSocketAdapter.extend({
    namespace: 'api/v1',
    log: true,
    pathForType: function(type) {
        var camelized = Ember.String.camelize(type);
        return Ember.String.pluralize(camelized);
    }
    //socket: io.socket
});