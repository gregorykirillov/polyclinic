/* eslint-disable no-unused-vars */
import React from 'react';
import useSWR from 'swr';

function Selector({defaultName, name, url}) {
    const {data: options} = useSWR(url);

    return (
        <select
            className="input"
            name={name}>
            <option>{defaultName}</option>
            {options?.map(({id, name: optionText}) => (
                <option id={id} key={id} name={name}>{optionText}</option>
            ))}
        </select>
    );
}

export default Selector;
