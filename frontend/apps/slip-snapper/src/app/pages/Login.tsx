import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTextarea} from '@ionic/react';
import React, { useState } from 'react';
import './LoginRegister.css';

const Login: React.FC = () => {
    const [text, setText] = useState<string>();
  
    return (
      <IonPage>
      <IonHeader>
  
      </IonHeader>
      <IonContent fullscreen color="primary">
  
          <IonItem className='inputcredentials'  color="primary">
            <IonLabel position="floating">Username</IonLabel>
            <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          </IonItem>
          
          <IonItem className='inputcredentials' color="primary">
          <IonLabel position="floating">Password</IonLabel>
          <IonTextarea value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
        </IonItem>


  
      </IonContent>
    </IonPage>
    );
  };
  
  export default Login;