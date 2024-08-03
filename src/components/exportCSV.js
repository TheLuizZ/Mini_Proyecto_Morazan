const fs = require('fs');
const path = require('path');

function exportCSV(totalNotes) {
    const convertToCSV = (dataArray) => {
        return dataArray.map(row => row.join(';')).join('\n');
    };

    const dataString = convertToCSV(totalNotes);
    
    const folderPath = path.join('C:', 'morazanfiles');
    
    const nombreArchivo = 'notas.csv';
    const rutaCompleta = path.join(folderPath, nombreArchivo);

    // Verificar si el directorio existe, y crearlo si no
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log('Directorio creado:', folderPath);
    }

    // Verificar si el archivo existe para añadir cabecera solo la primera vez
    const necesitaCabecera = !fs.existsSync(rutaCompleta);

    // Añadir datos al archivo CSV (Titulos si necesario)
    fs.appendFile(rutaCompleta, (necesitaCabecera ? 'Fecha;Materia;Estudiante;1er Examen;% 1er Examen;2do Examen;% 2do Examen;3er Examen;% 3er Examen;4to Examen;% 4to Examen;Acumulativo;Nota Total\n' : '') + dataString + '\n', (err) => {
        if (err) {
            console.error('Error al escribir el archivo CSV:', err);
        } else {
            console.log(`Datos añadidos exitosamente al archivo CSV en: ${rutaCompleta}`);
        }
    });
}

module.exports = exportCSV;