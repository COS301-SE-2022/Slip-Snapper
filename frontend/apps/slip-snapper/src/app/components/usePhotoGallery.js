import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createWorker } from 'tesseract.js';
import { doProcessing } from '../../api/apiCall';
import '../theme/toasts.css';

/**
 *
 * @returns dataUrl of Photo taken
 */

export function usePhotoGallery() {
  (async () => {
    try {
      const p = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        quality: 100,
        allowEditing: true,
        source: CameraSource.Prompt,
      });
      
      ScanSlip(p.dataUrl);
    } catch (err) {
      console.error(err);
    }
  })();
}

/**
 *
 * @param photo dataUrl of photo taken
 * produces ocr scanned text
 */
function ScanSlip(photo) {
  const editSlip = new Promise((resolve, reject) => {
    const loading = document.createElement('ion-loading');
    loading.spinner = "crescent";
    loading.cssClass = "loading";
    loading.mode = "ios";
    const worker = createWorker({
      logger: (m) => {if(m.status === "recognizing text"){
        loading.message = Math.trunc(m.progress*100) + "%";
      }},
    
    });
    document.body.appendChild(loading);
    loading.present();

    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {
        data: { text },
      } = await worker.recognize(photo);

      localStorage.removeItem('photo')
      localStorage.setItem('photo', JSON.stringify(photo))

      await doProcessing(text)
        .then((apiResponse) => apiResponse.data)
        .then((data) => {
          localStorage.removeItem('scan-content')
          localStorage.setItem('scan-content', JSON.stringify(data))
        });
      
      await worker.terminate();
      resolve(loading);
    })();
  });

  editSlip.then((loading) => {
    loading.dismiss();
    loading.onDidDismiss(window.location.assign('/editslip'));
  });
}



