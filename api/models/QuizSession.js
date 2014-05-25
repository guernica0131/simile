/**
 * QuizSession.js
 *
 * @description :: This model manages the quizes, users and questions.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        // we associate our user
        user: {
            model: 'user'
        },
        // we associate our quiz
        quiz: {
            model: 'quiz'
        },
        // this maps to current or most recent session in which the user is engaged 
        question: {
            model: 'question'
        },
        // this maps to current or most recent state in which the user is engaged 
        state: {
            model: 'questionState'
        },
        // all updates to this model we log here
        activity: {
            model: 'quizActivity'
        },
        // before making a change, we check to see if it is expired
        expired: {
            type: 'boolean',
            defaultsTo: false,
            required: true
        },
        // we log all answers made to the quiz, this will be a collection {question: 1, state: 1, anwser: 2, <additional>}
        reponses: {
            collection: 'quizResponse',
            via: 'session'
        },
        // these were the actual questions in the question bank for this user
        questions: {
            model: 'questionResponse'
        },
        // function because the score is bases on a percentatage of all questin states and questions
        score: function() {
            var session = this.toObject();
            // return the derived score based on the quiz and the question results
            return 100;
        }

    },

    createSession: function(quiz, callback) {
        // here we generate our session,
        // when we generate take any quiz this session needs
        // to be referenced
        callback({ // @todo: change
            id: 0 // for dummy
        }); // this will be the session object
    }
};