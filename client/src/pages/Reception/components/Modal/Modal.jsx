import React from 'react';

import './modal.scss';
import {useSpec} from '../../index';
import {doctorInfo} from '../DoctorsList';
import Schedule from './Schedule';

const Modal = () => {
    const {setModalActive} = useSpec();
    const {modalActive} = useSpec();

    return (
        <div className={modalActive ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
            {modalActive ?
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <form action="">
                        <h3>Форма заявки</h3>
                        <img src={doctorInfo.image} alt="" />
                        <p>{doctorInfo.fullName}</p>
                        <p><b>{doctorInfo.specialty}</b></p>
                        <div>
                            <input type="text" placeholder="Фамилия" />
                        </div>
                        <div>
                            <input type="text" placeholder="Имя" />
                        </div>
                        <div>
                            <input type="text" placeholder="Отчество" />
                        </div>
                        <Schedule id={doctorInfo.id} />
                        <div>
                            <input type="text" placeholder="Телефон" />
                        </div>
                        <button className="register-button">Записаться</button>
                    </form>
                </div> : null
            }
        </div>
    );
};

export default Modal;
