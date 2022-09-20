import renderer from 'react-test-renderer';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ProfileBarGraph from "../../components/ProfilePieChart";

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<ProfileBarGraph>', () => {
  it('should render component with props', () => {
    expect(renderTree(<ProfileBarGraph  
      graphData={[
        {
          Electronics: 31.190768034918833,
          Fashion: 0,
          Food: 18.983128543952486,
          Healthcare: 0,
          Hobby: 0,
          Household: 34.8779734321903,
          Other: 14.948129988938383,
          Vehicle: 0
        }
      ]} 
    />).toJSON()).toMatchSnapshot();
  });
});