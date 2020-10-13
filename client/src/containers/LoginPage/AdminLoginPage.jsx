import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { Logo } from '../../components/Logo/Logo';
import { EMPTY_INITIAL_FIELD, getConstraingLengthMaxMessage, getConstraintLengthMinMessage, invalidEmailMessage, requiredMessage, routes } from '../../utils/Constants';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { InputField } from '../../components/InputForm/InputField';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import jwt from 'jwt-decode';
import { loginAsAdmin } from '../../services/AuthenticateService';
import { UserContext } from '../../services/UserContext';

export const AdminLoginPage = () => {
    const history = useHistory();
    const { loginUser } = useContext(UserContext);

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

        loginAsAdmin(authModel).then((response) => {
            const decodedToken = jwt(response.data.jwtToken);
            const { admin } = decodedToken;
            loginUser({
                adminId: admin.id,
                email: admin.email,
                username: admin.username,
                token: response.data.jwtToken,
                role: decodedToken.role,
            });
            history.push(routes.ADMIN_HOMEPAGE);

        }).catch(error => console.log(error));
    }


    return (
        <div className="input-form">
            <Logo fontSize="36px" />
            <InputFormHeading>Login as admin</InputFormHeading>
            <InputFormContainer width="500px">
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
    );
};