import { receipt } from 'ionicons/icons';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import React from 'react';
import { ScanSlip } from '../../hooks/OCR';

/**
 * 
 * @returns Take picture button and Tesseract produced text
 */
const TakePictureButton: React.FC = () => {
  const { photo, takePhoto } = usePhotoGallery();
  const Element = ScanSlip(photo);
  return (
    <IonContent>
      {Element}
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={() => takePhoto()}>
          <IonIcon icon={receipt}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonContent>
  );
};

export default TakePictureButton;
