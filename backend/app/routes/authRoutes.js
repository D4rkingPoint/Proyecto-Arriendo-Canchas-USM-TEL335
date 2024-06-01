const { verifySignUp } = require( "../middleware" );
const authController = require( "../controllers" ).auth;
module.exports = app => {
  app.use( ( request, response, next ) => {
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  } );
  app.post( "/auth/signup", [ verifySignUp.checkForDuplicateEmail ], authController.signUp );
  app.post( "/auth/signin", authController.signIn );
};