const { Horario } = require('../models');


exports.showAll = (request, response) => {

    return Horario.findAll({})
    .then( horario => {
        if (horario.length === 0) {
            return response.status(404).send({ message: 'No se encontraron Horarios' });
        }
        response.status(200).send({ horario });
    })
    .catch(error => response.status(400).send(error));
};

exports.showCancha = (request, response) => {
    return Horario.findAll({ where: {canchaId :request.query.canchaId}})
    .then(horario => {
        if(!horario){
            response.status(404).send({error: "Horario doesnt exist" });}
        else {response.status(200).send(horario);}
    })
    .catch(error => response.status(400).send(error));
};

exports.create = async (request, response) => {
    console.log(request.body)
    return await Horario.create({
        canchaId: request.body.canchaId,
        dia: request.body.dia,
        bloque: request.body.bloque,
        estado: 1
    },{})
    .then(newHorario => Horario.findByPk(newHorario.Id,{}))
        .then(newHorario => response.status(201).send(newHorario))
        .catch(error => response.status(400).send(error));
};

exports.update = async (request, response) => {
    return await Horario.update({
        cancahaId: request.params.horario.canchaId,
        estado: request.body.estado,
    },{})
    .then(newHorario => Horario.findByPk(newHorario.Id,{}))
        .then(newHorario => response.status(201).send(newHorario))
        .catch(error => response.status(400).send(error));
};

exports.delete = async (request, response) => {
    return await Horario.destroy({
        where: {
            Id: request.params.horario.Id
        }
    })
    .then(deleted => response.status(200).send(deleted))
    .catch(error => response.status(400).send(error));
};