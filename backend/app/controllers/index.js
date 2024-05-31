const horarios = require("./horariosController.js")
const canchas = require("./canchasController.js")
const notificacions = require("./notificacionesController.js")
const reservations = require( "./reservationsController.js" );
const users = require( "./usersController.js" );
const auth = require( "./authController.js" );


module.exports = { 
    horarios,
    canchas,
    notificacions, 
    reservations,
    users,
    auth
 };