import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const loginUser = (authenticatedUser) => {
        setAuthenticated(true);
        setUser(authenticatedUser);
    };

    const logoutUser = () => {
        setUser(null);
        setAuthenticated(false);
    };

    return (
        <UserContext.Provider
            value={{ user: user, loginUser: loginUser, logoutUser: logoutUser, authenticated: authenticated }}>
            {children}
        </UserContext.Provider>
    );
};
