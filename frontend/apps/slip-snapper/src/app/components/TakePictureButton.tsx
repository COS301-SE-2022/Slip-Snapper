import { receipt } from 'ionicons/icons';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import React from 'react';

/**
 * allows user to click on the fab and take a photo
 * @returns take photo component
 */

const TakePictureButton: React.FC = () => {
  const { photo, takePhoto } = usePhotoGallery();
  return (
    <IonContent>
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={() => takePhoto()}>
          <IonIcon icon={receipt}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonContent>
  );
};

export default TakePictureButton;
