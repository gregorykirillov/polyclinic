const generateDoctorScheduleRoutes = (app, db) => {
    app.get('/api/get-doctor-schedule', (req, res) => {
        const id = req.query.id;
        const sqlInsert = id != "null" ? `SELECT * FROM schedule WHERE staff_id = '${id}'` : null;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })

    app.post('/api/set-doctor-schedule', (req, res) => {
        const {doctorId, dayId, start, end} = req.body;
        let sqlInsert = `SELECT * FROM schedule WHERE staff_id = ${doctorId} AND day_id = ${dayId}`;
        
        db.query(sqlInsert, (err, scheduleExists) => {
            sqlInsert = null;
            if (!scheduleExists.length) {
                if (start) sqlInsert = `INSERT INTO schedule VALUES (NULL, '${doctorId}', '${dayId}', '${start}', '${end}');`;
            }
            else 
                sqlInsert = !start ?
                    `DELETE FROM schedule WHERE staff_id = ${doctorId} AND day_id = ${dayId}` :
                    `UPDATE schedule SET time_start = '${start}', time_end = '${end}' WHERE staff_id = ${doctorId} AND day_id = ${dayId}`

            sqlInsert ? 
                db.query(sqlInsert, (err, result) => {
                    res.send(result)
                }) :
                res.send(null);
        })
    })
}

export default generateDoctorScheduleRoutes;