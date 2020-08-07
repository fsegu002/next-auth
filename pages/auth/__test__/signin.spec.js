import React from 'react';
import Router from 'next/router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../signin';
import useStores from '../../../src/store/useStores';
import { server, rest } from '../../../testConfig/server';

jest.mock('../../../src/store/useStores.js', () => jest.fn());
jest.mock('next/router', () => ({
  push: jest.fn()
}));

describe('<SignIn />', () => {
  beforeAll(() => {
    useStores.mockImplementation(() => ({
      store: {
        setUser: jest.fn
      }
    }));
  });

  it('renders Sign In with text and fields', () => {
    const { getByRole, getByLabelText } = render(<SignIn />);
    expect(getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows error messages', async () => {
    const { findByText, getByRole, getByLabelText } = render(<SignIn />);
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
    const { getByRole, getByLabelText } = render(<SignIn />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const signinButton = getByRole('button', { name: 'Sign In' });

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'test7@abc.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test1234' } });
      fireEvent.click(signinButton);

      expect(Router.push).toHaveBeenCalled();
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
    const { getByRole, getByLabelText, findByText } = render(<SignIn />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const signinButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test7@abc.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234' } });
    fireEvent.click(signinButton);

    expect(await findByText('Password is incorrect')).toBeInTheDocument();
  });
});
