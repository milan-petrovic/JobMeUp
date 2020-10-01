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
import { postEducation } from '../../services/EducationService';
import { getConstraingLengthMaxMessage, getConstraintLengthMinMessage, requriedMessage } from '../../utils/Constants';

export const EducationForm = () => {
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(requriedMessage),
        description: Yup.string(),
        startYear: Yup.string()
            .required(requriedMessage)
            .min(4, getConstraintLengthMinMessage('Start year', 4))
            .max(4, getConstraingLengthMaxMessage('Start year', 4)),
        endYear: Yup.string()
            .required(requriedMessage)
            .min(4, getConstraintLengthMinMessage('End year', 4))
            .max(4, getConstraingLengthMaxMessage('End year', 4)),
    });

    const initialValues = {
        name: '',
        description: '',
        startYear: '',
        endYear: '',
    };

    const handleOnSubmit = (values, formikHelpers) => {
        const { resetForm, setSubmitting } = formikHelpers;

        values.employee = {
            id: 1,
        };

        postEducation(values)
            .then((_) => {
                setSubmitting(false);
                history.push('/edit-profile');
            })
            .catch((error) => console.log(error))
            .finally(() => {
                resetForm(true);
            });
    };

    return (
        <div className="input-form">
            <Logo fontSize="32px" />
            <InputFormHeading>Add a new education</InputFormHeading>
            <InputFormContainer width="500px">
                <Formik
                    initialValues={initialValues}
                    validateOnBlur={true}
                    validateOnChange={false}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
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
            <Field as={InputTextArea} name="description" id="description" placeholder="Description" rows={5} />
            <Field as={InputField} name="startYear" id="startYear" placeholder="Start year" />
            <Field as={InputField} name="endYear" id="endYear" placeholder="End year" />

            <SubmitButton>Submit</SubmitButton>
        </Form>
    );
};
