import { faChevronUp, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../services/UserContext';
import { roles } from '../../utils/Constants';
import { getIndicatorsOfFirstAndLastName } from '../../utils/Utils';
import { SkillsList } from '../Skills/SkillsList';

export const EmployeeItem = ({ employee, handleVoteSubmit }) => {
    const history = useHistory();
    const { user } = useContext(UserContext);

    return (
        <div className="employee-item">
            <div className="employee-details">
                <div className="employee-details__main">
                    <div className="employee-details__main__circle-indicator">
                        {getIndicatorsOfFirstAndLastName(employee.firstName, employee.lastName)}
                    </div>
                    <div className="employee-details__main__name_location">
                        <div className="employee-details__main__name">
                            {employee.firstName + ' ' + employee.lastName}
                        </div>
                        <div className="employee-details__main__location">
                            <FontAwesomeIcon
                                className="employee-details__main__location__icon"
                                icon={faLocationArrow}
                            />
                            <div className="employee-details__main__location__text">{employee.country}</div>
                        </div>
                    </div>
                </div>
                <div className="employee-details__category">
                    <div className="employee-details__category_text">Category: {employee.category.name}</div>
                </div>
                <div className="employee-details__salary"> Expected salary: {employee.expectedSalary}</div>
                <SkillsList skills={employee.skills} />
                {user.role === roles.COMPANY || employee.isVotedByEmployee ? (
                    <div></div>
                ) : (
                    <div className="employee-details__voteup_button" onClick={() => handleVoteSubmit(employee)}>
                        <FontAwesomeIcon className="employee-details__voteup_button__icon" icon={faChevronUp} />
                        <div className="employee-details__voteup_button__text">
                            VOTE ME <div className="employe-details__voteup_button__text__up">UP</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="employee-description" onClick={() => history.push(`/profile/${employee.id}`)}>
                <div className="employee-description__about-placeholder">About</div>
                <div className="employee-description__about">{employee.about}</div>
                <p>View profile</p>
            </div>
        </div>
    );
};
