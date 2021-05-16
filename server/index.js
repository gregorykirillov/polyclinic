const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv').config()

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: process.env.REACT_APP_DB_PASSWORD,
    database: "CRUDDatabase"
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

    const sqlInsert = "SELECT specialty FROM cruddatabase.staff GROUP BY specialty;"

    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

app.post('/api/get-doctors-by-specialty', (req, res) => {

    const sqlInsert = `SELECT * FROM cruddatabase.staff WHERE specialty = '${req.body.specialty}';`
    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

