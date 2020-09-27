import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export const EmployeeItem = ({ employee }) => (
    <div className="employee-item">
        <div className="employee-details">
            <div className="employee-details__main">
                <div className="employee-details__main__circle-indicator">M P</div>
                <div className="employee-details__main__name_location">
                    <div className="employee-details__main__name">{employee.firstName + ' ' + employee.lastName}</div>
                    <div className="employee-details__main__location">
                        <FontAwesomeIcon className="employee-details__main__location__icon" icon={faLocationArrow} />
                        <div className="employee-details__main__location__text">{employee.country}</div>
                    </div>
                </div>
            </div>
            <div className="employee-details__category">
                <div className="employee-details__category_text">Category: {employee.category.name}</div>
            </div>
            <div className="employee-details__salary">Expected salary: {employee.expectedSalary}</div>
            <SkillsContainer skills={employee.skills} />
            <div className="employee-details__voteup_button">
                <FontAwesomeIcon className="employee-details__voteup_button__icon" icon={faPlusCircle} />
                <div className="employee-details__voteup_button__text">Vote me Up</div>
            </div>
        </div>
        <div className="employee-description">
            <div className="employee-description__about-placeholder">About</div>
            <div className="employee-description__about">ekqowekpqwkepowqkpeoq</div>
            <p>View profile</p>
        </div>
    </div>
);

const SkillsContainer = ({ skills }) => {
    return (
        <div className="skills-container">
            {skills.map((skill, index) => {
                return <SkillItem name={skill.name} key={index} />;
            })}
        </div>
    );
};

const SkillItem = ({ name }) => {
    return <li className="skill-item">{name}</li>;
};
