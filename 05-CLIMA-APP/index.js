require('dotenv').config(); // dotenv package

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Obtener lugar del usuario
        const busqueda = await leerInput("Ciudad: ");

        //buscar los lugares
        const lugares = await busquedas.ciudad(busqueda);

        // Seleccionar el lugar, menu interactivo
        const idSeleccionado = await listarLugares(lugares);

        //usuario cancelo
        if(idSeleccionado === 0) continue
          

        //Obtener informacion de la ciudad
        const {nombre, lng, lat } = lugares.find(lugar => lugar.id === idSeleccionado);

        //guardar en db
        busquedas.agregarHistorial(nombre);
        
        //Obtener datos del clima
        const clima = await busquedas.climaLugar(lat, lng);

        const {min,max, temp, desc} = clima;


        //Mostrar resultados
        console.log(`\nInformacion de la ciudad\n`.green);
        console.log("Ciudad:", nombre );
        console.log("Lat:" , lat);
        console.log("Lng:", lng);
        console.log("Temperatura:" , temp);
        console.log("Minima:", min);
        console.log("Maxima:", max);
        console.log("Como esta el clima:", desc);
        break;

      case 2:
        //Display 
        busquedas.historialCapitalizado.forEach( (lugar, i )=> {

          const idx = `${i+1}.`.green;

          console.log(`${idx} ${lugar}`);

        })
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

//TODO: Santiago's challenge: add a redis layer
// cache interno o cache externo

main();
