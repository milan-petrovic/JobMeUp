import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { Logo } from '../../components/Logo/Logo';
import { postProject } from '../../services/ProjectService';
import { requriedMessage } from '../../utils/Constants';

export const ProjectForm = () => {
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(requriedMessage),
        description: Yup.string().required(requriedMessage),
        technicalStack: Yup.string().required(requriedMessage),
    });

    const intialValues = {
        name: '',
        description: '',
        technicalStack: '',
    };

    const handleSubmit = (values, formikHelpers) => {
        const { resetForm, setSubmitting } = formikHelpers;

        values.employee = {
            id: 1,
        };
        setSubmitting(true);
        postProject(values)
            .then((_) => {
                setSubmitting(false);
                history.push('/edit-profile');
            })
            .then((error) => console.log(error))
            .finally(() => {
                resetForm(true);
            });
    };

    return (
        <div className="input-form">
            <Logo fontSize="32px" />
            <InputFormHeading>Add a new project</InputFormHeading>
            <InputFormContainer width="500px">
                <Formik
                    initialValues={intialValues}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}>
                    {(formikProps) => <InnerForm {...formikProps} />}
                </Formik>
            </InputFormContainer>
        </div>
    );
};

const InnerForm = ({ setValues }) => {
    return (
        <Form>
            <Field as={InputField} name="name" id="name" placeholder="Name" />
            <Field as={InputTextArea} name="description" id="description" rows={5} placeholder="Description" />
            <Field
                as={InputField}
                name="technicalStack"
                id="technicalStack"
                placeholder="Technical stack, E.g. Java, React, Typescript..."
            />
            <SubmitButton>Submit</SubmitButton>
        </Form>
    );
};
