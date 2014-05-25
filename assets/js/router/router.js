//////////////////////////////////
/// Contains the router and routes
//////////////////////////////////
App.Router.map(function() {
    // put your routes here
    this.resource('quizzes', function() {
        this.route('new');
        this.route('edit');
        this.route('delete');
        this.resource('quiz', {
            path: '/quiz/:quiz_id'
        });
    });

});

//////////////////////////////////
/// Routes
//////////////////////////////////

// INDEX
App.IndexRoute = Ember.Route.extend({
    model: function() {
        // change to courses
        return this.store.findAll('dummy');
    }
});

// INDEX
App.QuizzesRoute = Ember.Route.extend({
    model: function() {
        // change to courses
        return this.store.findAll('quiz');
    }
});

// // INDEX
// App.QuizRoute = Ember.Route.extend({
//     model: function() {
//         // change to courses
//         return this.store.findAll('quiz');
//     }
// });

App.QuizController = Ember.ObjectController.extend({

});