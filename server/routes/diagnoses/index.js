const generateDiagnosesRoutes = (app, db) => {
    app.get('/api/get-diagnoses', (req, res) => {
        const sqlInsert = "SELECT id, name FROM diagnoses;"
    
        db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })

    app.post('/api/set-diagnose', (req, res) => {
        const {id, name} = req.body;
    
        const sqlInsert = id > 0
            ? `UPDATE diagnoses SET 
                name = '${name}'
            WHERE id = '${id}'`
            : `INSERT INTO diagnoses VALUES (NULL, '${name}');`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result);
        })
    })

    app.delete('/api/delete-diagnose', (req, res) => {
        const {id} = req.body;
    
        const sqlInsert = `DELETE FROM diagnoses WHERE id = '${id}'`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })
}

export default generateDiagnosesRoutes;