import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import '../../styles/main.scss'

export const Navbar = () => {
    return(
        <div className="header">
            <Logo/>
            <div>
                <ul className="header__links">
                    <li><Link to="/top">Apply as employee</Link></li>
                    <Link><button className="header__button">Hire Best Employee</button></Link>
                    <li><Link path="/">Log In</Link></li>
                </ul>
            </div>
        </div>
    );
};