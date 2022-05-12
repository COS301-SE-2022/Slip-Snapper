import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTextarea, IonItem, IonLabel, IonItemDivider, IonList, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import '../pages/LoginRegister.css';
export const Register: React.FC = () => {
  const [text, setText] = useState<string>();

  return (
    <IonPage>
      <IonHeader>
       
      </IonHeader>
      <IonContent fullscreen color="primary">
       
     <IonCard color="tertiary" class="placeHolder">
        <IonCardHeader>
            LOGO Placeholder
        </IonCardHeader>
        
      </IonCard>

       <IonItem  color="primary" class="div">
            <IonLabel position="floating">First Name</IonLabel>
            <IonTextarea class="textArea" value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          </IonItem>

          <IonItem  color="primary" class="div">
            <IonLabel position="floating">Last Name</IonLabel>
            <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          </IonItem>

       
          <IonItem  color="primary" class="div">
            <IonLabel position="floating">Username</IonLabel>
            <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          </IonItem>

         
          <IonItem  color="primary" class="div">
            <IonLabel position="floating">Password</IonLabel>
            <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          </IonItem>

           <IonItem routerLink={"/home"} color="primary" class="buttonStyles">
               <IonButton>Register</IonButton>
            </IonItem>
     
      </IonContent>
    </IonPage>
  );
};



export default Register;