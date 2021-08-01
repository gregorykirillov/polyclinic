const cors = require('cors');
const mysql = require('mysql');
const Mail = require('./mail.js');
const express = require('express');
require('dotenv').config()

const db = mysql.createPool({
    host: process.env.REACT_APP_DB_HOST,
    user: process.env.REACT_APP_DB_USERNAME,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: process.env.REACT_APP_DB_DATABASE
})

const PORT = process.env.REACT_APP_PORT || 3001;

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})

// GET

app.get('/api/get-doctors', (req, res) => {
    const sqlInsert = "SELECT staff.id, name, position, image, specialty FROM staff, " +
    "specialties WHERE specialties.id = specialty_id;"

    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get-specialties', (req, res) => {
    const sqlInsert = "SELECT id, specialty FROM specialties;"

    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get-diagnoses', (req, res) => {
    const sqlInsert = "SELECT id, name FROM diagnoses;"

    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

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

app.get('/api/get-patients', (req, res) => {
    const sqlInsert = "SELECT id, name, birthdate, address, phone FROM patients;"

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

app.get('/api/get-doctor-info', (req, res) => {
    const id = req.query.id;
    const sqlInsert = specialty != "null" ? `SELECT * FROM staff WHERE id = '${id}';` : null;
    
    sqlInsert && db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get-doctor-schedule', (req, res) => {
    const id = req.query.id;
    const sqlInsert = id != "null" ? `SELECT * FROM schedule WHERE staff_id = '${id}'` : null;
    
    sqlInsert && db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.post('/api/form', (req, res) => {
    const {lastName, firstName, middleName, phone, doctorId, doctorName, doctorSpecialty, date} = req.body;

    Mail.Mail(lastName, firstName, middleName, phone, doctorId, doctorName, doctorSpecialty, date).catch(console.error);
})


// SET

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

app.post('/api/set-doctor-schedule', (req, res) => {

    const sqlInsert = `INSERT INTO schedule VALUES (NULL, '845', '0', '8:00', '18:00');`;
    
    sqlInsert && db.query(sqlInsert, (err, result) => {
        res.send(result);
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


// DELETE

app.post('/api/delete-doctor', (req, res) => {
    const {id} = req.body;

    const sqlInsert = `DELETE FROM staff WHERE id = '${id}'`;
    
    sqlInsert && db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.post('/api/delete-patient', (req, res) => {
    const {id} = req.body;

    const sqlInsert = `DELETE FROM patients WHERE id = '${id}'`;
    
    sqlInsert && db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.post('/api/delete-specialty', (req, res) => {
    const {id} = req.body;

    const sqlInsert = `DELETE FROM specialties WHERE id = '${id}'`;
    
    sqlInsert && db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.post('/api/delete-diagnose', (req, res) => {
    const {id} = req.body;

    const sqlInsert = `DELETE FROM diagnoses WHERE id = '${id}'`;
    
    sqlInsert && db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})
