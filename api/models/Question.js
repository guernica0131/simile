/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        // a question can be named
        name: {
            type: 'string'
        },
        // // this is the body of the question. It is the actual question being asked. It can be in 
        // // HTML form, and will render Javascript form
        // body: {
        //     type: 'text'
        // },
        // if the question has a timer, we place it here
        timed: {
            type: 'numeric',
            defaultsTo: 0
        },
        // you can assign a difficultly the question, higher the more difficult
        difficulty: {
            type: 'integer',
            in : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        // when we randomize, a priority can be assigned to ensure the question is asked. The higher the priority the more likely it will get assinged
        priority: {
            type: 'integer',
            //in: [0,1,2,3,4,5,6,7,8,9,10]
        },
        // this question can belong to one or many quizzes
        quizzes: {
            collection: 'quiz',
            via: 'questions'
        },
        // contains master instructions for the collection
        instruction: {
            type: 'string'
        },
        // there can be one or many question state, this means a question can be in the form
        // that takes multiple parts. The question state contains the actual question content
        states: {
            collection: 'questionState',
            via: 'question'
        },
        // this defines the weight in the overall quiz. Selected questions must map to 100%
        // each state will have it's derived part that will be a percentage of this value
        weight: {
            type: 'float'
        },
        progress: function() {
            var response = this.toObject();
            // function that finds the current progress
            return 1;
        },
        next: function() {
            // we will use this function to tell the record it needs to move to the next state.
            // if we are at the end state, we will call next on the quiz
        },


    },



};