const { Reservation, Cancha, Sequelize } = require("../models");
const { Op, fn, col } = require('sequelize');
const { format, parseISO } = require('date-fns');
const { es, da } = require('date-fns/locale');

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

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservations' });
  }
};

exports.getReservationsStats = async (request, response) => {
  try {
    let filters = {};

    if (request.query.canchaId) {
      filters.canchaId = request.query.canchaId;
    } else {
      filters.userId = request.userId;
    }

    if (request.query.fecha) {
      const selectedDate = new Date(request.query.fecha);
      const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
      const endOfWeekDate = addDays(startOfWeekDate, 7);
      const startDate = format(startOfWeekDate, 'yyyy-MM-dd');
      const endDate = format(endOfWeekDate, 'yyyy-MM-dd');
      filters.fecha = { [Op.between]: [startDate, endDate] };
    }

    // Obtener reservas
    const reservations = await Reservation.findAll({
      where: filters,
      attributes: [
        'canchaId',
        'estado',
        [fn('COUNT', col('estado')), 'total']
      ],
      group: ['canchaId', 'estado']
    });

    // Obtener canchas
    const canchas = await Cancha.findAll({
      attributes: ['id', 'nombre']
    });

    // Crear un mapa para las canchas por id
    const canchaMap = canchas.reduce((map, cancha) => {
      map[cancha.id] = cancha.nombre;
      return map;
    }, {});

    // Procesar las reservas y añadir el nombre de la cancha
    const stats = reservations.reduce((acc, reservation) => {
      const canchaId = parseInt(reservation.canchaId, 10);
      const estado = reservation.estado;
      const count = parseInt(reservation.dataValues.total, 10);
      const canchaNombre = canchaMap[canchaId] || 'Desconocida'; // Valor por defecto si no se encuentra el id

      if (!acc[canchaId]) {
        acc[canchaId] = { nombre: canchaNombre, sinConfirmar: 0, confirmada: 0, anulada: 0 };
      }

      if (estado === 'Sin Confirmar') {
        acc[canchaId].sinConfirmar += count;
      } else if (estado === 'Confirmada') {
        acc[canchaId].confirmada += count;
      } else if (estado === 'Anulada') {
        acc[canchaId].anulada += count;
      }

      return acc;
    }, {});
    response.status(200).send({ stats });
  } catch (error) {
    response.status(500).send({ message: 'Error fetching reservation stats' });
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
