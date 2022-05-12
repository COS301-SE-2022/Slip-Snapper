import { IonButton, IonCard, IonCardHeader, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTextarea} from '@ionic/react';
import { setAssetPath } from 'ionicons/dist/types/stencil-public-runtime';
import React, { useState } from 'react';
import './LoginRegister.css';

const Login: React.FC = () => {
    const [text, setUsername] = useState<string>();
    const [password, setpassword] = useState<string>();
  
    return (
      <IonPage>
     
      <IonHeader>
       
       </IonHeader>
       <IonContent fullscreen color="primary">
        
      <IonCard color="tertiary" class="LRLogo">
         <IonCardHeader>
             Slip-Snapper
         </IonCardHeader>
       </IonCard>
       

      <IonCard id='outerLRcontainer'   color="secondary">
        
          <IonItem  class="inputcredentials"  color="primary">
            <IonLabel position="floating">Username</IonLabel>
            <IonTextarea value={text} onIonChange={e => setUsername(e.detail.value!)}></IonTextarea>
          </IonItem>
          
          <IonItem  class="inputcredentials" color="primary">
          <IonLabel position="floating">Password</IonLabel>
          <IonTextarea value={password} onIonChange={e => setpassword(e.detail.value!)}></IonTextarea>
        </IonItem>

        <IonItem  border-color= "secondary" color = "primary"  class="LRButtons">
               <IonButton color= "tertiary" routerLink={"/home"} >Login</IonButton>
            </IonItem>
        <IonItem  border-color= "secondary" color = "primary"  class="LRButtons">
               <IonButton color= "tertiary" routerLink={"/register"} >Register</IonButton>
            </IonItem>
      </IonCard>
      </IonContent>
    </IonPage>
    );
  };
  
  export default Login;