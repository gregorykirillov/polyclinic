import React from 'react';
import useSWR from 'swr';
import {getSpecUrl} from '../../routes';

const Selector = () => {
    const {data: specialties} = useSWR(getSpecUrl);

    return (
        <select
            className="input input_specialty"
            name='specialty'>
            <option>Специальность</option>
            {specialties?.map(({id, specialty}) => (
                <option id={id} key={id}>{specialty}</option>
            ))}
        </select>
    );
};

export default Selector;
