import React from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from '../signin';
import useStores from '../../../src/store/useStores';

jest.mock('../../../src/store/useStores.js', () => jest.fn());

describe('<SignIn />', () => {
  beforeAll(() => {
    useStores.mockImplementation(() => ({
      store: {
        setUser: jest.fn()
      }
    }));
  });

  it('renders Sign In', () => {
    render(<SignIn />);

    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
  });
});
