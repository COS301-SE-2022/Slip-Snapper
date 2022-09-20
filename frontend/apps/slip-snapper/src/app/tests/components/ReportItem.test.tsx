import renderer from 'react-test-renderer';
import ReportItem from '../../components/ReportItem';

jest.mock('@capacitor/filesystem');
jest.mock('../../api/apiCall');
jest.mock('@ionic-native/file-opener/index', () => jest.fn());

const renderTree = (tree: JSX.Element) => renderer.create(tree);
describe('<ReportItem>', () => {
  it('should render component with props', () => {
    expect(renderTree(<ReportItem  
      reportData={["18", '19-9-2022_Weekly_18.pdf', '19/9/2022 Weekly #18.pdf']} 
    />).toJSON()).toMatchSnapshot();
  });
});