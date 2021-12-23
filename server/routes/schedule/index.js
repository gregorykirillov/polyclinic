const generateDoctorScheduleRoutes = (app, db) => {
    app.get('/api/get-doctor-schedule', (req, res) => {
        const id = req.query.id;
        const sqlInsert = id != "null" ? `SELECT * FROM schedule WHERE staff_id = '${id}'` : null;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })

    app.post('/api/set-doctor-schedule', (req, res) => {

        const sqlInsert = `INSERT INTO schedule VALUES (NULL, '845', '0', '8:00', '18:00');`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result);
        })
    })
}

export default generateDoctorScheduleRoutes;