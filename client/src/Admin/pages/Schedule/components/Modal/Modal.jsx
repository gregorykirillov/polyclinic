import React, {useEffect, useState} from 'react';

import {useSpec} from '../../index';
import {doctorInfo} from '../../ButtonsHandler';
import request from '../../../../../util/request';
import {getDocSchUrl, setSchUrl} from '../../../routes';


const Modal = () => {
    const {setModalActive, modalActive} = useSpec();
    
    const [scheduleRes, setScheduleRes] = useState(null);
    const [schedule, setSchedule] = useState([]);

    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];
    
    const getSchedule = async () => {
        if (!doctorInfo.id) return;
        const {data} = await request(getDocSchUrl(doctorInfo.id));

        setScheduleRes(data);
    };

    const getScheduleDay = id => {
        if (!scheduleRes) return;
        const res = scheduleRes.filter(el => el.day_id == id);

        if (!res.length) return;

        return [res[0].time_start, res[0].time_end];
    };

    useEffect(() => {
        days.forEach(async (_, ind) => {
            const targetSchedule = getScheduleDay(ind);
            if (!targetSchedule) return;
            
            schedule[ind] = targetSchedule;
            setSchedule([...schedule]);
        });
    }, [scheduleRes]);

    useEffect(() => {
        modalActive === true && getSchedule();
    }, [modalActive]);

    const handleChangeSchedule = (e, ind, partOfTheDay) => {
        if (schedule[ind] === undefined) schedule[ind] = [];
        schedule[ind][partOfTheDay] = e.currentTarget.value;

        setSchedule([...schedule]);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const form = document.forms[0];
        const schedule = [];

        for (let field of form) {
            const {name, value} = field;
            if (!name) continue;

            const dayNum = name[0];

            if (!schedule[dayNum]) schedule[dayNum] = [];

            schedule[dayNum].push(value);
        }
        
        schedule.forEach(async (el, ind) => {
            const start = el[0];
            const end = el[1];
            
            const postData = {
                doctorId: doctorInfo.id,
                dayId: ind,
                start,
                end, 
            };
            
            await request(setSchUrl, {
                method: 'POST',
                body: JSON.stringify(postData)
            });
        });       
    };
    

    return (
        <div className={modalActive ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
            {modalActive ?
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <form action="submit" onSubmit={e => handleSubmit(e)}>
                        <h3>Форма заявки</h3>
                        <img src={doctorInfo.image} alt="" />
                        <p>{doctorInfo.fullName}</p>
                        <p><b>{doctorInfo.specialty}</b></p>
                        {days.map((day, ind) => (
                            <>
                                <p>{day}</p>
                                <label htmlFor={`${ind}-start`}>Начало</label>
                                <input
                                    type="time"
                                    name={`${ind}-start`}
                                    placeholder="Начало"
                                    value={schedule[ind]?.[0]}
                                    onChange={e => handleChangeSchedule(e, ind, 0)}
                                />
                                <label htmlFor={`${ind}-end`}>Конец</label>
                                <input
                                    type="time"
                                    name={`${ind}-end`}
                                    placeholder="Конец"
                                    value={schedule[ind]?.[1]}
                                    onChange={e => handleChangeSchedule(e, ind, 1)}
                                />
                            </>
                        ))}
                        <button
                            type="submit"
                            className='register-button'
                        >
                            Сохранить
                        </button>
                    </form>
                </div> : null
            }
        </div>
    );
};

export default Modal;
