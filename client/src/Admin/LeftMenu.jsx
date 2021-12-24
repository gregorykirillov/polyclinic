import React from 'react';
import {Link} from 'react-router-dom';
import './admin.scss';

const LeftMenu = () => (
    <div className="left_menu">
        <Link to="/admin/specialties"><li>Специальности</li></Link>
        <Link to="/admin/doctors"><li>Доктора</li></Link>
        <Link to="/admin/schedule"><li>Расписание</li></Link>
        <Link to="/admin/patients"><li>Пациенты</li></Link>
        <Link to="/admin/diagnoses"><li>Диагнозы</li></Link>
        <Link to="/admin/results"><li>Осмотр</li></Link>
    </div>
);

export default LeftMenu;
