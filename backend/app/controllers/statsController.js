const { Reservation, Sequelize } = require("../models");
const { Op } = require("sequelize");
const { format, parseISO } = require('date-fns');
const { es } = require('date-fns/locale');

const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

exports.getReservationsByBlock = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const reservations = await Reservation.findAll({
      attributes: [
        'bloque',
        'fecha',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'reservas']
      ],
      where: {
        fecha: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      },
      group: ['bloque', 'fecha']
    });

    const totalReservations = reservations.reduce((sum, reservation) => sum + parseInt(reservation.dataValues.reservas, 10), 0);

    const data = reservations.map(reservation => {
        const dayName = format(parseISO(reservation.dataValues.fecha), 'eeee', { locale: es });
        return {
          bloque: reservation.dataValues.bloque,
          reservas: reservation.dataValues.reservas,
          dia: dayName,
          percentage: totalReservations ? ((reservation.dataValues.reservas / totalReservations) * 100).toFixed(2) : '0.00'
        };
      });

    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching reservations' });
  }
};


exports.getFrecuenciaData = async (req, res) => {
  try {
    const results = await Reservation.findAll({
      attributes: [
        [Sequelize.fn('DAYNAME', Sequelize.col('fecha')), 'dia'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'reservas'],
      ],
      group: ['dia'],
      order: [
        [Sequelize.fn('FIELD', Sequelize.fn('DAYNAME', Sequelize.col('fecha')), 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')],
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPieData = async (req, res) => {
  const { date } = req.query;

  try {
    const results = await Reservation.findAll({
      attributes: [
        'canchaId',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'reservas'],
      ],
      where: {
        fecha: {
          [Op.eq]: date,
        },
      },
      group: ['canchaId'],
    });

    const canchaIds = results.map(result => result.canchaId);
    const canchas = await Cancha.findAll({
      where: {
        id: canchaIds,
      },
    });

    const canchaMap = {};
    canchas.forEach(cancha => {
      canchaMap[cancha.id] = cancha.nombre;
    });

    const transformedResults = results.map(result => ({
      cancha: canchaMap[result.canchaId],
      reservas: result.dataValues.reservas,
    }));

    res.status(200).json(transformedResults);
  } catch (error) {
    res.status(500).send(error);
  }
};
