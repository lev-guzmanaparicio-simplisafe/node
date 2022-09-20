const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    //middlewares
    this.middlewares();

    //rutas de la app
    this.routes();
  }

  middlewares() {
    //directorio publico
    this.app.use(cors()); //cross origin resource sharing, server protection

    //lectura y parseo del body
    this.app.use(express.json()); //recibe json

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
