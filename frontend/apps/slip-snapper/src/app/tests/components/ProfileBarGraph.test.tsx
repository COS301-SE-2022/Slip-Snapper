import renderer from 'react-test-renderer';
import { Bar } from "react-chartjs-2";
import ProfileBarGraph from "../../components/ProfileBarGraph";

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<ProfileBarGraph>', () => {
  it('should render component with props', () => {
    expect(renderTree(<ProfileBarGraph  
      graphData={{current: 410.49, previous: 492.99}} 
    />).toJSON()).toMatchSnapshot();
  });
});