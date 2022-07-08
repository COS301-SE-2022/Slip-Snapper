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
 * 
 * @returns Take picture button and Tesseract produced text
 */
const TakePictureButton: React.FC = () => {
  return (
    <IonContent>
        <IonFab horizontal ="center" vertical="bottom" slot="fixed" className='takePicture'>
        <IonFabButton onClick={usePhotoGallery}>
          <IonIcon icon={receipt}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonContent>
  );
};

export default TakePictureButton;
