import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import '../../styles/main.scss';

export const Navbar = () => {
    return (
        <div className="header">
            <Logo fontSize="24px" />
            <div>
                <ul className="header__links">
                    {/* <li><Link to="/top">Apply as employee</Link></li>
                    <Link><button className="header__button">Hire Best Employee</button></Link>
                    <li><Link path="/">Log In</Link></li> */}
                    <li>
                        <Link to="/top">Projects</Link>
                    </li>{' '}
                    <li>
                        <Link to="/top">Education</Link>
                    </li>{' '}
                    <li>
                        <Link to="/top">Benefits</Link>
                    </li>
                    <li>
                        <Link to="/top">Skills</Link>
                    </li>
                    <li>
                        <Link to="/top">Job offers</Link>
                    </li>
                    <li>
                        <Link to="/top">Contracts</Link>
                    </li>
                    <li>
                        <Link to="/top">Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
