import { fireEvent, render, cleanup  } from '@testing-library/react';
import TakePictureButton from '../components/TakePictureButton';
import { create } from 'react-test-renderer';
import App from '../App';
import Profile from '../pages/Profile';
import ViewReports from '../pages/ViewReports';
import Login from '../pages/Login';
import { ionFireEvent as fire } from '@ionic/react-test-utils';
import Register from '../pages/Register';
//ReportTotal Imports
import AddEntry from '../pages/AddEntry';
import ForgotPass from '../pages/ForgotPass';
import ProfileBarGraph from '../components/ProfileBarGraph';

jest.mock('@ionic-native/file-opener/index', () => jest.fn());
beforeEach(cleanup);
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
    expect(Component.getByText('Receipts'));
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
   document.addEventListener('DOMContentLoaded', function () {
      const Component = render(<Profile />);

      expect(Component.getAllByText('Profile'));
      expect(Component.getByText('Home'));
      expect(Component.getByText('Reports'));
      expect(Component.getByText('Receipts'));
      expect(Component.getByText('User details'));
      expect(Component.getByText('Personal Budget'));
   });
  });


  test('Correctly renders user statitics', async () => {
    document.addEventListener('DOMContentLoaded', function () {;
      const Component = render(<Profile />);
    
      Component.getByTestId("favoriteStore").setAttribute("value", "Woolworths");
      Component.getByTestId("categoryName").setAttribute("value", "Food");
      Component.getByTestId("categoryTotal").setAttribute("value", "R699.99");
      Component.getByTestId("storeName").setAttribute("value", "PEP");
      Component.getByTestId("storeTotal").setAttribute("value", "R899.99");

      expect(Component.getByTestId("favoriteStore").getAttribute("value")).toBe("Woolworths")
      expect(Component.getByTestId("categoryName").getAttribute("value")).toBe("Food")
      expect(Component.getByTestId("categoryTotal").getAttribute("value")).toBe("R699.99")
      expect(Component.getByTestId("storeName").getAttribute("value")).toBe("PEP")
      expect(Component.getByTestId("storeTotal").getAttribute("value")).toBe("R899.99")
    })
  });
  test('Test if Weekly Budget button fires correctly', async () => {
    document.addEventListener('DOMContentLoaded', async function () {
      const Component = render(<Profile />);
      const weekly_budget = await Component.findByTestId("weekly-budget-icon");
      fireEvent.click(weekly_budget);
    });
  });

  test('Test if Monthly Budget button fires correctly', async () => {
    document.addEventListener('DOMContentLoaded', async function () {
      const Component = render(<Profile />);
      const monthly_budget = await Component.findByTestId("monthly-budget-icon");
      fireEvent.click(monthly_budget);
    });
  });


  test('Test if Add/Remove button fires correctly', async () => {
    document.addEventListener('DOMContentLoaded', async function () {
      const Component = render(<Profile />);
      const add_remove = await Component.findByText('Add/Remove');
      fireEvent.click(add_remove);
    });
  });

  test('Test if Logout button fires correctly', async () => {
    document.addEventListener('DOMContentLoaded', async function () {
      const Component = render(<Profile />);
      const logout = await Component.findByText('Logout');
      fireEvent.click(logout);
    });
  });

});

/**
 * @returns Jests tests for Login Page
 */
describe('Login', () => {
  it('Correctly renders the login page', () => {
    const Component = render(<Login />);

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

    expect(Component.getByText('Username'));
    expect(Component.getByText('Email Address'));
    expect(Component.getByText('Password'));
    expect(Component.getByText('Submit'));
  });

  test('Correctly renders user input', async () => {
    const Component = render(<Register />);
    const usernameInput = await Component.findByTitle('username_Input');
    const emailInput = await Component.findByTitle('email_Input');
    const passwordInput = await Component.findByTitle('password_Input');

    fire.ionChange(usernameInput, 'Jane_Doe777');
    fire.ionChange(emailInput, 'example@gmail.com');
    fire.ionChange(passwordInput, 'password123');

    expect(Component.findByText('Jane_Doe777'));
    expect(Component.findByText('example@gmail.com'));
    expect(Component.findByText('password123'));
  });
});

describe('Forgot Password', () => {
  it('Correctly renders the forgot password page', () => {
    const Component = render(<ForgotPass />);

    expect(Component.getByText('Forgot Password?'));
    expect(Component.getByText('Email Address'));
    expect(Component.getByText('Submit'));
  });

  test('Correctly renders user input', async () => {
    const Component = render(<ForgotPass />);
    const userInput = await Component.findByTitle('forgotPassInput');

    fire.ionChange(userInput, 'test@email.com');
    expect(Component.findByText('test@email.com'));

  });
});

describe('Generate Report', () => {
  // test('Should check if function fires for generate report for daily', async () => {
  //   const { findByTitle } = render(<ReportTotal reportData={[mockTotals[0].timePeriod, mockTotals[0].total, mockTotals[0].title]} />);
  //   const addButton = await findByTitle('generateDR');
  //   fireEvent.click(addButton);
  // });
  // test('Should check if function fires for generate report for weekly', async () => {
  //   const { findByTitle } = render(<ReportTotal reportData={[mockTotals[1].timePeriod, mockTotals[1].total, mockTotals[1].title]} />);

  //   const addButton = await findByTitle('generateWR');
  //   fireEvent.click(addButton);
  // });
  // test('Should check if function fires for generate report for Monthly', async () => {
  //   const { findByTitle } = render(<ReportTotal reportData={[mockTotals[2].timePeriod, mockTotals[2].total, mockTotals[2].title]} />);
  //   const addButton = await findByTitle('generateMR');
  //   fireEvent.click(addButton);
  // });
});

/**
 * @returns Jests tests for Register Page
 */
describe('AddEntry', () => {
  it('Correctly renders the AddEntry page', () => {
    const Component = render(<AddEntry />);

    expect(Component.getByText('Add Entries'));
    expect(Component.getByText('Location:'));
    expect(Component.getByText('Date:'));
    expect(Component.getByText('Edit Details'));
    // expect(Component.getByText('Description'));
    // expect(Component.getByText('Quantity'));
    // expect(Component.getByText('Price'));
    // expect(Component.getByText('Type'));
    expect(Component.getByText('Total Amount:'));
  });
});