import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faTasks, faBook, faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import { SkillsList } from '../../components/Skills/SkillsList';
import { useRouteMatch } from 'react-router';
import { getEmployeeById } from '../../services/EmployeeService';
import { Spinner } from '../../components/Spinner/Spinner';
import { getIndicatorsOfFirstAndLastName } from '../../utils/Utils';

export const EmployeeProfile = () => {
    const matchId = useRouteMatch('/profile/:id').params.id;
    const [employee, setEmployee] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (matchId && !isNaN(Number(matchId))) {
            getEmployeeById(matchId)
                .then((response) => {
                    setEmployee(response.data);
                    setLoading(false);
                })
                .catch((error) => console.log(error));
        }
    }, []);

    return <>{isLoading ? <Spinner /> : <EmployeeProileLayout employee={employee} />}</>;
};

const EmployeeProileLayout = ({ employee }) => {
    return (
        <div className="employee-profile">
            <Header employee={employee} />
            <HireContainer employee={employee} />
            <Section>
                <SectionTitle name="Employments" icon={faLayerGroup} />
                <EmploymentSection employments={employee.employments} />
            </Section>
            <Section>
                <SectionTitle name="Projects" icon={faTasks} />
                <ProjectSection projects={employee.projects} />
            </Section>
            <Section>
                <SectionTitle name="Education" icon={faBook} />
                <EducationSection educations={employee.educations} />
            </Section>
            <Section>
                <SectionTitle name="Benefits" icon={faThermometerHalf} />
                <BenefitSection benefits={employee.benefits} />
            </Section>
        </div>
    );
};

const Section = ({ children }) => <div className="employee-profile__section">{children}</div>;

const SectionTitle = ({ icon, name }) => (
    <div className="employee-profile__section__title">
        <FontAwesomeIcon className="employee-profile__section__title__icon" icon={icon} />
        <div className="employee-profile__section__title__text">{name}</div>
    </div>
);

const SectionList = ({ children }) => {
    return <div className="employee-profile__section__list">{children}</div>;
};

const EmploymentSection = ({ employments }) => {
    return (
        <SectionList>
            {employments.map((employment, index) => (
                <EmploymentSectionItem employment={employment} key={index} />
            ))}
        </SectionList>
    );
};

const EmploymentSectionItem = ({ employment }) => {
    return (
        <div className="employee-profile__section__list__employment-item">
            <h1 className="employee-profile__section__list__employment-item__title">{employment.client}</h1>
            <div className="employee-profile__section__list__employment-item__position__duration">
                <h1 className="employee-profile__section__list__employment-item__position__duration__position">
                    {employment.position}
                </h1>
                <h3 className="employee-profile__section__list__employment-item__position__duration__duration">
                    {employment.startDate} - {employment.endDate}
                </h3>
            </div>
            <p className="employee-profile__section__list__employment-item__description">{employment.description}</p>
        </div>
    );
};

const ProjectSection = ({ projects }) => {
    return (
        <SectionList>
            {projects.map((project, index) => (
                <ProjectSectionItem project={project} key={index} />
            ))}
        </SectionList>
    );
};

const ProjectSectionItem = ({ project }) => {
    return (
        <div className="employee-profile__section__list__project-item">
            <h1 className="employee-profile__section__list__project-item__name">{project.name}</h1>
            <p className="employee-profile__section__list__project-item__description">{project.description}</p>
            <p className="employee-profile__section__list__project-item__technical-stack">
                Techhnical stack: {project.technicalStack}
            </p>
        </div>
    );
};

const EducationSection = ({ educations }) => {
    return (
        <SectionList>
            {educations.map((education, index) => (
                <EducationSectionItem education={education} key={index} />
            ))}
        </SectionList>
    );
};

const EducationSectionItem = ({ education }) => {
    return (
        <div className="employee-profile__section__list__education-item">
            <div className="employee-profile__section__list__education-item__title">
                <h3 className="employee-profile__section__list__education-item__title__name">{education.name}</h3>
                <h3 className="employee-profile__section__list__education-item__title__duration">
                    {education.startYear} - {education.endYear}
                </h3>
            </div>
            <p className="employee-profile__section__list__education-item__description">{education.description}</p>
        </div>
    );
};

const BenefitSection = ({ benefits }) => {
    return (
        <SectionList>
            <div className="employee-profile__section__list__benefit-container">
                {benefits.map((benefit, index) => (
                    <div className="employee-profile__section__list__benefit-item">{benefit.name}</div>
                ))}
            </div>
        </SectionList>
    );
};

const Header = ({ employee }) => (
    <div className="employee-profile__header">
        <div className="employee-profile__header__profile-image">
            <div className="employee-profile__header__profile-image__circle">
                {getIndicatorsOfFirstAndLastName(employee.firstName, employee.lastName)}
            </div>
        </div>
        <div className="employee-profile__header__main-details">
            <h1>{employee.firstName + ' ' + employee.lastName}</h1>
            <span>
                {employee.category.name} in {employee.country} - {employee.expectedSalary}
            </span>
            <p>{employee.about}</p>
            <SkillsList skills={employee.skills} />
        </div>
    </div>
);

const HireContainer = ({ employee }) => (
    <div className="employee-profile__hire-container">
        <p>Create job offer for {employee.firstName}</p>
        <button className="employee-profile__hire-container__button">Hire {employee.firstName}</button>
    </div>
);
