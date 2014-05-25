//////////////////////////////////
/// Application setup
//////////////////////////////////
window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

//////////////////////////////////////////////////
/// Data adapter for connecting sockets with sails
//////////////////////////////////////////////////
App.ApplicationAdapter = DS.SailsSocketAdapter.extend({
    namespace: 'api/v1',
    log: true,
    pathForType: function(type) {
        var camelized = Ember.String.camelize(type);
        return Ember.String.pluralize(camelized);
    }
});