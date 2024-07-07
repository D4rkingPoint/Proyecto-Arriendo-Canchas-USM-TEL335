const database = require( "../models" );
const config = require( "../config/auth.config.js" );
const User = database.User;
const jwt = require( "jsonwebtoken" );
const bcrypt = require( "bcryptjs" );

exports.signUp = ( request, response ) => {
    return User.create( {
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        email: request.body.email,
        password: bcrypt.hashSync( request.body.password, 8 ),
        disable: true,
        is_admin: false
    })
    .then( newUser => response.status( 201 ).send( newUser ) )
    .catch( error => response.status( 500 ).send( error ) );
}

exports.signIn = ( request, response ) => {
    const signInError = { accessToken: null, error: "Contraseña o Email invalidos" }; 
    const signInNotValid = { accessToken: null, error: "El usuario esta deshabilitado" }; 
    return User.findOne( { where: { email: request.body.email } } )
        .then( user => {
            if ( !user ) return response.status( 401 ).send( signInError );
            const validPassword = bcrypt.compareSync( request.body.password, user.password );
            if ( !validPassword ) return response.status( 401 ).send( signInError );
            if (user.disable) return response.status( 401 ).send( signInNotValid );
            const token = jwt.sign( { id: user.id , role:user.is_admin }, config.secret, { expiresIn: 86400 } );
            response.status(200).send({ id: user.id, email: user.email, isAdmin: user.is_admin, accessToken: token });
        } )
        .catch( error => response.status( 500 ).send( error ) );
}
