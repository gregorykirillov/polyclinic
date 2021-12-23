const generateSpecialtiesRoutes = (app, db) => {
    app.get('/api/get-specialties', (req, res) => {
        const sqlInsert = "SELECT id, specialty FROM specialties;"
    
        db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })

    app.post('/api/set-specialty', (req, res) => {
        const {id, specialty} = req.body;
    
        const sqlInsert = id > 0
            ? `UPDATE specialties SET 
                specialty = '${specialty}'
            WHERE id = '${id}'`
            : `INSERT INTO specialties VALUES (NULL, '${specialty}');`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result);
        })
    })

    app.delete('/api/delete-specialty', (req, res) => {
        const {id} = req.body;
    
        const sqlInsert = `DELETE FROM specialties WHERE id = '${id}'`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })
}

export default generateSpecialtiesRoutes;