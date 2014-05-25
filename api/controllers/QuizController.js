/**
 * QuizController
 *
 * @description :: Server-side logic for managing Quizzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    start: function(req, res, next) {

        console.log("Hey I want to anser", req.params.all());

        var params = req.params.all(),
            id = params.id;

        if (!id)
            return res.badRequest({
                error: "A valid quiz id is required to initiate a quiz"
            });



        Quiz.findOneById(id).populate('questions').exec(function(err, quiz) {

            if (err)
                res.badRequest(err);

            console.log("{QUIZ_CONTROLLER_START} quiz object", quiz);

        });

        res.send("{QUIZ_CONTROLLER_START} Starting quiz");

    },

    answer: function(req, res, next) {

        console.log("{QUIZ_CONTROLLER_ANSWER}Hey I want to answer", req.params.all());
        next();
    },

    _config: {
        pluralize: false
    }

};