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
import { getBenefitById, postBenefit, putBenefit } from '../../services/BenefitsService';
import { UserContext } from '../../services/UserContext';
import { EMPTY_INITIAL_FIELD, requiredMessage, routes } from '../../utils/Constants';

export const BenefitForm = () => {
    const { user, authenticated } = useContext(UserContext);
    const history = useHistory();

    const initialValues = {
        name: EMPTY_INITIAL_FIELD,
        description: EMPTY_INITIAL_FIELD,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(requiredMessage),
        description: Yup.string().required(requiredMessage),
    });
    
    const handleOnSubmit = (values, formikHelpers) => {
        if (user && authenticated && user.token) {
            if (values.id != null) {
                putBenefit(values, user.token).then(response => {
                    history.push(routes.ADMIN_HOMEPAGE);
                }).catch(error => console.log(error));
            } else {
                postBenefit(values, user.token).then(response => {
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
    const matchId = useRouteMatch(routes.BENEFITS_EDIT)?.params.benefitId;
    const { user, authenticated } = useContext(UserContext); 

    useEffect(() => {
        if (matchId) {
            if (user && authenticated && user.token) {
                getBenefitById(matchId, user.token).then(response => {
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
                <InputFormHeading>{editing ? 'Edit benefit' : 'Add a new benefit'}</InputFormHeading>
                <InputFormContainer width="500px">
                    <Form>
                        <Field as={InputField} name="name" id="name" placeholder="Name" />
                        <Field as={InputTextArea} name="description" id="description" placeholder="Description" rows={5} />
                        <SubmitButton>{editing ? 'Edit skill' : 'Submit skill'}</SubmitButton>
                    </Form>
            </InputFormContainer>
        </>
    );
};