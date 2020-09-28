import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Spinner } from '../../components/Spinner/Spinner';
import { EmployeeList } from '../EmployeeList/EmployeeList';
import '../../styles/main.scss';
import { getAllEmployees, getAllEmployeesByCategory } from '../../services/EmployeeService';

export const EmployeeHomePage = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllEmployees()
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleOnCategoryClick = (categoryId) => {
        setLoading(true);
        getAllEmployeesByCategory(categoryId)
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="employee-homepage-wrap">
            <Sidebar handleOnCategoryClick={handleOnCategoryClick} />
            <div className="employee-homepage-wrap__main">
                {isLoading ? <Spinner /> : <EmployeeList employees={employees} />}
            </div>
        </div>
    );
};
