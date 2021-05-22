import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import '../scss/doctors.scss';


function Doctors() {
    const [doctorList, setDoctorList] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get-doctors').then((response) => {
            setDoctorList(response.data);
        }, []);
    });

    return (
        <div className="container">
            <h1 className="main_title">Doctors</h1>
            <div className="doctors_cards">
                {doctorList && doctorList.map(val => {
                    return (
                        <div key={val.id} className="doctor_card">
                            <a><img src={val.image} /></a>
                            <a className="name">{val.full_name}</a>
                            <a className="specialty">{val.specialty}</a>
                            <a className="position">{val.position}</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Doctors;
