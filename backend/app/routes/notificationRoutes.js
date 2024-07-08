const notificacionesController = require('../controllers/notificacionesController');
const { authorizeJwt } = require('../middleware');

module.exports = app => {
  app.get('/notificaciones', [authorizeJwt.verifyToken], notificacionesController.showAll);
  app.put('/notificaciones/:notificacionId/leida', [authorizeJwt.verifyToken], notificacionesController.markAsRead); // Actualizar la notificación como leída
};