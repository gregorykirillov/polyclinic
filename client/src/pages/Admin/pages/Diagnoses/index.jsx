import React from 'react';
import useSWR from 'swr';
import editIcon from '../../../../assets/svg/edit_icon.svg';
import clearIcon from '../../../../assets/svg/clear_icon.svg';
import {getDiagUrl} from '../routes';
import {onSubmit, onEditItem, onClearItem} from './ButtonsHandler';

const Diagnoses = () => {
    const {data: diagnoses} = useSWR(getDiagUrl);

    return (
        <div className="admin-container">
            <h2>Диагнозы</h2>
            <div className="items_container">
                <div className="inputBox">
                    <input
                        className="input input_diagnose"
                        name='name'
                        placeholder='Диагноз'>
                    </input>
                    <button
                        className="input submit"
                        onClick={onSubmit}>
                            Подтвердить
                    </button>
                </div>
                {diagnoses?.map(({name, id}) => {
                    return (
                        <li key={id}>
                            <div className="doctorRow">
                                <div className='info diagnose'>{name}</div>
                                <div className="buttons">
                                    <button
                                        className='edit_button'
                                        onClick={() => onEditItem({id, name})}
                                    >
                                        <img src={editIcon} />
                                    </button>
                                    <button
                                        onClick={() => onClearItem({id, name})}
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

export default Diagnoses;
