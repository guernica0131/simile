/**
 * QuestionResponse.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


// here we will derive the response from the question
module.exports = {

    attributes: {
        // the response text if there is a correct answer
        correctText: {
            type: 'text'
        },
        // the response text if there is a incorrect answer
        incorrectText: {
            type: 'text'
        },
        // the response text if there is a partial answer
        partialText: {
            type: 'text'
        },
        // assocates back to the lesson document
        document: {
            model: 'document'
        },
        // this is an identifing relationship
        parent: {
            model: 'questionState',
            required: true
        },
        // If there are no more correct states, we can move to the next state
        correct: {
            model: 'questionState',
            // required: true
        },
        // If there are no more incorrect states, we can move to the next state
        incorrect: {
            model: 'questionState',
            // required: true
        },
        // this means there needs to be some template for render the logic
        partial: {
            model: 'questionState'
        },
        // this means we are dealing with a dynamic question, where the results are interpreted from the input
        interpreted: {
            type: 'boolean',
            required: true,
            defaultsTo: false
        },
        // the solution can be predefined if it is not interpreted
        solution: {
            type: 'json'
        },
        // used to evaluate to interpreted and noninterpreted solutions
        evaluate: function() {
            var response = this.toObject();
            // we would return the data for the response
        },

        // the solution should not be sent back through the API
        toJSON: function() {
            var response = this.toObject();
            delete response.solution;
            return response;
        },


    }


};