/**
 * QuizSession.js
 *
 * @description :: This model manages the quizes, users and questions.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var Q = require('q');


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
            collection: 'quizActivity',
            via: 'session'
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
        // We can invalidate a quiz session so that it is not on the record
        valid: {
            type: 'boolean',
            defaultsTo: true,
            required: true
        },

        isExpired: function(quiz) {
            //console.log("HEY", quiz);

            var session = this.toObject();

            if (session.expired)
                return session.expired;
            //createdAt
            if (quiz.timed) {

                var started = session.createdAt;
                start = new Date(started),
                now = new Date(),
                start.setMinutes(start.getMinutes() + quiz.timed);
                //now.addMinutes(50)

                if (now.valueOf() > start.valueOf()) {
                    this.expired = true;
                    //this.expired = true;
                    this.save(console.log);
                    return true;

                }
            }
            return false;
        },

        time: function(quiz) {
            var session = this.toObject();

            if (!quiz.timed)
                return {
                    message: "Unlimited minutes remain",
                    time: 999999
                };

            if (session.expired || this.isExpired(quiz)) {
                return {
                    message: "This session has expired",
                    expired: true
                };
            }


            var started = session.createdAt;
            start = new Date(started),
            now = new Date(),
            left = new Date();

            start.setSeconds(start.getSeconds() + (quiz.timed * 60));

            var delta = start.getTime() - now.getTime();

            // console.log("now", now);
            // console.log("start", start);

            // var delta = date2_ms - date1_ms;
            //take out milliseconds
            difference_ms = delta / 1000;
            var seconds = Math.floor(difference_ms % 60);
            difference_ms = difference_ms / 60;
            var minutes = Math.floor(difference_ms % 60);
            difference_ms = difference_ms / 60;
            var hours = Math.floor(difference_ms % 24);
            var days = Math.floor(difference_ms / 24);

            if (delta < 0)
                return {
                    message: "This session has expired",
                    expired: true
                };
            var message = "You have ";

            if (days)
                message += days + ((days > 1) ? ' days ' : ' day ');

            if (hours)
                message += hours + ((hours > 1) ? ' hours ' : ' hour ');

            if (minutes)
                message += minutes + ((minutes > 1) ? ' minutes and ' : ' minute and ');

            message += seconds + ((seconds > 1) ? ' seconds ' : ' second ');


            message += "remaining";


            return {
                message: message,
                time: delta, //parseFloat(remain),
                expired: false
            }

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
            questionBank = [], // this will contain the actual questions for the quiz
            random = quiz.random,
            retakes = quiz.retakes,
            questionIDs = _.pluck(questions, 'id'), // questions should be ordered by priority
            count = _.size(questionIDs), // we automatically set our count to the minimum, that means at least this number questions will be generated
            questionIDs = _.sortBy(questionIDs, function(question) {
                return question.priority
            });
        // now we take a random value between min and max
        if ((min && min > _.size(questionIDs)) || (min && max && min != max && min > max))
            return callback({ // if we have no max but our min < questionIDs or min > max
                error: Messages.errors.quiz.minmax
            });

        else if ((!min && max && max <= _.size(questionIDs)) || (min && max && min === max && max <= _.size(questionIDs)))
            count = max; // if we have no min but max we set our count at max or we have a min equal to max and max <= to the question bank
        else if (min && max && min != max && min < max) { // if the question bank is less than the max, we take the question bank size
            var range = _.range(min, (_.size(questionIDs) < max) ? _.size(questionIDs) : max);
            // this pulls a random value from the range of min and max, assuming it is greater than 0
            if (_.size(range) > 0)
                count = _.sample(range, 1).pop();
        }

        // if we have a randomize parameter, we resort the questionIDs array
        if (random)
            questionBank = _.sample(questionIDs, count);
        else // other wise, we tak the first questions from the question bank
            questionBank = _.first(questionIDs, count);

        // first we need to ensure the user has already not started a quiz (There should not be). If there is we return that session
        var currentQuizSession = QuizSession.findOne({
            user: userID,
            quiz: quizID,
            active: true,
            expired: false
        }).then(function(quiz) {
            return quiz;
        });
        // we need this to count the number of session for this quiz, this ensures we are not going over the quested amount
        var AllQuizSessions = QuizSession.find({
            user: userID,
            quiz: quizID,
            valid: true
        }).populate('activity').then(function(quiz) {
            return quiz;
        });

        // we now pull our question bank
        var QandA = Question.findById(questionBank).populate('states').then(function(question) {
            return question;
        });

        Q.spread([currentQuizSession, AllQuizSessions, QandA, quiz, questionBank], function(currentQuizSession, AllQuizSessions, QandA, quiz, questionBank) {
            // we call valid to ensure we are creating a valid quiz
            QuizSession._isValid(currentQuizSession, AllQuizSessions, quiz, function(message) {


                // of there is an error we return it
                if (message.error) {
                    // we track all activity
                    // if the session is current we append to current
                    if (currentQuizSession) {

                        QuizActivity.create({
                            action: 'restrictedAttempt',
                            extras: message,
                            session: currentQuizSession.id
                        }, console.log);
                        // otherwise we need to create a new invalid session
                    } else {

                        QuizSession.create({
                            user: params.user.id,
                            quiz: params.quiz.id,
                            valid: false,
                            active: false
                        }, function(err, session) {
                            if (err)
                                return console.error(err);

                            QuizActivity.create({
                                action: 'restrictedAttempt',
                                extras: message,
                                session: session.id
                            }, console.error);
                        });


                    }

                    return callback(message);

                } else {


                    // now let's build our session
                    QuizSession.create({
                        user: params.user.id,
                        quiz: params.quiz.id,
                        questions: questionBank
                    }, function(err, session) {



                        if (err) {
                            sails.log("{QUIZ_SESSION.createSession} session creation error ", err);
                            return callback(Messages.errors.model.unknown);
                        }
                        // we pull the frist question
                        var first = _.first(QandA);

                        QuizActivity.create({
                            action: !_.isUndefined(currentQuizSession) ? 'retake' : 'created',
                            question: first.id,
                            state: first.states[0].id,
                            session: session.id //qs.id
                        }, function(err, activity) {
                            if (err) {
                                console.error("{QUIZ_SESSION.createSession} activity creation error ", err);
                                return callback(Messages.errors.model.unknown);
                            }
                            return callback({
                                session: session.id
                            });

                        });
                    });


                }

            });

        }).fail(function(error) {
            return callback({
                error: Messages.errors.model.unknown
            });

        });

    },

    _format: function(params, callback) {

        var session = params.session,
            quiz = params.quiz,
            layout = quiz.layout,
            key = _.keys(layout),
            obj = {};


        QuizSession._format({
            session: session,
            quiz: quiz
        }, function(result) {
            return callback({
                quiz: result
            });
        });


    },


    /*
     * This function is used to validate creating a new session
     */
    _isValid: function(quizSession, allSessions, quiz, callback) {

        //console.error(_.size(allSessions));
        // is our quizsession is defined and our quiz is not complete or expired, we return, @todo ::: check sizes!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (!_.isUndefined(quizSession) && (quizSession.active && !quizSession.isExpired(quiz)))
            return callback({
                error: Messages.errors.quiz.session + "'" + quizSession.id + "'"
            });
        // if we have a quiz session already, and there are no retakes, and retakes aren't set to 0
        if (!_.isUndefined(allSessions) && quiz.chances && _.size(allSessions) >= quiz.chances)
            return callback({
                error: Messages.errors.quiz.noRetakes
            });

        callback({
            valid: true
        });

    }



};