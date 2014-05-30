/**
 * QuizSessionController
 *
 * @description :: Server-side logic for managing Quizsessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    current: function(req, res, next) {
        res.send("I've got nothing");
    },

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

    question: function(req, res, next) {

        var params = req.params.all();
        // we will need a method that is not in session for pulling the user. For now we are faking it
        var user = {
            id: 1
        };

        QuizSession.findOneById(params.id).populate('quiz').populate('user').exec(function(err, session) {

            //console.log(Messages.errors.quiz.noaccess);

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

            //            console.log("Our session", session);

            Question.findById(session.questions).populate('states').exec(function(err, questions) {

                if (err)
                    return res.badRequest(err);

                // first we check the skippable parameter. If it is false, we need to send only the active question
                if (!session.quiz.skippable) {
                    // var

                }


                console.log("Our questions", questions);

                res.send({
                    session: session,
                    questions: questions
                });

            })


        });


    }

};