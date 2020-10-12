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
                            <Link to={routes.JOB_OFFER_CONTAINER_EMPLOYEE} >Job offers</Link>
                        </li>
                        <li>
                            <Link to={routes.CONTRACTS_CONTAINER_EMPLOYEE}>Contracts</Link>
                        </li>
                        <li onClick={() => handleLogout()}>Logout</li>
                    </ul>
                );
            } else {
                return (
                    <ul className="header__links">
                        <li>
                            <Link to={routes.JOB_OFFER_CONTAINER_COMPANY}>Job offers</Link>
                        </li>
                        <li>
                            <Link to={routes.CONTRACTS_CONTAINER_COMPANY}>Contracts</Link>
                        </li>
                        <li onClick={() => handleLogout()}>Logout</li>
                    </ul>
                );
            }
        } else {
            return (
                <ul className="header__links">
                    <li>
                        <Link to={routes.EMPLOYEE_REGISTER}>Apply as employee</Link>
                    </li>
                    <Link to={routes.COMPANY_REGISTER}>
                        <button className="header__button">Hire Best Employee</button>
                    </Link>
                    <li>
                        <Link to="/login/employee">Log In</Link>
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
