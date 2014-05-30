// this object defines the error messages sent to the end user
var sails = require('sails');


module.exports.errors = {
    quiz: {

        parameters: "Insufficient parameters to initiate this quiz",
        general: "There was an error processing this quiz request. Please try again.",
        unpublished: "You are attempting to take an unpublished quiz. Please contact your quiz administrator for further instructions",
        inactive: "This quiz is currently inactive. Contact your quiz adminstrator for further instructions.",
        invalid: "You are attempting to take an invalid quiz. Please contact your quiz adminstrator.",
        noRetakes: "You've exceeded the maximum number of retakes for the quiz. Please contact your quiz adminstrator for more information",
        session: "You already have a quiz in session. Please resume your quiz with session id ",
        undefinedQuiz: "There is no quiz matching this ID",
        minmax: "The minimum number of questions assigned to this quiz exceeds either the maximum parameter or number of questions in the question bank. Please contact your quiz adminstrator for more details",
        noSession: "There is no session matching this id",
        noaccess: "You are not permitted to access this quiz.",
        notactive: "This session is no longer active. Please go to " + sails.getBaseurl() + "/api/v1/quizSession/:id/current to get your current session or " + sails.getBaseurl() + "/api/v1/quiz/:id/start to begin again.",
        expired: "This session expired. Please go to " + sails.getBaseurl() + "/api/v1/quizSession/:id/current to get your current session or " + sails.getBaseurl() + "/api/v1/quiz/:id/start to begin again.",
        malformedsession: "There is no quiz assigned to this session. Please go to " + sails.getBaseurl() + "/api/v1/quizSession/:id/current to get your current session",
    },

    model: {
        unknown: "An unknown error occurred processing your request. Please try again later."
    }
}