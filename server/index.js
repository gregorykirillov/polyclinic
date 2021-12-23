import cors from 'cors';
import mysql from 'mysql';
import express from 'express';
import {
    host,
    user,
    password,
    database,
    port
} from './config.js';
import {
    generateMailRoutes,
    generateDoctorsRoutes,
    generateResultsRoutes,
    generatePatientsRoutes,
    generateDiagnosesRoutes,
    generateSpecialtiesRoutes,
    generateDoctorScheduleRoutes,
} from './routes/index.js';


const db = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
})

const app = express();

app.use(cors({}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
    console.log(`running on port ${port}`)
})

generateMailRoutes(app, db);
generateDoctorsRoutes(app, db);
generateResultsRoutes(app, db);
generatePatientsRoutes(app, db);
generateDiagnosesRoutes(app, db);
generateSpecialtiesRoutes(app, db);
generateDoctorScheduleRoutes(app, db);