const generateDoctorsRoutes = (app, db) => {
    app.get('/api/get-doctors', (req, res) => {
        const sqlInsert = "SELECT staff.id, name, position, image, specialty FROM staff, " +
        "specialties WHERE specialties.id = specialty_id;"
    
        db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })

    app.get('/api/get-doctors-by-specialty', (req, res) => {
        const specID = req.query.specID;
        
        const sqlInsert = specID != "null" ? `SELECT staff.id, name, position, image, specialty FROM `
        + `staff, specialties WHERE specialties.id='${specID}' AND specialties.id = specialty_id;` : null;
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })

    app.post('/api/set-doctor', (req, res) => {
        const {id, fullName, specialty, position, image} = req.body;
    
        const sqlInsert = id > 0
            ? `UPDATE staff SET 
                name = '${fullName}',
                position = '${position}',
                specialty_id = (SELECT id FROM specialties WHERE specialty = '${specialty}'),
                image = '${image}'
            WHERE id = '${id}'`
            : `INSERT INTO staff VALUES (NULL, '${fullName}', '${position}', '${image}', ` +
            `(SELECT id FROM specialties WHERE specialty='${specialty}'));`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result);
        })
    })

    app.delete('/api/delete-doctor', (req, res) => {
        const {id} = req.body;
    
        const sqlInsert = `DELETE FROM staff WHERE id = '${id}'`;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })

    app.get('/api/get-doctor-info', (req, res) => {
        const id = req.query.id;
        const sqlInsert = specialty != "null" ? `SELECT * FROM staff WHERE id = '${id}';` : null;
        
        sqlInsert && db.query(sqlInsert, (err, result) => {
            res.send(result)
        })
    })
}

export default generateDoctorsRoutes;