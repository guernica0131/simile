/**
 * QuestionResponse.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


// here we will derive the response from the question
module.exports = {

    attributes: {

        correctText: {
            type: 'string'
        },

        incorrectText: {
            type: 'string'
        },

        partialText: {
            type: 'string'
        },

        document: {
            model: 'document'
        },
        // this is an identifing relationship
        parent: {
            model: 'questionState'
        },

        correct: {
            model: 'questionState'
        },

        incorrect: {
            model: 'questionState'
        },

        partial: {
            model: 'questionState'
        },

        evaluate: function() {
            var response = this.toObject();
            // we would return the data for the response
        }

    }


};