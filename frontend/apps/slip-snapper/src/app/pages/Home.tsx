import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonButton
} from '@ionic/react';
import React from 'react';
import '../theme/variables.css'
import TakePictureButton from '../components/TakePictureButton';
import { NavButtons } from '../components/NavButtons';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Slip Snapper</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonTitle>Recent Reports</IonTitle>
      <IonCard color="primary">
          <IonCardHeader>
            <IonCardSubtitle>10/05/22</IonCardSubtitle>
            <IonCardTitle>Report #11</IonCardTitle>
          </IonCardHeader>

          <IonItem>
            <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
          </IonItem>
        </IonCard>

        <IonCard color="primary">
          <IonCardHeader>
            <IonCardSubtitle>10/05/22</IonCardSubtitle>
            <IonCardTitle>Report #10</IonCardTitle>
          </IonCardHeader>

          <IonItem>
            <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
          </IonItem>
        </IonCard>

        <IonCard color="primary">
          <IonCardHeader>
            <IonCardSubtitle>10/05/22</IonCardSubtitle>
            <IonCardTitle>Report #9</IonCardTitle>
          </IonCardHeader>

          <IonItem>
            <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
          </IonItem>
        </IonCard>

        <TakePictureButton />
      </IonContent>
    </IonPage>
  );
};

export default Home;
