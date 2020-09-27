import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../../services/EmployeeService';
import { EmployeeItem } from '../../components/EmployeeItem/EmployeeItem';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect( () => {
        getAllEmployees().then(response => {
            setEmployees(response.data);
            setLoading(false);
        }).catch(error => console.log(error));
    }, []);

    return(
    <div className="employee-list">
            { isLoading ? <div>...loading</div> : employees.map((employee, index) => <EmployeeItem employee={employee} key={index}/> )}
    </div>
    );
};