import renderer from 'react-test-renderer';
import SlipItems from '../../components/SlipItems';

jest.mock('../../api/apiCall');
jest.mock("../../api/Session");

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<SlipItems>', () => {
  it('should render component', () => {
    expect(renderTree(<SlipItems 
    />).toJSON()).toMatchSnapshot();
  });
  
});