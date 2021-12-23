import React, {useEffect} from 'react';
import useSWR from 'swr';
import {getPatUrl} from '../routes';

import {onEditItem, onClearItem, onSubmit} from './ButtonsHandler';

import editIcon from '../../../../assets/svg/edit_icon.svg';
import clearIcon from '../../../../assets/svg/clear_icon.svg';

export let inputs;

const Doctors = () => {
    const {data: patients} = useSWR(getPatUrl);

    useEffect(() => {
        inputs = document.getElementsByClassName('input');
    });

    return (
        <div className="admin-container">
            <h2>Пациенты</h2>
            <div className="items_container">
                <div className="inputBox">
                    <input
                        className="input input_name"
                        name='fullName'
                        placeholder="ФИО">
                    </input>
                    <input type="date" placeholder='Дата рождения' className='input input_date' name='birthdate' />
                    <input
                        className="input input_address"
                        name='address'
                        placeholder="Адрес">
                    </input>
                    <input
                        className="input input_phone"
                        name='phone'
                        placeholder="Телефон">
                    </input>
                    <button className="input submit" onClick={onSubmit}>Подтвердить</button>
                </div>
                {patients?.map(({id, name: fullName, birthdate, address, phone}) => {
                    return (
                        <div className='doctorRow' key={id}>
                            <div className='info fullName'>{fullName}</div>
                            <div className='info birtdate'>{birthdate.substring(0, 10)}</div>
                            <div className='info address'>{address}</div>
                            <div className="info phone">{phone}</div>
                            <div className="buttons">
                                <button
                                    className='edit_button'
                                    onClick={() => onEditItem({
                                        id,
                                        fullName,
                                        birthdate,
                                        address,
                                        phone,
                                    })}
                                >
                                    <img src={editIcon} />
                                </button>
                                <button
                                    onClick={() => onClearItem(id, fullName)}
                                >
                                    <img src={clearIcon} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Doctors;
