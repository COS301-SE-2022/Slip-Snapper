import { IonButton, IonCard, IonCardHeader, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTextarea} from '@ionic/react';
import React, { useState } from 'react';
import '../theme/LoginRegister.css';

const Login: React.FC = () => {
  
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
       
          <IonItem  color="primary" class="inputcredentials">
            <IonLabel position="floating">Username</IonLabel>
            <IonTextarea  value={text3} onIonChange={e => setText3(e.detail.value!)}></IonTextarea>
          </IonItem>

         
          <IonItem   color="primary" class="inputcredentials">
            <IonLabel position="floating">Password</IonLabel>
            <IonTextarea value={text4} onIonChange={e => setText4(e.detail.value!)}></IonTextarea>
          </IonItem>

         <IonItem text-align="center" color="primary">
              <IonButton class="LRButtons" color= "tertiary" routerLink={"/home"} >Login</IonButton>
              </IonItem>

              <IonItem text-align="center" color="primary">
              <IonButton class="LRButtons" color= "tertiary" routerLink={"/register"} >Register</IonButton>
              </IonItem>
      
      </IonContent>
      
    </IonPage>
    );

    function login(user: string, password: string){
      user = "Jane Doe";
      fetch("http://localhost:55555/user/login", {
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