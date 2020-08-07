import React from 'react';
import Router from 'next/router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Registration from '../registration';
import useStores from '../../../src/store/useStores';
import { server, rest } from '../../../testConfig/server';

jest.mock('../../../src/store/useStores.js', () => jest.fn());
jest.mock('next/router', () => ({
  push: jest.fn()
}));

describe('<Registration />', () => {
  beforeAll(() => {
    useStores.mockImplementation(() => ({
      store: {
        setUser: jest.fn()
      }
    }));
  });

  it('renders Registration with text and fields', () => {
    const { getByRole, getByLabelText } = render(<Registration />);
    expect(getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Register' })).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows error messages', async () => {
    const { findByText, getByRole, getByLabelText } = render(<Registration />);
    const emailInput = getByLabelText('Email Address');
    const signinButton = getByRole('button', { name: 'Register' });

    fireEvent.change(emailInput, { target: { value: 'badEmail.com' } });
    fireEvent.click(signinButton);
    expect(await findByText('Must be valid email')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(signinButton);
    expect(await findByText('Email is required')).toBeInTheDocument();
  });

  it('should register user and redirect to signin', async () => {
    const { getByRole, getByLabelText } = render(<Registration />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const signinButton = getByRole('button', { name: 'Register' });

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'test1@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test1234' } });
      fireEvent.click(signinButton);

      expect(Router.push).toHaveBeenCalledWith('/auth/signin');
    });
  });

  it('should show message when registration fails', async () => {
    server.use(
      rest.post('http://localhost:3000/api/v1/auth/register', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: 'Email already exists'
          })
        );
      })
    );
    const { getByRole, getByLabelText, findByText } = render(<Registration />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const signinButton = getByRole('button', { name: 'Register' });

    fireEvent.change(emailInput, { target: { value: 'test7@abc.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234' } });
    fireEvent.click(signinButton);

    expect(await findByText('Email already exists')).toBeInTheDocument();
  });
});
