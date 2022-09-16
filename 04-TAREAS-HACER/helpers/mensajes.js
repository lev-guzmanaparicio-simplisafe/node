require('colors');

const mostrarMenu = () => {

    //para hacer que el main espere al usuario
    //regresa una promesa cuando quieras retornar un valor dentro de un callback 
    return new Promise( (resolve) => {
        console.clear();
        console.log('========================'.green)
        console.log('   Seleccione una opcion   ')
        console.log('========================\n'.green);
    
        console.log(`${'1.'.green} Crear Tarea`)
        console.log(`${'2.'.green} Listar Tarea`)
        console.log(`${'3.'.green} Listar tareas completadas`)
        console.log(`${'4.'.green} Listar tareas pendientes`)
        console.log(`${'5.'.green} Completar tarea(s)`)
        console.log(`${'6.'.green} Borrar tarea`)
        console.log(`${'0.'.green} Salir\n`)
    
        //input
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`Seleccione una opcion: `, (opt) => {
            readline.close();
            //queremos retornar opt pero esta dentro de un callback
            resolve(opt); 
        });
    });

   
}

const pausa= () => {

    //regresa una promesa para esperar al usuario
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar`, () => {
            readline.close();
            resolve();
        });
    })

   
}

module.exports = {
    mostrarMenu,
    pausa
}