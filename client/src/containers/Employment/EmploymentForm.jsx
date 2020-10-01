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
import { postEmployment } from '../../services/EmploymentService';
import { requriedMessage } from '../../utils/Constants';

export const EmploymentForm = () => {
    const history = useHistory();

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
            id: 1,
            email: 'milan@gmail.com',
            password: 'password123',
            firstName: 'milan',
            lastName: 'petrovic',
            about: 'Java developer',
            category: {
                id: 1,
                name: 'Test',
                description: 'No description',
            },
            expectedSalary: '23$hr',
            skills: [
                {
                    id: 1,
                    name: 'Test',
                },
                {
                    id: 2,
                    name: 'Test1',
                },
                {
                    id: 3,
                    name: 'Test2',
                },
            ],
            benefits: [
                {
                    id: 2,
                    name: 'Test1',
                    description: 'No description',
                },
                {
                    id: 1,
                    name: 'Test',
                    description: 'No description',
                },
                {
                    id: 3,
                    name: 'Test2',
                    description: 'No description',
                },
                {
                    id: 4,
                    name: 'Test3',
                    description: 'No description',
                },
            ],
            projects: [
                {
                    id: 1,
                    name: 'Hajpa',
                    description: 'No desc',
                    technicalStack: 'Java, React',
                },
                {
                    id: 2,
                    name: 'LCLA',
                    description: 'No desc',
                    technicalStack: 'Flutter',
                },
                {
                    id: 3,
                    name: 'LCLewqeqwA',
                    description: 'No desc',
                    technicalStack: 'Flutter',
                },
            ],
            educations: [
                {
                    id: 1,
                    name: 'FTN',
                    description: 'No',
                    startYear: '2016',
                    endYear: '2020',
                },
                {
                    id: 2,
                    name: 'Gimnazija Doboj',
                    description: 'No',
                    startYear: '2012',
                    endYear: '2016',
                },
            ],
            employments: [
                {
                    id: 1,
                    client: 'Veescore',
                    description: 'No description',
                    position: 'Software developer',
                    startDate: 'May, 2020',
                    endDate: ' September, 2020',
                },
            ],
            receivedVotes: 1,
            givenVotes: 2,
        };

        setSubmitting(true);
        postEmployment(values)
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
            <InputFormHeading>Add a new education</InputFormHeading>
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
