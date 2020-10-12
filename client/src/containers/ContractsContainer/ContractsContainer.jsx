import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../components/Spinner/Spinner';
import { closeContract, getAllActiveContracts, getAllPastContracts } from '../../services/ContractsService';
import { UserContext } from '../../services/UserContext';

export const ContractsContainer = () => {
    const { user, authenticated } = useContext(UserContext);
    const [isLoading, setLoading] = useState(true); 

    const [activeContracts, setActiveContracts] = useState([]);
    const [pastContracts, setPastContracts] = useState([]);

    useEffect(() => {
        if (user && authenticated) {
            getAllContracts(user.employeeId, user.token);
        }
    }, []);


    const getAllContracts = (employeeId, token) => {        
        getAllActiveContracts(employeeId, token)
            .then(response => {
                setActiveContracts(response.data);
                setLoading(false);
            }).catch(error => console.log(error));

        getAllPastContracts(employeeId, token)
            .then(response => {
                setPastContracts(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
    }

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
                        <th>Company</th>
                        <th>Creation date</th>
                        <th>Active</th>
                    </tr>
                    {pastContracts.map((contract, index) => 
                        <ContractTableCell contract={contract} getAllContracts={getAllContracts} key={index} />)}
                </table>
                }</>
            </div>
        </div>
    );
};

const ContractSectionTitle = ({ children }) => (
    <h2>{children}</h2>
);

const ContractTableCell = ({ contract }) => {
    return (
        <tr>
            <td>{contract.company.name}</td>
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
                    getAllContracts(user.employeeId, user.token);
                }).catch(error => console.log(error));
        }
    }

    return(
        <div className="joboffers-container__active__item">
            <h4>{contract.company.name}</h4>
            <div className="joboffers-container__active__item__subheading">
                {contract.creationDate} - {contract.active ? 'Active' : 'Closed'}
            </div>
            <div className="joboffers-container__active__item__buttons">
                <button className="button--accept" onClick={() => handleOnClose(contract.id)}>Close contract</button>
            </div>
        </div>
    );
}