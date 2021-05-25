/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import useSWR from 'swr';

function Schedule({id}) {
    const day = new Date();
    const weekDays = [];
    const workDays = [];
    const nameDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

    const {data: schedule} = id ? useSWR('http://localhost:3001/api/get-doctor-schedule?id=' + id) : {};

    schedule && schedule.map(({day_id: dayId, time_start: timeStart, time_end: timeEnd}) => {
        workDays[dayId] = {'day': dayId, 'timeStart': timeStart.slice(0, 5), 'timeEnd': timeEnd.slice(0, 5)};
    });

    for (let i = 0; i < 7; i++) {
        day.setDate(day.getDate() + 1);
        weekDays.push({'day': day.getDay(), 'date': day.toLocaleDateString('ru')});
    }

    return (
        <div>
            {weekDays.map(({day, date}) => {
                if (workDays[day])
                    return (
                        <button key={day} className="schedule-button">
                            <p>{date} ({nameDays[day]})</p>
                            <p>{workDays[day].timeStart} - {workDays[day].timeEnd}</p>
                        </button>
                    );
            })}
        </div>
    );
}

export default Schedule;
