import renderer from 'react-test-renderer';
import { Bar } from "react-chartjs-2";
import Graph from "../../components/Graph";

jest.mock("react-chartjs-2");

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('Should render Graph component', () => {
  jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
  it('should render component with props', () => {
    expect(renderTree(<Graph  
      graphData={{
        amounts:[{itemPrice:30}],
        itemName:"Coke",
        occurances:[ {id: 1}],
        stores:['Chicken Licken']
        }} 
    />).toJSON()).toMatchSnapshot();
  });
});