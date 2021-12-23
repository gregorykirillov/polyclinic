import React from 'react';
import useSWR from 'swr';
import editIcon from '../../../../assets/svg/edit_icon.svg';
import clearIcon from '../../../../assets/svg/clear_icon.svg';
import {getSpecUrl} from '.././routes';
import {onSubmit, onEditItem, onClearItem} from './ButtonsHandler';

const Specialties = () => {
    const {data: specialties} = useSWR(getSpecUrl);

    return (
        <div className="admin-container">
            <h2>Специальности</h2>
            <div className="items_container">
                <div className="inputBox">
                    <input
                        className="input input_specialty"
                        name='specialty'
                        placeholder='Специальность'>
                    </input>
                    <button
                        className="input submit"
                        onClick={onSubmit}>
                            Подтвердить
                    </button>
                </div>
                {specialties?.map(({specialty, id}) => {
                    return (
                        <li key={id}>
                            <div className="doctorRow">
                                <div className='info specialty' >{specialty}</div>
                                <div className="buttons">
                                    <button
                                        className='edit_button'
                                        onClick={() => onEditItem({id, specialty})}
                                    >
                                        <img src={editIcon} />
                                    </button>
                                    <button 
                                        onClick={() => onClearItem(id, specialty)}
                                    >
                                        <img src={clearIcon} />
                                    </button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </div>
        </div>
    );
};

export default Specialties;
