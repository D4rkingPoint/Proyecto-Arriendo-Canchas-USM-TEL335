const reservationsController = require( "../controllers").reservations;
const { authorizeJwt } = require( "../middleware" );

module.exports = app => {
    app.get( "/reservation/:reservationId", reservationsController.show );
    app.post( "/reservar", [ authorizeJwt.verifyToken ], reservationsController.create );
 };