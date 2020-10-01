import React from 'react';
import { InputField } from '../../components/InputForm/InputField';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Logo } from '../../components/Logo/Logo';
import { LineSpacer } from '../../components/LineSpacer';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import {
    getConstraingLengthMaxMessage,
    getConstraintLengthMinMessage,
    invalidEmailMessage,
    requriedMessage,
} from '../../utils/Constants';

export const LoginPage = () => {
    const formInitialValues = {
        email: '',
        password: '',
    };

    const ValidationSchema = Yup.object().shape({
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
        console.log(values);
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
                        initialValues={formInitialValues}
                        validateOnChange={false}
                        validateOnBlur={true}
                        validationSchema={ValidationSchema}
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
