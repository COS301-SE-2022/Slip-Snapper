import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/react';
import React from 'react';
import { NavButtons } from '../components/NavButtons';
import SlipItems from '../components/SlipItems';

const EditItem: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Receipts</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <SlipItems />
      </IonContent>
    </IonPage>
  );
};

export default EditItem;