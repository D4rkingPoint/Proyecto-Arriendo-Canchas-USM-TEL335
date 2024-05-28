const User = require( "../models" ).User;
const checkForDuplicateEmail = ( request, response, next ) => {
    console.log(request.body)
  User.findOne( { where: { email: request.body.email } } ).then( user => {
    if ( user ) {
      response.status( 400 ).send( { error: "Email already taken" } );
      return;
    }
    next();
  } );
}
module.exports = { checkForDuplicateEmail };