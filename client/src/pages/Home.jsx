import React from 'react';
import {Link} from 'react-router-dom';
import {MainImg} from '../pages';

function Home() {
    return (
        <div>
            <MainImg />
            <div className="container">
                <ul className="nav">
                    <Link to="/reception"><li>Записаться на прием</li></Link>
                    <Link to="/schedule"><li>Расписание работы врачей</li></Link>
                    <Link to="/ambulance"><li>Вызвать скорую помощь</li></Link>
                    <Link to="/call-doctor"><li>Вызвать врача на дом</li></Link>
                </ul>
            </div>
        </div>
    );
}

export default Home;
