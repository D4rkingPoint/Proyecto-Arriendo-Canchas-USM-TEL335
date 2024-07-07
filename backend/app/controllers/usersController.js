const { User, Reservation, Sequelize, Notification } = require("../models");


const userOptions = {
    include: [
       {
          model: Reservation,
          as: "reservations",
          model : Notification,
          as: "notifications",
       }
    ]
 };

 exports.showAll = async (req, res) => {
   try {
     const users = await User.findAll({
       attributes: [
         'id', 
         'nombre',
         'apellido',
         'is_admin',
         'disable ',
         [Sequelize.fn('COUNT', Sequelize.col('reservations.id')), 'totalReservas'],
         [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN reservations.estado = 'Confirmada' THEN 1 ELSE 0 END`)), 'reservasConfirmadas'],
         [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN reservations.estado = 'Anulada' THEN 1 ELSE 0 END`)), 'reservasAnuladas'],
         [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN reservations.estado = 'Sin Confirmar' THEN 1 ELSE 0 END`)), 'reservasSinConfirmar']
       ],
       include: [{
         model: Reservation,
         as:"reservations",
         attributes: []
       }],
       group: ['User.id']
     });
 
     if (users.length === 0) {
       return res.status(404).send({ message: 'No se encontraron usuarios' });
     }
 
     const usersWithReservationInfo = users.map(user => {
       const userData = user.toJSON();
       return {
         ...userData,
         totalReservas: parseInt(userData.totalReservas),
         reservasConfirmadas: parseInt(userData.reservasConfirmadas),
         reservasAnuladas: parseInt(userData.reservasAnuladas),
         reservasSinConfirmar: parseInt(userData.reservasSinConfirmar)
       };
     });
 
     res.status(200).send({ users: usersWithReservationInfo });
 
   } catch (error) {
      console.log(error)
      res.status(400).send(error);
   }
 };
 
exports.show = ( request, response ) => {
    return User.findByPk( request.params.userId, userOptions )
       .then( user => {
          if ( !user ) { response.status( 404 ).send( { error: "User not found" } ); }
          else { response.status( 200 ).send( user ); }
       } )
       .catch( error => response.status( 400 ).send( error ) );
 }

exports.create = async ( request, response ) => {
    return await User.create( {
      email: request.body.email,
      password: request.body.password,
      nombre: request.body.nombre,
      apellido: request.body.apellido,
      disable: 0,
      is_admin: 0
    }, {} )
    .then( newUser => User.findByPk( newUser.id, {}))
       .then( newUser => response.status( 201 ).send( newUser ) )
       .catch( error => response.status( 400 ).send( error ) );
 };

exports.update = async ( request, response ) => {
   return await User.update( {
      mail: request.body.email,
      password: request.body.password,
      nombre: request.body.nombre,
      apellido: request.body.apellido,
      disable: request.body.disable,
      is_admin: request.body.is_admin
   } , {})
   .then( newUser => User.findByPk( newUser.id, {}))
       .then( newUser => response.status( 201 ).send( newUser ) )
       .catch( error => response.status( 400 ).send( error ) );
 };

exports.delete = async ( request, response ) => {
   return await User.destroy( { where: { id: request.params.userId } } )
       .then( newUser => response.status( 201 ).send( newUser ) )
       .catch( error => response.status( 400 ).send( error ) );
 };

exports.disableUser = async (req, res) => {
   const { userId } = req.params;
   const { disableDate } = req.body;
 
   try {
     const user = await User.findByPk(userId);
     if (!user) {
       return res.status(404).send({ message: 'Usuario no encontrado' });
     }
 
     // Aquí puedes actualizar el estado del usuario o hacer la lógica que necesites para deshabilitarlo
     user.disabledUntil = disableDate;
     user.disable = true;
     await user.save();
 
     res.status(200).send({ message: 'Usuario deshabilitado exitosamente' });
   } catch (error) {
     res.status(400).send(error);
   }
 };


 exports.enableUser = async (req, res) => {
   const { userId } = req.params;
 
   try {
     const user = await User.findByPk(userId);
     if (!user) {
       return res.status(404).send({ message: 'Usuario no encontrado' });
     }
 
     user.disabledUntil = null;
     user.disabled = false;
     await user.save();
 
     res.status(200).send({ message: 'Usuario habilitado exitosamente' });
   } catch (error) {
     res.status(400).send(error);
   }
 };