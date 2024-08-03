const dbSQLite3 = require('./src/DAL/dbSQLite3');
const querys = dbSQLite3();
function connectionDB(totalNotes) {
    const sqlite3 = require('sqlite3').verbose();

    // Crea o abre una base de datos
    const db = new sqlite3.Database('./export/db/db_SQLite.db', (err) => {
        if (err) {
            console.error('Error al abrir la base de datos:', err.message);
        } else {
            console.log('Conectado a la base de datos SQLite.');
        }
    });

    // Crear una tabla si no existe
    db.serialize(() => {
        db.run(querys.createTBL_NotasParciales, (err) => {
            if (err) {
                console.error('Error al crear la tabla:', err.message);
            } else {
                console.log('Tabla creada o ya existente.');
            }
        });
    });

    // Insertar los datos en la base de datos
    for (const note of totalNotes) {
        console.log(note);

        
        db.serialize(() => {
            const insertQuery = querys.insertTBL_NotasParciales;

            db.run(insertQuery, note, function (err) {
                if (err) {
                    return console.error('Error al insertar datos:', err.message);
                }
                console.log(`Fila insertada con el ID: ${this.lastID}`);
            });
        });
    }

    // Cerrar la conexión con la base de datos
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la base de datos:', err.message);
        } else {
            console.log('Conexión con la base de datos cerrada.');
        }
    });
}

module.exports = connectionDB;