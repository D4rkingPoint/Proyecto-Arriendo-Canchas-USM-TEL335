const { User } = require('../models');
const { Reservation } = require('../models');

const userOptions = {
    include: [
       {
          model: Reservation,
          as: "reservations"
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