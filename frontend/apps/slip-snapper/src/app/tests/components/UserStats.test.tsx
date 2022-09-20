import renderer from 'react-test-renderer';
import { UserStats } from "../../components/UserStats";

jest.mock("../../api/apiCall");
jest.mock("../../components/ProfileBarGraph");
jest.mock("../../components/ProfilePieChart");

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<UserStats>', () => {
  it('should render component', () => {
    expect(renderTree(<UserStats 
    />).toJSON()).toMatchSnapshot();
  });
  
});