import React from 'react';
import useSWR from 'swr';

import '../scss/doctors.scss';

function Doctors() {
    const {data: doctorList} = useSWR('http://localhost:3001/api/get-doctors');

    return (
        <div className="container">
            <h1 className="main_title">Доктора</h1>
            <div className="doctors_cards">
                {doctorList?.map(({id, image, name: fullName, specialty, position}) => {
                    return (
                        <div key={id} className="doctor_card">
                            <a><img src={image} /></a>
                            <a className="name">{fullName}</a>
                            <a className="specialty">{specialty}</a>
                            <a className="position">{position}</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Doctors;
