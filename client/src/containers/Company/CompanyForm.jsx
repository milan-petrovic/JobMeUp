import { Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { FormSubheading } from '../../components/FormSubheading/FormSubheading';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { Logo } from '../../components/Logo/Logo';
import { getCompanyById, postCompany, putCompany } from '../../services/CompanyService';
import { UserContext } from '../../services/UserContext';
import {
    EMPTY_INITIAL_FIELD,
    getConstraintLengthMinMessage,
    invalidEmailMessage,
    requiredMessage,
    routes,
} from '../../utils/Constants';

export const CompanyForm = () => {
    const history = useHistory();
    const matchId = useRouteMatch(routes.COMPANY_EDIT)?.params.companyId;

    const initialValues = {
        email: EMPTY_INITIAL_FIELD,
        password: EMPTY_INITIAL_FIELD,
        name: EMPTY_INITIAL_FIELD,
        about: EMPTY_INITIAL_FIELD,
        country: EMPTY_INITIAL_FIELD,
        size: 0,
        foundedYear: 0,
        address: EMPTY_INITIAL_FIELD,
        phoneNumber: EMPTY_INITIAL_FIELD,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(requiredMessage)
            .min(6, getConstraintLengthMinMessage('Email', 6))
            .email(invalidEmailMessage),
        password: Yup.string().required(requiredMessage),
        name: Yup.string().required(requiredMessage),
        about: Yup.string().required(requiredMessage),
        country: Yup.string().required(requiredMessage),
        size: Yup.number().required(requiredMessage),
        foundedYear: Yup.number().required(requiredMessage),
        address: Yup.string().required(requiredMessage),
        phoneNumber: Yup.string().required(requiredMessage),
    });

    const handleOnSubmit = (values, formikHelpers) => {
        const { setSubmitting, resetForm } = formikHelpers;
        
        setSubmitting(true);
        if (values.id != null) {
            putCompany(values)
                .then((response) => {
                    console.log(response);
                    history.push(routes.COMPANY_HOME);
                })
                .catch((error) => console.log(error))
                .finally((_) => {
                    setSubmitting(false);
                    resetForm(true);
                });
        } else {
            postCompany(values)
                .then((response) => {
                    console.log(response);
                    history.push(routes.LOGIN_COMPANY);
                })
                .catch((error) => console.log(error))
                .finally((_) => {
                    setSubmitting(false);
                    resetForm(true);
                });
        }
    };

    return (
        <div className="input-form">
            <Logo fontSize="36px" />
            <InputFormHeading>{matchId ? 'Update info' : 'Apply as company'}</InputFormHeading>
            <InputFormContainer width="500px">
                <Formik
                    initialValues={initialValues}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
                    {(formikProps) => (
                        <InnerForm {...formikProps} />
                    )}
                </Formik>
            </InputFormContainer>
            {matchId ? <></> : <FormSubheading text="Already registered as company?" linkText="Login" path={routes.LOGIN_COMPANY} />}
        </div>
    );
};

const InnerForm = ({ setValues }) => {
    const [editing, setEditing] = useState(false);
    const matchId = useRouteMatch(routes.COMPANY_EDIT)?.params.companyId;
    const { user, authenticated } = useContext(UserContext);

    useEffect(() => {
        if (matchId) {
            if (user && authenticated && user.token) {
                getCompanyById(matchId, user.token).then((response) => {
                    const { data } = response;
                    setValues({...data});
                    setEditing(true);
                }).catch(error => console.log(error));
            }
        }
    }, []);

    return (
        <Form>
            <Field as={InputField} name="email" id="email" placeholder="E-mail" type="email" />
            <Field
                as={InputField}
                name="password"
                id="password"
                placeholder="Password"
                type="password"
            />
            <Field as={InputField} name="name" id="name" placeholder="Name" />
            <Field as={InputTextArea} name="about" id="about" placeholder="About" rows="5" />
            <Field as={InputField} name="country" id="country" placeholder="Country" />
            <Field
                as={InputField}
                name="size"
                id="size"
                placeholder="Size"
                type="number"
                labelName="Size"
            />
            <Field
                as={InputField}
                name="foundedYear"
                id="foundedYear"
                placeholder="Founded year"
                labelName="Founded year"
                type="number"
            />
            <Field as={InputField} name="address" id="address" placeholder="Address" />
            <Field as={InputField} name="phoneNumber" id="phoneNumber" placeholder="Phone number" />
            <SubmitButton>{editing ? 'Update info' : 'Submit'}</SubmitButton>
        </Form>
    );
}