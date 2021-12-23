import React from 'react';
import {Header} from './components';
import {Fragment} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {
    Home,
    About,
    Doctors,
    Contacts,
    Ambulance,
    CallDoctor,
    Reception,
} from './pages';
import {
    AdminSpecialties,
    AdminDoctors,
    AdminPatients,
    AdminDiagnoses,
    AdminResults,
    AdminSchedule
} from './pages/Admin/pages';
import LeftMenu from './pages/Admin/LeftMenu';

const App = () => (
    <div className="wrapper">
        <Header />
        <div className="content">
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} exact />
                <Route path="/doctors" component={Doctors} exact />
                <Route path="/schedule" component={Reception} exact />
                <Route path="/reception" component={Reception} exact />
                <Route path="/ambulance" component={Ambulance} exact />
                <Route path="/call-doctor" component={CallDoctor} exact />
                <Route path="/contacts" component={Contacts} exact />

                <Fragment>
                    <Route path="/admin" component={LeftMenu} />

                    <Route path="/admin/specialties" component={AdminSpecialties} exact />
                    <Route path="/admin/doctors" component={AdminDoctors} exact />
                    <Route path="/admin/patients" component={AdminPatients} exact />
                    <Route path="/admin/diagnoses" component={AdminDiagnoses} exact />
                    <Route path="/admin/results" component={AdminResults} exact />
                    <Route path="/admin/schedule" component={AdminSchedule} exact />
                </Fragment>
                
            </Switch>
        </div>
    </div>
);

export default App;
