import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "./reception.scss";
import useSWR from 'swr';
import SpecialtyCard from './components/SpecialtyCard';

function About() {
    const [doctorList, setDoctorList] = useState([]);

    const { data, error } = useSWR('http://localhost:3001/api/get-doctors-by-specialty', { 'specialty': "Аллерголог" })
    console.log(data);

    function setDoctors(specialty) {
        Axios.post('http://localhost:3001/api/get-doctors-by-specialty', {
            'specialty': specialty
        }).then((response) => {
            setDoctorList(response.data);
        })
    }

    return (
        <div className="container">
            <h1 className="main_title">Reception</h1>
            <SpecialtyCard setDoctors={setDoctors} />
            <div className="doctors">
                {doctorList.map((value) => {
                    return (
                        <div className="doctor">{value.full_name}</div>
                    )
                })}
            </div>

        </div>
    )
}

export default About
