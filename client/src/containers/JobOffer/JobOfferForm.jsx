import React, { useContext, useEffect, useState } from 'react';
import { InputFormContainer } from '../../components/InputForm/InputFormContainer';
import { InputFormHeading } from '../../components/InputForm/InputFormHeading';
import { Logo } from '../../components/Logo/Logo';
import { UserContext } from '../../services/UserContext';
import { EMPTY_INITIAL_FIELD, requiredMessage, routes } from '../../utils/Constants';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { InputField } from '../../components/InputForm/InputField';
import { InputTextArea } from '../../components/InputForm/InputTextArea';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import { getCompanyById } from '../../services/CompanyService';
import { useHistory, useLocation } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import { postJobOffer } from '../../services/JobOfferService';

export const JobOfferForm = () => {
    const { user, authenticated } = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [company, setCompany] = useState();
    const [employee, setEmployee] = useState();

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (user && authenticated) {
            getCompanyById(user.companyId, user.token).then(response => {
                setCompany(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
        }
    }, []);

    useEffect(() => {
        if (location && location.state) {
            setEmployee(location.state.employee)
        }
    }, [location]);

    const initialValues = {
        employeeName: EMPTY_INITIAL_FIELD,
        companyName: EMPTY_INITIAL_FIELD,
        position: EMPTY_INITIAL_FIELD,
        description: EMPTY_INITIAL_FIELD,
        salary: EMPTY_INITIAL_FIELD,
        creationDate: new Date(),
        active: true,
    };

    const validationSchema = Yup.object().shape({
        position: Yup.string().required(requiredMessage),
        description: Yup.string().required(requiredMessage),
        salary: Yup.string().required(requiredMessage),
        employeeName: Yup.string(),
        companyName: Yup.string(),
    });

    const handleOnSubmit = (values, formikHelpers) => {
        const jobOfferModel = {
            employee: employee  ,
            company: {
                id: company.id
            },
            position: values.position,
            salary: values.salary,
            description: values.description,
            creationDate: values.creationDate,
            active: values.active,
        };

        postJobOffer(jobOfferModel, user.token).then(response => {
            console.log(response);
            history.push(routes.COMPANY_HOME);
        }).catch(error => console.log(error));

        console.log(jobOfferModel);
    };

    return(
        <>
            {isLoading ? <Spinner /> : <div className="input-form">
            <Logo fontSize="36px" />
            <InputFormHeading>Create a job offer</InputFormHeading>
            <InputFormContainer width="500px">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={(values, formikHelpers) => handleOnSubmit(values, formikHelpers)}
            >
                {(formikProps) => (
                   <InnerForm {...formikProps} employee={employee} company={company} />
                )}
            </Formik>
            </InputFormContainer>
        </div>}
        </>
    );
}

const InnerForm = ({ company, employee, setFieldValue }) => {

    useEffect(() => {
        setFieldValue('companyName', company.name);
        setFieldValue('employeeName', employee.firstName + ' ' + employee.lastName)
    }, []);

    return(
        <Form>
        <Field as={InputField} name="companyName" id="companyName" labelName="Company" disabled />
        <Field as={InputField} name="employeeName" id="employeeName" labelName="Employee" disabled/>
        <Field as={InputTextArea} name="description" id="description" placeholder="Description" rows="5" />
        <Field as={InputField} name="position" id="position" placeholder="Position" />
        <Field as={InputField} name="salary" id="salary" placeholder="Salary" />
        <SubmitButton>Create job offer</SubmitButton>
    </Form>
    )
}