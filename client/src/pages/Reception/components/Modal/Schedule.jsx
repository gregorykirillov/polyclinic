/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import useSWR from 'swr';
import {getDocSchUrl} from '../../../Admin/pages/routes';

// eslint-disable-next-line prefer-const
export let selectedDate = [];

function Schedule({id}) {
    const day = new Date();
    const weekDays = [];
    const workDays = [];
    const nameDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

    const onClickSchedule = (...props) => {
        selectedDate = props;
    };

    // Получаю дни с расписанием
    const {data: schedule} = id ? useSWR(getDocSchUrl + id) : {};

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
            {weekDays.length ? weekDays.map(({day, date, timeStart, timeEnd}) => (
                <li key={day} className="schedule-button" onClick={
                    () => onClickSchedule(date, timeStart, timeEnd)
                }>
                    <p>{date} ({nameDays[day]})</p>
                    <p>{timeStart} - {timeEnd}</p>
                </li>
            )) : (<p>Регистрация по времени недоступна</p>)
            }
        </div>
    );
}

export default Schedule;
