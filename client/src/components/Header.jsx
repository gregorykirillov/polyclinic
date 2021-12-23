import React from 'react';
import {Link} from 'react-router-dom';

import homeSvg from '../assets/svg/home.svg';

const Header = () => (
    <div className="header">
        <nav>
            <ul className="navigation">
                <Link to="/">
                    <li>
                        <img src={homeSvg} alt="" />
                    </li>
                </Link>
                
                <Link to="/about">
                    <li>О нас</li>
                </Link>

                <Link to="/doctors">
                    <li>Врачи</li>
                </Link>

                <Link to="/admin">
                    <li>Админ</li>
                </Link>
            </ul>
        </nav>
    </div>
);

export default Header;
