const estadisticasController = require('../controllers/statsController');
const { authorizeJwt } = require( "../middleware" );

module.exports = app => {
    app.get('/estadisticas/horario', [ authorizeJwt.verifyToken ], estadisticasController.getReservationsByBlock);
    app.get('/estadisticas/reservas', [ authorizeJwt.verifyToken ], estadisticasController.getReservationsStats);
    app.get('/estadisticas/pie', [ authorizeJwt.verifyToken ], estadisticasController.getPieData);
 };