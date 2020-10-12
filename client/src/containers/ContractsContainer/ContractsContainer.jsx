import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../components/Spinner/Spinner';
import { closeContract, getAllActiveCompanysContracts, getAllActiveEmployeesContracts, getAllPastCompanysContracts, getAllPastEmployeesContracts } from '../../services/ContractsService';
import { UserContext } from '../../services/UserContext';
import { roles } from '../../utils/Constants';
import { getFullName } from '../../utils/Utils';

export const ContractsContainer = () => {
    const { user, authenticated } = useContext(UserContext);
    const [isLoading, setLoading] = useState(true); 

    const [activeContracts, setActiveContracts] = useState([]);
    const [pastContracts, setPastContracts] = useState([]);

    useEffect(() => {
        if (user && authenticated) {
            if (user.role === roles.EMPLOYEE) {
                getAllContractsForEmployee(user.employeeId, user.token);
            } else {
                getAllContractsForCompany(user.companyId, user.token);
            }
        }
    }, []);


    const getAllContractsForEmployee = (employeeId, token) => {        
        getAllActiveEmployeesContracts(employeeId, token)
            .then(response => {
                setActiveContracts(response.data);
                setLoading(false);
            }).catch(error => console.log(error));

        getAllPastEmployeesContracts(employeeId, token)
            .then(response => {
                setPastContracts(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
    };

    const getAllContractsForCompany = (companyId, token) => {
        getAllActiveCompanysContracts(companyId, token)
            .then(response => {
                setActiveContracts(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
        getAllPastCompanysContracts(companyId, token)
            .then(response => {
                setPastContracts(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
    };

    return(
        <div className="joboffers-container">
            <div className="joboffers-container__active">
                <ContractSectionTitle>Active contracts</ContractSectionTitle>
                {isLoading ? <Spinner /> :
                    activeContracts.map((contract, index) => 
                        <ActiveContractItem contract={contract} key={index} />
                )}
            </div>
            <div className="joboffers-container__inactive">
                <ContractSectionTitle>Past contracts</ContractSectionTitle>
                <>{ isLoading ? <Spinner /> : 
                    <table className="joboffers-container__inactive__table">
                    <tr>
                        <th>{user.role === roles.EMPLOYEE ? 'Company' : 'Employee'}</th>
                        <th>Creation date</th>
                        <th>Active</th>
                    </tr>
                    {pastContracts.map((contract, index) => 
                        <ContractTableCell 
                            user={user} 
                            contract={contract} 
                            getAllContracts={user.role === roles.EMPLOYEE ? getAllContractsForEmployee : getAllContractsForCompany} 
                            key={index} />)}
                </table>
                }</>
            </div>
        </div>
    );
};

const ContractSectionTitle = ({ children }) => (
    <h2>{children}</h2>
);

const ContractTableCell = ({ contract, user }) => {
    return (
        <tr>
            <td>{user.role === roles.EMPLOYEE ? contract.company.name : getFullName(contract.employee.firstName, contract.employee.lastName)}</td>
            <td>{contract.creationDate}</td>
            <td>{contract.active ? 'Active' : 'Closed'}</td>
        </tr>
    );
}

const ActiveContractItem = ({ contract, getAllContracts }) => {
    const { user, authenticated } = useContext(UserContext);

    const handleOnClose = (contractId) => {
        if (user && authenticated) {
            closeContract(contractId, user.token)
                .then(_ => {
                    getAllContracts(user.role === roles.EMPLOYEE ? user.employeeId : user.companyId, user.token);
                }).catch(error => console.log(error));
        }
    }

    return(
        <div className="joboffers-container__active__item">
            <h4>{user.role === roles.EMPLOYEE ? contract.company.name : getFullName(contract.employee.firstName, contract.employee.lastName)}</h4>
            <div className="joboffers-container__active__item__subheading">
                {contract.creationDate} - {contract.active ? 'Active' : 'Closed'}
            </div>
            <div className="joboffers-container__active__item__buttons">
                <button className="button--accept" onClick={() => handleOnClose(contract.id)}>Close contract</button>
            </div>
        </div>
    );
}