import React from 'react';
import Router from 'next/router';
import { render } from '@testing-library/react';
import Registration from '../../../pages/auth/registration';

jest.mock('next/router', () => ({
  push: jest.fn()
}));

describe('<Registration />', () => {
  it('renders Registration with text and fields', () => {
    const { getByRole, getByLabelText } = render(<Registration />);
    expect(getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Register' })).toBeInTheDocument();
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

    render(<Registration />);
    expect(Router.push).toHaveBeenCalledWith('/');
  });
});
