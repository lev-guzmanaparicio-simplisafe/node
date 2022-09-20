const fs = require('fs');

const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = './db/database.json'

  constructor() {
    this.leerDB();
  }

  get historialCapitalizado(){

    return this.historial.map(lugar => {

        let words = lugar.split(' ');

        words = words.map(word => word.charAt(0).toUpperCase() + word.substring(1));

        return words.join(' ')

    });

  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY, //Access via dotenv package
      limit: 5,
      language: "es",
    };
  }

  get paramsWeather(){
    return {
        appid: process.env.OPENWEATHER_KEY,
        units: "metric",
        lang: "es",
      };
  }

  async ciudad(lugar = "") {
    try {
      //Peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox,
      });

      const res = await instance.get();
      return res.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      // Crear instancia de axios
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        // 3 puntos = desestructuracion
        params: {...this.paramsWeather, lat, lon}
      });

      //Respuesta, extraer res.data
      const res = await instance.get();
      const { description } = res.data.weather[0];
      const { temp, temp_min, temp_max } = res.data.main;

      return {
        //descripcion
        desc: description,
        min: temp_min,
        max: temp_max,
        temp: temp,
      };
    } catch (e) {
      console.log(e);
    }
  }

  agregarHistorial(lugar = ""){
    if(this.historial.includes(lugar.toLowerCase())){
        return;
    }

    this.historial.unshift(lugar.toLowerCase());

    //Grabar en db
    this.guardarDB();
  }

  guardarDB(){
    const payload = {
        historial : this.historial,
    }

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB(){
    
    if(!fs.existsSync(this.dbPath)) return;
    
    //encoding tuf8
    const info = fs.readFileSync(this.dbPath, {encoding : 'utf-8'});

    //const info = JSON
    const data = JSON.parse(info);
    
    this.historial = data.historial

  }

}

module.exports = Busquedas;
