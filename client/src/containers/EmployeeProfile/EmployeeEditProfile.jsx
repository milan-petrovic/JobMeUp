import { Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { AddButton } from '../../components/Buttons/AddButton';
import { DeleteButton } from '../../components/Buttons/DeleteButton';
import { EditButton } from '../../components/Buttons/EditButton';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { SelectInputField, SelectInputMenu } from '../../components/InputForm/SelectInputField';
import { SkillsList } from '../../components/Skills/SkillsList';
import { Spinner } from '../../components/Spinner/Spinner';
import { getAllCategories } from '../../services/CategoryService';
import { getEmployeeById } from '../../services/EmployeeService';
import { UserContext } from '../../services/UserContext';
import { EMPTY_INITIAL_FIELD, invalidEmailMessage, requiredMessage } from '../../utils/Constants';

export const EmployeeEditProfile = () => {
    const [employee, setEmploye] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { user, authenticated } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (authenticated && user) {
            getEmployeeById(user.employeeId)
                .then((response) => {
                    setEmploye(response.data);
                    setLoading(false);
                    console.log('employee: ' + employee);
                })
                .catch((error) => console.log(error));
        }
    }, []);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(invalidEmailMessage).required(requiredMessage),
        firstName: Yup.string().required(requiredMessage),
        lastName: Yup.string().required(requiredMessage),
        password: Yup.string().required(requiredMessage),
        about: Yup.string().required(requiredMessage),
        expectedSalary: Yup.string().required(requiredMessage),
        category: Yup.object().nullable(false).shape({
            id: Yup.number(),
        }),
    });

    const initialValues = {
        email: EMPTY_INITIAL_FIELD,
        firstName: EMPTY_INITIAL_FIELD,
        lastName: EMPTY_INITIAL_FIELD,
        password: EMPTY_INITIAL_FIELD,
        about: EMPTY_INITIAL_FIELD,
        expectedSalary: EMPTY_INITIAL_FIELD,
        category: null,
    };

    const handleOnSubmit = (values, formikHelpers) => {
        console.log(values);
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="my-profile-container">
                    <div className="my-profile-container__main__details">
                        <h1> Update your info</h1>
                        <InputFormContainer>
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
                                {(formikProps) => (
                                    <EditProfileForm {...formikProps} employee={employee} skills={employee.skills} />
                                )}
                            </Formik>
                        </InputFormContainer>
                    </div>
                    <div className="my-profile-container__sections">
                        <Section>
                            <SectionTitle
                                name="Employments"
                                onClick={() => history.push(`/employee/${employee.id}/employments/new`)}
                            />
                            {employee?.employments?.map((employment, index) => (
                                <EmploymentSectionItem employment={employment} key={index} />
                            ))}
                        </Section>
                        <Section>
                            <SectionTitle
                                name="Projects"
                                onClick={() => history.push(`/employee/${employee.id}/projects/new`)}
                            />
                            {employee?.projects?.map((project, index) => (
                                <ProjectSectionItem project={project} key={index} />
                            ))}
                        </Section>
                        <Section>
                            <SectionTitle
                                name="Educations"
                                onClick={() => history.push(`/employee/${employee.id}/educations/new`)}
                            />
                            {employee?.educations?.map((education, index) => (
                                <EducationSectionItem education={education} key={index} />
                            ))}
                        </Section>
                    </div>
                </div>
            )}
        </>
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

const EducationSectionItem = ({ education }) => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    return (
        <SectionItemContainer>
            <div className="my-profile-container__sections__container__item__heading">
                <h1>{education.name} </h1>
                <div className="my-profile-container__sections__container__item__heading__buttons">
                    <EditButton
                        handleClick={() => history.push(`/employee/${user.employeeId}/educations/edit/${education.id}`)}
                    />
                    <DeleteButton />
                </div>
            </div>
            <div className="my-profile-container__sections__container__item__subheading">
                {education.startYear} - {education.endYear}
            </div>
            <p className="my-profile-container__sections__container__item__description">{education.description}</p>
        </SectionItemContainer>
    );
};

const EditProfileForm = ({ setValues, setFieldValue }) => {
    const { user, authenticated } = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (authenticated && user) {
            getEmployeeById(user.employeeId)
                .then((response) => {
                    const { data } = response;
                    setValues({ ...data });
                })
                .catch((error) => console.log(error));
            getAllCategories()
                .then((response) => {
                    setCategories(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, []);

    const handleOnCategoryClick = (category) => {
        setFieldValue('category', category);
        setShowMenu(false);
    };

    return (
        <Form>
            <Field as={InputField} name="email" labelName="E-mail address" type="e-mail" />
            <Field as={InputField} name="password" labelName="Password" type="password" />
            <Field as={InputField} name="firstName" labelName="First name" />
            <Field as={InputField} name="lastName" labelName="Last name" />
            <Field as={InputTextArea} name="about" labelName="About" rows={5} />
            <Field as={InputField} name="expectedSalary" labelName="Expected salary" />
            <Field as={SelectInputField} name="category.name" labelName="Category" onClick={() => setShowMenu(true)} />
            <SelectInputMenu visible={showMenu} options={categories} handleClick={handleOnCategoryClick} />
            <SubmitButton>Update</SubmitButton>
        </Form>
    );
};
