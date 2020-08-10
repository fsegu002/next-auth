import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import AuthForm from '../../src/components/userForms/AuthForm';

const SignIn = () => {
  React.useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('user'));
    if (userObj && userObj.user.auth) {
      Router.push('/');
    }
  }, []);

  const signInRoute = 'http://localhost:3000/api/v1/auth/signin';

  return (
    <>
      <h3>Sign In</h3>
      <AuthForm route={signInRoute} isSignIn />

      <Link href='/auth/registration'>
        <a>Registration</a>
      </Link>
    </>
  );
};

export default SignIn;
