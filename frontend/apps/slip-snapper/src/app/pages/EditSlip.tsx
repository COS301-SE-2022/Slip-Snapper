import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonButton,
    IonFooter
  } from '@ionic/react';
  import React from 'react';

  const EditSlip: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Edit Slip</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>

        <IonCard color="primary">
            <IonCardHeader>
            <IonCardTitle>Receipt Title</IonCardTitle>
                <IonItem color="primary">
                    <img src="..\assets\mock-receipts\IMG_5593.jpg" width="40%"></img>
                </IonItem>
            </IonCardHeader>

        </IonCard>

        <IonCard color="primary">
            <IonCardHeader>
            <IonCardTitle>Edit Details</IonCardTitle>
            </IonCardHeader>

            <IonItem color="primary">
            <IonButton fill="solid" slot="end" color="secondary">Confirm</IonButton>
            </IonItem>
        </IonCard>
  
        </IonContent>
  
        <IonFooter>
          <IonToolbar color="primary">
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  
  };
  
  export default EditSlip;
  