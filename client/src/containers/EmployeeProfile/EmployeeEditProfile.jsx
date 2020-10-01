import { Field, Form, Formik, setVa } from 'formik';
import React, { useEffect, useState } from 'react';
import { InputFormContainer } from '../../components/InputFields/InputFormContainer';
import * as Yup from 'yup';
import { InputField } from '../../components/InputFields/InputField';
import { InputTextArea } from '../../components/InputFields/InputTextArea';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { getEmployeeById } from '../../services/EmployeeService';
import { DeleteButton } from '../../components/Buttons/DeleteButton';
import { EditButton } from '../../components/Buttons/EditButton';
import { AddButton } from '../../components/Buttons/AddButton';

export const EmployeeEditProfile = () => {
    const employee = {
        id: 1,
        email: 'milan@gmail.com',
        password: 'password123',
        firstName: 'milan',
        lastName: 'petrovic',
        about: 'Java developer',
        category: {
            id: 1,
            name: 'Test',
            description: 'No description',
        },
        expectedSalary: '23$hr',
        skills: [
            {
                id: 1,
                name: 'Test',
            },
            {
                id: 2,
                name: 'Test1',
            },
            {
                id: 3,
                name: 'Test2',
            },
        ],
        benefits: [
            {
                id: 2,
                name: 'Test1',
                description: 'No description',
            },
            {
                id: 1,
                name: 'Test',
                description: 'No description',
            },
            {
                id: 3,
                name: 'Test2',
                description: 'No description',
            },
            {
                id: 4,
                name: 'Test3',
                description: 'No description',
            },
        ],
        projects: [
            {
                id: 1,
                name: 'Hajpa',
                description: 'No desc',
                technicalStack: 'Java, React',
            },
            {
                id: 2,
                name: 'LCLA',
                description: 'No desc',
                technicalStack: 'Flutter',
            },
            {
                id: 3,
                name: 'LCLewqeqwA',
                description: 'No desc',
                technicalStack: 'Flutter',
            },
        ],
        educations: [
            {
                id: 1,
                name: 'FTN',
                description: 'No',
                startYear: '2016',
                endYear: '2020',
            },
            {
                id: 2,
                name: 'Gimnazija Doboj',
                description: 'No',
                startYear: '2012',
                endYear: '2016',
            },
        ],
        employments: [
            {
                id: 1,
                client: 'Veescore',
                description: 'No description',
                position: 'Software developer',
                startDate: 'May, 2020',
                endDate: ' September, 2020',
            },
        ],
        receivedVotes: 1,
        givenVotes: 2,
    };

    const ValidationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        firstName: Yup.string().required('Requried'),
        lastName: Yup.string().required('Requried'),
        password: Yup.string().required('Required'),
        about: Yup.string().required('Required'),
        expectedSalary: Yup.string().required('Required'),
    });

    return (
        <div className="my-profile-container">
            <div className="my-profile-container__main__details">
                <h1> Update your info</h1>
                <InputFormContainer>
                    <Formik validationSchema={ValidationSchema}>
                        {(formikProps) => <EditProfileForm {...formikProps} employee={employee} />}
                    </Formik>
                </InputFormContainer>
            </div>
            <div className="my-profile-container__sections">
                <Section>
                    <SectionTitle name="Employments" onClick={() => console.log('click')} />
                    {employee.employments.map((employment, index) => (
                        <EmploymentSectionItem employment={employment} key={index} />
                    ))}
                </Section>
                <Section>
                    <SectionTitle name="Projects" onClick={() => console.log('pr click')} />
                    {employee.projects.map((project, index) => (
                        <ProjectSectionItem project={project} key={index} />
                    ))}
                </Section>
                <Section>
                    <SectionTitle name="Educations" onClick={() => console.log('ed click')} />
                    {employee.educations.map((education, index) => (
                        <EducationSectionItem education={education} key={index} />
                    ))}
                </Section>
            </div>
        </div>
    );
};

const Section = ({ children }) => <div className="my-profile-container__section">{children}</div>;
const SectionTitle = ({ name, onClick }) => {
    return (
        <div className="my-profile-container__section__title">
            <h1>{name}</h1>
            <AddButton handleClick={onClick} />
        </div>
    );
};

const SectionItemContainer = ({ children }) => (
    <div className="my-profile-container__sections__container">{children} </div>
);

const EmploymentSectionItem = ({ employment }) => (
    <SectionItemContainer>
        <div className="my-profile-container__sections__container__item__heading">
            <h1>{employment.client} </h1>
            <div className="my-profile-container__sections__container__item__heading__buttons">
                <EditButton />
                <DeleteButton />
            </div>
        </div>
        <div className="my-profile-container__sections__container__item__subheading">
            {employment.position}, {employment.startDate} - {employment.endDate}
        </div>
        <p className="my-profile-container__sections__container__item__description">{employment.description}</p>
    </SectionItemContainer>
);

const ProjectSectionItem = ({ project }) => (
    <SectionItemContainer>
        <div className="my-profile-container__sections__container__item__heading">
            <h1>{project.name} </h1>
            <div className="my-profile-container__sections__container__item__heading__buttons">
                <EditButton />
                <DeleteButton />
            </div>
        </div>
        <div className="my-profile-container__sections__container__item__subheading">
            Technical stack: {project.technicalStack}
        </div>
        <p className="my-profile-container__sections__container__item__description">{project.description}</p>
    </SectionItemContainer>
);

const EducationSectionItem = ({ education }) => (
    <SectionItemContainer>
        <div className="my-profile-container__sections__container__item__heading">
            <h1>{education.name} </h1>
            <div className="my-profile-container__sections__container__item__heading__buttons">
                <EditButton />
                <DeleteButton />
            </div>
        </div>
        <div className="my-profile-container__sections__container__item__subheading">
            {education.startYear} - {education.endYear}
        </div>
        <p className="my-profile-container__sections__container__item__description">{education.description}</p>
    </SectionItemContainer>
);

const EditProfileForm = ({ setValues, employee }) => {
    useEffect(() => {
        setValues({ ...employee });
    }, []);

    return (
        <Form>
            <Field as={InputField} name="email" labelName="E-mail address" type="e-mail" />
            <Field as={InputField} name="password" labelName="Password" type="password" />
            <Field as={InputField} name="firstName" labelName="First name" />
            <Field as={InputField} name="lastName" labelName="Last name" />
            <Field as={InputTextArea} name="about" labelName="About" rows={5} />
            <Field as={InputField} name="expectedSalary" labelName="Expected salary" />
            <SubmitButton>Update</SubmitButton>
        </Form>
    );
};
