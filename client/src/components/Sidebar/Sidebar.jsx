import React from 'react';
import { EmployeeAccountInfo } from './EmpoyeeAccountInfo';
import { SidebarCategoriesMenu } from './SidebarCategoriesMenu';

export const Sidebar = props => {
    const categories = [
        { id: 1, name: 'Web development '},
        { id: 2, name: 'Mobile devolpment '},
        { id: 1, name: 'Web design'},
        { id: 1, name: 'Architecture'},
        { id: 1, name: 'Web devolpment '},
    ];
    const user = {
        name: 'Milje Petrovic',
        email: 'miljenator@gmail.com',
        givenVotes: 104,
        receivedVotes: 53,
    };
    
    return (
        <div className = "sidebar">
            <EmployeeAccountInfo user={user}/>
            <SidebarCategoriesMenu categories={categories}/>
        </div>
    );
}