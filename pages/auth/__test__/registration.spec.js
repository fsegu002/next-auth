import React from 'react';
import { render, screen } from '@testing-library/react';
import Registration from '../registration';
import useStores from '../../../src/store/useStores';

jest.mock('../../../src/store/useStores.js', () => jest.fn());

describe('<Registration />', () => {
  beforeAll(() => {
    useStores.mockImplementation(() => ({
      store: {
        setUser: jest.fn()
      }
    }));
  });

  it('renders Sign In', () => {
    render(<Registration />);

    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
  });
});
