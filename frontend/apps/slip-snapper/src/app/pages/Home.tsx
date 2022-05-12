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
  IonButton,
  IonRow,
  IonCol,
  IonFooter
} from '@ionic/react';
import React from 'react';
import './Home.css';
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

      <IonRow>
        <IonCol>
          <IonCard color="primary">
            <IonCardHeader>
              <IonCardSubtitle>10/05/22</IonCardSubtitle>
              <IonCardTitle>Report #11</IonCardTitle>
            </IonCardHeader>

            <IonItem>
              <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
            </IonItem>
          </IonCard>
        </IonCol>

        <IonCol>
          <IonCard color="primary">
            <IonCardHeader>
              <IonCardSubtitle>10/05/22</IonCardSubtitle>
              <IonCardTitle>Report #10</IonCardTitle>
            </IonCardHeader>

            <IonItem>
              <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
            </IonItem>
          </IonCard>
        </IonCol>

        <IonCol>
          <IonCard color="primary">
            <IonCardHeader>
              <IonCardSubtitle>10/05/22</IonCardSubtitle>
              <IonCardTitle>Report #9</IonCardTitle>
            </IonCardHeader>

            <IonItem>
              <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
            </IonItem>
          </IonCard>
        </IonCol>

        <IonCol>
          <IonCard color="primary">
            <IonCardHeader>
              <IonCardSubtitle>10/05/22</IonCardSubtitle>
              <IonCardTitle>Report #8</IonCardTitle>
            </IonCardHeader>

            <IonItem>
              <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
            </IonItem>
          </IonCard>
        </IonCol>
      </IonRow>

      <IonTitle>Expenditure Totals</IonTitle>

      <IonCard color="primary">
        <IonCardHeader>
          <IonCardTitle>Daily Total</IonCardTitle>
          <IonCardSubtitle>R137.69</IonCardSubtitle>
        </IonCardHeader>
        <IonItem>
          <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
        </IonItem>
      </IonCard>

      <IonCard color="primary">
        <IonCardHeader>
          <IonCardTitle>Weekly Total</IonCardTitle>
          <IonCardSubtitle>R912.21</IonCardSubtitle>
        </IonCardHeader>
        <IonItem>
          <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
        </IonItem>
      </IonCard>

      <IonCard color="primary">
        <IonCardHeader>
          <IonCardTitle>Monthly Total</IonCardTitle>
          <IonCardSubtitle>R4013.01</IonCardSubtitle>
        </IonCardHeader>
        <IonItem>
          <IonButton fill="outline" slot="end" color="secondary">View</IonButton>
        </IonItem>
      </IonCard>

      <TakePictureButton />

      </IonContent>

      <IonFooter>
        <IonToolbar color="primary">
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
