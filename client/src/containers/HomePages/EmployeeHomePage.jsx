import React, { useContext, useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Spinner } from '../../components/Spinner/Spinner';
import { getAllEmployeesByCategory, getAllOtherEmployees, postVote } from '../../services/EmployeeService';
import { UserContext } from '../../services/UserContext';
import '../../styles/main.scss';
import { EmployeeList } from '../EmployeeList/EmployeeList';

export const EmployeeHomePage = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { user, authenticated } = useContext(UserContext);

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = () => {
        if (authenticated && user) {
            getAllOtherEmployees(user.employeeId)
                .then((response) => {
                    setEmployees(response.data);
                    setLoading(false);
                })
                .catch((error) => console.log(error));
        }
    };

    const handleOnCategoryClick = (categoryId) => {
        setLoading(true);
        getAllEmployeesByCategory(categoryId)
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };

    const handleVoteSubmit = (employee) => {
        if (user && authenticated) {
            const requestData = {
                receivedEmployee: { id: employee.id },
                givenEmployee: { id: user.employeeId },
            };

            postVote(requestData, user.token)
                .then((_) => {
                    getEmployees();
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="employee-homepage-wrap">
            <Sidebar handleOnCategoryClick={handleOnCategoryClick} />
            <div className="employee-homepage-wrap__main">
                {isLoading ? <Spinner /> : <EmployeeList employees={employees} handleVoteSubmit={handleVoteSubmit} />}
            </div>
        </div>
    );
};
