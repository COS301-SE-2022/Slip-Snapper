import { IonButton, IonCard, IonContent, IonImg, IonInput, IonItem, IonLabel, IonPage} from '@ionic/react';
import React, { useState } from 'react';
import '../theme/LoginRegister.css';

const Login: React.FC = () => {
  
  const [usernameInput, setUsernameInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  
    return (
      <IonPage>

      <IonContent fullscreen color="primary">

          <IonImg src="/assets/icon/temp_logo.png" class="logoimg"></IonImg>

          <IonCard color = "tertiary" class="logincard">
            
            <IonItem  color="tertiary" class="loginitems">
              <IonLabel position="floating">Username</IonLabel>
              <IonInput type="text" value={usernameInput} onIonChange={e => setUsernameInput(e.detail.value!)} required></IonInput>
            </IonItem>

            <IonItem   color="tertiary" class="loginitems">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" value={passwordInput} onIonChange={e => setPasswordInput(e.detail.value!)} required></IonInput>
            </IonItem>

            <IonItem color="tertiary" text-align="center" class="loginitems">
              <IonButton type="submit" class="LRButtons" color= "secondary" size="large" routerLink={"/home"}>Login</IonButton>
            </IonItem>

            <IonItem color="tertiary" text-align="center" class="loginitems">
              <IonButton class="LRButtons" color= "secondary" size="large" routerLink={"/register"}>Register</IonButton>
            </IonItem>

          </IonCard>  
      </IonContent>
      
    </IonPage>
    );

    function login(user: string, password: string){
      user = "Jane Doe";
      fetch("http://localhost:55555/api/user/login", {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: user,
            pass: password
        })
      })
      .then((res) => res.json())
    }
  };
  
  export default Login;