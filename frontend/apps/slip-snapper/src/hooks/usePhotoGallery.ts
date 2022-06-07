import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createWorker } from 'tesseract.js';
import { doProcessing } from '../api/apiCall';

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

      ScanSlip(p.dataUrl as string);
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
function ScanSlip(photo: string) {
  const worker = createWorker({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logger: (m: any) => console.log(m),
  });
  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(photo);

    let resp = '';
    doProcessing(text)
      .then((res) => res.json())
      .then((json) => (resp = json));

    console.log(text);

    await worker.terminate();
  })();
}
