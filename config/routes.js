/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {


    // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
    // default view engine) your home page.
    //
    // (Alternatively, remove this and add an `index.html` file in your `assets` directory)
    // '/': {
    //   view: 'homepage'
    // },

    // Custom routes here...
    // If no id is given, an array of all users will be returned
    'get /api/v1/quizzes': {
        controller: 'quiz',
        action: 'find'
    },
    'get /api/v1/quizzes/:id?': {
        controller: 'quiz',
        action: 'find'
    },
    'post /api/v1/quizzes': {
        controller: 'quiz',
        action: 'create'
    },
    'put /api/v1/quizzes/:id': {
        controller: 'quiz',
        action: 'update'
    },
    'delete /api/v1/quizzes/:id': {
        controller: 'quiz',
        action: 'destroy'
    },

    // 'get /api/v1/quizzes/answer/:id/question/respond/:rid': {
    //     controller: 'question',
    //     action: 'respond'
    // }
    // reconfigure
    'get /api/v1/quiz/answer/:id/*': {
        controller: 'quiz',
        action: 'answer'
    },

    'get */questions/answer/:id': {
        controller: 'question',
        action: 'answer'
    },

    'post /api/v1/quiz/:id/answer': {
        controller: 'quiz',
        action: 'answer'
    }




    // If a request to a URL doesn't match any of the custom routes above,
    // it is matched against Sails route blueprints.  See `config/blueprints.js`
    // for configuration options and examples.

};