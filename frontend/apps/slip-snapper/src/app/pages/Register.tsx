import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTextarea, IonItem, IonLabel, IonItemDivider, IonList, IonButton } from '@ionic/react';

export const Register: React.FC = () => {
  const [text, setText] = useState<string>();

  return (
    <IonPage>
      <IonHeader>
       
      </IonHeader>
      <IonContent fullscreen color="primary">
       
       
       <IonItem  color="primary" class="placement">
            <IonLabel position="floating">First</IonLabel>
            <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          </IonItem>

          <IonItem  color="primary">
            <IonLabel position="floating">LastName</IonLabel>
            <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          </IonItem>

       
          <IonItem  color="primary">
            <IonLabel position="floating">Username</IonLabel>
            <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          </IonItem>

         
          <IonItem  color="primary">
            <IonLabel position="floating">Password</IonLabel>
            <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          </IonItem>

           <IonItem color="primary">
              <IonButton routerLink={"/home"}  fill="outline" color="secondary">Register</IonButton>
            </IonItem>
     
      </IonContent>
    </IonPage>
  );
};



export default Register;