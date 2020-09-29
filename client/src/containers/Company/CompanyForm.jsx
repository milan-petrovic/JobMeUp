import { Field, Form, Formik } from 'formik';
import React from 'react';
import { InputFormContainer } from '../../components/InputFields/InputFormContainer';
import { Logo } from '../../components/Logo/Logo';
import * as Yup from 'yup';
import { InputField } from '../../components/InputFields/InputField';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputTextArea } from '../../components/InputFields/InputTextArea';
import { postCompany } from '../../services/CompanyService';

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
            .required('Required field')
            .min(6, 'It must be at least 6 characters long')
            .email('Invalid e-mail'),
        password: Yup.string().required('Required'),
        name: Yup.string().required('Required'),
        about: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        size: Yup.number().required('Requried'),
        foundedYear: Yup.number().required('Required '),
        address: Yup.string().required('Required'),
        phoneNumber: Yup.string().required('Required'),
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
        <div className="company-form">
            <Logo fontSize="36px" />
            <h1 className="company-form__heading ">Apply as company</h1>
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
