import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTextarea, IonItem, IonLabel, IonItemDivider, IonList, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import '../theme/LoginRegister.css';
export const Register: React.FC = () => {
  const [fnameInput, setFnameInput] = useState<string>();
  const [lnameInput, setLnameInput] = useState<string>();
  const [usernameInput, setUsernameInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();

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
            <IonTextarea  value={fnameInput} onIonChange={e => setFnameInput(e.detail.value!)}></IonTextarea>
        </IonItem>
      

          <IonItem  color="primary" class="inputcredentials">
            <IonLabel position="floating">Last Name</IonLabel>
            <IonTextarea value={lnameInput} onIonChange={f => setLnameInput(f.detail.value!)}></IonTextarea>
          </IonItem>

       
          <IonItem  color="primary" class="inputcredentials">
            <IonLabel position="floating">Username</IonLabel>
            <IonTextarea  value={usernameInput} onIonChange={e => setUsernameInput(e.detail.value!)}></IonTextarea>
          </IonItem>

         
          <IonItem   color="primary" class="inputcredentials">
            <IonLabel position="floating">Password</IonLabel>
            <IonTextarea value={passwordInput} onIonChange={e => setPasswordInput(e.detail.value!)}></IonTextarea>
          </IonItem>
         <IonItem text-align="center" color="primary">
              <IonButton class="LRButtons" color= "tertiary" routerLink={"/home"} >Register</IonButton>
              </IonItem>
      </IonContent>
    </IonPage>
  );

  function register(name:string, surname:string, user: string, password: string){
    const fullName = name + " " + surname;
    user = "Jane Doe";
    fetch("http://localhost:55555/user/login", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user,
          userName: fullName,
          pass: password
      })
    })
    .then((res) => res.json())
  }
};



export default Register;