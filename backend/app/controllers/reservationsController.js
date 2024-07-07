const { Reservation, User, Cancha, Notificacion } = require('../models');
const crypto = require('crypto');
const { startOfWeek, endOfWeek, format } = require('date-fns');
const { Op } = require('sequelize');
const { sendMail } = require('../utils/mailer');


const generateToken = () => crypto.randomBytes(20).toString('hex');

exports.showAll = (request, response) => {
  let filters = {};
  let include = [];

  if (request.query.estado) {
    filters.estado = request.query.estado;
  }

  if (request.query.canchaId) {
    filters.canchaId = request.query.canchaId;
  } else {
    filters.userId = request.userId;
    include.push({
      model: Cancha,
      as: 'cancha', // Usa el alias definido en la asociación
      attributes: ['nombre'] // Ajusta los atributos según el modelo Cancha
    });

  }

  if (request.query.fecha) {
    const startDate = format(startOfWeek(new Date(request.query.fecha), { weekStartsOn: 0 }), 'yyyy-MM-dd');
    const endDate = format(endOfWeek(new Date(request.query.fecha), { weekStartsOn: 0 }), 'yyyy-MM-dd');
    filters.fecha = {
      [Op.between]: [startDate, endDate]
    };
  }

  return Reservation.findAll({
    where: filters,
    include: include
  })
    .then(reservas => {
      if (reservas.length === 0) {
        return response.status(404).send({ message: 'No se encontraron reservaciones' });
      }
      response.status(200).send({ reservas });
      
    })
    .catch(error => {
      response.status(400).send(error)
    });
};

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

const Bloques = ['8:15-9:25', '9:35-10:45', '10:55-12:05', '12:15-13:25', '14:30-15:40', '15:50-17:00', '17:10-18:20', '18:30-19:40', '19:50-21:00', '21:10-22:20']

exports.create = async ( request, response ) => {
  const { fecha, bloque, canchaId } = request.body;
  const userId = request.userId;
  const confirmationToken = generateToken();

  try {
    const reservation = await Reservation.create({
      fecha,
      bloque,
      canchaId,
      estado: "Sin Confirmar",
      userId,
      confirmationToken
    });
    const user = await User.findByPk(userId);
    const cancha = await Cancha.findByPk(canchaId);
    const confirmationUrl = `http://127.0.0.1:8000/confirm/${confirmationToken}`;
    const mensaje1 = `Tu reserva para la cancha ${cancha.nombre} en el bloque ${bloque}(${Bloques[bloque+1]}) ha sido agendada para el día ${fecha}.`;
    const mensaje2 = `Tu reserva para la cancha ${cancha.nombre} en el bloque ${bloque}(${Bloques[bloque+1]}) ha sido agendada para el día ${fecha}. Por favor, confirma tu reserva haciendo clic en el siguiente enlace: ${confirmationUrl}. Si no confirmas al menos 1 hora antes de la hora seleccionada, se anualara tu reserva. `;



    await Notificacion.create({
      tipo: 'Reserva Hecha',
      userId,
      mensaje: mensaje1,
      fecha_envio: new Date(),
    });

    if (user && cancha) {

      await sendMail(user.email, 'Confirma tu reserva', mensaje2);
    }

    response.status(201).send(reservation);
  } catch (error) {
    console.error('Error creating reservation', error);
    response.status(500).send({ message: 'Error creating reservation' });
  }
  
};

exports.confirm = async (request, response) => {
  const { token } = request.params;

  try {
    const reservation = await Reservation.findOne({ where: { confirmationToken: token } });

    if (!reservation) {
      return response.status(404).send({ message: 'Reservation not found or already confirmed' });
    }

    if (reservation.estado === "Confirmada") {
      return response.status(200).send({ message: 'Reservation already confirmed' });
    }

    reservation.estado = "Confirmada";
    reservation.confirmationToken = null; // Remove the token after successful confirmation
    await reservation.save();

    const cancha = await Cancha.findByPk(reservation.canchaId);
    const notificationMessage = `Tu reserva para la cancha ${cancha.nombre} en el bloque ${reservation.bloque} (${Bloques[reservation.bloque - 1]}) ha sido confirmada para el día ${reservation.fecha}.`;

    await Notificacion.create({
      tipo: 'Reserva Confirmada',
      userId: reservation.userId,
      mensaje: notificationMessage,
      fecha_envio: new Date()
    });

    response.status(200).send({ message: 'Reservation confirmed successfully' });
  } catch (error) {
    console.error('Error confirming reservation', error);
    response.status(500).send({ message: 'Error confirming reservation' });
  }
};



exports.update = async (request, response) => {
  return await Reservation.update( {
    fecha: request.body.fecha,
    bloque: request.body.bloque,
    estado: "Sin confirmar",
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
