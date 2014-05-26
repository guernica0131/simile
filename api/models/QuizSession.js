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
        // This checks to see if there is an active quiz already in progress
        active: {
            type: 'boolean',
            defaultsTo: true,
            required: true
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
            //model: 'questionResponse'
            // we will keep an array of the question id, in the order they are presented
            type: 'array'
        },
        // function because the score is bases on a percentatage of all questin states and questions
        score: function() {
            var session = this.toObject();
            // return the derived score based on the quiz and the question results
            return 100;
        }

    },

    createSession: function(params, callback) {
        // here we ensure that the user and the quiz has been defined
        if (!_.every([params.user, params.quiz]))
            return callback({
                error: Messages.errors.quiz.parameters
            });
        // here we generate our session,
        // when we generate take any quiz this session needs
        var quiz = params.quiz,
            userID = params.user.id,
            quizID = quiz.id,
            questions = quiz.questions;

        if (!_.every([userID, quizID]))
            return callback({
                error: Messages.errors.quiz.general
            });

        // if the quiz hasn't been published, we return
        if (!params.quiz.published)
            return callback({
                error: Messages.errors.quiz.unpublished
            });

        // if there are no questions, we return to say this quiz is currently inactive
        if (_.isUndefined(questions))
            return callback({
                error: Messages.errors.quiz.inactive
            });
        // then if there is no active quiz, we need to ensure the settings allow us to take multiple quizzes

        // we also need to assign the questions to the quiz session based on the quiz parameters. 
        // we need to look at the random attribute to randomize the order, in addition, we will need to look and max, min.
        // if we cannot fulfill min, we return an error. 
        var min = quiz.min,
            max = quiz.max,
            count = min, // we automatically set our count to the minimum, that means at least this number questions will be generated
            questionBank = [], // this will contain the actual questions for the quiz
            random = quiz.random,
            retakes = quiz.retakes,
            questionIDs = _.pluck(questions, 'id'), // questions should be ordered by priority
            questionIDs = _.sortBy(questionIDs, function(question) {
                return question.priority
            });

        // if our min is greater than the number of questions in our bank, we throw an error
        if (min && min > _.size(questionIDs))
            return callback({
                error: Messages.errors.quiz.invalid
            });

        // now we take a random value between min and max
        if (min && max && min != max && min < max) { // if the question bank is less than the max, we take the question bank size
            var range = _.range(min, (_.size(questionIDs) < max) ? _.size(questionIDs) : max);
            // this pulls a random value from the range of min and max, assuming it is greater than 0
            if (_.size(range) > 0)
                count = _.sample(range, 1).pop();
        }

        /*
         * ERROR !!!! We forgot to reconcile the weight parameter, question weight needs to map to 100%
         */

        // if we have a randomize parameter, we resort the questionIDs array
        if (random)
            questionBank = _.sample(questionIDs, count);
        else // other wise, we tak the first questions from the question bank
            questionBank = _.first(questionIDs, count);

        // now we ckeck our models 

        // first we need to ensure the user has already not started a quiz (There should not be). If there is we return that session
        var currentQuiz = QuizSession.findOne({
            user: userID,
            quiz: quizID,
            active: true
        }).then(function(quiz) {
            return quiz;
        });

        // when creating the model we assign the first question as element [0] of our questionBank
        console.log("{QUIZ_SESSION.createSession} we are generating a session", questionBank);
        // QuizSession.create({
        //     user: params.user.id,
        //     quiz: params.quiz.id
        // }, function(err, session) {

        // });

        // to be referenced
        callback({ // @todo: change
            id: 0 // for dummy
        }); // this will be the session object
    }
};