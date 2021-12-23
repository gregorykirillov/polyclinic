const generatePatientsRoutes = (app, db) => {
    app.get('/api/get-patients', (req, res) => {
        const sqlInsert = "SELECT id, name, birthdate, address, phone FROM patients;"
    
        db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })

    app.post('/api/set-pacient', (req, res) => {
        const {id, fullName, birthdate, address, phone} = req.body;
    
        const sqlInsert = id > 0
            ? `UPDATE patients SET 
                name = '${fullName}',
                birthdate = '${birthdate}',
                address = '${address}',
                phone = '${phone}'
            WHERE id = '${id}'`
            : `INSERT INTO patients VALUES (NULL, '${fullName}', '${birthdate}', '${address}', '${phone}');`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result);
        })
    })

    app.delete('/api/delete-patient', (req, res) => {
        const {id} = req.body;
    
        const sqlInsert = `DELETE FROM patients WHERE id = '${id}'`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })
}

export default generatePatientsRoutes;