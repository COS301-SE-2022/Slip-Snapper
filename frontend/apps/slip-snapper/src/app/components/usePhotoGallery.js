import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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
        quality: 85,
        allowEditing: false,
        saveToGallery: true,
        correctOrientation: true,
        width: 1280,
        height: 1280,
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
  const loading = document.createElement('ion-loading');
  loading.spinner = "crescent";
  loading.cssClass = "loading";
  loading.mode = "ios";
  document.body.appendChild(loading);

  const editSlip = new Promise((resolve, reject) => {
    
    loading.present();

    (async () => {

      localStorage.removeItem('photo');
      localStorage.setItem('photo', JSON.stringify(photo));

      await doProcessing(photo)
        .then(apiResponse => {
          console.log(apiResponse)
          if(typeof(apiResponse.data) !== "string"){
            if(apiResponse.data.message !== "Error processing image" && apiResponse.data.message !== "Token has expired Login again to continue using the application"){
              localStorage.removeItem('scan-content');
              localStorage.setItem('scan-content', JSON.stringify(apiResponse.data));
              resolve();
            }else{
              reject();
            }
          }else{
            reject();
          }
        });
    })();
  });

  editSlip.then(
    function(value) {
      loading.dismiss();
      loading.onDidDismiss(window.location.assign('/editslip'));
     },
    function(error) { 
      loading.dismiss();
    }
  );
}



