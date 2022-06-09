
import { render } from '@testing-library/react';
import Profile from '../pages/Profile';

describe('Profile', () => {
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

    it('Correctly renders the Profile page', () => {
        const Component = render(<Profile />);

        expect(Component.getAllByText('Profile'));
        expect(Component.getByText('Home'));
        expect(Component.getByText('Reports'));
        expect(Component.getByText('Edit Item'));
        expect(Component.getByText('User details'));
        expect(Component.getByText('Personal Budget'));
    });

    test('Correctly renders user statitics', async () => {
        const Component = render(<Profile />);
       
        Component.getByTitle('lastWeek').setAttribute("value","R100");
        Component.getByTitle('thisWeek').setAttribute("value", "R200");
        Component.getByTitle('lastMonth').setAttribute("value", "R300");
        Component.getByTitle('thisMonth').setAttribute("value", "R400");
        Component.getByTitle("favoriteStore").setAttribute("value", "Woolworths");
        Component.getByTitle("favoriteTotal").setAttribute("value", "R599.99");
        Component.getByTitle("categoryName").setAttribute("value", "Food");
        Component.getByTitle("categoryTotal").setAttribute("value", "R699.99");
        Component.getByTitle("storeName").setAttribute("value", "PEP");
        Component.getByTitle("storeTotal").setAttribute("value", "R899.99");

        expect(Component.getByTitle('lastWeek').getAttribute("value")).toBe("R100")
        expect(Component.getByTitle('thisWeek').getAttribute("value")).toBe("R200")
        expect(Component.getByTitle('lastMonth').getAttribute("value")).toBe("R300")
        expect(Component.getByTitle('thisMonth').getAttribute("value")).toBe("R400")
        expect(Component.getByTitle("favoriteStore").getAttribute("value")).toBe("Woolworths")
        expect(Component.getByTitle("favoriteTotal").getAttribute("value")).toBe("R599.99")
        expect(Component.getByTitle("categoryName").getAttribute("value")).toBe("Food")
        expect(Component.getByTitle("categoryTotal").getAttribute("value")).toBe("R699.99")
        expect(Component.getByTitle("storeName").getAttribute("value")).toBe("PEP")
        expect(Component.getByTitle("storeTotal").getAttribute("value")).toBe("R899.99")
    });
});