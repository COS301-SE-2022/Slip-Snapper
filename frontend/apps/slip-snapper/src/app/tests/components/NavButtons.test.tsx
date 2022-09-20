import renderer from 'react-test-renderer';
import { NavButtons } from "../../components/NavButtons";

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<NavButtons>', () => {
  it('should render component', () => {
    expect(renderTree(<NavButtons 
    />).toJSON()).toMatchSnapshot();
  });
  
});