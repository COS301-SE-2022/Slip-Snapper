import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons
} from '@ionic/react';
import React from 'react';
import './Home.css';
import TakePictureButton from '../components/TakePictureButton';
import { NavButtons } from '../components/NavButtons';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Slip Snapper</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TakePictureButton />
      </IonContent>
    </IonPage>
  );
};

export default Home;
