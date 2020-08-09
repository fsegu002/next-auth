import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../../pages/auth/signin';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});

describe('<SignIn />', () => {
  it('renders Sign In with text and fields', () => {
    const { getByRole, getByLabelText } = render(<SignIn />);
    expect(getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });
});
