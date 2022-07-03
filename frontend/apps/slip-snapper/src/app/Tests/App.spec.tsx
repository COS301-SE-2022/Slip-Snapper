import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TakePictureButton from '../components/TakePictureButton';
import { create } from 'react-test-renderer';
import App from '../App';
import Profile from '../pages/Profile';
import ViewReports from '../pages/ViewReports';
import Login from '../pages/Login';
import { ionFireEvent as fire } from '@ionic/react-test-utils';
import Register from '../pages/Register';
//ReportTotal Imports
import ReportTotal from '../components/ReportTotal';
import { mockTotals } from '../pages/Home'

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

describe('TakePicture Button component', () => {
  test('Matches the snapshot of the TakePicture button', () => {
    const button = create(<TakePictureButton />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});

describe('Reports', () => {
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

  it('Correctly renders the Reports page', () => {
    const Component = render(<ViewReports />);

    expect(Component.getByText('Profile'));
    expect(Component.getByText('Home'));
    expect(Component.getByText('Reports'));
    expect(Component.getByText('Edit Item'));
    expect(Component.getByText('View Reports'));
  });
});

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

    Component.getByTitle('lastWeek').setAttribute("value", "R100");
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
/**
 * @returns Jests tests for Login Page
 */
describe('Login', () => {
  it('Correctly renders the login page', () => {
    const Component = render(<Login />);

    expect(Component.getByText('Slip Snapper'));
    expect(Component.getByText('Username'));
    expect(Component.getByText('Password'));
    expect(Component.getByText('Login'));
    expect(Component.getByText('Register'));
  });

  test('Correctly renders user input', async () => {
    const Component = render(<Login />);
    const userInput = await Component.findByTitle('usernameInput');
    const passInput = await Component.findByTitle('passwordInput');

    fire.ionChange(userInput, 'Jane');
    expect(Component.findByText('Jane'));

    fire.ionChange(passInput, 'password123');
    expect(Component.findByText('password123'));
  });
});

/**
 * @returns Jests tests for Register Page
 */
describe('Register', () => {
  it('Correctly renders the register page', () => {
    const Component = render(<Register />);

    expect(Component.getByText('Slip Snapper'));
    expect(Component.getByText('Name'));
    expect(Component.getByText('Surname'));
    expect(Component.getByText('Username'));
    expect(Component.getByText('Password'));
    expect(Component.getByText('Register'));
  });

  test('Correctly renders user input', async () => {
    const Component = render(<Register />);
    const nameInput = await Component.findByTitle('name_Input');
    const surnameInput = await Component.findByTitle('surname_Input');
    const usernameInput = await Component.findByTitle('username_Input');
    const passwordInput = await Component.findByTitle('password_Input');

    fire.ionChange(nameInput, 'Jane');
    fire.ionChange(surnameInput, 'Doe');
    fire.ionChange(usernameInput, 'Jane_Doe777');
    fire.ionChange(passwordInput, 'password123');

    expect(Component.findByText('Jane'));
    expect(Component.findByText('Doe'));
    expect(Component.findByText('Jane_Doe777'));
    expect(Component.findByText('password123'));
  });
});

describe('Register', () => {

  test('Should check if function fires for generate report for daily', async () => {
    const { findByTitle } = render(<ReportTotal reportData={[mockTotals[0].timePeriod, mockTotals[0].total, mockTotals[0].title]} />);
    const addButton = await findByTitle('generateDR');
    fireEvent.click(addButton);
  });
  test('Should check if function fires for generate report for weekly', async () => {
    const { findByTitle } = render(<ReportTotal reportData={[mockTotals[1].timePeriod, mockTotals[1].total, mockTotals[1].title]} />);

    const addButton = await findByTitle('generateWR');
    fireEvent.click(addButton);
  });
  test('Should check if function fires for generate report for Monthly', async () => {
    const { findByTitle } = render(<ReportTotal reportData={[mockTotals[2].timePeriod, mockTotals[2].total, mockTotals[2].title]} />);
    const addButton = await findByTitle('generateMR');
    fireEvent.click(addButton);
  });
});
//Example of old Report API tests
  // test('Should check if function fires for generate report for daily', async () => {
  //   const { findByTitle } = render(<ReportTotal />);
  //   const addButton = await findByTitle('generateMR');
  //   fireEvent.click(addButton);
  // });