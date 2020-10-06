import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { Logo } from '../../components/Logo/Logo';
import { getEducationById, postEducation, putEducation } from '../../services/EducationService';
import { UserContext } from '../../services/UserContext';
import {
    EMPTY_INITIAL_FIELD,
    getConstraingLengthMaxMessage,
    getConstraintLengthMinMessage,
    requriedMessage,
    routes,
} from '../../utils/Constants';

export const EducationForm = () => {
    const { user, authenticated } = useContext(UserContext);
    const history = useHistory();

    const initialValues = {
        name: EMPTY_INITIAL_FIELD,
        description: EMPTY_INITIAL_FIELD,
        startYear: EMPTY_INITIAL_FIELD,
        endYear: EMPTY_INITIAL_FIELD,
    };

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

    const handleOnSubmit = (values, formikHelpers) => {
        const { resetForm, setSubmitting } = formikHelpers;

        values.employee = {
            id: user.employeeId,
        };

        if (authenticated && user && user.token) {
            if (values.id != null) {
                putEducation(values, user.token)
                    .then((_) => {
                        setSubmitting(false);
                        history.push(routes.EDIT_PROFILE);
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                        resetForm(true);
                    });
            } else {
                postEducation(values, user.token)
                    .then((_) => {
                        setSubmitting(false);
                        history.push(routes.EDIT_PROFILE);
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                        resetForm(true);
                    });
            }
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validateOnBlur={true}
            validateOnChange={false}
            validationSchema={validationSchema}
            onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
            {(formikProps) => <InnerForm {...formikProps} />}
        </Formik>
    );
};

const InnerForm = ({ setValues }) => {
    const [editing, setEditing] = useState(false);
    const matchId = useRouteMatch(routes.EMPLOYEE_EDIT_EDUCATION)?.params.educationId;
    const { user, authenticated } = useContext(UserContext);

    useEffect(() => {
        if (matchId) {
            if (authenticated && user && user.token) {
                getEducationById(matchId, user.token).then((response) => {
                    const { data } = response;
                    setValues({ ...data });
                    setEditing(true);
                });
            }
        }
    }, []);

    return (
        <div className="input-form">
            <Logo fontSize="32px" />
            <InputFormHeading>{editing ? 'Edit education' : 'Add a new education'}</InputFormHeading>
            <InputFormContainer width="500px">
                <Form>
                    <Field as={InputField} name="name" id="name" placeholder="Name" />
                    <Field as={InputTextArea} name="description" id="description" placeholder="Description" rows={5} />
                    <Field as={InputField} name="startYear" id="startYear" placeholder="Start year" />
                    <Field as={InputField} name="endYear" id="endYear" placeholder="End year" />

                    <SubmitButton>{editing ? 'Edit education' : 'Add a new education'}</SubmitButton>
                </Form>
            </InputFormContainer>
        </div>
    );
};
