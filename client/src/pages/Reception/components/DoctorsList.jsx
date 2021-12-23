import React from 'react';
import useSWR from 'swr';
import {getDocBySpecUrl} from '../../Admin/pages/routes';

import {useSpec} from '../index';
import {selectedDate} from './Modal/Schedule';

const useDoctors = spec =>
    useSWR(getDocBySpecUrl + spec);

const DoctorsList = () => {
    const {spec} = useSpec();
    const {data: doctors} = useDoctors(spec);
    const {setModalActive} = useSpec();

    return (
        <div className="doctors">
            {doctors?.map(({id, name: fullName, specialty, image}) => (
                <div key={id} className="doctor">
                    <p>{fullName}</p>
                    <button className="register" onClick={
                        () => register(setModalActive, {id, fullName, specialty, image})
                    }>
                        Записаться
                    </button>
                </div>
            ))}
        </div>
    );
};

export const doctorInfo = {};

const register = (setModalActive, {...props}) => {
    setModalActive(true);
    selectedDate.length = 0;

    for(const key in props) {
        doctorInfo[key] = props[key];
    }
};

export default DoctorsList;
