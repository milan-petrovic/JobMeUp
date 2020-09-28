import React from 'react';
import { EmployeeAccountInfo } from './EmpoyeeAccountInfo';
import { SidebarCategoriesMenu } from './SidebarCategoriesMenu';

export const Sidebar = ({ handleOnCategoryClick }) => {
    const user = {
        firstName: 'Milje',
        lastName: 'Petrovic',
        email: 'miljenator@gmail.com',
        givenVotes: 104,
        receivedVotes: 53,
    };

    return (
        <div className="sidebar">
            <EmployeeAccountInfo user={user} />
            <SidebarCategoriesMenu handleOnCategoryClick={handleOnCategoryClick} />
        </div>
    );
};
