import React from 'react';
import { render } from '@testing-library/react';
import Registration from '../../../pages/auth/registration';

describe('<Registration />', () => {
  it('renders Registration with text and fields', () => {
    const { getByRole, getByLabelText } = render(<Registration />);
    expect(getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Register' })).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });
});
