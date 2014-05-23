/**
 * Quiz.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


// quiz is optionally assined to one or many courses
module.exports = {

    attributes: {

        name: {
            type: 'string'
        },

        lessons: {
            collection: 'lesson',
            via: 'quizzes',
            dominant: true
        },

        questions: {
            collection: 'question',
            via: 'quizzes',
            dominant: true
        }

    }
};