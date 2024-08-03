const connectionDB = require('./connectionDB');
const exportCSV = require('./src/components/exportCSV');

const readline = require('readline');

let totalNotas = [];

// Crear una interfaz de readline para leer la entrada del usuario desde la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function realizarAccion(opcion) {
    switch (opcion) {
        case '1':
            console.log("Has seleccionado la opción 1");
            solicitarNotas();
            break;
        case '2':
            console.log("Has seleccionado la opción 2");
            rl.close();
            break;
        default:
            console.log("Opción no válida. Por favor, selecciona 1 o 2.");
            return false;
    }
    return true;
}

function solicitarOpcion() {
    rl.question('\n"Bienvenido al Mini Proyecto Morazan"\n\nElije una de las siguientes opciones:\n1) Agregar notas de Estudiante.\n2) Salir.\n', (respuesta) => {
        const esValido = realizarAccion(respuesta);
        if (!esValido || respuesta === '1') {
            solicitarOpcion();
        } else {
            rl.close();
        }
    });
}

function hacerPregunta(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            if (respuesta.trim() === '') {
                console.log("Entrada no válida. Campo no puede ir vacío.");
                resolve(hacerPregunta(pregunta));
            } else if (pregunta.includes('Examen')){
                if (!esSoloNumeros(respuesta)){
                    console.log("Entrada no válida. Campo solo pueden ser numeros positivos.");
                    resolve(hacerPregunta(pregunta));
                } else {
                resolve(respuesta);
                } 
            } else {
                resolve(respuesta);
            }
        });
    });
}


function esSoloNumeros(cadena) {
    const soloNumerosRegex = /^\d+$/;
    return soloNumerosRegex.test(cadena);
}

async function solicitarNotas() {
    const preguntas = [
        'Ingresa la fecha: ',
        'Ingresa el nombre de la materia: ',
        'Ingresa el nombre del Estudiante: ',
        'Ingresa la nota del 1er Examen: ',
        'Ingresa la nota del 2do Examen: ',
        'Ingresa la nota del 3er Examen: ',
        'Ingresa la nota del 4to Examen: ',
        'Ingresa la nota del Acumulativo: ',
    ];

    const respuestas = [];
    let sumaNotas = 0;
    for (const pregunta of preguntas) {
        const respuesta = await hacerPregunta(pregunta);
        if (pregunta.includes('Examen')) {
            const numberParseFloat = parseFloat(respuesta);
            respuestas.push(Math.round(numberParseFloat));
            respuestas.push(Math.round(numberParseFloat * 0.15));
            sumaNotas = sumaNotas + (numberParseFloat * 0.15);
            console.log('sumaNotas: ', sumaNotas);
        } else if (pregunta.includes('Acumulativo')) {
            const numberParseFloat = parseFloat(respuesta);
            respuestas.push(Math.round(numberParseFloat));
            sumaNotas = sumaNotas + (numberParseFloat * 1);
            respuestas.push(Math.round(sumaNotas));
            console.log('sumaNotas: ', sumaNotas);
        } else {
            respuestas.push(respuesta);
        }
        console.log('respuestas: ', respuestas);
    }

    notasGlobales = respuestas;
    console.log('Notas globales: ', notasGlobales);

    totalNotas.push(notasGlobales);
    console.log('totalNotas: ', totalNotas);

    solicitarOpcion2();
}

solicitarOpcion();

function realizarAccion2(opcion) {
    switch (opcion) {
        case '1':
            console.log("Has seleccionado la opción 1");
            solicitarNotas();
            break;
        case '2':
            console.log("Has seleccionado la opción 2"); 
            connectionDB(totalNotas);
            exportCSV(totalNotas);
            break;
        case '3':
            console.log("Has seleccionado la opción 3");
            rl.close();
            break;
        default:
            console.log("Opción no válida. Por favor, selecciona 1, 2, o 3.");
            return false;
    }
    return true;
}

function solicitarOpcion2() {
    rl.question('\nElije una de las siguientes opciones:\n1) Agregar notas de otro estudiante.\n2) Guardar & Exportar CSV.\n3) Salir.\n', (respuesta) => {
        const esValido = realizarAccion2(respuesta);
        if (!esValido || respuesta === '1') {
            solicitarOpcion2();
        } else {
            rl.close();
        }
    });
}

