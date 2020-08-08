import React from 'react';
import AuthForm from '../../src/components/userForms/AuthForm';

const Registration = () => {
  const registerRoute = 'http://localhost:3000/api/v1/auth/register';

  return (
    <>
      <h3>Register</h3>
      <AuthForm route={registerRoute} />
    </>
  );
};

export default Registration;
