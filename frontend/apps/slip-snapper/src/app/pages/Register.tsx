import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTextarea, IonItem, IonLabel, IonItemDivider, IonList, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import '../theme/LoginRegister.css';
export const Register: React.FC = () => {
  const [text1, setText1] = useState<string>();
  const [text2, setText2] = useState<string>();
  const [text3, setText3] = useState<string>();
  const [text4, setText4] = useState<string>();

  return (
    <IonPage>

      <IonHeader>
      </IonHeader>
      <IonContent fullscreen color="primary">
          <IonCard color = "tertiary" class = "LRLogo">
        <IonCardHeader >
           Slip-Snapper
        </IonCardHeader>
          </IonCard>
       <IonItem  color="primary" class="inputcredentials" >
            <IonLabel position="floating">First Name</IonLabel>
            <IonTextarea  value={text1} onIonChange={e => setText1(e.detail.value!)}></IonTextarea>
        </IonItem>
      

          <IonItem  color="primary" class="inputcredentials">
            <IonLabel position="floating">Last Name</IonLabel>
            <IonTextarea value={text2} onIonChange={f => setText2(f.detail.value!)}></IonTextarea>
          </IonItem>

       
          <IonItem  color="primary" class="inputcredentials">
            <IonLabel position="floating">Username</IonLabel>
            <IonTextarea  value={text3} onIonChange={e => setText3(e.detail.value!)}></IonTextarea>
          </IonItem>

         
          <IonItem   color="primary" class="inputcredentials">
            <IonLabel position="floating">Password</IonLabel>
            <IonTextarea value={text4} onIonChange={e => setText4(e.detail.value!)}></IonTextarea>
          </IonItem>
         <IonItem text-align="center" color="primary">
              <IonButton class="LRButtons" color= "tertiary" routerLink={"/home"} >Register</IonButton>
              </IonItem>
      </IonContent>
    </IonPage>
  );
};



export default Register;