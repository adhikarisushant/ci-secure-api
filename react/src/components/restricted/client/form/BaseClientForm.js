import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button, FormGroup } from 'reactstrap';
import CustomInput from '../../../form/CustomInput';
import {
    addClient,
    loadJWT,
    updateClient,
} from '../../../../utility/LocalStorage';
import FailureAlert from '../../../alert/Failure';
import { makeRequest } from '../../../../utility/Api';
import SuccessAlert from '../../../alert/Success';
import { Navigate } from 'react-router-dom';

const BaseClientForm = ({ client }) => {
    const [errors, setErrors] = useState(null);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const onTimeout = () => {
        setShouldRedirect(true);
    };

    const initialValues = {
        name: client?.name || '',
        email: client?.email || '',
        retainer_fee: client?.retainer_fee || '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .min(6, 'Email must be at least 6 characters')
            .max(50, 'Email cannot exceed 50 characters')
            .required('Email address is required'),
        retainer_fee: Yup.string()
            .required('Please specify retainer fee')
            .test('Digits Only', 'Retainer fee should only contain number', (value) =>
                /^\d+$/.test(value)
            ),
    });

    const successCallback = (data) => {
        const { message, client: clientDetails } = data;
        setResponseMessage(message);
        setShowSuccessAlert(true);
        if (client) {
            updateClient(clientDetails);
        } else {
            addClient(clientDetails);
        }
    };

    const submitCallback = (values) => {
        makeRequest({
            url: `client${client ? `/${client.id}` : ''}`,
            values,
            successCallback,
            failureCallback: (error) => {
                setErrors(error);
            },
            authorization: loadJWT(),
        });
    };

    return shouldRedirect ? (
        <Navigate to='/' />
    ) : (
        <>
            {errors && <FailureAlert errors={errors} />}
            {showSuccessAlert && (
                <SuccessAlert
                    {...{
                        message: responseMessage,
                        onTimeout,
                        shouldShow: showSuccessAlert,
                    }}
                />
            )}

            <div className='centredDiv' style={{ marginTop: '60px' }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitCallback}
                >
                    <Form>
                        <FormGroup row>
                            <CustomInput name={'name'} label={'Name'} />
                        </FormGroup>
                        <FormGroup row>
                            <CustomInput
                                name={'email'}
                                label={'Email Address'}
                                type={'email'}
                            />
                        </FormGroup>
                        <FormGroup row>
                            <CustomInput
                                name={'retainer_fee'}
                                label={'Retainer Fee'}
                                type={'number'}
                            />
                        </FormGroup>
                        <Button block type='submit' color={'danger'}>
                            Submit
                        </Button>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default BaseClientForm;
