import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../services/UserContext';
import { EmployeeAccountInfo } from './EmpoyeeAccountInfo';
import { SidebarCategoriesMenu } from './SidebarCategoriesMenu';

export const Sidebar = ({ handleOnCategoryClick }) => {
    const { user, authenticated } = useContext(UserContext);

    return (
        <div className="sidebar">
            <EmployeeAccountInfo user={user} />
            <SidebarCategoriesMenu handleOnCategoryClick={handleOnCategoryClick} />
        </div>
    );
};
