import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import Home from '../../pages/Home';
import renderer from 'react-test-renderer';

jest.mock('@capacitor/filesystem');
jest.mock('../components/TakePictureButton');
jest.mock('../components/NavButtons');
jest.mock('../components/ReportItem');
jest.mock('../components/Graph');
jest.mock('ionicons/icons');
jest.mock("../../api/apiCall");
jest.mock("../../api/Session");
jest.mock('chart.js');
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

  const renderTree = (tree: JSX.Element) => renderer.create(tree);
  it('should render component', () => {
    expect(renderTree(<Home 
    />).toJSON()).toMatchSnapshot();
  });
});
