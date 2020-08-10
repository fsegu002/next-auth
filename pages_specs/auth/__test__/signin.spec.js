import React from 'react';
import Router from 'next/router';
import { render } from '@testing-library/react';
import SignIn from '../../../pages/auth/signin';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});
jest.mock('next/router', () => ({
  push: jest.fn()
}));

describe('<SignIn />', () => {
  it('renders Sign In with text and fields', () => {
    const { getByRole, getByLabelText } = render(<SignIn />);
    expect(getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('redirect to home if user is already logged in', () => {
    const userInfo = {
      user: {
        id: '1',
        email: 'test1@abc.com',
        firstName: '',
        lastName: '',
        jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5NzA5NzE5MywiZXhwIjoxNTk3MTgzNTkzfQ.UXIPfiZ6hN2RWuCl-hUZjxZWtLpHgoAndjvwKkWcAa0',
        auth: true
      }
    };
    window.localStorage.setItem('user', JSON.stringify(userInfo));

    render(<SignIn />);
    expect(Router.push).toHaveBeenCalledWith('/');
  });
});
