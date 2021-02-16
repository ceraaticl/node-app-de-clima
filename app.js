require('dotenv').config();

const {
    inquirerMenu,
    inquirerPausa,
    leerInput,
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
    let opt;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // TODO: Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
                // TODO: Buscar los lugares
                // TODO: Seleccionar el lugar
                // TODO: Clima
                // TODO: Mostrar resultados
                console.log('\nInfomarmación de la ciudad\n'.green);
                console.log('Ciudad: ');
                console.log('Lat: ');
                console.log('Lng: ');
                console.log('Temperatura: ');
                console.log('Mínima: ');
                console.log('Máxima: ');

                break;
            case 2:
                break;
        }

        if (opt !== 0) await inquirerPausa();
    } while (opt !== 0);
};

main();
