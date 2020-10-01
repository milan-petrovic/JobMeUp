import { Field, Form, Formik } from 'formik';
import React from 'react';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { Logo } from '../../components/Logo/Logo';
import * as Yup from 'yup';
import { InputField } from '../../components/InputForm/InputField';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { postCompany } from '../../services/CompanyService';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { getConstraintLengthMinMessage, invalidEmailMessage, requriedMessage } from '../../utils/Constants';

export const CompanyForm = () => {
    const initialValues = {
        email: '',
        password: '',
        name: '',
        about: '',
        country: '',
        size: 0,
        foundedYear: 0,
        address: '',
        phoneNumber: '',
    };

    const ValidationSchema = Yup.object().shape({
        email: Yup.string()
            .required(requriedMessage)
            .min(6, getConstraintLengthMinMessage('Email', 6))
            .email(invalidEmailMessage),
        password: Yup.string().required(requriedMessage),
        name: Yup.string().required(requriedMessage),
        about: Yup.string().required(requriedMessage),
        country: Yup.string().required(requriedMessage),
        size: Yup.number().required(requriedMessage),
        foundedYear: Yup.number().required(requriedMessage),
        address: Yup.string().required(requriedMessage),
        phoneNumber: Yup.string().required(requriedMessage),
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
                    validationSchema={ValidationSchema}
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
