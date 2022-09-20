import renderer from 'react-test-renderer';
import { IonTitle, IonButton, IonCard, IonItem, IonAlert, IonCardHeader, IonLabel, IonSearchbar, IonToggle, IonDatetime, IonIcon, useIonToast, IonButtons, IonContent, IonHeader, IonModal, IonRadio, IonRadioGroup, IonToolbar, IonFab, IonFabButton, IonCardSubtitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAllSlips, deleteSlip } from '../../../api/apiCall';

import { calendarOutline, filterOutline } from 'ionicons/icons';
import { Slider } from '@mui/material';
import { destroySession } from "../../../api/Session"
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