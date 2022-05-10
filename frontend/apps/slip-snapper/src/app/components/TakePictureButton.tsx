import { receipt} from 'ionicons/icons';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,

} from '@ionic/react';

const TakePictureButton = () => {
   return(
  <IonContent>
    <IonFab vertical="bottom" horizontal="center" slot="fixed">
      <IonFabButton>
        <IonIcon icon={receipt}></IonIcon>
      </IonFabButton>
    </IonFab>
  </IonContent>
   );
};

export default TakePictureButton;

