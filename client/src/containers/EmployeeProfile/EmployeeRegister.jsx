import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { SelectInputField, SelectInputMenu } from '../../components/InputForm/SelectInputField';
import { Logo } from '../../components/Logo/Logo';
import { getAllCategories } from '../../services/CategoryService';
import { EMPTY_INITIAL_FIELD, invalidEmailMessage, requiredMessage, routes } from '../../utils/Constants';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getAllSkills } from '../../services/SkillsService';
import { getAllBenefits } from '../../services/BenefitsService';
import { Dialog } from '../../components/Dialog/Dialog';
import { SkillsList } from '../../components/Skills/SkillsList';
import { Field, Form, Formik } from 'formik';
import { BenefitsList } from '../../components/BenefitsList/BenefitsList';
import { postEmployee } from '../../services/EmployeeService';
import { useHistory } from 'react-router-dom';

export const EmployeeRegister = () => {
    const [categories, setCategories] = useState([]);
    const [skills, setSkills] = useState([]);
    const [activeSkills, setActiveSkills] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [activeBenefits, setActiveBenefits] = useState([]);

    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [showSkillsDialog, setShowSkillsDialog] = useState(false);
    const [showBenefitsDialog, setShowBenefitsDialog] = useState(false);

    const history = useHistory();

    useEffect(() => {
        getAllCategories()
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
        getAllSkills()
            .then((response) => setSkills(response.data))
            .catch((error) => console.log(error));
        getAllBenefits()
            .then((response) => setBenefits(response.data))
            .catch((error) => console.log(error));
    }, []);

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
        const { setSubmitting, resetForm } = formikHelpers;

        setSubmitting(true);
        postEmployee(values)
            .then((_) => {
                history.push(routes.LOGIN);
                resetForm();
            })
            .catch((error) => console.log(error));
    };

    const handleOnCategorySelect = (category, formikProps) => {
        const { setFieldValue } = formikProps;
        setFieldValue('category', category);
        setShowOptionsMenu(false);
    };

    const SkillsSelectableDialog = ({
        skillsItem,
        previousSkills,
        setFieldValue,
        setShowDialog,
        activeSkills,
        setActiveSkills,
    }) => {
        const [showOptionsMenu, setShowOptionsMenu] = useState(false);
        const [initialSkills, setInitialSkills] = useState([]);
        const [selectedSkills, setSelectedSkills] = useState([]);

        useEffect(() => {
            if (previousSkills !== null) {
                setInitialSkills([...previousSkills]);
                setSelectedSkills([...previousSkills]);
            }
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
            <Dialog
                dialogTitle="Skills"
                content="Select skills"
                selectedItems={selectedSkills}
                selectButtonText="Select skills here. Click on skill for delete."
                items={skillsItem}
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
        benefitsItem,
        previousBenefits,
        setFieldValue,
        setShowDialog,
        activeBenefits,
        setActiveBenefits,
    }) => {
        const [showOptionsMenu, setShowOptionsMenu] = useState(false);
        const [initialBenefits, setInitialBenefits] = useState([]);
        const [selectedBenefits, setSelectedBenefits] = useState([]);

        useEffect(() => {
            if (previousBenefits !== null) {
                setInitialBenefits([...previousBenefits]);
                setSelectedBenefits([...previousBenefits]);
            }
        }, []);

        const handleOnSelectClick = (benefit) => {
            const tempBenefits = [...selectedBenefits];
            const benefits = tempBenefits.filter((tempBenefit) => tempBenefit.id !== benefit.id);
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
            <Dialog
                dialogTitle="Benefits"
                content="Select benefits"
                selectedItems={selectedBenefits}
                selectButtonText="Select benefits here. Click on benefit for delete."
                items={benefitsItem}
                handleOnSelectedItemClick={handleOnBenefitClick}
                handleOnSelectClick={handleOnSelectClick}
                handleOnConfirm={handleOnConfirm}
                handleOpenOptionsMenu={handleOpenOptionsMenu}
                handleCloseOptionsMenu={handleCloseOptionsMenu}
                visible={showOptionsMenu}
            />
        );
    };

    return (
        <div className="input-form">
            <Logo fontSize="36px" />
            <InputFormHeading>Apply as employee</InputFormHeading>
            <InputFormContainer width="500px">
                <Formik
                    initialValues={initialValues}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
                    {(formikProps) => (
                        <Form>
                            <Field as={InputField} name="email" placeholder="E-mail address" type="e-mail" />
                            <Field as={InputField} name="password" placeholder="Password" type="password" />
                            <Field as={InputField} name="firstName" placeholder="First name" />
                            <Field as={InputField} name="lastName" placeholder="Last name" />
                            <Field as={InputTextArea} name="about" placeholder="About" rows={5} />
                            <Field as={InputField} name="expectedSalary" placeholder="Expected salary" />
                            <Field as={InputField} name="country" placeholder="Country" />
                            <Field
                                as={SelectInputField}
                                name="category.name"
                                placeholder="Category"
                                onClick={() => setShowOptionsMenu(true)}
                            />
                            <SelectInputMenu
                                visible={showOptionsMenu}
                                options={categories}
                                formikProps={formikProps}
                                handleClick={handleOnCategorySelect}
                            />
                            <div style={{ height: '32px' }} />
                            <div className="dialog-label">
                                Skills
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="dialog-label__icon "
                                    onClick={() => setShowSkillsDialog(true)}
                                />
                            </div>
                            {showSkillsDialog ? (
                                <SkillsSelectableDialog
                                    skillsItem={skills}
                                    previousSkills={formikProps.values.skills}
                                    setFieldValue={formikProps.setFieldValue}
                                    setShowDialog={setShowSkillsDialog}
                                    activeSkills={activeSkills}
                                    setActiveSkills={setActiveSkills}
                                />
                            ) : (
                                <></>
                            )}
                            {activeSkills && <SkillsList skills={activeSkills} />}

                            <div className="dialog-label">
                                Benefits
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="dialog-label__icon "
                                    onClick={() => setShowBenefitsDialog(true)}
                                />
                            </div>
                            {showBenefitsDialog ? (
                                <BenefitsSelectableDialog
                                    benefitsItem={benefits}
                                    previousBenefits={formikProps.values.benefits}
                                    setFieldValue={formikProps.setFieldValue}
                                    setShowDialog={setShowBenefitsDialog}
                                    activeBenefits={activeBenefits}
                                    setActiveBenefits={setActiveBenefits}
                                />
                            ) : (
                                <></>
                            )}
                            {activeBenefits && <BenefitsList benefits={activeBenefits} />}

                            <SubmitButton>Apply as employee</SubmitButton>
                        </Form>
                    )}
                </Formik>
            </InputFormContainer>
        </div>
    );
};
