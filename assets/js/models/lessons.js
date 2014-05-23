////////////////////////////////
/// Lesson models
////////////////////////////////
App.Lesson = DS.Model.extend({
    name: DS.attr('string'),
    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string'),
    quizzes: DS.hasMany('quiz', {
        async: true
    })
});

App.Lesson = DS.Model.extend({
    name: DS.attr('string'),
    body: DS.attr('string'),
    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string'),
    lessons: DS.hasMany('lesson', {
        async: true
    }),

});