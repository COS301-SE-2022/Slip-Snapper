import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/react';
import React from 'react';
import { NavButtons } from '../components/NavButtons';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Profile;