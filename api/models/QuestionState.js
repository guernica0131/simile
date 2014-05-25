/**
 * QuestionState.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        // this is the body of the question. It is the actual question being asked. It can be in 
        // HTML form, and will render Javascript form
        body: {
            type: 'text'
        },
        // optional instructions can be assined
        instruction: {
            type: 'string'
        },
        // maps back to a question, this is an identifying relationship
        question: {
            // required: true,
            model: 'question'
        },
        // gives the array or choices e.g. ['True', 'False']
        choices: {
            type: 'array'
        },
        // option client-side template for rendering
        template: {
            type: 'string'
        },
        // this defines the weight in the overall question. Selected questions must map to 100%
        // this value must map to 100% 
        weight: {
            type: 'float'
        },
        // used to generate the question type,
        // e.g. checkbox - only one right answer
        // selectbox, one or many right answers
        kind: {
            type: 'string',
            defaultsTo: 'custom',
            in : ['checkbox', 'selectbox', 'appication', 'matching', 'textbox', 'text', 'custom']
        },

        response: {
            model: 'questionResponse'
        },

        // we need a user/state to manage the user experiences
        // complete: {
        //     type: 'boolean',
        //     //required = 
        // },

        // contains logic to manage the question
        package: {
            type: 'json'
        }

    }


};