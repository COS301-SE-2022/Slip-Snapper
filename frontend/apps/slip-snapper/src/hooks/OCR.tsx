import { IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import { doProcessing } from "../api/apiCall"
/**
 * 
 * @param photo is a dataUrl which is passed into Tessaract worker 
 * @returns text produced by Tessaract
 */

export function ScanSlip(photo : string) {
  const worker = createWorker({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //logger: (m:any) => console.log(m),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(photo);
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    doOCR();
  });

  let resp = "";
  doProcessing(ocr)
      .then((res) => res.json())
      .then(json => resp = json);

  return (
    <IonText color='primary'>{ocr}</IonText> 
  );
}