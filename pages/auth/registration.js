import React from 'react';
import Router from 'next/router';
import AuthForm from '../../src/components/userForms/AuthForm';

const Registration = () => {
  React.useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('user'));
    if (userObj && userObj.user.auth) {
      Router.push('/');
    }
  }, []);
  const registerRoute = 'http://localhost:3000/api/v1/auth/register';

  return (
    <>
      <h3>Register</h3>
      <AuthForm route={registerRoute} />
    </>
  );
};

export default Registration;
