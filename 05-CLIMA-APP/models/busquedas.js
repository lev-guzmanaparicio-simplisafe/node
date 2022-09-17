const axios = require('axios');

class Busquedas{
    historial = [];

    constructor(){
        // TODO: leer DB si existe
    }

    async ciudad (lugar= '') {
        
        try{
            //Peticion http
            const res = await axios.get('https://reqres.in/api/users?page=2')
            console.log(res.data)

        }catch (error){
            return [];
        }


        return []; //regresar los lugares que coincidan con lugar    
    }

}

module.exports = Busquedas;