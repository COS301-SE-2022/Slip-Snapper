import { useState } from 'react';

import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';
export interface SlipPhoto {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<SlipPhoto[]>([]);

  const takePhoto = async () => {
    try{ 
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        quality: 100,
        allowEditing: true,
        source: CameraSource.Prompt
      
      });
      const fileName = new Date().getTime() + '.jpeg';
      const newPhotos = [
        {
          filepath: fileName,
          webviewPath: photo.webPath,
        },
        ...photos
      ];
      setPhotos(newPhotos);
    } catch(e) { console.error(e); }
    
  };

  return {
    photos,
    takePhoto,
  };
  
}