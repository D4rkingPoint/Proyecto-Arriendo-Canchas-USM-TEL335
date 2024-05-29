const { Horario } = require('../models');

exports.show = (request, response) => {
    return Horario.findByPk(request.params.horario.Id,{})
    .then(horario => {
        if(!horario){
            response.status(404).send({error: "Horario doesnt exist" });}
        else {response.status(200).send(horario);}
    })
    .catch(error => response.status(400).send(error));
};

exports.create = async (request, response) => {
    return await Horario.create({
        cancahaId: request.params.horario.canchaId,
        start_time: request.body.start_time,
        end_time: request.body.end_time,
        estado: 1
    },{})
    .then(newHorario => Horario.findByPk(newHorario.Id,{}))
        .then(newHorario => response.status(201).send(newHorario))
        .catch(error => response.status(400).send(error));
};

exports.update = async (request, response) => {
    return await Horario.update({
        cancahaId: request.params.horario.canchaId,
        start_time: request.body.start_time,
        end_time: request.body.end_time,
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