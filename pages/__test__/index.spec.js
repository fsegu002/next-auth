import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../index';
import useStores from '../../src/store/useStores';
import 'mobx-react-lite/batchingForReactDom';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});
jest.mock('../../src/store/useStores.js', () => jest.fn());

describe('App', () => {
  beforeAll(() => {
    useStores.mockImplementation(() => ({
      store: {
        user: { auth: true },
        setUser: jest.fn(),
        resetUser: jest.fn()
      }
    }));
  });

  it('renders without crashing', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Welcome to Next.js!' })).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });
});
