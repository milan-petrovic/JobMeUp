import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Spinner } from '../../components/Spinner/Spinner';
import { getAllEmployeesByCategorySortedByReceivedVotes, getAllEmployeesSortedByReceivedVotes } from '../../services/EmployeeService';
import { UserContext } from '../../services/UserContext';
import { EmployeeList } from '../EmployeeList/EmployeeList';

export const CompanyHomePage = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setLoading] = useState([]);
    const { user, authenticated } = useContext(UserContext);

    useEffect(() => {
        if (user && authenticated) {
            getAllEmployeesSortedByReceivedVotes().then(response => {
                setEmployees(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
        }
    }, []);

    const handleOnCategoryClick = (categoryId) => {
        getAllEmployeesByCategorySortedByReceivedVotes(categoryId).then((response) => {
            setEmployees(response.data);
            setLoading(false);
        }).catch(error => console.log(error));
    }

    return (<div className="employee-homepage-wrap">
        <Sidebar handleOnCategoryClick={handleOnCategoryClick} />
        <div className="employee-homepage-wrap__main">
                {isLoading ? <Spinner /> : <EmployeeList employees={employees} />}
        </div>
    </div>);
};
