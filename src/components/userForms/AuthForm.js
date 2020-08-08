import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import fetch from 'isomorphic-unfetch';
import useStores from '../../store/useStores';

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

const AuthForm = ({ route, isSignIn }) => {
  const { store } = useStores();
  const { register, handleSubmit, reset, errors, setError, clearErrors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {
    clearErrors();
    const result = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!result.ok) {
      const { message } = await result.json();
      setError('serverError', {
        type: 'manual',
        message
      });
      return false;
    }

    reset();

    if (isSignIn) {
      const { user, token } = await result.json();
      const userObj = { ...user, id: user.id.toString(), jwt: token, auth: true };
      store.setUser(userObj);
      Router.push('/');
    } else {
      Router.push('/auth/signin');
    }
  };

  return (
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
      {errors.serverError && <p>{errors.serverError.message}</p>}
      <button type='submit'>{isSignIn ? 'Sign In' : 'Register'}</button>
    </form>
  );
};

AuthForm.propTypes = {
  route: PropTypes.string,
  /**
   * This form can be used for SignIn or Registration
   */
  isSignIn: PropTypes.bool
};

AuthForm.defaultProp = {
  isSignIn: false
};

export default AuthForm;
