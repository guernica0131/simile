/**
 * QuestionController
 *
 * @description :: Server-side logic for managing Questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    answer: function(req, res, next) {
        console.log("What up", req.params.all());


        res.send("Cool");


    }

};