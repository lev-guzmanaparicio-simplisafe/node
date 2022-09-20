const express = require("express");
const app = express();
const PORT = 9090;


//Servir una pagina web estatica usando middleware
app.use( express.static('public') );


app.get("/", function (req, res) {
    //El middleware se ejecuta antes de cada path
  res.send("Home page");
});

app.get("/generic", function (req, res) {
    res.sendFile(`${__dirname}/public/generic.html`)
  });

  app.get("/elements", function (req, res) {
    res.sendFile(`${__dirname}/public/elements.html`)
  });

app.get("*", function (req, res) {
    //ENVIAR PAGINA HTML DE PUBLIC/404.html

    res.sendFile(__dirname + '/public/404.html');
  });

app.listen(PORT) , () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
};
