import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../services/UserContext';
import { roles } from '../../utils/Constants';
import { CompanyAccountInfo } from './CompanyAccountInfo';
import { EmployeeAccountInfo } from './EmpoyeeAccountInfo';
import { SidebarCategoriesMenu } from './SidebarCategoriesMenu';

export const Sidebar = ({ handleOnCategoryClick }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="sidebar">
            {user.role === roles.EMPLOYEE ? <EmployeeAccountInfo user={user} /> : <CompanyAccountInfo user={user} />}
            
            <SidebarCategoriesMenu handleOnCategoryClick={handleOnCategoryClick} />
        </div>
    );
};
