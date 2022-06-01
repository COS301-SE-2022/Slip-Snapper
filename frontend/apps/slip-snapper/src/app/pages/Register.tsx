import React, { useState } from 'react';
import { IonContent, IonPage, IonTextarea, IonItem, IonLabel, IonButton, IonCard, IonImg} from '@ionic/react';
import '../theme/LoginRegister.css';
export const Register: React.FC = () => {
  const [fnameInput, setFnameInput] = useState<string>();
  const [lnameInput, setLnameInput] = useState<string>();
  const [usernameInput, setUsernameInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();

  return (
    <IonPage>

      <IonContent fullscreen color="primary">

        <IonImg src="/assets/icon/temp_logo.png" class="logoimg"></IonImg>

        <IonCard color = "tertiary" class = "logincard">

          <IonItem  color="tertiary" class="loginitems" >
            <IonLabel position="floating">First Name</IonLabel>
            <IonTextarea  value={fnameInput} onIonChange={e => setFnameInput(e.detail.value!)}></IonTextarea>
          </IonItem>
      
          <IonItem  color="tertiary" class="loginitems">
            <IonLabel position="floating">Last Name</IonLabel>
            <IonTextarea value={lnameInput} onIonChange={f => setLnameInput(f.detail.value!)}></IonTextarea>
          </IonItem>

          <IonItem  color="tertiary" class="loginitems">
            <IonLabel position="floating">Username</IonLabel>
            <IonTextarea  value={usernameInput} onIonChange={e => setUsernameInput(e.detail.value!)}></IonTextarea>
          </IonItem>

         
          <IonItem   color="tertiary" class="loginitems">
            <IonLabel position="floating">Password</IonLabel>
            <IonTextarea value={passwordInput} onIonChange={e => setPasswordInput(e.detail.value!)}></IonTextarea>
          </IonItem>

         <IonItem text-align="center" color="tertiary" class="loginitems">
              <IonButton class="LRButtons" color= "secondary" size="large" routerLink={"/home"} >Register</IonButton>
              </IonItem>
          </IonCard>
      </IonContent>

    </IonPage>
  );

  function register(name:string, surname:string, user: string, password: string){
    const fullName = name + " " + surname;
    user = "Jane Doe";
    fetch("http://localhost:55555/api/user/login", {
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