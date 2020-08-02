import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Router from 'next/router';
import * as Yup from 'yup';
import fetch from 'isomorphic-unfetch';
import HttpStatus from 'http-status-codes';
import useStores from '../../src/store/useStores';

const SignIn = () => {
  const { store } = useStores();
  const signInRoute = '/api/v1/auth/signin';
  return (
    <>
      <h3>Sign In</h3>
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
          fetch(signInRoute, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .then(({ status, user, token }) => {
              if (status === HttpStatus.OK) {
                store.setUser({ ...user, id: user.id.toString(), jwt: token });

                localStorage.setItem(
                  'user',
                  JSON.stringify({ user: { ...user, id: user.id.toString(), jwt: token } })
                );
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
    </>
  );
};

export default SignIn;
