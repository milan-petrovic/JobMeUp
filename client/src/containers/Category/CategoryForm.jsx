import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../services/UserContext';
import { EMPTY_INITIAL_FIELD, requiredMessage, routes } from '../../utils/Constants';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { postCategory, getCategoryById, putCategory } from '../../services/CategoryService';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputField } from '../../components/InputForm/InputField';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { Logo } from '../../components/Logo/Logo';

export const CategoryForm = () => {
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
                putCategory(values, user.token).then(response => {
                    history.push(routes.ADMIN_HOMEPAGE);
                }).catch(error => console.log(error));
            } else {
                postCategory(values, user.token).then(response => {
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
    const matchId = useRouteMatch(routes.CATEGORIES_EDIT)?.params.categoryId;
    const { user, authenticated } = useContext(UserContext); 

    useEffect(() => {
        if (matchId) {
            if (user && authenticated && user.token) {
                getCategoryById(matchId, user.token).then(response => {
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
                <InputFormHeading>{editing ? 'Edit category' : 'Add a new category'}</InputFormHeading>
                <InputFormContainer width="500px">
                    <Form>
                        <Field as={InputField} name="name" id="name" placeholder="Name" />
                        <Field as={InputTextArea} name="description" id="description" placeholder="Description" rows={5} />
                        <SubmitButton>{editing ? 'Edit category' : 'Submit category'}</SubmitButton>
                    </Form>
            </InputFormContainer>
        </>
    );
};