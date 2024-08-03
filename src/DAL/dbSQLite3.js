function dbSQLite3() {
    const querys = {
        createTBL_NotasParciales: 
        `CREATE TABLE IF NOT EXISTS TBL_NotasParciales(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Fecha TEXT,
        Materia TEXT,
        Estudiante TEXT,
        "1er Examen" INTEGER,
        "% 1er Examen" INTEGER,
        "2do Examen" INTEGER,
        "% 2do Examen" INTEGER,
        "3er Examen" INTEGER,
        "% 3er Examen" INTEGER,
        "4to Examen" INTEGER,
        "% 4to Examen" INTEGER,
        Acumulativo INTEGER,
        "Nota Total" INTEGER)`,

        insertTBL_NotasParciales:
        `INSERT INTO TBL_NotasParciales (
        Fecha, Materia, Estudiante,
        "1er Examen", "% 1er Examen",
        "2do Examen", "% 2do Examen",
        "3er Examen", "% 3er Examen",
        "4to Examen", "% 4to Examen",
        Acumulativo, "Nota Total"
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
        };
    return querys;
}

module.exports = dbSQLite3;