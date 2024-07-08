const { Notificacion } = require('../models');

exports.show = (request, response) => {
    return Notificacion.findByPk(request.params.notificacionId, {})
      .then(notificacion => {
        if (!notificacion) {
          response.status(404).send({ error: "Notificacion  doesnt exist" });
        } else {
          response.status(200).send(notificacion);
        }
      })
      .catch(error => response.status(400).send(error));
  };

  exports.showAll = (request, response) => {
    const userId = request.userId;
  
    return Notificacion.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    })
      .then(notificaciones => {
        if (notificaciones.length === 0) {
          return response.status(404).send({ message: 'No se encontraron notificaciones' });
        }
        response.status(200).send({ notificaciones });
      })
      .catch(error => response.status(400).send(error));
  };

exports.create = async ( request, response ) => {
    return await Notificacion.create( {
        tipo: request.body.tipo,
        userId: request.body.userId,
        mensaje: request.body.mensaje,
        fecha_envio: request.body.fecha_envio
    } , {} )
    .then( newNotificacion => Notificacion.findByPk( newNotificacion.id, {} )
        .then( notificacion => response.status(201).send( notificacion ) )
        .catch( error => response.status(400).send( error ) ) )
};


exports.update = async ( request, response ) => {
    return await Notificacion.update( {
        tipo: request.body.tipo,
        userId: request.body.userId,
        mensaje: request.body.mensaje,
        fecha_envio: request.body.fecha_envio
    } , {} )
    .then( newNotificacion => Notificacion.findByPk( newNotificacion.id, {} )
        .then( notificacion => response.status(201).send( notificacion ) )
        .catch( error => response.status(400).send( error ) ) )
};


exports.delete = async ( request, response ) => {
    return await Notificacion.destroy( {
        where: {
            id: request.params.reservationId
        }
    } )
    .then( notificacion => response.status(200).send( notificacion ) )
    .catch( error => response.status(400).send( error ) )
};

exports.markAsRead = async (request, response) => {
  return await Notificacion.update(
    { visto: true },
    { where: { id: request.params.notificacionId } }
  )
    .then(() => response.status(200).send({ message: 'Notificación marcada como leída' }))
    .catch(error => response.status(400).send(error));
};