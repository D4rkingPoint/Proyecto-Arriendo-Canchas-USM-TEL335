// cron.js
const cron = require('node-cron');
const { Op } = require('sequelize');
const { Reservation } = require('../models'); 


const Bloques = ['8:15-9:25', '9:35-10:45', '10:55-12:05', '12:15-13:25', '14:30-15:40', '15:50-17:00', '17:10-18:20', '18:30-19:40', '19:50-21:00', '21:10-22:20']

const getStartTimeFromBlock = (block) => {
    const [start, end] = Bloques[block - 1].split('-');
    return start;
};

const sendNotification = async (userId, message,title) => {
  try {
    await Notificacion.create({
      tipo: title,
      userId: userId,
      mensaje: message,
      fecha_envio: new Date()
    });
    console.log('Notificación enviada:', message);
  } catch (error) {
    console.error('Error enviando notificación', error);
  }
};

const checkAndUpdateReservations = async () => {
  try {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const currentDay = now.toISOString().split('T')[0];

    const reservations = await Reservation.findAll({
        where: {
          estado: 'Sin Confirmar',
          fecha: {
            [Op.eq]: currentDay,
          },
        },
    });
    for (let reservation of reservations) {
      const blockStartTime = getStartTimeFromBlock(reservation.bloque);
      const [hours, minutes] = blockStartTime.split(':').map(Number);
      const reservationDateTime = new Date(reservation.fecha);
      reservationDateTime.setHours(hours, minutes, 0, 0);

      if (reservationDateTime - now <= 60 * 60 * 1000) {
        const message = `Tu reserva para el bloque ${reservation.bloque} el ${reservation.fecha} ha sido anulada debido a la falta de confirmación.`;
        await sendNotification(reservation.userId, message, "Reserva Anulada");
        
        reservation.estado = 'Anulada';
        await reservation.save();
      }
    }

    const reminderTime = 2 * 60 * 60 * 1000; // 2 horas
    const upcomingReservations = await Reservation.findAll({
      where: {
        estado: 'Sin Confirmar',
        fecha: {
          [Op.eq]: currentDay,
        },
      },
    });

    for (let reservation of upcomingReservations) {
      const blockStartTime = getStartTimeFromBlock(reservation.bloque);
      const [hours, minutes] = blockStartTime.split(':').map(Number);
      const reservationDateTime = new Date(reservation.fecha);
      reservationDateTime.setHours(hours, minutes, 0, 0);

      if (reservationDateTime - now <= reminderTime && reservationDateTime - now > 0) {
        const message = `Recuerda que tienes una reserva para el bloque ${reservation.bloque} en ${reservation.fecha}. Por favor, confirma tu reserva a la brevedad.`;
        await sendNotification(reservation.userId, message);
      }
    }
    

    console.log(`Checked and updated reservations at ${now}`);
  } catch (error) {
    console.error('Error updating reservations', error);
  }
};

// Configurar el cron job para que se ejecute cada hora
cron.schedule('0 * * * *', checkAndUpdateReservations);
