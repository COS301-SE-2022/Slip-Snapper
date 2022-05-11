import { receipt} from 'ionicons/icons';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,

} from '@ionic/react';
import React from 'react';

const TakePictureButton: React.FC = () => {
  const {photos, takePhoto } = usePhotoGallery();
   return(
  <IonContent>
    <IonGrid>
    <IonRow>
      {photos.map((photo, index) => (
        <IonCol size="2" key={index}>
          <IonImg src={photo.webviewPath} />
        </IonCol>
      ))}
    </IonRow>
  </IonGrid>
    <IonFab vertical="bottom" horizontal="center" slot="fixed">
      <IonFabButton onClick={() => takePhoto()}>
        <IonIcon icon={receipt}></IonIcon>
      </IonFabButton>
    </IonFab>
  </IonContent>
   );
};

export default TakePictureButton;