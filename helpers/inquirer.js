const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`,
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`,
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción   '.green);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
};

const inquirerPausa = async () => {
    const confirmacion = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.green} para continuar`,
        },
    ];
    console.log('\n');

    await inquirer.prompt(confirmacion);
};

const leerInput = async (message) => {
    const entrada = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese una descripción';
                }
                return true;
            },
        },
    ];

    const { desc } = await inquirer.prompt(entrada);
    return desc;
};

const listarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, index) => {
        const idx = `${index + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`,
        };
    });

    choices.push({ value: 0, name: `${'0.'.green} Cancelar` });

    const preguntas = [
        { type: 'list', name: 'id', message: 'Seleccionar lugar: ', choices },
    ];
    const { id } = await inquirer.prompt(preguntas);
    return id;
};

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listarLugares,
};
