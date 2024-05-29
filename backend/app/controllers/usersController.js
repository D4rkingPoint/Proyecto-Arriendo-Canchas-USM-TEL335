const { User } = require('../models');
const { Reservation } = require('../models');
const { Notification } = require('../models');

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