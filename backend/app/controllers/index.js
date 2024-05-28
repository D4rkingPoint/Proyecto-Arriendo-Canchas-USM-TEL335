const reservations = require( "./reservationsController.js" );
const users = require( "./usersController.js" );
const auth = require( "./authController.js" );


module.exports = { 
    reservations,
    users,
    auth
 };