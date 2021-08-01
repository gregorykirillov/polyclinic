import React from 'react';

import './modal.scss';
import {useSpec} from '../../index';
import {doctorInfo} from '../DoctorsList';
import Schedule from './Schedule';
import {sendEmail} from './Email';

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
                        <input type="text" name="lastname" placeholder="Фамилия" className="lastName" />
                        <input type="text" name="firstname" placeholder="Имя" className="firstName" />
                        <input type="text" name="middlename" placeholder="Отчество" className="middleName" />
                        <Schedule id={doctorInfo.id} />
                        <input
                            type="tel"
                            placeholder="Телефон"
                            className="phone" />
                        <button
                            className='register-button'
                            onClick={() => {
                                sendEmail();
                                setModalActive(false);
                            }}>
                                Записаться
                        </button>
                    </form>
                </div> : null
            }
        </div>
    );
};

export default Modal;
