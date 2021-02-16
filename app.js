require('dotenv').config();

const {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listarLugares,
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
    let opt;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                // Buscar los lugares
                const lugares = await busquedas.buscarCiudades(lugar);
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === 0) continue;
                const { nombre, lng, lat } = lugares.find((l) => l.id === id);
                // Guardar DB
                busquedas.agregarHistorial(nombre);

                // Clima
                const { desc, min, max, temp } = await busquedas.climaLugar(
                    lat,
                    lng
                );
                // Mostrar resultados
                console.clear();
                console.log('\nInfomarmación de la ciudad\n'.green);
                console.log('Ciudad: ', nombre.green);
                console.log('Lat: ', lat);
                console.log('Lng: ', lng);
                console.log('Temperatura: ', temp);
                console.log('Mínima: ', min);
                console.log('Máxima: ', max);
                console.log('Como está el clima: ', desc.green);

                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, index) => {
                    const idx = `${index + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;
        }

        if (opt !== 0) await inquirerPausa();
    } while (opt !== 0);
};

main();
