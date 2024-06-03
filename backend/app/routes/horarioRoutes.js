const horariosController = require( "../controllers").horarios;
const { authorizeJwt } = require( "../middleware" );

module.exports = app => {
    app.get('/horarios',[ authorizeJwt.verifyToken ] , horariosController.showAll);
    app.get('/horariosCancha',[ authorizeJwt.verifyToken ] , horariosController.showCancha);
    app.post('/horarios',[ authorizeJwt.verifyToken ], horariosController.create);
    app.put('/horarios/:id',[ authorizeJwt.verifyToken ], horariosController.update);
    app.delete('/horarios/:id',[ authorizeJwt.verifyToken ], horariosController.delete);

 };