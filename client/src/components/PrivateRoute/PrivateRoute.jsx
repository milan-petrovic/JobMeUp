import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../services/UserContext';
import { routes } from '../../utils/Constants';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authenticated } = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={(props) => (authenticated ? <Component {...props} /> : <Redirect to={routes.HOME} />)}
        />
    );
};
