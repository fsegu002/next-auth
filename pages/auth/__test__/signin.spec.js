import React from 'react';
import Router from 'next/router';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../signin';
import useStores from '../../../src/store/useStores';

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

  beforeEach(() => render(<SignIn />));

  it('renders Sign In with text and fields', () => {
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows error messages', async () => {
    const emailInput = screen.getByLabelText('Email Address');

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'badEmail.com' } });
      fireEvent.blur(emailInput);
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: '' } });
      fireEvent.blur(emailInput);
      expect(screen.getByText('Required')).toBeInTheDocument();
    });
  });

  it('should fetch user login info', async () => {
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const signinButton = screen.getByRole('button', { name: 'Sign In' });

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'test7@abc.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test1234' } });
      fireEvent.click(signinButton);

      expect(Router.push).toHaveBeenCalled();
    });
  });
});
