/**
 * QuizResponses.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        question: {
            model: 'question'
        },

        state: {
            model: 'questionState'
        },

        // need to identify the quiz responses
        session: {
            model: 'quizSession'
        }

    }
};