import { Field, Form, Formik } from 'formik';
import jwt from 'jwt-decode';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { Logo } from '../../components/Logo/Logo';
import { loginAsEmployee } from '../../services/AuthenticateService';
import { UserContext } from '../../services/UserContext';
import {
    EMPTY_INITIAL_FIELD,
    getConstraingLengthMaxMessage,
    getConstraintLengthMinMessage,
    invalidEmailMessage,
    requriedMessage,
    routes,
} from '../../utils/Constants';

export const LoginPage = () => {
    const { loginUser } = useContext(UserContext);
    const history = useHistory();

    const initialValues = {
        email: EMPTY_INITIAL_FIELD,
        password: EMPTY_INITIAL_FIELD,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(invalidEmailMessage)
            .min(4, getConstraintLengthMinMessage('Email', 4))
            .required(requriedMessage),
        password: Yup.string()
            .min(6, getConstraintLengthMinMessage('Password', 6))
            .max(32, getConstraingLengthMaxMessage('Password', 32))
            .required(requriedMessage),
    });

    const handleOnSubmit = (values, formikHelpers) => {
        const { setSubmitting } = formikHelpers;
        setSubmitting(true);

        const authModel = {
            username: values.email,
            password: values.password,
        };

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
    };

    return (
        <div className="login-page">
            <div className="login-page__heading">
                <Logo fontSize="64px" />
                <div className="login-page__heading__quote">Hire best employee and raise your bussiness</div>
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
            </div>
        </div>
    );
};
