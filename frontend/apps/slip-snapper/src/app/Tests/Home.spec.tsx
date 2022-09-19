import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import Home from '../pages/Home';

jest.mock('@ionic-native/file-opener/index', () => jest.fn());
beforeEach(cleanup);
describe('Home', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('Correctly renders the Home page', () => {
    const Component = render(<Home />);

    expect(Component.getByText('Slip Snapper'));
    expect(Component.getByText('Home'));
    expect(Component.getByText('Recent Reports'));
    expect(Component.getByText('Reports'));
    expect(Component.getByText('Profile'));
    expect(Component.getByText('Receipts'));
    expect(Component.getByText('Report Summary'));
  });
});
