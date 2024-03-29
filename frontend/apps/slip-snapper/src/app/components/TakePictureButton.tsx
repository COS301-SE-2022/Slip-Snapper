import { receipt, camera, list } from 'ionicons/icons';
import { usePhotoGallery } from './usePhotoGallery';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/react';
import React from 'react';
import '../theme/fab-home.css';

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
            <IonFabButton onClick={usePhotoGallery}>
              <IonIcon icon={camera}></IonIcon>
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
