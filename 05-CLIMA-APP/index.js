const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();
    
    switch(opt){
        case 1:
            //Obtener lugar del usuario
            const lugar = await leerInput('Ciudad: ');
            await busquedas.ciudad(lugar);
            //buscar los lugares

            // Seleccionar el lugar

            //Obtener datos del clima

            //Mostrar resultados
            console.log(`\nInformacion de la ciudad\n`.green);
            console.log('Ciudad:', );
            console.log("Lat:", );
            console.log("Lng:", );
            console.log("Temperatura:", );
            console.log('Minima:', );
            break;
    }
    
    if (opt !== 0) await pausa();

  } while (opt !== 0);
};

//TODO: Santiago's challenge: add a redis layer
// cache interno o cache externo

main();
