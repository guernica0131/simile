/**
 * QuizActivity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        action: {
            type: 'string',
            in : ['created', 'expired', 'completed', 'responded', 'skipped', 'retake', 'restrictedAttempt', 'invalid']
        },

        question: {
            model: 'question'
        },

        state: {
            model: 'questionState'
        },

        session: {
            model: 'quizSession'
        },

        extras: {
            type: 'json'
        },




    }
};