import renderer from 'react-test-renderer';
import EditReceipt from '../../pages/EditReceipt';

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<EditReceipt>', () => {
  it('should render component', () => {
    expect(renderTree(<EditReceipt 
    />).toJSON()).toMatchSnapshot();
  });
  
});