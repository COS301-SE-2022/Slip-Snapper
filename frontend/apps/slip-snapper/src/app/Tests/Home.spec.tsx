import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Home from '../pages/Home';

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
    expect(Component.getByText('Edit Item'));
    expect(Component.getByText('Expenditure Totals'));
  });

  // test('Should check if function fires for generate report for daily', async () => {
  //   const { findByTitle } = render(<Home />);
  //   const addButton = await findByTitle('generateDR');
  //   fireEvent.click(addButton);
  // });
  // test('Should check if function fires for generate report for daily', async () => {
  //   const { findByTitle } = render(<Home />);
  //   const addButton = await findByTitle('generateWR');
  //   fireEvent.click(addButton);
  // });
  // test('Should check if function fires for generate report for daily', async () => {
  //   const { findByTitle } = render(<Home />);
  //   const addButton = await findByTitle('generateMR');
  //   fireEvent.click(addButton);
  // });
});
