const canchasController = require( "../controllers").canchas;
const { authorizeJwt } = require( "../middleware" );

module.exports = app => {
    app.get('/canchas', [authorizeJwt.verifyToken], canchasController.showAll);
    app.get('/canchas/:id', [authorizeJwt.verifyToken], canchasController.show);
    app.post('/canchas', [authorizeJwt.verifyToken], canchasController.create);
    app.put('/canchas/:id', [authorizeJwt.verifyToken], canchasController.update);
    app.delete('/canchas/:id', [authorizeJwt.verifyToken], canchasController.delete);
    app.put('/canchas/:id/disable', [authorizeJwt.verifyToken], canchasController.disable); // Nueva ruta
};