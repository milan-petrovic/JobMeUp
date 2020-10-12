import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../components/Spinner/Spinner';
import { postContract } from '../../services/ContractsService';
import { declineJobOffer, getAllActiveJobOffersForEmployee, getAllDeclinedJobOffersForEmployee } from '../../services/JobOfferService';
import { UserContext } from '../../services/UserContext';

export const JobOffersContainer = () => {
    const [isLoading, setLoading] = useState(true);
    const [activeJobOffers, setActiveJobOffers] = useState([]);
    const [declinedJobOffers, setDeclinedJobOffers] = useState([]);
    const { user, authenticated } = useContext(UserContext);

    useEffect(() => {
        if (user && authenticated) {
            getAllJobOffers(user.employeeId, user.token);
        }
    }, []);

    const getAllJobOffers = (employeeId, token) => {
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


    return(
        <div className="joboffers-container">
            <div className="joboffers-container__active">
                <JobOfferSectionTitle>Active job offers</JobOfferSectionTitle>
                {isLoading ? <Spinner /> : 
                    activeJobOffers.map((jobOffer, index) => 
                    <ActiveJobOfferItem 
                      jobOffer={jobOffer}
                      getAllJobOffers={getAllJobOffers}
                      key={index}
                    />)}
            </div>
            <div className="joboffers-container__inactive">
                <JobOfferSectionTitle>Past job offers</JobOfferSectionTitle>
                <>{ isLoading ? <Spinner /> : 
                    <table className="joboffers-container__inactive__table">
                    <tr>
                        <th>Company</th>
                        <th>Creation date</th>
                        <th>Position</th>
                        <th>Salary</th>
                    </tr>
                    {declinedJobOffers.map((jobOffer, index) => <JobOfferTableCell jobOffer={jobOffer} key={index} />)}
                </table>
                }</>
            </div>
        </div>
    );   
}

const JobOfferTableCell = ({ jobOffer }) => {
    return (
        <tr>
            <td>{jobOffer.company.name}</td>
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
                getAllJobOffers(user.employeeId, user.token);
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
            <h4>{jobOffer.company.name}</h4>
            <div className="joboffers-container__active__item__subheading">
                {jobOffer.position} - {jobOffer.salary}
            </div>
            <p>{jobOffer.description}</p>
            <p>Created at: {jobOffer.creationDate}</p>
            <div className="joboffers-container__active__item__buttons">
                <button className="button--accept" onClick={() => handleOnAccept(jobOffer)}>Accept</button>
                <button className="button--decline" onClick={() => handleOnDecline(jobOffer.id)}>Decline</button>
            </div>
        </div>
    );
};