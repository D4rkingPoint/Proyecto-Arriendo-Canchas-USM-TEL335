const reservationsController = require( "../controllers").reservations;
const { authorizeJwt } = require( "../middleware" );

module.exports = app => {
    app.get("/reservations", [authorizeJwt.verifyToken], reservationsController.showAll);
    app.get("/reservation/:reservationId", [authorizeJwt.verifyToken], reservationsController.show);
    app.post("/reservar", [authorizeJwt.verifyToken], reservationsController.create);
    app.put("/reservation/:reservationId", [authorizeJwt.verifyToken], reservationsController.update);
    app.delete("/reservation/:reservationId", [authorizeJwt.verifyToken], reservationsController.delete);
    app.get("/confirm/:token", reservationsController.confirm);
  };