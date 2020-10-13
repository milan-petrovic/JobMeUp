import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../services/UserContext';
import { EMPTY_INITIAL_FIELD, requiredMessage, routes } from '../../utils/Constants';
import * as Yup from 'yup';
import { Logo } from '../Logo/Logo';
import { InputFormHeading } from '../InputForm/InputFormHeading';
import { Field, Form, Formik } from 'formik';
import { InputFormContainer } from '../InputForm/InputFormContainer';
import { InputTextArea } from '../InputForm/InputTextArea';
import { InputField } from '../InputForm/InputField';
import { SubmitButton } from '../Buttons/SubmitButton';
import { getSkillById, postSkill, putSkill } from '../../services/SkillsService';

export const SkillForm = () => {
    const { user, authenticated } = useContext(UserContext);
    const history = useHistory();

    const initialValues = {
        name: EMPTY_INITIAL_FIELD,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(requiredMessage),
    });
    
    const handleOnSubmit = (values, formikHelpers) => {
        if (user && authenticated && user.token) {
            if (values.id != null) {
                putSkill(values, user.token).then(response => {
                    history.push(routes.ADMIN_HOMEPAGE);
                }).catch(error => console.log(error));
            } else {
                postSkill(values, user.token).then(response => {
                    history.push(routes.ADMIN_HOMEPAGE);
                }).catch(error => console.log(error));
            }
        }
    };

    return (
        <div className="input-form">
                <Formik
                    initialValues={initialValues}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
                    {(formikProps) => (
                        <InnerForm {...formikProps} />
                    )}
                </Formik>
        </div>
    );
};

const InnerForm = ({ setValues }) => {
    const [editing, setEditing] = useState(false);
    const matchId = useRouteMatch(routes.SKILLS_EDIT)?.params.skillId;
    const { user, authenticated } = useContext(UserContext); 

    useEffect(() => {
        if (matchId) {
            if (user && authenticated && user.token) {
                getSkillById(matchId).then(response => {
                    const { data } = response;
                    setValues({...data});
                    setEditing(true);
                });
            }
        }
    }, []);

    return (
        <>
            <Logo fontSize="36px" />
                <InputFormHeading>{editing ? 'Edit skill' : 'Add a new skill'}</InputFormHeading>
                <InputFormContainer width="500px">
                    <Form>
                        <Field as={InputField} name="name" id="name" placeholder="Name" />
                        <SubmitButton>{editing ? 'Edit skill' : 'Submit skill'}</SubmitButton>
                    </Form>
            </InputFormContainer>
        </>
    );
};