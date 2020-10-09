import React, { useContext } from 'react';
import { UserContext } from '../../services/UserContext';

export const CompanyHomePage = () => {
    const { user, authenticated } = useContext(UserContext);

    return <div>{user.name}</div>;
};
