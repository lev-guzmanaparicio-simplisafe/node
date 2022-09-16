

/**
 * Usage:
 * _listado:
 * {
 *  'uuid283348' : {desc, completado en}
 *    
 * 
 * }
 */

const Tarea = require("./tarea");

class Tareas{

    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea );
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea (id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach((tarea) => {

            this._listado[tarea.id] = tarea;

        })
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto (){
        // Output
        // Numero en verde
        // completada en verde
        // Pendiente en rojo
        // 1. descripcion :: Completada | Pendiente
        console.log()
        Object.values(this._listado).forEach((tarea, i) => {
            const idx = `${i+1}.`.green ;
            //recuerda que puedes destructurar
            const {desc, completadoEn} = tarea;
            const completed = completadoEn 
                                ? "Completada".green 
                                : "Pendiente".red;

            console.log(`${idx} ${desc} :: ${completed}`)
        })
    }

    listarPendientesCompletadas( completadas = true ){
        console.log()
        let idx = 0;

        Object.values(this._listado).forEach((tarea) => {
            //recuerda que puedes destructurar
            const {desc, completadoEn} = tarea;
            const estado = completadoEn 
                                ? "Completada".green 
                                : "Pendiente".red;

            if(completadas){
                if(completadoEn){
                    idx += 1
                    const index = `${idx + '.'}`.red ;
                    console.log(`${index} ${desc} :: ${`${completadoEn}`.green}`)
                }
            }else{

                if(!completadoEn){
                    idx +=1;
                    //adding a string and number = string
                    const index = `${idx + '.'}`.red ;
                    console.log(`${index} ${desc} :: ${estado}`)
                }
            }
        })
    }

    toggleCompletadas(ids = [] ){

        ids.forEach(id => {

            const tarea = this._listado[id];

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea => {
            const {id} = tarea;

            if (!ids.includes(id)){
                //toggle to null 
                this._listado[id].completadoEn = null;
            }
        })

    }

}

module.exports = Tareas;