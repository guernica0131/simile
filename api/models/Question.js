/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string'
        },

        difficulty: {
            type: 'integer'
        },

        priority: {
            type: 'integer'
        },

        quizzes: {
            collection: 'quiz',
            via: 'questions'
        },

        startState: {
            model: 'questionState'
        },

        // states: {
        //     collection: 'questionState',
        //     via: 'questions',
        //     //dominant: true
        // }

    }
};