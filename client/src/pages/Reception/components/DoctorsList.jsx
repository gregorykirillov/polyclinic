import React from 'react';
import useSWR from 'swr';

import {useSpec} from '../index';

const useDoctors = spec =>
    useSWR('http://localhost:3001/api/get-doctors-by-specialty?specialty=' + spec);

const DoctorsList = () => {
    const {spec} = useSpec();
    const {data: doctors} = useDoctors(spec);
    const {setModalActive} = useSpec();

    return (
        <div className="doctors">
            {
                doctors && doctors.map(({id, full_name: fullName, specialty, image}) => (
                    <div key={id} className="doctor">
                        <p>{fullName}</p>
                        <a className="register" onClick={
                            () => register(setModalActive, {id, fullName, specialty, image})
                        }>Записаться</a>
                    </div>
                ))
            }
        </div>
    );
};

export const register = (setModalActive, {...props}) => {
    setModalActive(true);

    for(const key in props) {
        doctorInfo[key] = props[key];
    }
};

export const doctorInfo = {};

export default DoctorsList;
