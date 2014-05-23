window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.SailsSocketAdapter.extend({
    namespace: 'api/v1',
    //log: true,
    pathForType: function(type) {
        var camelized = Ember.String.camelize(type);
        return Ember.String.pluralize(camelized);
    }
});