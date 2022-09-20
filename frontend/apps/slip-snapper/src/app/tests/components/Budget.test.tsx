import renderer from 'react-test-renderer';
import Budget, { updateBudgets } from "../../components/Budget";

jest.mock("../../api/apiCall");

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<Budget>', () => {
  it('should render component', () => {
    expect(renderTree(<Budget 
    />).toJSON()).toMatchSnapshot();
  });
  
});

describe('updateBudgets', () => {
  it('should expose a function', () => {
		expect(updateBudgets).toBeDefined();
	});

});