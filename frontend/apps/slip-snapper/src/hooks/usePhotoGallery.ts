import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

/**
 * 
 * @returns dataUrl of Photo taken
 */

export function usePhotoGallery() {
  const [photo, setPhoto] = useState('../assets/icon/icon.png');

  const takePhoto = async () => {
    try {
      const p = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        quality: 100,
        allowEditing: true,
        source: CameraSource.Prompt,
      });

      const newPhoto = p.dataUrl as string;
      setPhoto(newPhoto);
    } catch (e) {
      console.error(e);
    }
  };
  return {
    photo,
    takePhoto,
  };
}
