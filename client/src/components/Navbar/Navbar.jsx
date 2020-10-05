import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import '../../styles/main.scss';
import { UserContext } from '../../services/UserContext';

export const Navbar = () => {
    const { user, authenticated, logoutUser } = useContext(UserContext);
    const history = useHistory();

    const handleLogout = () => {
        logoutUser();
        history.push('/');
    };

    const getRedirectRoute = () => {
        if (user) {
            if (user.role === 'employee') {
                return '/employee/home';
            } else {
                return 'company/home';
            }
        } else {
            return '/';
        }
    };

    const getHeaderLinks = () => {
        if (authenticated) {
            if (user && user.role === 'employee') {
                return (
                    <ul className="header__links">
                        <li>
                            <Link to="/top">Job offers</Link>
                        </li>
                        <li>
                            <Link to="/top">Contracts</Link>
                        </li>
                        <li onClick={() => handleLogout()}>Logout</li>
                    </ul>
                );
            } else {
                return (
                    <ul className="header__links">
                        <li>
                            <Link to="/top">Job offers</Link>
                        </li>
                        <li>
                            <Link to="/top">Contracts</Link>
                        </li>
                        <li onClick={() => handleLogout()}>Logout</li>
                    </ul>
                );
            }
        } else {
            return (
                <ul className="header__links">
                    <li>
                        <Link to="/top">Apply as employee</Link>
                    </li>
                    <Link>
                        <button className="header__button">Hire Best Employee</button>
                    </Link>
                    <li>
                        <Link to="/login">Log In</Link>
                    </li>
                </ul>
            );
        }
    };

    return (
        <div className="header">
            <Logo fontSize="24px" redirectRoute={getRedirectRoute()} />
            <div>{getHeaderLinks()}</div>
        </div>
    );
};
