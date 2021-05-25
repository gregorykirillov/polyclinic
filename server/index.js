const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv').config()

const db = mysql.createPool({
    host: process.env.REACT_APP_DB_HOST,
    user: process.env.REACT_APP_DB_USERNAME,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: process.env.REACT_APP_DB_DATABASE
})

const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("running on port", port)
})

app.get('/api/get-doctors', (req, res) => {
    const sqlInsert = "SELECT * FROM staff;"

    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get-specialties', (req, res) => {
    const sqlInsert = "SELECT id, specialty FROM staff GROUP BY specialty;"

    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get-doctors-by-specialty', (req, res) => {
    const specialty = req.query.specialty;
    const sqlInsert = specialty != "null" ? `SELECT id, full_name, specialty, image FROM staff WHERE specialty = '${specialty}';` : null;
    sqlInsert && db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.get('/api/get-doctor-info', (req, res) => {
    const specialty = req.query.id;
    const sqlInsert = specialty != "null" ? `SELECT * FROM staff WHERE id = '${specialty}';` : null;
    
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

