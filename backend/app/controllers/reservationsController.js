const { Reservation } = require('../models');

exports.show = (request, response) => {
  return Reservation.findByPk(request.params.reservationId, {})
    .then(reservation => {
      if (!reservation) {
        response.status(404).send({ error: "Reservation not found" });
      } else {
        response.status(200).send(reservation);
      }
    })
    .catch(error => response.status(400).send(error));
};

exports.create = async ( request, response ) => {
  return await Reservation.create( {
    fecha: request.body.fecha,
    bloque: request.body.bloque,
    estado: "Sin Confirmar",
    userId: request.userId
  }, {} )
    .then( newReserve => Reservation.findByPk( newReserve.id, {} )
      .then( newReserve => response.status( 201 ).send( newReserve ) )
      .catch( error => response.status( 400 ).send( error ) )
    );
};


exports.update = async (request, response) => {
  return await Reservation.update( {
    fecha: request.body.fecha,
    bloque: request.body.bloque,
    estado: request.body.estado,
    userId: request.userId
  } , {})
  .then( newReserve => Reservation.findByPk( newReserve.id, {} )
    .then( newReserve => response.status( 200 ).send( newReserve ) )
    .catch( error => response.status( 400 ).send( error ) )
  );
};

exports.delete = async (request, response) => {
  return await Reservation.destroy( {
    where: {
      id: request.params.reservationId
    }
  } )
   .then( () => response.status( 204 ).send() )
   .catch( error => response.status( 400 ).send( error ) );
};
