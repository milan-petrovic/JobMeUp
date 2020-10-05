import { Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { Logo } from '../../components/Logo/Logo';
import { postEmployment } from '../../services/EmploymentService';
import { UserContext } from '../../services/UserContext';
import { requriedMessage } from '../../utils/Constants';

export const EmploymentForm = () => {
    const history = useHistory();
    const { user } = useContext(UserContext);

    const ValidationSchema = Yup.object().shape({
        client: Yup.string().required(requriedMessage),
        description: Yup.string().required(requriedMessage),
        startDate: Yup.string().required(requriedMessage),
        endDate: Yup.string().required(requriedMessage),
        position: Yup.string().required(requriedMessage),
    });

    const initialValues = {
        client: '',
        description: '',
        startDate: '',
        endDate: '',
        position: '',
    };

    const handleOnSubmit = (values, formikHelpers) => {
        const { setSubmitting, resetForm } = formikHelpers;

        values.employee = {
            id: user.employeeId,
        };

        setSubmitting(true);
        postEmployment(values, user.token)
            .then((response) => {
                setSubmitting(false);
                history.push('/edit-profile');
            })
            .catch((error) => console.log(error))
            .finally(() => {
                resetForm();
            });
    };

    return (
        <div className="input-form">
            <Logo fontSize="32px" />
            <InputFormHeading>Add a new employment</InputFormHeading>
            <InputFormContainer width="500px">
                <Formik
                    initialValues={initialValues}
                    validateOnBlur={true}
                    validateOnChange={false}
                    validationSchema={ValidationSchema}
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
            <Field as={InputField} name="client" placeholder="Client" />
            <Field as={InputField} name="position" placeholder="Position" />
            <Field as={InputTextArea} name="description" rows={5} placeholder="Description" />
            <Field as={InputField} name="startDate" row={5} placeholder="Start date, e.g. May, 2016" />
            <Field as={InputField} name="endDate" row={5} placeholder="End date, e.g. May, 2016" />

            <SubmitButton>Add employment</SubmitButton>
        </Form>
    );
};
