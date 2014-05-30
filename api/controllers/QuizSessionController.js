/**
 * QuizSessionController
 *
 * @description :: Server-side logic for managing Quizsessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /*
     * Gets the current quiz session
     */
    current: function(req, res, next) {
        var params = req.params.all();
        // fake the user
        var user = {
            id: 1
        },
            search = {
                active: true,
                expired: false
            };

        if (user)
            search.user = user.id;
        if (params.id)
            search.quiz = params.id;

        QuizSession.find(search).exec(function(err, quiz) {
            res.send(quiz);
        });
    },

    /*
     * Pulls the current session time
     */
    time: function(req, res, next) {
        var params = req.params.all();
        QuizSession.findOneById(params.id).populate('quiz').exec(function(err, session) {
            // if error we return
            if (err)
                return res.badRequest(err);
            // if it is undefined
            if (_.isUndefined(session))
                return res.badRequest(Message.errors.quiz.undefinedQuiz);
            //console.log("HERE", session.time(session.quiz));
            return res.send(session.time(session.quiz));
        });


    },

    /*
     * This action pulls the questions for a specific QuizSession. There are two states, 1) a quiz is not
     * ordered, we we have the freedom to page the question, return the selected questions and all states,
     * 2) the quiz is ordered and we only return the current questin and state
     */

    question: function(req, res, next) {

        var params = req.params.all();
        // we will need a method that is not in session for pulling the user. For now we are faking it
        var user = {
            id: 1
        };

        var qs = QuizSession.findOneById(params.id);
        qs.populate('quiz')
            .populate('user')
            .populate('question')
            .populate('state').exec(function(err, session) {
                /*
                 * Constraints
                 */
                // if we have an error return it
                if (err)
                    return res.badRequest(err);
                // if our session is undefined, we return
                if (_.isUndefined(session))
                    return res.badRequest({
                        error: Messages.errors.quiz.noSession
                    });
                // if the user is not assigned to a quiz we return
                if (session.user && session.user.id !== user.id)
                    return res.badRequest({
                        error: Messages.errors.quiz.noaccess
                    });
                // if there is no quiz assigned to the session we return
                if (!session.quiz)
                    return res.badRequest({
                        error: Messages.errors.quiz.malformedsession
                    });
                // if our session is inactive, we return
                if (!session.active)
                    return res.badRequest({
                        error: Messages.errors.quiz.notactive
                    })
                    // if our session is expired, we return
                if (session.isExpired(session.quiz))
                    return res.badRequest({
                        error: Messages.errors.quiz.expired
                    })

                Question.findById(session.questions).populate('states').exec(function(err, questions) {

                    if (err)
                        return res.badRequest(err);

                    // first we check the skippable parameter. If it is false, we need to send only the active question
                    if (!session.quiz.ordered) {
                        var q = [];

                        if (params.paged && params.end) {
                            // we get the state and end paremters
                            var end = _.size(questions),
                                start = 0;
                            // if we have a ender parameter that is a number and it is greater than 0, we set it, but also if it is less that the size of the question bank
                            if (!isNaN(params.end) && params.end <= _.size(questions) && params.end > 0)
                                end = params.end;
                            // if we have a start parameter that is a number and it is greater than 0, we set it
                            if (params.start && !isNaN(params.start) && params.start > 0)
                                start = params.start
                                // just in case
                            try {
                                q = questions.slice(start, end);
                            } catch (e) {
                                console.error("{QUIZ_SESSION_CONTROLLER.questions} splice exception", e);
                            }
                            // if we have a params question, then we check to see if it is a number and that it is > 0  and that it is < quesitons.length
                        } else if (params.question && !isNaN(params.question) && params.question >= 0 && params.question < _.size(questions)) {
                            // just in case
                            try {
                                q[0] = questions[params.question];
                            } catch (e) {
                                console.error("{QUIZ_SESSION_CONTROLLER.questions} index exception", e);
                            }

                        } else {
                            q = questions;
                        }

                        /*
                         * NEED TO CREATE THE ACTICITIES
                         */
                        var act = _.map(q, function(p) {
                            return {
                                action: 'delivered',
                                question: p.id,
                                state: p.states[0].id,
                                session: session.id
                            }

                        });

                        QuizActivity.create(act, function(err, activities) {
                            if (err)
                                console.error(err);
                        });

                        return res.send({
                            session: session.id,
                            questions: [q]
                        });
                        //console.log("Questions", quesions);
                        // res.send(session);
                    } else {
                        if (!session.question || !session.question.id)
                            return res.badRequest({
                                error: Message.errors.quiz.invalid
                            });

                        var state;
                        // q for question
                        q = _.where(questions, {
                            id: session.question.id
                        })[0];
                        // we apply the current session state
                        if (session.state && session.state.id)
                            state = session.state;
                        else if (q && q.sessions && q.sessions) { // if it is not assigned we assign the first and save
                            // here we assign the first state and 
                            var state = q.states[0];
                            // now we assign the state to the session
                            if (state && state.id) {
                                session.state = state.id;
                                session.save(console.log); // we need to save the session
                            } else
                                return res.badRequest({
                                    error: Message.errors.quiz.invalid
                                });
                        }

                        QuizActivity.create({
                            action: 'delivered',
                            question: session.question.id,
                            state: state.id,
                            session: session.id
                        }, function(err, activity) {
                            if (err)
                                console.error("{QUIZ_SESSION_CONTROLLER, questions} Activity delivery failed", activity);
                        });
                        var q = _.clone(session.question);
                        q.states = [state];

                        res.send({
                            session: session.id,
                            questions: [q]
                        });

                    }



                })


            });


    }

};