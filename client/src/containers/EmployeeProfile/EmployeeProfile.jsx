import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faTasks, faBook } from '@fortawesome/free-solid-svg-icons';
import { SkillsList } from '../../components/Skills/SkillsList';

export const EmployeeProfile = () => {
    return (
        <div className="employee-profile">
            <Header />
            <HireContainer />
            <Section>
                <SectionTitle name="Employments" icon={faLayerGroup} />
                <EmploymentSection />
            </Section>
            <Section>
                <SectionTitle name="Projects" icon={faTasks} />
                <ProjectSection />
            </Section>
            <Section>
                <SectionTitle name="Education" icon={faBook} />
                <EducationSection />
            </Section>
            <Section>
                <SectionTitle name="Benefits" icon={faBook} />
                <SectionList>
                    <div className="employee-profile__section__list__benefit-container">
                        <div className="employee-profile__section__list__benefit-item">Work from home</div>
                        <div className="employee-profile__section__list__benefit-item">Work from home</div>
                        <div className="employee-profile__section__list__benefit-item">Work from home</div>
                        <div className="employee-profile__section__list__benefit-item">Work from home</div>
                    </div>
                </SectionList>
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

export const SectionList = ({ children }) => {
    return <div className="employee-profile__section__list">{children}</div>;
};

const EmploymentSection = () => {
    return (
        <SectionList>
            <div className="employee-profile__section__list__employment-item">
                <h1 className="employee-profile__section__list__employment-item__title">Hajpa Veescore</h1>
                <div className="employee-profile__section__list__employment-item__position__duration">
                    <h1 className="employee-profile__section__list__employment-item__position__duration__position">
                        Software Developer
                    </h1>
                    <h3 className="employee-profile__section__list__employment-item__position__duration__duration">
                        May 2016 - September 2020
                    </h3>
                </div>
                <p className="employee-profile__section__list__employment-item__description">
                    Milan is an experienced freelancer with plenty of JavaScript know-how—he's been working with this
                    programming language for over six years. However lately, he’s been focusing on Ember.js, React, and
                    Node.js (Express.js). He’s able to build any project from the ground up; he’s also known for writing
                    well-designed, testable, and efficient code using best practices. As a person, Igor is hardworking,
                    responsible, and able to work by himself or in a team.
                </p>
            </div>
            <div className="employee-profile__section__list__employment-item">
                <h1 className="employee-profile__section__list__employment-item__title">Hajpa Veescore</h1>
                <div className="employee-profile__section__list__employment-item__position__duration">
                    <h1 className="employee-profile__section__list__employment-item__position__duration__position">
                        Software Developer
                    </h1>
                    <h3 className="employee-profile__section__list__employment-item__position__duration__duration">
                        May 2016 - September 2020
                    </h3>
                </div>
                <p className="employee-profile__section__list__employment-item__description">
                    Milan is an experienced freelancer with plenty of JavaScript know-how—he's been working with this
                    programming language for over six years. However lately, he’s been focusing on Ember.js, React, and
                    Node.js (Express.js). He’s able to build any project from the ground up; he’s also known for writing
                    well-designed, testable, and efficient code using best practices. As a person, Igor is hardworking,
                    responsible, and able to work by himself or in a team.
                </p>
            </div>
            <div className="employee-profile__section__list__employment-item">
                <h1 className="employee-profile__section__list__employment-item__title">Hajpa Veescore</h1>
                <div className="employee-profile__section__list__employment-item__position__duration">
                    <h1 className="employee-profile__section__list__employment-item__position__duration__position">
                        Software Developer
                    </h1>
                    <h3 className="employee-profile__section__list__employment-item__position__duration__duration">
                        May 2016 - September 2020
                    </h3>
                </div>
                <p className="employee-profile__section__list__employment-item__description">
                    Milan is an experienced freelancer with plenty of JavaScript know-how—he's been working with this
                    programming language for over six years. However lately, he’s been focusing on Ember.js, React, and
                    Node.js (Express.js). He’s able to build any project from the ground up; he’s also known for writing
                    well-designed, testable, and efficient code using best practices. As a person, Igor is hardworking,
                    responsible, and able to work by himself or in a team.
                </p>
            </div>
        </SectionList>
    );
};

export const ProjectSection = () => {
    return (
        <SectionList>
            <div className="employee-profile__section__list__project-item">
                <h1 className="employee-profile__section__list__project-item__name">Project name</h1>
                <p className="employee-profile__section__list__project-item__description">
                    Milan is an experienced freelancer with plenty of JavaScript know-how—he's been working with this
                    programming language for over six years. However lately, he’s been focusing on Ember.js, React, and
                    Node.js (Express.js). He’s able to build any project from the ground up; he’s also known for writing
                    well-designed, testable, and efficient code using best practices. As a person, Igor is hardworking,
                    responsible, and able to work by himself or in a team.
                </p>
                <p className="employee-profile__section__list__project-item__technical-stack">
                    Techhnical stack: Java, C#, React, Python
                </p>
            </div>
            <div className="employee-profile__section__list__project-item">
                <h1 className="employee-profile__section__list__project-item__name">Project name</h1>
                <p className="employee-profile__section__list__project-item__description">
                    Milan is an experienced freelancer with plenty of JavaScript know-how—he's been working with this
                    programming language for over six years. However lately, he’s been focusing on Ember.js, React, and
                    Node.js (Express.js). He’s able to build any project from the ground up; he’s also known for writing
                    well-designed, testable, and efficient code using best practices. As a person, Igor is hardworking,
                    responsible, and able to work by himself or in a team.
                </p>
                <p className="employee-profile__section__list__project-item__technical-stack">
                    Techhnical stack: Java, C#, React, Python
                </p>
            </div>
        </SectionList>
    );
};

const EducationSection = () => {
    return (
        <SectionList>
            <div className="employee-profile__section__list__education-item">
                <div className="employee-profile__section__list__education-item__title">
                    <h3 className="employee-profile__section__list__education-item__title__name">
                        Faculty of Technical Science
                    </h3>
                    <h3 className="employee-profile__section__list__education-item__title__duration">2016 - 2020</h3>
                </div>
                <p className="employee-profile__section__list__education-item__description">
                    This is a description. Whatever
                </p>
            </div>
            <div className="employee-profile__section__list__education-item">
                <div className="employee-profile__section__list__education-item__title">
                    <h3 className="employee-profile__section__list__education-item__title__name">
                        Faculty of Technical Science
                    </h3>
                    <h3 className="employee-profile__section__list__education-item__title__duration">2016 - 2020</h3>
                </div>
                <p className="employee-profile__section__list__education-item__description">
                    This is a description. Whatever
                </p>
            </div>
        </SectionList>
    );
};

const Header = () => (
    <div className="employee-profile__header">
        <div className="employee-profile__header__profile-image">
            <div className="employee-profile__header__profile-image__circle">M P</div>
        </div>
        <div className="employee-profile__header__main-details">
            <h1>Milan Petrovic</h1>
            <span>Web Development in Serbia - 23$hr</span>
            <p>
                Milan is an experienced freelancer with plenty of JavaScript know-how—he's been working with this
                programming language for over six years. However lately, he’s been focusing on Ember.js, React, and
                Node.js (Express.js). He’s able to build any project from the ground up; he’s also known for writing
                well-designed, testable, and efficient code using best practices. As a person, Igor is hardworking,
                responsible, and able to work by himself or in a team.
            </p>
            <SkillsList skills={[{ id: 1, name: 'Java' }]} />
        </div>
    </div>
);

const HireContainer = () => (
    <div className="employee-profile__hire-container">
        <p>Create job offer for Milan</p>
        <button className="employee-profile__hire-container__button">Hire Milan</button>
    </div>
);
