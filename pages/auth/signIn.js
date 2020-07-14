import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Router from 'next/router';
import * as Yup from 'yup';
import fetch from 'isomorphic-unfetch';
import HttpStatus from 'http-status-codes';

const SignIn = () => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .min(8, 'Must be at least 8 characters or more')
                    .required()
            })}
            onSubmit={(values, { resetForm }) => {
                fetch('/auth/api/v1/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                    .then(response => {
                        console.log(response.json());
                        if (response.status === HttpStatus.OK) {
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
                    <button type='submit'>Sign In</button>
                </Form>
            }
        </Formik>
    );
};

export default SignIn;
