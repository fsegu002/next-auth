import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Router from 'next/router';
import * as Yup from 'yup';
import fetch from 'isomorphic-unfetch';
import HttpStatus from 'http-status-codes';
import config from '../../src/server/config';

const Registration = () => {
    const registerRoute = config.api.v1.auth + config.endPoints.register;
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                passwordConfirmation: '',
                firstName: '',
                lastName: ''
            }}
            validationSchema={Yup.object({
                firstName: Yup.string(),
                lastName: Yup.string(),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .min(8, 'Must be at least 8 characters or more')
                    .required()
            })}
            onSubmit={(values, { resetForm }) => {
                fetch(registerRoute, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                    .then(response => {
                        if (response.status === HttpStatus.CREATED) {
                            resetForm();
                            Router.push('/');
                        }
                    })
                    .catch(err => console.error(err));
            }}>
            {
                <Form>
                    <div className='form-control'>
                        <label htmlFor='email'>Email Address</label>
                        <Field name='email' type='email' />
                        <ErrorMessage name='email' />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='password'>Password</label>
                        <Field name='password' type='password' />
                        <ErrorMessage name='password' />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='firstName'>First Name</label>
                        <Field name='firstName' type='text' />
                        <ErrorMessage name='firstName' />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='lastName'>Last Name</label>
                        <Field name='lastName' type='text' />
                        <ErrorMessage name='lastName' />
                    </div>
                    <button type='submit'>Submit</button>
                </Form>
            }
        </Formik>
    );
};

export default Registration;
