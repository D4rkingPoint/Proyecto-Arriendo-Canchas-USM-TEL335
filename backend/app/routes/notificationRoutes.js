const notificacionesController = require('../controllers/notificacionesController');
const { authorizeJwt } = require('../middleware');

module.exports = app => {
  app.get('/notificaciones', [authorizeJwt.verifyToken], notificacionesController.showAll);
  app.get('/notificaciones/:id/leida', [authorizeJwt.verifyToken], notificacionesController.showAll);
};