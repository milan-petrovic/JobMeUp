import { Field, Form, Formik } from 'formik';
import jwt from 'jwt-decode';
import React, { useContext } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { FormSubheading } from '../../components/FormSubheading/FormSubheading';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { Logo } from '../../components/Logo/Logo';
import { loginAsEmployee, loginAsCompany } from '../../services/AuthenticateService';
import { UserContext } from '../../services/UserContext';
import {
    EMPTY_INITIAL_FIELD,
    getConstraingLengthMaxMessage,
    getConstraintLengthMinMessage,
    invalidEmailMessage,
    requiredMessage,
    roles,
    routes,
} from '../../utils/Constants';

export const LoginPage = () => {
    const { loginUser } = useContext(UserContext);
    const history = useHistory();
    const roleType = useRouteMatch(routes.LOGIN)?.params.role;

    const initialValues = {
        email: EMPTY_INITIAL_FIELD,
        password: EMPTY_INITIAL_FIELD,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(invalidEmailMessage)
            .min(4, getConstraintLengthMinMessage('Email', 4))
            .required(requiredMessage),
        password: Yup.string()
            .min(6, getConstraintLengthMinMessage('Password', 6))
            .max(32, getConstraingLengthMaxMessage('Password', 32))
            .required(requiredMessage),
    });

    const handleOnSubmit = (values, formikHelpers) => {
        const { setSubmitting } = formikHelpers;
        setSubmitting(true);

        const authModel = {
            username: values.email,
            password: values.password,
        };

        console.log(roleType);

        if (roleType === roles.EMPLOYEE) {
            loginAsEmployee(authModel)
                .then((response) => {
                    const decodedToken = jwt(response.data.jwtToken);
                    const { employee } = decodedToken;
                    loginUser({
                        employeeId: employee.id,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        email: employee.email,
                        receivedVotes: employee.receivedVotes,
                        givenVotes: employee.givenVotes,
                        token: response.data.jwtToken,
                        role: decodedToken.role,
                    });
                    history.push(routes.EMPLOYEE_HOME);
                })
                .catch((error) => console.log(error))
                .finally(() => setSubmitting(false));
        } else {
            loginAsCompany(authModel)
                .then((response) => {
                    const decodedToken = jwt(response.data.jwtToken);
                    const { company } = decodedToken;
                    loginUser({
                        companyId: company.id,
                        name: company.name,
                        email: company.email,
                        address: company.address,
                        phoneNumber: company.phoneNumber,
                        token: response.data.jwtToken,
                        role: decodedToken.role,
                    });
                    history.push(routes.COMPANY_HOME);
                })
                .catch((error) => console.log(error))
                .finally(() => setSubmitting(false));
        }
    };

    return (
        <div className="login-page">
            <div className="login-page__heading">
                <Logo fontSize="64px" />
                <div className="login-page__heading__quote">
                    {roleType === roles.EMPLOYEE
                        ? 'Get jobed up from the best companies'
                        : 'Hire best employee and raise your bussiness'}
                </div>
            </div>
            <div className="login-page__form">
                <InputFormContainer width="400px">
                    <Formik
                        initialValues={initialValues}
                        validateOnChange={false}
                        validateOnBlur={true}
                        validationSchema={validationSchema}
                        onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
                        {(formikProps) => (
                            <Form>
                                <Field as={InputField} name="email" type="email" placeholder="Email address" />
                                <Field as={InputField} name="password" type="password" placeholder="Password" />
                                <SubmitButton>Login</SubmitButton>
                            </Form>
                        )}
                    </Formik>
                </InputFormContainer>
                <div style={{ marginTop: '16px' }}>
                    {roleType === roles.EMPLOYEE ? (
                        <FormSubheading text="Not employee?" path={routes.LOGIN_COMPANY} linkText="Login as company" />
                    ) : (
                        <FormSubheading text="Not company?" path={routes.LOGIN_EMPLOYEE} linkText="Login as employee" />
                    )}
                </div>
            </div>
        </div>
    );
};
