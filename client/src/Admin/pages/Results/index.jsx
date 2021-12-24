import React, {useEffect} from 'react';
import useSWR from 'swr';
import editIcon from '../../../assets/svg/edit_icon.svg';
import clearIcon from '../../../assets/svg/clear_icon.svg';
import {getDiagUrl, getDocUrl, getPatUrl, getResUrl} from '../routes';
import {onSubmit, onEditItem, onClearItem} from './ButtonsHandler';
import Selector from './components/Selector';

export let inputs;

const Results = () => {
    const {data: results} = useSWR(getResUrl);

    useEffect(() => {
        inputs = document.getElementsByClassName('input');
    });

    return (
        <div className="admin-container">
            <h2>Осмотр</h2>
            <div className="items_container">
                <div className="inputBox">
                    <Selector defaultName='Пациент' url={getPatUrl} name='patientName' />
                    <Selector defaultName='Врач' url={getDocUrl} name='staffName' />
                    <Selector defaultName='Диагноз' url={getDiagUrl} name='diagnoseName' />
                    <input
                        className="input inpud_date"
                        name='date'
                        type='date'
                    ></input>
                    <input
                        className="input input_comment"
                        name='comments'
                        placeholder='Комментарий'>
                    </input>
                    <button
                        className="input submit"
                        onClick={onSubmit}>
                            Подтвердить
                    </button>
                </div>
                {results?.map(({id, patientName, staffName, diagnoseName, date, comments}) => {
                    return (
                        <li key={id}>
                            <div className="doctorRow">
                                <div className='info'>{patientName}</div>
                                <div className='info'>{staffName}</div>
                                <div className='info'>{diagnoseName}</div>
                                <div className='info'>{date}</div>
                                <div className='info'>{comments}</div>
                                <div className="buttons">
                                    <button
                                        className='edit_button'
                                        onClick={() => onEditItem({id, patientName, staffName, diagnoseName, date, comments})}
                                    >
                                        <img src={editIcon} />
                                    </button>
                                    <button
                                        onClick={() => onClearItem({id, patientName})}
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

export default Results;
