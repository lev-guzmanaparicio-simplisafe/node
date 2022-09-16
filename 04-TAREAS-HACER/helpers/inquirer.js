const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name : 'opcion',
        message : 'Que desea hacer?',
        choices : [
            {
                value: '1',
                name: `${'1.'.red} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.red} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.red} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.red} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.red} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.red} Borrar tarea(s)`
            },
            {
                value: '0',
                name: `${'0.'.red} Salir`,
            },
            


        ]
    }
]



const inquirerMenu = async () => {

    console.clear();
    console.log('========================'.green)
    console.log('  Seleccione una opcion'.white)
    console.log('========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion
}

const pausa = async () => {

    console.log();
    await inquirer.prompt({
        type: 'input',
        name: 'pausa',
        message:  `Presione ${'ENTER'.green} para continuar`
    });
}

const leerInput = async (message) => {

    const question = [
    {
        type: 'input',
        name :'desc',
        message,
        validate(value){
            if( value.length == 0){
                //regresa un error
                return 'Por favor ingerese un valor';
            }
            return true;
        }
    }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc
}

// despliega las tareas a borrar
const listadoTareasBorrar = async (tareas = []) => {
    // {
    //     value: tarea.id,
    //     name: `${'1.'.red} Crear tarea`
    // }

    const choices = tareas.map((tarea,i) => {
        const idx = `${i + 1}.`.red
        return {
            value : tarea.id,
            name : `${idx} ${tarea.desc}`
        }
    });

    //añade el objeto al principio del arreglo
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const preguntas = [
        {
            type: "list",
            name: "id",
            message : "Borrar",
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    
    return id;
}

const confirmar = async (message) => {


    const question = [
        {
        type: "confirm",
        name: "ok",
        message
        }
    ]

    //ok is a boolean
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostarListadoChecklist = async (tareas = []) => {
    // {
    //     value: tarea.id,
    //     name: `${'1.'.red} Crear tarea`
    // }

    const choices = tareas.map((tarea,i) => {
        const idx = `${i + 1}.`.red
        return {
            value : tarea.id,
            name : `${idx} ${tarea.desc}`,
            checked : (tarea.completadoEn) ? true : false
        }
    });

    const preguntas = [
        {
            type: "checkbox",
            name: "ids",
            message : "Selecciones",
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
    
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostarListadoChecklist
}
