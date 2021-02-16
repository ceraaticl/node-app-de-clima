const axios = require('axios');

class Busquedas {
    historial = [];

    get paramsMapBox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es',
        };
    }

    constructor() {
        // TODO: Leer DB si existe!
    }

    async ciudad(lugar = '') {
        try {
            // Petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox,
            });

            const resp = await instance.get();
            console.log(resp.data);

            return [];
        } catch (error) {
            return [];
        }
    }
}

module.exports = Busquedas;
