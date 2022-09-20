import renderer from 'react-test-renderer';
import { EditBudgets } from "../../components/EditBudgets";

jest.mock('../../api/apiCall');
jest.mock('../../components/Budget');

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<EditBudgets>', () => {
  it('should render component', () => {
    expect(renderTree(<EditBudgets 
    />).toJSON()).toMatchSnapshot();
  });
  
});