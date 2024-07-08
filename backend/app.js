require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('./app/utils/cron');
const app = express();
const PORT = process.env.PORT || 3000;

const createAdminIfNotExists = require('./app/utils/initialize');

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Habilitar CORS para todas las solicitudes

require("./app/routes")(app);
app.get("/", (request, response) => response.send("Test"));

createAdminIfNotExists().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en el puerto ${PORT}`);
    });
  }).catch(error => {
    console.error('Error al iniciar el servidor:', error);
  });