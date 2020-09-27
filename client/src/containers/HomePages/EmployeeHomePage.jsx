import React from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { EmployeeList } from '../EmployeeList/EmployeeList';
import '../../styles/main.scss'

export const EmployeeHomePage = () => {
    return (
        <div className="employee-homepage-wrap">
            <Sidebar/>
            <div className="employee-homepage-wrap__main">
                <EmployeeList />
            </div>
        </div>
    );  
}