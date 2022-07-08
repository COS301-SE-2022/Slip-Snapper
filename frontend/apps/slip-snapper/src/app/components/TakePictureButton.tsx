import { receipt, camera, list } from 'ionicons/icons';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
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
        <IonFabButton color='secondary'>
          <IonIcon icon={receipt}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={camera} onClick={usePhotoGallery}></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink={"/addentry"}>
              <IonIcon icon={list}></IonIcon>
            </IonFabButton>
          </IonFabList>
      </IonFab>
    </IonContent>
  );
};

export default TakePictureButton;
