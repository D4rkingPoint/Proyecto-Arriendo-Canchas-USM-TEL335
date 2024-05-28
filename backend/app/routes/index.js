module.exports = app => {
    require( "../routes/authRoutes" )( app );
    require( "../routes/reservationRoutes" )( app );
    require( "../routes/userRoutes" )( app );
  };