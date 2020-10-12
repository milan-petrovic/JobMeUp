import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../components/Spinner/Spinner';
import { postContract } from '../../services/ContractsService';
import { declineJobOffer, getAllActiveJobOffersForCompany, getAllActiveJobOffersForEmployee, getAllDeclinedJobOffersForEmployee, getAllPastJobOffersForCompany } from '../../services/JobOfferService';
import { UserContext } from '../../services/UserContext';
import { roles } from '../../utils/Constants';
import { getFullName } from '../../utils/Utils';

export const JobOffersContainer = () => {
    const [isLoading, setLoading] = useState(true);
    const [activeJobOffers, setActiveJobOffers] = useState([]);
    const [declinedJobOffers, setDeclinedJobOffers] = useState([]);
    const { user, authenticated } = useContext(UserContext);

    useEffect(() => {
        if (user && authenticated) {
            if (user.role === roles.EMPLOYEE) {
                getAllJobOffersForEmployee(user.employeeId, user.token);
            } else {
                getAllJobOffersForCompany(user.companyId, user.token);
            }
        }
    }, []);

    const getAllJobOffersForEmployee = (employeeId, token) => {
        getAllActiveJobOffersForEmployee(employeeId, token)
        .then(response => {
            setActiveJobOffers(response.data);
            setLoading(false);
        }).catch(error => console.log(error));
        getAllDeclinedJobOffersForEmployee(employeeId, token)
            .then(response => {
                setDeclinedJobOffers(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
    }

    const getAllJobOffersForCompany = (companyId, token) => {
        getAllActiveJobOffersForCompany(companyId, token)
            .then(response => {
                setActiveJobOffers(response.data);
                setLoading(false);
            }).catch(error => console.log(error));

        getAllPastJobOffersForCompany(companyId, token)
            .then(response => {
                setDeclinedJobOffers(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
    };


    return(
        <div className="joboffers-container">
            <div className="joboffers-container__active">
                <JobOfferSectionTitle>Active job offers</JobOfferSectionTitle>
                {isLoading ? <Spinner /> : 
                    activeJobOffers.map((jobOffer, index) => 
                    <ActiveJobOfferItem 
                      jobOffer={jobOffer}
                      getAllJobOffers={user.role === roles.EMPLOYEE ? getAllJobOffersForEmployee : getAllJobOffersForCompany}
                      key={index}
                    />)}
            </div>
            <div className="joboffers-container__inactive">
                <JobOfferSectionTitle>Past job offers</JobOfferSectionTitle>
                <>{ isLoading ? <Spinner /> : 
                    <table className="joboffers-container__inactive__table">
                    <tr>
                        <th>{user.role === roles.EMPLOYEE ? 'Company' : 'Employee'}</th>
                        <th>Creation date</th>
                        <th>Position</th>
                        <th>Salary</th>
                    </tr>
                    {declinedJobOffers.map((jobOffer, index) => <JobOfferTableCell user={user} jobOffer={jobOffer} key={index} />)}
                </table>
                }</>
            </div>
        </div>
    );   
}

const JobOfferTableCell = ({ jobOffer, user }) => {
    return (
        <tr>
            <td>{user.role === roles.EMPLOYEE ? jobOffer.company.name : getFullName(jobOffer.employee.firstName, jobOffer.employee.lastName)}</td>
            <td>{jobOffer.creationDate}</td>
            <td>{jobOffer.position}</td>
            <td>{jobOffer.salary}</td>
        </tr>
    );
}

const JobOfferSectionTitle = ({ children }) => (
    <h2>{children}</h2>
);

const ActiveJobOfferItem = ({ jobOffer, getAllJobOffers }) => {
    const { user, authenticated } = useContext(UserContext);

    const handleOnDecline = (jobOfferId) => {
        if (user && authenticated) {
            declineJobOffer(jobOfferId, user.token)
            .then(_ => {
                getAllJobOffers(user.role === roles.EMPLOYEEE ? user.employeeId : user.companyId, user.token);
            }).catch(error => console.log(error));
        }
    }

    const handleOnAccept = (jobOffer) => {
        const contractRequestModel = {
            employee: jobOffer.employee,
            company: jobOffer.company,
            jobOfferId: jobOffer.id,
            creationDate: new Date(),
            active: true
        };

        if (user && authenticated) {
            postContract(contractRequestModel, user.token).then(_ => {
                getAllJobOffers(user.employeeId, user.token)
            }).catch(error => console.log(error));
        }
    }

    return (
        <div className="joboffers-container__active__item">
            <h4>{user.role === roles.EMPLOYEE ? jobOffer.company.name : getFullName(jobOffer.employee.firstName, jobOffer.employee.lastName)}</h4>
            <div className="joboffers-container__active__item__subheading">
                {jobOffer.position} - {jobOffer.salary}
            </div>
            <p>{jobOffer.description}</p>
            <p>Created at: {jobOffer.creationDate}</p>
            {user.role === roles.EMPLOYEE ? (
                <div className="joboffers-container__active__item__buttons">
                    <button className="button--accept" onClick={() => handleOnAccept(jobOffer)}>Accept</button>
                    <button className="button--decline" onClick={() => handleOnDecline(jobOffer.id)}>Decline</button>
                </div> 
                ) : (
                    <div className="joboffers-container__active__item__buttons">
                        <button className="button--accept" onClick={() => handleOnDecline(jobOffer.id)}>Close</button>
                    </div>
                )
            }
        </div>
    );
};