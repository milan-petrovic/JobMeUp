import { Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputField } from '../../components/InputForm/InputField';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { Logo } from '../../components/Logo/Logo';
import { getEmploymentById, postEmployment, putEmployment } from '../../services/EmploymentService';
import { UserContext } from '../../services/UserContext';
import { EMPTY_INITIAL_FIELD as EMPTY_INITIAL_FIELD_VALUE, requiredMessage, routes } from '../../utils/Constants';

export const EmploymentForm = () => {
    const history = useHistory();
    const { user, authenticated } = useContext(UserContext);

    const initialValues = {
        client: EMPTY_INITIAL_FIELD_VALUE,
        description: EMPTY_INITIAL_FIELD_VALUE,
        startDate: EMPTY_INITIAL_FIELD_VALUE,
        endDate: EMPTY_INITIAL_FIELD_VALUE,
        position: EMPTY_INITIAL_FIELD_VALUE,
    };

    const validationSchema = Yup.object().shape({
        client: Yup.string().required(requiredMessage),
        description: Yup.string().required(requiredMessage),
        startDate: Yup.string().required(requiredMessage),
        endDate: Yup.string().required(requiredMessage),
        position: Yup.string().required(requiredMessage),
    });

    const handleOnSubmit = (values, formikHelpers) => {
        const { setSubmitting, resetForm } = formikHelpers;

        values.employee = {
            id: user.employeeId,
        };

        setSubmitting(true);
        if (authenticated && user && user.token) {
            if (values.id != null) {
            putEmployment(values, user.token)
                .then((response) => {
                    setSubmitting(false);
                    history.push(routes.EDIT_PROFILE);
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    resetForm();
                });
            } else {
            postEmployment(values, user.token)
                .then((response) => {
                    setSubmitting(false);
                    history.push(routes.EDIT_PROFILE);
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    resetForm();
                });
            }
        }
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
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
                    {(formikProps) => <InnerForm {...formikProps} />}
                </Formik>
            </InputFormContainer>
        </div>
    );
};

const InnerForm = ({ setValues }) => {
    const [editing, setEditing] = useState(false);
    const matchId = useRouteMatch(routes.EMPLOYEE_EDIT_EMPLOYMENT)?.params.employmentId;
    const { user, authenticated } = useContext(UserContext);

    useEffect(() => {
        if (matchId) {
            if (authenticated && user && user.token) {
                getEmploymentById(matchId, user.token).then((response) => {
                    const { data } = response;
                    setValues({...data});
                    setEditing(true);
                })
            }
        }
    }, []);
    
    return (
        <Form>
            <Field as={InputField} name="client" placeholder="Client" />
            <Field as={InputField} name="position" placeholder="Position" />
            <Field as={InputTextArea} name="description" rows={5} placeholder="Description" />
            <Field as={InputField} name="startDate" row={5} placeholder="Start date, e.g. May, 2016" />
            <Field as={InputField} name="endDate" row={5} placeholder="End date, e.g. May, 2016" />

            <SubmitButton>{editing ? 'Edit employment' : 'Add employment'}</SubmitButton>
        </Form>
    );
};
