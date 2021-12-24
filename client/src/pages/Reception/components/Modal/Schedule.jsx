import React, {useState} from 'react';
import useSWR from 'swr';
import {getDocSchUrl} from '../../../../Admin/pages/routes';

export let selectedDate = [];

const Schedule = ({id}) => {
    const [activeDay, setActiveDay] = useState(null);
    const day = new Date();
    const nameDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const weekDays = [];
    const workDays = [];
    

    const onClickSchedule = (day, ...props) => {
        setActiveDay(day);
        selectedDate = props;
    };

    const {data: schedule} = id ? useSWR(getDocSchUrl(id)) : {};

    schedule?.map(({day_id: dayId, time_start: timeStart, time_end: timeEnd}) => {
        workDays[dayId] = {'timeStart': timeStart.slice(0, 5), 'timeEnd': timeEnd.slice(0, 5)};
    });

    for (let i = 0; i < 7; i++) {
        day.setDate(day.getDate() + 1);

        const workDay = workDays[day.getDay()];

        if (workDay)
            weekDays.push({'day': day.getDay(), 'date': day.toLocaleDateString('ru'),
                'timeStart': workDay.timeStart, 'timeEnd': workDay.timeEnd});
    }

    return (
        <div className="schedule">
            {weekDays.length ? weekDays.map(({day, date, timeStart, timeEnd}) => {
                return (
                    <li 
                        key={day}
                        className={
                            activeDay === day ?
                                'schedule-button active' :
                                'schedule-button'
                        }
                        onClick={
                            () => onClickSchedule(day, date, timeStart, timeEnd)
                        }>
                        <p>{date} ({nameDays[day]})</p>
                        <p>{timeStart} - {timeEnd}</p>
                    </li>
                );}
            ) : (<p>Регистрация по времени недоступна</p>)
            }
        </div>
    );
};

export default Schedule;
