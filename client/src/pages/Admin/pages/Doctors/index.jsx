import React, {useEffect} from 'react';
import useSWR from 'swr';

import {onEditItem, onClearItem, onSubmit} from './ButtonsHandler';
import {getDocUrl} from '../routes';

import editIcon from '../../../../assets/svg/edit_icon.svg';
import clearIcon from '../../../../assets/svg/clear_icon.svg';
import Selector from './components/Selector';

export let inputs;

function Doctors() {
    const {data: doctors} = useSWR(getDocUrl);

    useEffect(() => {
        inputs = document.getElementsByClassName('input');
    });

    return (
        <div className="admin-container">
            <h2>Доктора</h2>
            <div className="items_container">
                <div className="inputBox">
                    <input
                        className="input input_name"
                        name='fullName'
                        placeholder="ФИО">
                    </input>
                    <Selector />
                    <input
                        className="input input_position"
                        name='position'
                        placeholder="Должность">
                    </input>
                    <input
                        className="input input_photo"
                        name='image'
                        placeholder="URL фото">
                    </input>
                    <button className="input submit" onClick={onSubmit}>Подтвердить</button>
                </div>
                {doctors?.map(({id, name: fullName, specialty, position, image}) => {
                    return (
                        <div className='doctorRow' key={id}>
                            <div className='info fullName'>{fullName}</div>
                            <div className='info specialty'>{specialty}</div>
                            <div className='info position'>{position}</div>
                            <div className="info img"><img className='imgPreview' src={image} /></div>
                            <div className="buttons">
                                <img src={editIcon}
                                    className='edit_button'
                                    onClick={() => onEditItem({
                                        id,
                                        fullName,
                                        specialty,
                                        position,
                                        image,
                                    })}
                                />
                                <img src={clearIcon} onClick={() => onClearItem(id, fullName)} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Doctors;
