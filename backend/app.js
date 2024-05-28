// app.js
require( "dotenv" ).config();
const express = require('express');
const cors = require( "cors" );
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use( express.urlencoded({ extended: true } ) );
app.use( cors( { origin: `http://localhost:${ PORT }` } ) );

require( "./app/routes" )( app );
app.get( "/", ( request, response ) => response.send( "Test" ) );

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});