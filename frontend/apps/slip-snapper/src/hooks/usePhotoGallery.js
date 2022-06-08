import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createWorker } from 'tesseract.js';
import { doProcessing } from '../api/apiCall';
import '../app/theme/loading.css';

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

      let resp = '';
      await doProcessing(text)
        .then((res) => res.json())
        .then((json) => (resp = json));

      await worker.terminate();
      resolve(loading);
    })();
  });

  editSlip.then((loading) => {
    loading.onDidDismiss();
    window.location.assign('/editslip');
  });
}



