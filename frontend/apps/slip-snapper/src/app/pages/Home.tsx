import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import './Home.css';
import TakePictureButton from '../components/TakePictureButton';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Slip Snapper</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TakePictureButton />
      </IonContent>
    </IonPage>
  );
};

export default Home;
