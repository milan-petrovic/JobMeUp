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
import { postProject } from '../../services/ProjectService';
import { UserContext } from '../../services/UserContext';
import { EMPTY_INITIAL_FIELD, requiredMessage, routes } from '../../utils/Constants';

export const ProjectForm = () => {
    const history = useHistory();
    const { user } = useContext(UserContext);

    const intialValues = {
        name: EMPTY_INITIAL_FIELD,
        description: EMPTY_INITIAL_FIELD,
        technicalStack: EMPTY_INITIAL_FIELD,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(requiredMessage),
        description: Yup.string().required(requiredMessage),
        technicalStack: Yup.string().required(requiredMessage),
    });

    const handleSubmit = (values, formikHelpers) => {
        const { resetForm, setSubmitting } = formikHelpers;

        values.employee = {
            id: user.employeeId,
        };

        setSubmitting(true);
        postProject(values, user.token)
            .then((_) => {
                setSubmitting(false);
                history.push(routes.EDIT_PROFILE);
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
