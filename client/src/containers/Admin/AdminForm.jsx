import { Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../services/UserContext';
import { EMPTY_INITIAL_FIELD, requiredMessage, roles, routes } from '../../utils/Constants';
import * as Yup from 'yup';
import { Logo } from '../../components/Logo/Logo';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { InputField } from '../../components/InputForm/InputField';
import { postAdmin } from '../../services/AdminService';

export const AdminForm = () => {
    const { user, authenticated } = useContext(UserContext);
    const history = useHistory();

    const initialValues = {
        email: EMPTY_INITIAL_FIELD,
        password: EMPTY_INITIAL_FIELD,
        username: EMPTY_INITIAL_FIELD,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required(requiredMessage),
        username: Yup.string().required(requiredMessage),
        password: Yup.string().required(requiredMessage),
    });

    const handleOnSubmit = (values, formikHelpers) => {
        const { setSubmitting, resetForm } = formikHelpers;

        setSubmitting(true);
        if (user && authenticated && user.token) {
            postAdmin(values, user.token).then((response) => {
                history.push(routes.ADMIN_HOMEPAGE);
                
            }).catch(error => console.log(error))
            .finally(() => {
                setSubmitting(false);
                resetForm(true);
            });
        }
    };
   
    return(
        <div className="input-form">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}>
                {(formikProps) => (
                    <InnerForm {...formikProps} />
                )} 
            </Formik>
         </div>
    );
};

const InnerForm = ({ setaValues }) => {
    return(
        <>
            <Logo fontSize="36px" />
                <InputFormHeading>Add admin</InputFormHeading>
                <InputFormContainer width="500px">
                    <Form>
                        <Field as={InputField} name="email" id="email" placeholder="E-mail" />
                        <Field as={InputField} name="username" id="username" placeholder="Username" />
                        <Field as={InputField} name="password" id="password" placeholder="Password" type="password"/>
                        <SubmitButton>Add admin</SubmitButton>
                    </Form>
            </InputFormContainer>
        </>
    );
}