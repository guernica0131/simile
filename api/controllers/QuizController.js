/**
 * QuizController
 *
 * @description :: Server-side logic for managing Quizzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    start: function(req, res, next) {

        var params = req.params.all(),
            id = params.id;

        if (!id)
            return res.badRequest({
                error: "A valid quiz id is required to initiate a quiz"
            });



        Quiz.findOneById(id).populate('questions').exec(function(err, quiz) {


            // console.log("{QUIZ_CONTROLLER_START} quiz object", quiz);

            if (err || _.isUndefined(quiz))
                return res.badRequest({
                    error: ((err) ? err : Messages.errors.quiz.undefinedQuiz)
                });
            // there are a few cases here we need to identify
            // first we need to create a quiz session object, we will append the user and the 
            // the quiz
            var params = {
                quiz: quiz,
                user: {
                    id: 1
                } // dummy user for testing
            };
            // we call this function to create our quiz session 
            QuizSession.createSession(params, function(session) {
                //   console.log("{QUIZ_CONTROLLER_START} quiz object", quiz);
                if (session.error)
                    return res.badRequest(session);

                res.send(session);
            });



        });

    },

    answer: function(req, res, next) {

        console.log("{QUIZ_CONTROLLER_ANSWER}Hey I want to answer", req.params.all());

        res.send("The answer to your question quite is clear");
    },

    _config: {
        pluralize: false
    }

};