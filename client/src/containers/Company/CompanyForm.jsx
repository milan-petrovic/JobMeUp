import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { Logo } from '../../components/Logo/Logo';
import { postCompany } from '../../services/CompanyService';
import {
    EMPTY_INITIAL_FIELD,
    getConstraintLengthMinMessage,
    invalidEmailMessage,
    requiredMessage,
} from '../../utils/Constants';

export const CompanyForm = () => {
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

        postCompany(values)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error))
            .finally((_) => {
                setSubmitting(false);
                resetForm(true);
            });
    };

    return (
        <div className="input-form">
            <Logo fontSize="36px" />
            <InputFormHeading>Apply as company</InputFormHeading>
            <InputFormContainer width="500px">
                <Formik
                    initialValues={initialValues}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
                    {(formikProps) => (
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
                            <SubmitButton>Submit</SubmitButton>
                        </Form>
                    )}
                </Formik>
            </InputFormContainer>
        </div>
    );
};
