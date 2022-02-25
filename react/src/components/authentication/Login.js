import React from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import CustomInput from '../form/CustomInput';
import {Button, FormGroup} from 'reactstrap';

const Login = ({submitCallback}) => {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .min(6, 'Email must be at least 6 characters')
            .max(50, 'Email cannot exceed 50 characters')
            .required('Email address is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Please select a password')
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitCallback}>
            <Form>
                <FormGroup row>
                    <CustomInput
                        name={'email'}
                        label={'Email Address'}
                        type={'email'}
                    />
                </FormGroup>
                <FormGroup row>
                    <CustomInput
                        name={'password'}
                        label={'Password'}
                        type={'password'}
                    />
                </FormGroup>
                <Button
                    block
                    type='submit'
                    color={'danger'}>
                    Submit
                </Button>
            </Form>
        </Formik>
    );
};
export default Login;
