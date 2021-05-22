import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <div className="container">
            <ul className="slider-nav">
                <Link to="/reception"><li><span className="priem_form_button">Записаться на прием</span></li></Link>
                <Link to="/schedule"><li><span>Расписание работы врачей</span></li></Link>
                <Link to="/ambulance"><li><span>Вызвать скорую помощь</span></li></Link>
                <Link to="/call-doctor"><li><span>Вызвать врача на дом</span></li></Link>
            </ul>
        </div>
    );
}

export default Home;
