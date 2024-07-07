const notificacionesController = require('../controllers/notificacionesController');
const { authorizeJwt } = require('../middleware');

module.exports = app => {
  app.get('/notificaciones', [authorizeJwt.verifyToken], notificacionesController.showAll);
};