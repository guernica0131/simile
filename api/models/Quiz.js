/**
 * Quiz.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


// quiz is optionally assined to one or many courses
module.exports = {

    attributes: {
        // quiz can have a name
        name: {
            type: 'string'
        },
        // this will map back to lesson documents. This allows for the question to be mapped back to the lesson
        lessons: {
            collection: 'lesson',
            via: 'quizzes',
            dominant: true
        },
        // this is the set of all questions associated with this quiz
        questions: {
            collection: 'question',
            via: 'quizzes',
            dominant: true
        },
        // is the quiz timed?
        timed: {
            type: 'numeric',
            defaultsTo: 0
        },
        // are the question to be randomized
        random: {
            type: 'boolean',
            defaultsTo: false
        },
        // minimum number questions for the quiz
        min: {
            type: 'integer',
        },
        // max number questions for the quiz
        max: {
            type: 'integer',
        },
        // the prescribed layout for the quiz questions
        // single page, means all questions are on a single page
        // paged, one question at a time is sent
        layout: {
            type: 'string',
            in : ['single', 'paged', 'custom']
        },
        // this defines the number of retakes a user can attempt
        retakes: {
            type: 'integer',
            defaultsTo: 1,
            required: true
        },

        // publication parameter
        published: {
            type: 'boolean',
            defaultsTo: false
        },

        next: function() {
            // we will use this function to tell the record it needs to move to the next question.
        },

    }
};