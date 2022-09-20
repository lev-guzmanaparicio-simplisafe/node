//create a server

const http = require("http");

http
  .createServer((req, res) => {

    res.writeHead(200, { 'Content-type' : "application/json"});

    const persona = {
        edad: 19,
        nombre : "Juan"
    }

    res.write(JSON.stringify(persona));

    res.end(); //indicate we finish responding
  })
  .listen(9090);

  console.log('Escuchando en ', 9090);
