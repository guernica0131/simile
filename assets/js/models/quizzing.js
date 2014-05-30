////////////////////////////////
/// Quizzing models
////////////////////////////////
App.Quiz = DS.Model.extend({
    name: DS.attr('string'),
    random: DS.attr('boolean'),
    timed: DS.attr('number'),
    min: DS.attr('number'),
    max: DS.attr('number'),
    layout: DS.attr('string'),
    retakes: DS.attr('number'),
    published: DS.attr('boolean'),
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
    // might throw error
    body: DS.attr('text'),
    // end potential
    difficulty: DS.attr('number'),
    timed: DS.attr('number'),
    priority: DS.attr('number'),
    createdAt: DS.attr('string'),
    updatedAt: DS.attr('string'),
    instruction: DS.attr('string'),
    quizzes: DS.hasMany('quiz', {
        async: true
    }),
    states: DS.hasMany('questionState', {
        async: true
    }),
});


App.QuestionState = DS.Model.extend({
    name: DS.attr('string'),
    choices: DS.attr('array'),
    // might throw error
    body: DS.attr('text'),
    question: DS.belongsTo('question'),
    instruction: DS.attr('string'),
    template: DS.attr('string'),
    kind: DS.attr('string'),
    "package": DS.attr('string'),
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