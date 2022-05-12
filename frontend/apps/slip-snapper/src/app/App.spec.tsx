import React from 'react';
import { render } from '@testing-library/react';
import TakePictureButton from './components/TakePictureButton';
import { create } from "react-test-renderer";
import Home from './pages/Home';
import App from './App';

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

describe("Home", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  it("Correctly renders the Home page", () => {
    
    const Component = render(<Home />);
  
    expect(Component.getByText("Slip Snapper"));
    expect(Component.getByText("Home"));
    expect(Component.getByText("Recent Reports" ));
    expect(Component.getByText("Reports"));
    expect(Component.getByText("Profile"));
    expect(Component.getByText("Edit Item" ));
    expect(Component.getByText("Expenditure Totals"));
  });
});

describe("TakePicture Button component", () => {
  test("Matches the snapshot of the TakePicture button", () => {
    const button = create(<TakePictureButton />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});