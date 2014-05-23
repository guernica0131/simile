////////////////////////////////
/// Quizzing models
////////////////////////////////
App.Quiz = DS.Model.extend({
    name: DS.attr('string'),
    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string'),
    lessons: DS.hasMany('lesson', {
        async: true
    }),
    questions: DS.hasMany('question', {
        async: true
    })
});

App.Question = DS.Model.extend({
    name: DS.attr('string'),
    difficulty: DS.attr('number'),
    priority: DS.attr('number'),
    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string'),
    quizzes: DS.hasMany('quiz', {
        async: true
    }),
    states: DS.hasMany('questionState', {
        async: true
    }),
    startState: DS.belongsTo('questionState')
});


App.QuestionState = DS.Model.extend({
    name: DS.attr('string'),
    question: DS.belongsTo('question'),
    instruction: DS.attr('string'),
    template: DS.attr('string'),
    package: DS.attr('string'),
    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string')
});

App.QuestionResponse = DS.Model.extend({
    correctText: DS.attr('string'),
    incorrectText: DS.attr('string'),
    partialText: DS.attr('string'),
    "document": DS.belongsTo('document'),
    parent: DS.belongsTo('questionState'),
    correct: DS.belongsTo('questionState'),
    incorrect: DS.belongsTo('questionState'),
    partial: DS.belongsTo('questionState'),
    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string'),

});