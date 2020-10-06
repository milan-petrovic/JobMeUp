import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import '../../styles/main.scss';
import { UserContext } from '../../services/UserContext';
import { roles, routes } from '../../utils/Constants';

export const Navbar = () => {
    const { user, authenticated, logoutUser } = useContext(UserContext);
    const history = useHistory();

    const handleLogout = () => {
        logoutUser();
        history.push(routes.HOME);
    };

    const getRedirectRoute = () => {
        if (user) {
            if (user.role === roles.EMPLOYEE) {
                return routes.EMPLOYEE_HOME;
            } else {
                return routes.COMPANY_HOME;
            }
        } else {
            return routes.HOME;
        }
    };

    const getHeaderLinks = () => {
        if (authenticated) {
            if (user && user.role === roles.EMPLOYEE) {
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
                        <Link to={routes.LOGIN}>Log In</Link>
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
