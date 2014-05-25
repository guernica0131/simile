/**
 * Lesson.js
 *
 * @description :: Lesson content are the parent models for course content, containing documents for
 * 					lesson managment
 * @docs        :: http://projectsimile.org/#docs/lessons
 */

module.exports = {

    attributes: {

        quizzes: {
            collection: 'quiz',
            via: 'lessons'
        }

    }
};