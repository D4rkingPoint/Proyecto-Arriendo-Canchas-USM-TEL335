const { Cancha } = require('../models');
const { Reservation } = require('../models');
const { Horario } = require('../models');

const canchaOptions = {
    include: [
        {
            model: Reservation,
            as: "reservations",
            model: Horario,
            as: "horarios",
        }
    ]
};

exports.showAll = (request, response) => {
    let filters = {};

    if (request.query.tipo) {
        filters.tipo = request.query.tipo;
    }

    if (request.query.ubicacion) {
        filters.ubicacion = request.query.ubicacion;
    }

    return Cancha.findAll({
        where: filters
    })
    .then(canchas => {
        if (canchas.length === 0) {
            return response.status(404).send({ message: 'No se encontraron canchas' });
        }
        response.status(200).send({ canchas });
    })
    .catch(error => response.status(400).send(error));
};



exports.show = (request, response) => {
    return Cancha.findByPk(request.params.id, canchaOptions)
    .then(cancha => {
        if (!cancha) {return response.status(404).send({ message: 'Cancha no encontrada'});}
        else {response.status(200).send({ cancha });}
    })
    .catch(error => response.status(400).send(error));
};

exports.create = async (request, response) => {
    return await Cancha.create({
        nombre: request.body.nombre, 
        tipo: request.body.tipo, 
        ubicacion: request.body.ubicacion,
        fotografia: request.body.fotografia,
        estado_disponibilidad: 1
    } , {})
    .then(newCancha => Cancha.findByPk(newCancha.id,{}))
        .then(newCancha => response.status(201).send(newCancha))
        .catch(error => response.status(400).send(error));
};

exports.update = async (request, response) => {
    return await Cancha.update({
        nombre: request.body.nombre, 
        tipo: request.body.tipo, 
        ubicacion: request.body.ubicacion,
        fotografia: request.body.fotografia,
        estado_disponibilidad: request.body.estado_disponibilidad        
    } ,{})
    .then(newCancha => Cancha.findByPk(newCancha.id,{}))
        .then(newCancha => response.status(201).send(newCancha))
        .catch(error => response.status(400).send(error));
};

exports.delete = async (request, response) => {
    return await Cancha.destroy({
        where: {
            id: request.params.id
        }
    })
   .then(() => response.status(200).send({ message: 'Cancha eliminada'}))
};

