import React from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import fetch from 'isomorphic-unfetch';
import HttpStatus from 'http-status-codes';
import useStores from '../../src/store/useStores';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Must be valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 chars long')
});

const SignIn = () => {
  const { store } = useStores();
  const { register, handleSubmit, reset, errors, setError, clearErrors } = useForm({
    resolver: yupResolver(schema)
  });
  const signInRoute = 'http://localhost:3000/api/v1/auth/signin';
  const onSubmit = async data => {
    clearErrors();
    const result = await fetch(signInRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!result.ok) {
      const { message } = await result.json();
      setError('signin', {
        type: 'manual',
        message
      });
      return false;
    }

    reset();

    const { user, token } = await result.json();
    const userObj = { ...user, id: user.id.toString(), jwt: token, auth: true };
    store.setUser(userObj);
    Router.push('/');
  };
  return (
    <>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' name='email' id='email' ref={register} />
          <p>{errors.email?.message}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' ref={register} />
          <p>{errors.password?.message}</p>
        </div>
        {errors.signin && <p>{errors.signin.message}</p>}
        <button type='submit'>Sign In</button>
      </form>
    </>
  );
};

export default SignIn;
