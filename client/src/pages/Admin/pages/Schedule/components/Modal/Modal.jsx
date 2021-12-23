import React from 'react';

import {useSpec} from '../../index';
import {doctorInfo} from '../../ButtonsHandler';


const Modal = () => {
    const {setModalActive, modalActive} = useSpec();

    return (
        <div className={modalActive ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
            {modalActive ?
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <form action="" onSubmit={e => e.preventDefault()}>
                        <h3>Форма заявки</h3>
                        <img src={doctorInfo.image} alt="" />
                        <p>{doctorInfo.fullName}</p>
                        <p><b>{doctorInfo.specialty}</b></p>
                        <p>Поденельник</p>
                        <input type="time" name="1" placeholder="Начало" />
                        <input type="time" name="1" placeholder="Конец" />
                        <p>Вторник</p>
                        <input type="time" name="2" placeholder="Начало" />
                        <input type="time" name="2" placeholder="Конец" />
                        <p>Среда</p>
                        <input type="time" name="3" placeholder="Начало" />
                        <input type="time" name="3" placeholder="Конец" />
                        <p>Четверг</p>
                        <input type="time" name="4" placeholder="Начало" />
                        <input type="time" name="4" placeholder="Конец" />
                        <p>Пятница</p>
                        <input type="time" name="5" placeholder="Начало" />
                        <input type="time" name="5" placeholder="Конец" />
                        <p>Суббота</p>
                        <input type="time" name="6" placeholder="Начало" />
                        <input type="time" name="6" placeholder="Конец" />
                        <p>Воскресенье</p>
                        <input type="time" name="0" placeholder="Начало" />
                        <input type="time" name="0" placeholder="Конец" />
                        <button
                            className='register-button'
                            onClick={() => {}}>
                                Сохранить
                        </button>
                    </form>
                </div> : null
            }
        </div>
    );
};

export default Modal;
