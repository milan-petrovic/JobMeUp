import React from 'react';
import { EmployeeItem } from '../../components/EmployeeItem/EmployeeItem';

export const EmployeeList = ({ employees }) => {
    return (
        <div className="employee-list">
            {employees.map((employee, index) => (
                <EmployeeItem employee={employee} key={index} />
            ))}
        </div>
    );
};
