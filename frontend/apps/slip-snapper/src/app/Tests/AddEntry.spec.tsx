import React from 'react';
import { render } from '@testing-library/react';
import AddEntry from '../pages/AddEntry';

describe('AddEntry', () => {
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

    it('Correctly renders the Add Entry page', () => {
        const Component = render(<AddEntry/>);

        //Navigation 
        expect(Component.getByText('Home'));
        expect(Component.getByText('Reports'));
        expect(Component.getByText('Profile'));
        expect(Component.getByText('Edit Item'));

        expect(Component.getByText('Add Entries'));
        expect(Component.getByText('Item Name'));
        expect(Component.getByText('Quantity'));
        expect(Component.getByText('Price'));
        expect(Component.getByText('Type'));
       
        
    });
});
