import renderer from 'react-test-renderer';
import {
    IonAlert,
    IonFab,
    IonIcon,
    IonItem,
    IonProgressBar,
    IonText,
    useIonToast
} from "@ionic/react";
import { useEffect, useState } from "react";

import { create } from 'ionicons/icons'
import Filter7Icon from '@mui/icons-material/Filter7Outlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getProfileData, setGeneralBudget } from "../../../api/apiCall"
import Budget, { updateBudgets } from "../../components/Budget";

jest.mock('../theme/profile.css');
jest.mock('ionicons/icons');
jest.mock('@mui/icons-material/Filter7Outlined');
jest.mock('@mui/icons-material/CalendarMonth');
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