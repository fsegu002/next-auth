import React from 'react';
import Router from 'next/router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from './AuthForm';
import useStores from '../../store/useStores';
import { server, rest } from '../../../testConfig/server';

jest.mock('../../store/useStores.js', () => jest.fn());
jest.mock('next/router', () => ({
  push: jest.fn()
}));

describe('<AuthForm />', () => {
  beforeAll(() => {
    useStores.mockImplementation(() => ({
      store: {
        setUser: jest.fn
      }
    }));
  });

  it('shows error messages', async () => {
    const { findByText, getByRole, getByLabelText } = render(<AuthForm route={'/test'} isSignIn />);
    const emailInput = getByLabelText('Email Address');
    const signinButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'badEmail.com' } });
    fireEvent.click(signinButton);
    expect(await findByText('Must be valid email')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(signinButton);
    expect(await findByText('Email is required')).toBeInTheDocument();
  });

  it('should fetch user login info', async () => {
    const { getByRole, getByLabelText } = render(
      <AuthForm route={'http://localhost:3000/api/v1/auth/register'} />
    );
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const signinButton = getByRole('button', { name: 'Register' });

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'test7@abc.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test1234' } });
      fireEvent.click(signinButton);

      expect(Router.push).toHaveBeenCalledWith('/auth/signin');
    });
  });

  it('should fetch user login info', async () => {
    const { getByRole, getByLabelText } = render(
      <AuthForm route={'http://localhost:3000/api/v1/auth/signin'} isSignIn />
    );
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const signinButton = getByRole('button', { name: 'Sign In' });

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'test7@abc.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test1234' } });
      fireEvent.click(signinButton);

      expect(Router.push).toHaveBeenCalledWith('/');
    });
  });

  it('should fail login request', async () => {
    server.use(
      rest.post('http://localhost:3000/api/v1/auth/signin', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: 'Password is incorrect'
          })
        );
      })
    );
    const { getByRole, getByLabelText, findByText } = render(
      <AuthForm route={'http://localhost:3000/api/v1/auth/signin'} isSignIn />
    );
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const signinButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test7@abc.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234' } });
    fireEvent.click(signinButton);

    expect(await findByText('Password is incorrect')).toBeInTheDocument();
  });
});
