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
import { LineSpacer } from '../../components/LineSpacer/LineSpacer';
import { SkillsList } from '../../components/Skills/SkillsList';
import { Spinner } from '../../components/Spinner/Spinner';
import { getAllCategories } from '../../services/CategoryService';
import { getEmployeeById, putEmployee } from '../../services/EmployeeService';
import { getAllSkills } from '../../services/SkillsService';
import { UserContext } from '../../services/UserContext';
import { EMPTY_INITIAL_FIELD, invalidEmailMessage, requiredMessage } from '../../utils/Constants';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectableDialog  } from '../../components/Dialog/SelectableDialog';
import { Dialog } from '../../components/Dialog/Dialog';
import { getAllBenefits } from '../../services/BenefitsService';
import { BenefitsList } from '../../components/BenefitsList/BenefitsList';
import { deleteEmployment } from '../../services/EmploymentService';
import { deleteProject } from '../../services/ProjectService';
import { deleteEducation } from '../../services/EducationService';

export const EmployeeEditProfile = () => {
    const [employee, setEmploye] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { user, authenticated } = useContext(UserContext);
    const history = useHistory();
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [activeSkills, setActiveSkills] = useState([]);

    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [activeBenefits, setActiveBenefits] = useState([]);

    useEffect(() => {
        if (authenticated && user) {
            getEmployee(user.employeeId);
        }
    }, []);
    
    const getEmployee = (employeeId) => {
        getEmployeeById(employeeId)
        .then((response) => {
            setEmploye(response.data);
            setLoading(false);
            setActiveSkills(response.data.skills);
            setSelectedSkills(response.data.skills);
            setActiveBenefits(response.data.benefits);
            setSelectedBenefits(response.data.benefits);
        })
        .catch((error) => console.log(error));
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(invalidEmailMessage).required(requiredMessage),
        firstName: Yup.string().required(requiredMessage),
        lastName: Yup.string().required(requiredMessage),
        password: Yup.string().required(requiredMessage),
        about: Yup.string().required(requiredMessage),
        expectedSalary: Yup.string().required(requiredMessage),
        country: Yup.string().required(requiredMessage),
        category: Yup.object().nullable(false).shape({
            id: Yup.number(),
        }),
        skills: Yup.array().of(
            Yup.object().shape({
                id: Yup.number(),
                name: Yup.string(),
            }),
        ),
        benefits: Yup.array().of(
            Yup.object().shape({
                id: Yup.number(),
                name: Yup.string(),
            }),
        ),
    });

    const initialValues = {
        email: EMPTY_INITIAL_FIELD,
        firstName: EMPTY_INITIAL_FIELD,
        lastName: EMPTY_INITIAL_FIELD,
        password: EMPTY_INITIAL_FIELD,
        about: EMPTY_INITIAL_FIELD,
        expectedSalary: EMPTY_INITIAL_FIELD,
        country: EMPTY_INITIAL_FIELD,
        category: null,
        skills: null,
        benefits: null,
    };

    const handleOnSubmit = (values, formikHelpers) => {
        console.log(values);

        putEmployee(values)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
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
                                    <EditProfileForm
                                        {...formikProps}
                                        employee={employee}
                                        activeSkills={activeSkills}
                                        selectedSkills={selectedSkills}
                                        setSelectedSkills={setSelectedSkills}
                                        setActiveSkills={setActiveSkills}
                                        activeBenefits={activeBenefits}
                                        selectedBenefits={selectedBenefits}
                                        setActiveBenefits={setActiveBenefits}
                                        setSelectedBenefits={setSelectedBenefits}
                                    />
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
                                <EmploymentSectionItem employment={employment} key={index} getEmployee={getEmployee}/>
                            ))}
                        </Section>
                        <Section>
                            <SectionTitle
                                name="Projects"
                                onClick={() => history.push(`/employee/${employee.id}/projects/new`)}
                            />
                            {employee?.projects?.map((project, index) => (
                                <ProjectSectionItem project={project} key={index} getEmployee={getEmployee}/>
                            ))}
                        </Section>
                        <Section>
                            <SectionTitle
                                name="Educations"
                                onClick={() => history.push(`/employee/${employee.id}/educations/new`)}
                            />
                            {employee?.educations?.map((education, index) => (
                                <EducationSectionItem education={education} key={index} getEmployee={getEmployee} />
                            ))}
                        </Section>
                    </div>
                </div>
            )}
        </>
    );
};

const SkillsSelectableDialog = ({
    selectedSkills,
    setSelectedSkills,
    activeSkills,
    setActiveSkills,
    setFieldValue,
    setShowDialog,
}) => {
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [skills, setSkills] = useState([]);
    const [initialSkills, setInitialsSkills] = useState([]);

    useEffect(() => {
        getAllSkills()
            .then((response) => {
                setSkills(response.data);
                setInitialsSkills([...selectedSkills]);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleOnSelectClick = (skill) => {
        const tempSkills = [...selectedSkills];
        const skills = tempSkills.filter((tempSkill) => tempSkill.id !== skill.id);
        skills.push(skill);
        setSelectedSkills(skills);
        setShowOptionsMenu(false);
    };

    const handleOnSkillClick = (skill) => {
        const skills = [...selectedSkills];
        setSelectedSkills(skills.filter((filteredSkill) => filteredSkill !== skill));
    };

    const handleOnConfirm = () => {
        setActiveSkills(selectedSkills);
        setFieldValue('skills', selectedSkills);
        console.log(activeSkills);
        setShowDialog(false);
    };

    const handleOpenOptionsMenu = () => {
        setShowOptionsMenu(true);
    };

    const handleCloseOptionsMenu = () => {
        setSelectedSkills([...initialSkills]);
        setShowDialog(false);
    };

    return (
        <SelectableDialog
            dialogTitle="Skills"
            content="Select skills"
            selectedItems={selectedSkills}
            selectButtonText="Select skills here. Click on skill for delete."
            items={skills}
            handleOnSelectedItemClick={handleOnSkillClick}
            handleOnSelectClick={handleOnSelectClick}
            handleOnConfirm={handleOnConfirm}
            handleOpenOptionsMenu={handleOpenOptionsMenu}
            handleCloseOptionsMenu={handleCloseOptionsMenu}
            visible={showOptionsMenu}
        />
    );
};

const BenefitsSelectableDialog = ({
    selectedBenefits,
    setSelectedBenefits,
    activeBenefits,
    setActiveBenefits,
    setFieldValue,
    setShowDialog,
}) => {
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [benefits, setBenefits] = useState([]);
    const [initialBenefits, setInitialBenefits] = useState([]);

    useEffect(() => {
        getAllBenefits()
            .then((response) => {
                setBenefits(response.data);
                setInitialBenefits([...selectedBenefits]);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleOnSelectClick = (benefit) => {
        const tempBenefits = [...selectedBenefits];
        var benefits = tempBenefits.filter((tempBenefit) => tempBenefit.id !== benefit.id);
        benefits.push(benefit);
        setSelectedBenefits(benefits);
        setShowOptionsMenu(false);
    };

    const handleOnBenefitClick = (benefit) => {
        const benefits = [...selectedBenefits];
        setSelectedBenefits(benefits.filter((filteredBenefit) => filteredBenefit !== benefit));
    };

    const handleOnConfirm = () => {
        setActiveBenefits(selectedBenefits);
        setFieldValue('benefits', selectedBenefits);
        setShowDialog(false);
    };

    const handleOpenOptionsMenu = () => {
        setShowOptionsMenu(true);
    };

    const handleCloseOptionsMenu = () => {
        setSelectedBenefits([...initialBenefits]);
        setShowDialog(false);
    };

    return (
        <SelectableDialog
            dialogTitle="Benefits"
            content="Select benefit"
            selectedItems={selectedBenefits}
            selectButtonText="Select benefit here. Click on benefit for delete."
            items={benefits}
            handleOnSelectedItemClick={handleOnBenefitClick}
            handleOnSelectClick={handleOnSelectClick}
            handleOnConfirm={handleOnConfirm}
            handleOpenOptionsMenu={handleOpenOptionsMenu}
            handleCloseOptionsMenu={handleCloseOptionsMenu}
            visible={showOptionsMenu}
        />
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

const EmploymentSectionItem = ({ employment, getEmployee }) => {
    const { user, authenticated } = useContext(UserContext);
    const history = useHistory();
    const [showDeleteDialog, setShowDeleteDialog] = useState({ showDialog: false, employment: null});

    const handleOpenDialog = (employment) => {
        setShowDeleteDialog({ showDialog: true, employment: employment });
    };

    const handleCloseDialog = () => {
        setShowDeleteDialog({ showDialog: false, employment: null });
    };

    const handleOnConfirm = (employmentId) => {
        if (user && authenticated && user.token) {
            deleteEmployment(employmentId, user.token)
                .then(_ => {
                    getEmployee(user.employeeId);
                })
                .catch(error => console.log(error))
                .finally(() => {
                    handleCloseDialog();
                });
        }
    }

    return  (
        <>
            {showDeleteDialog.showDialog ? 
                <Dialog 
                title="Delete employment confirmation" 
                content={`Are you sure that you want delete employment ${showDeleteDialog.employment.client}?`}
                handleOnConfirm={() => handleOnConfirm(showDeleteDialog.employment.id)} 
                handleOnClose={() => handleCloseDialog()}/>
                : <></>}
            <SectionItemContainer>
                <div className="my-profile-container__sections__container__item__heading">
                    <h1>{employment.client} </h1>
                    <div className="my-profile-container__sections__container__item__heading__buttons">
                        <EditButton 
                            handleClick={() => history.push(`/employee/${user.employeeId}/employments/edit/${employment.id}`)}
                        />
                        <DeleteButton handleClick={() => handleOpenDialog(employment)}/>
                    </div>
                </div>
                <div className="my-profile-container__sections__container__item__subheading">
                    {employment.position} - {employment.startDate} - {employment.endDate}
                </div>
                <p className="my-profile-container__sections__container__item__description">{employment.description}</p>
            </SectionItemContainer>
        </>
    );
};

const ProjectSectionItem = ({ project, getEmployee }) => {
    const { user, authenticated } = useContext(UserContext);
    const history = useHistory();
    const [showDeleteDialog, setShowDeleteDialog] = useState({ showDialog: false, project: null});

    const handleOpenDialog = (project) => {
        setShowDeleteDialog({ showDialog: true, project: project });
    };

    const handleCloseDialog = () => {
        setShowDeleteDialog({ showDialog: false, project: null });
    };

    const handleDelete = (projectId) => {
        if (authenticated && user && user.token) {
            deleteProject(projectId, user.token)
                .then(_ => {
                    getEmployee(user.employeeId);
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <>
            {showDeleteDialog && showDeleteDialog.showDialog ? 
                <Dialog 
                    title="Delete project confirmation"
                    content={`Are you sure that you want to delete ${showDeleteDialog.project.name}?`}
                    handleOnClose={() => handleCloseDialog()}
                    handleOnConfirm={() => handleDelete(showDeleteDialog.project.id)}
                /> : 
                <></>
            }
            <SectionItemContainer>
                <div className="my-profile-container__sections__container__item__heading">
                    <h1>{project.name} </h1>
                    <div className="my-profile-container__sections__container__item__heading__buttons">
                        <EditButton 
                            handleClick={() => history.push(`/employee/${user.employeeId}/projects/edit/${project.id}`)}
                            />
                        <DeleteButton handleClick={() => handleOpenDialog(project)}/>
                    </div>
                </div>
                <div className="my-profile-container__sections__container__item__subheading">
                    Technical stack: {project.technicalStack}
                </div>
                <p className="my-profile-container__sections__container__item__description">{project.description}</p>
            </SectionItemContainer>
        </>
    );
}

const EducationSectionItem = ({ education, getEmployee  }) => {
    const history = useHistory();
    const { user, authenticated } = useContext(UserContext);
    const [showDeleteDialog, setShowDeleteDialog] = useState({ showDialog: false, education: null});

    const handleOpenDialog = (education) => {
        setShowDeleteDialog({ showDialog: true, education: education });
    };

    const handleCloseDialog = () => {
        setShowDeleteDialog({ showDialog: false, education: null });
    };

    const handleDelete = (educationId) => {
        if (authenticated && user && user.token) {
            deleteEducation(educationId, user.token)
                .then(_ => {
                    getEmployee(user.employeeId);
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <>
            {showDeleteDialog && showDeleteDialog.showDialog ? 
              <Dialog 
                title="Delete education confirmation"
                content={`Are you sure that you want to delete ${showDeleteDialog.education.name}?`}
                handleOnClose={() => handleCloseDialog()}
                handleOnConfirm={() => handleDelete(showDeleteDialog.education.id)}
             />
              : <></>
            }
            <SectionItemContainer>
                <div className="my-profile-container__sections__container__item__heading">
                    <h1>{education.name} </h1>
                    <div className="my-profile-container__sections__container__item__heading__buttons">
                        <EditButton
                            handleClick={() => history.push(`/employee/${user.employeeId}/educations/edit/${education.id}`)}
                        />
                        <DeleteButton handleClick={() => handleOpenDialog(education)}/>
                    </div>
                </div>
                <div className="my-profile-container__sections__container__item__subheading">
                    {education.startYear} - {education.endYear}
                </div>
                <p className="my-profile-container__sections__container__item__description">{education.description}</p>
            </SectionItemContainer>
        </>
    );
};

const EditProfileForm = ({
    setValues,
    setFieldValue,
    activeSkills,
    selectedSkills,
    setActiveSkills,
    setSelectedSkills,
    activeBenefits,
    selectedBenefits,
    setActiveBenefits,
    setSelectedBenefits,
}) => {
    const { user, authenticated } = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [showSkillsDialog, setShowSkillsDialog] = useState(false);
    const [showBenefitsDialog, setShowBenefitsDialog] = useState(false);

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
            <Field as={InputField} name="country" labelName="Country" />
            <Field as={SelectInputField} name="category.name" labelName="Category" onClick={() => setShowMenu(true)} />
            <SelectInputMenu visible={showMenu} options={categories} handleClick={handleOnCategoryClick} />
            <div className="dialog-label">
                Skills
                <FontAwesomeIcon
                    icon={faCog}
                    className="dialog-label__icon "
                    onClick={() => setShowSkillsDialog(true)}
                />
            </div>
            {showSkillsDialog ? (
                <SkillsSelectableDialog
                    activeSkills={activeSkills}
                    selectedSkills={selectedSkills}
                    setActiveSkills={setActiveSkills}
                    setSelectedSkills={setSelectedSkills}
                    setFieldValue={setFieldValue}
                    setShowDialog={setShowSkillsDialog}
                />
            ) : (
                <></>
            )}
            {activeSkills && <SkillsList skills={activeSkills} />}

            <div className="dialog-label">
                Benefits
                <FontAwesomeIcon
                    icon={faCog}
                    className="dialog-label__icon "
                    onClick={() => setShowBenefitsDialog(true)}
                />
            </div>
            {showBenefitsDialog ? (
                <BenefitsSelectableDialog
                    activeBenefits={activeBenefits}
                    selectedBenefits={selectedBenefits}
                    setActiveBenefits={setActiveBenefits}
                    setSelectedBenefits={setSelectedBenefits}
                    setFieldValue={setFieldValue}
                    setShowDialog={setShowBenefitsDialog}
                />
            ) : (
                <></>
            )}
            {activeBenefits && <BenefitsList benefits={activeBenefits} />}

            <SubmitButton>Update</SubmitButton>
        </Form>
    );
};
