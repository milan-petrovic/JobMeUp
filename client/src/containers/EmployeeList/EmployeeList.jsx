import React from 'react';
import { EmployeeItem } from '../../components/EmployeeItem/EmployeeItem';

export const EmployeeList = ({ employees, handleVoteSubmit }) => {
    return (
        <div className="employee-list">
            {employees.map((employee, index) => (
                <EmployeeItem employee={employee} key={index} handleVoteSubmit={handleVoteSubmit} />
            ))}
        </div>
    );
};
