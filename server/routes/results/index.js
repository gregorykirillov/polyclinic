const generateResultsRoutes = (app, db) => {
    app.get('/api/get-results', (req, res) => {
        const sqlInsert = "SELECT results.id, patients.name AS patientName, staff.name AS staffName, " +
        "diagnoses.name AS diagnoseName, " + 
        "results.date, results.comments FROM results " + 
        "INNER JOIN patients ON results.patient_id = patients.id " + 
        "INNER JOIN staff ON results.staff_id = staff.id " + 
        "INNER JOIN diagnoses ON results.diagnose_id = diagnoses.id " +
        "ORDER BY results.date"
    
        db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })

    app.post('/api/set-result', (req, res) => {
        const {id, patientNameID, staffNameID, diagnoseNameID, date, comments} = req.body;
    
        const sqlInsert = id > 0
            ? `UPDATE results SET 
                patient_id = '${patientNameID}', 
                staff_id = '${staffNameID}',
                diagnose_id = '${diagnoseNameID}',
                date = '${date}',
                comments = '${comments}'
            WHERE id = '${id}'`
            : `INSERT INTO results VALUES (NULL, '${patientNameID}', '${staffNameID}', '${diagnoseNameID}', '${date}', '${comments}');`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result);
        })
    })

    app.delete('/api/delete-result', (req, res) => {
        const {id} = req.body;
    
        const sqlInsert = `DELETE FROM results WHERE id = '${id}'`;
    
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })
}

export default generateResultsRoutes;